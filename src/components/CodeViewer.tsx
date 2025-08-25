"use client";
import React, { useMemo } from "react";

type CodeViewerProps = {
  code: string;
  language?: "tsx" | "ts" | "js" | "jsx" | "json" | "html" | "css";
  filePath?: string;
  author?: { name: string; avatarUrl?: string };
  commit?: { id: string; time?: string };
  className?: string;
  fullHeight?: boolean;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Minimal tokenizer tuned for TSX/JSX; not perfect but good enough for preview
function tokenize(line: string): string {
  const html = escapeHtml(line);
  // strings
  let out = html.replace(/(&quot;.*?&quot;|&#39;.*?&#39;|`[^`]*`)/g, '<span class="cv-token cv-string">$1</span>');
  // tags
  out = out.replace(/(&lt;\/?)([A-Za-z0-9_:-]+)([^&]*?)(\/?&gt;)/g, (_m, a1, a2, a3, a4) => {
    const attrs = a3.replace(/([A-Za-z_:][-A-Za-z0-9_:.]*)(=)/g, '<span class="cv-attr">$1</span>$2');
    return `<span class="cv-tag">${a1}</span><span class="cv-tag-name">${a2}</span>${attrs}<span class="cv-tag">${a4}</span>`;
  });
  // keywords
  out = out.replace(/\b(export|default|function|return|const|let|var|if|else|for|while|switch|case|break|import|from|as|new|try|catch|finally|await|async|type|interface|extends|implements)\b/g,
    '<span class="cv-key">$1</span>');
  // types
  out = out.replace(/:\s*([A-Za-z_][A-Za-z0-9_<>\[\]]*)/g, ': <span class="cv-type">$1</span>');
  // function names: name( ...
  out = out.replace(/\b([A-Za-z_$][A-Za-z0-9_$]*)\s*(?=\()/g, '<span class="cv-fn">$1</span>');
  return out;
}

export function CodeViewer({ code, language = "tsx", filePath, author, commit, className, fullHeight }: CodeViewerProps) {
  const lines = useMemo(() => code.split("\n"), [code]);
  return (
    <div className={"cv-wrapper" + (className ? " " + className : "") + (fullHeight ? " cv-h-full" : "") }>
      <div className="cv-topbar">
        <div className="cv-meta">
          <span className="cv-file">{filePath || "untitled"}</span>
          {commit?.id ? <span className="cv-commit">{commit.id.slice(0, 7)}{commit.time ? ` · ${commit.time}` : ''}</span> : null}
        </div>
        {author ? (
          <div className="cv-author">
            {author.avatarUrl ? <img src={author.avatarUrl} alt={author.name} /> : <div className="cv-avatar-fallback" />}
            <span>{author.name}</span>
          </div>
        ) : null}
      </div>
      <div className="cv-code font-mono">
        {lines.map((l, idx) => (
          <div key={idx} className="cv-row">
            <div className="cv-ln" aria-hidden>{idx + 1}</div>
            <div className="cv-indent" aria-hidden>
              {Array.from({ length: (l.match(/^\s*/)?.[0].length || 0) }).map((_, i) => (
                <span key={i} className="cv-guide" />
              ))}
            </div>
            <div className="cv-text" dangerouslySetInnerHTML={{ __html: tokenize(l) }} />
          </div>
        ))}
      </div>
      <style jsx>{`
        .cv-wrapper { border: 1px solid var(--border); border-radius: 8px; overflow: hidden; display:flex; flex-direction:column; }
        .cv-h-full { height: 100%; }
        .cv-topbar { display:flex; align-items:center; justify-content:space-between; padding:6px 10px; background: var(--muted); border-bottom:1px solid var(--border); font-size:12px; }
        .cv-meta { display:flex; align-items:center; gap:8px; }
        .cv-file { color: var(--foreground); font-weight: 500; }
        .cv-commit { color: var(--muted-foreground); }
        .cv-author { display:flex; align-items:center; gap:8px; color: var(--muted-foreground); }
        .cv-author img, .cv-avatar-fallback { width:18px; height:18px; border-radius:50%; background: var(--secondary); }
        .cv-code { background:#0f1115; color:#e6e6e6; font-size:12.5px; line-height:1.35; flex:1; overflow:auto; }
        .cv-row { display:grid; grid-template-columns: 44px 0px 1fr; gap:0; }
        .cv-ln { user-select:none; text-align:right; padding:0 6px; color:#6b7280; border-right:1px solid #1f2430; background:#0d0f14; font-size:12.5px; }
        .cv-indent { position:relative; }
        .cv-guide { display:inline-block; width:8px; height:100%; border-right:1px dotted rgba(255,255,255,0.06); }
        .cv-text { white-space:pre; padding:0 8px; font-feature-settings: "calt" 1; font-variant-ligatures: contextual; font-family: "JetBrains Mono", "Cursor Code", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
        .cv-token.cv-key { color:#c792ea; }
        .cv-token.cv-fn { color:#ffd580; }
        .cv-tag, .cv-tag-name { color:#ffae57; }
        .cv-attr { color:#7aa2f7; }
        .cv-string { color:#a2cf8d; }
        .cv-type { color:#82aaff; }
      `}</style>
    </div>
  );
}

export default CodeViewer;


