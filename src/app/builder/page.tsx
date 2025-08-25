"use client";
import { useEffect, useMemo, useState, useRef, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { Database, RefreshCw, Pencil, ExternalLink, Trash2, RotateCcw, History } from "lucide-react";
import CodeViewer from "@/components/CodeViewer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type GenResponse = { ok: true; path: string; used: { id: string; title: string; exportName?: string }[]; unknownIntents?: string[] } | { ok?: false; error: string; unknownIntents?: string[] };

export default function BuilderPage() {
  const [prompt, setPrompt] = useState("");
  const [pageName, setPageName] = useState("");
  const [sourcePath, setSourcePath] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [used, setUsed] = useState<{ id: string; title: string; exportName?: string }[]>([]);
  const [unknown, setUnknown] = useState<string[]>([]);
  const [target, setTarget] = useState<"playground" | "app">("playground");
  const [componentPath, setComponentPath] = useState<string | null>(null);
  const [code, setCode] = useState<string>("");
  const [session, setSession] = useState<any>(null);
  const supabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const [previewVersion, setPreviewVersion] = useState<number>(0);
  const [isEditingCode, setIsEditingCode] = useState<boolean>(false);
  const [leftTab, setLeftTab] = useState<"chat" | "history">("chat");
  const [rightTab, setRightTab] = useState<"preview" | "used" | "code">("preview");
  const [authChecked, setAuthChecked] = useState<boolean>(!supabaseConfigured);
  type Snapshot = {
    pageName?: string;
    sourcePath?: string | null;
    componentPath?: string | null;
    used?: { id: string; title: string; exportName?: string }[];
    code?: string;
  };
  type ChatMessage = { role: "user" | "assistant"; content: string; meta?: { kind?: "generated" | "restored" | "info"; snapshot?: Snapshot; refIndex?: number } };
  type ChatSession = {
    id: string;
    title: string;
    pageName?: string;
    published?: boolean;
    pageId?: string | null;
    sourcePath?: string | null;
    componentPath?: string | null;
    used?: { id: string; title: string; exportName?: string }[];
    unknown?: string[];
    messages: ChatMessage[];
    steps?: Array<{ content: string; adds?: string[]; removes?: string[]; at?: string }>;
  };
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const [synSuggestions, setSynSuggestions] = useState<Record<string, Array<{ id: string; title: string; exportName?: string; confidence?: number; reason?: string }>>>({});
  const [synChosen, setSynChosen] = useState<Record<string, { id: string; title: string; exportName?: string }>>({});
  const [allComponents, setAllComponents] = useState<Array<{ id: string; title: string; exportName?: string }>>([]);
  const [mentionOpen, setMentionOpen] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [snapshots, setSnapshots] = useState<any[]>([]);
  const pageSubscriptionsRef = useRef<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileLast, setProfileLast] = useState("");
  const [profileEmail, setProfileEmail] = useState("");

  const previewUrl = useMemo(() => {
    if (!sourcePath) return null;
    if (sourcePath.startsWith("src/app/")) return "/" + sourcePath.replace("src/app/", "").replace(/\/page\.tsx$/, "");
    return null;
  }, [sourcePath]);

  useEffect(() => {
    if (session?.user?.id) {
      loadChatsFromSupabase(session.user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  // Avoid login flicker: resolve session at page-level before deciding what to show
  useEffect(() => {
    if (!supabaseConfigured) return;
    const supabase = getBrowserSupabase();
    if (!supabase) { setAuthChecked(true); return; }
    let unsub: (() => void) | null = null;
    supabase.auth.getSession().then(({ data }: any) => {
      if (data?.session) setSession(data.session);
      if (data?.session?.user) {
        setProfileEmail(data.session.user.email || "");
        setProfileName((data.session.user.user_metadata?.name as string) || "");
        setProfileLast((data.session.user.user_metadata?.last_name as string) || "");
      }
      setAuthChecked(true);
    });
    const sub = supabase.auth.onAuthStateChange((_e: any, s: any) => {
      setSession(s || null);
      if (s?.user) {
        setProfileEmail(s.user.email || "");
        setProfileName((s.user.user_metadata?.name as string) || "");
        setProfileLast((s.user.user_metadata?.last_name as string) || "");
      } else {
        setProfileEmail("");
        setProfileName("");
        setProfileLast("");
      }
    });
    unsub = () => sub.data.subscription.unsubscribe();
    return () => { if (unsub) unsub(); };
  }, [supabaseConfigured]);

  // Load full component list for mentions
  useEffect(() => {
    fetch('/api/builder/list').then(r => r.json()).then(j => {
      setAllComponents((j.components || []).map((c: any) => ({ id: c.id, title: c.title, exportName: c.exportName })));
    }).catch(() => {});
  }, []);

  // persist UI state locally so it survives refreshes
  useEffect(() => {
    if (activeChatId) localStorage.setItem("builder.activeChatId", activeChatId);
  }, [activeChatId]);
  useEffect(() => {
    localStorage.setItem("builder.rightTab", rightTab);
    localStorage.setItem("builder.leftTab", leftTab);
  }, [rightTab, leftTab]);

  useEffect(() => {
    const rt = (localStorage.getItem("builder.rightTab") as any) || "preview";
    const lt = (localStorage.getItem("builder.leftTab") as any) || "chat";
    setRightTab(rt);
    setLeftTab(lt);
  }, []);

  const restored = useRef(false);
  useEffect(() => {
    if (restored.current) return;
    if (!chats.length) return;
    const storedId = localStorage.getItem("builder.activeChatId");
    const found = storedId ? chats.find(c => c.id === storedId) : undefined;
    if (found) activateChat(found);
    else activateChat(chats[0]);
    restored.current = true;
  }, [chats]);

  // Bootstrap a first chat if none exists (works with or without Supabase)
  const bootstrapped = useRef(false);
  useEffect(() => {
    if (bootstrapped.current) return;
    if (chats.length === 0 && !activeChatId) {
      const id = String(Date.now());
      const fallback = `Untitled ${nextUntitledNumber(chats)}`;
      const chat: ChatSession = { id, title: fallback, pageName: fallback, messages: [] };
      setChats([chat]);
      setActiveChatId(id);
      setPageName(fallback);
      setLeftTab("chat");
      const supabase = getBrowserSupabase();
      if (supabase && session) {
        (async () => { try { await supabase.from('builder_chats').insert({ id, user_id: session.user.id, title: fallback, page_name: fallback, messages: [] }); } catch {} })();
      }
      bootstrapped.current = true;
    }
  }, [chats.length, activeChatId, session]);

  function nextUntitledNumber(list: ChatSession[]): number {
    let max = 0;
    list.forEach(c => {
      const m = /(Untitled)\s*(\d+)/i.exec(c.title || "");
      if (m) {
        const n = parseInt(m[2], 10);
        if (!Number.isNaN(n)) max = Math.max(max, n);
      }
    });
    return max + 1;
  }

  async function activateChat(c: ChatSession) {
    setActiveChatId(c.id);
    setPageName(c.pageName || "");
    setMessages(c.messages || []);
    setSourcePath(c.sourcePath || null);
    setComponentPath(c.componentPath || null);
    setUsed(c.used || []);
    setUnknown(c.unknown || []);
    const supabase = getBrowserSupabase();
    const pageId = c.pageId || c.id;
    if (supabase) {
      try {
        // load code
        const { data: codeRow } = await supabase.from('page_code').select('*').eq('page_id', pageId).maybeSingle();
        if (codeRow?.source) setCode(cleanCode(codeRow.source));
        // load components
        const { data: compRows } = await supabase.from('page_components').select('*').eq('page_id', pageId);
        if (Array.isArray(compRows) && compRows.length) {
          setUsed(compRows.map((r: any) => ({ id: r.component_id || r.title, title: r.title, exportName: r.export_name })));
        }
        // load instructions
        const { data: instr } = await supabase.from('page_instructions').select('*').eq('page_id', pageId).maybeSingle();
        if (instr?.steps) {
          setChats(prev => prev.map(x => x.id === c.id ? ({ ...x, steps: instr.steps }) : x));
        }
        // load snapshots
        const { data: snapRows } = await supabase.from('page_snapshots').select('*').eq('page_id', pageId).order('created_at', { ascending: false });
        setSnapshots(snapRows || []);
      } catch {}
    } else if (c.componentPath) {
      fetch(`/api/builder/file?path=${encodeURIComponent(c.componentPath)}`).then(r => r.json()).then(j => setCode(j.code || "")).catch(() => {});
    }
    subscribeToPageRealtime(pageId);
  }

  function subscribeToPageRealtime(pageId: string) {
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    if (pageSubscriptionsRef.current) {
      try { supabase.removeChannel(pageSubscriptionsRef.current); } catch {}
      pageSubscriptionsRef.current = null;
    }
    const channel = supabase.channel(`page-${pageId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'page_code', filter: `page_id=eq.${pageId}` }, (payload: any) => {
        const row = payload.new || payload.old;
        if (row?.source) setCode(cleanCode(row.source));
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'page_components', filter: `page_id=eq.${pageId}` }, async (_payload: any) => {
        try {
          const { data } = await supabase.from('page_components').select('*').eq('page_id', pageId);
          if (Array.isArray(data)) setUsed(data.map((r: any) => ({ id: r.component_id || r.title, title: r.title, exportName: r.export_name })));
        } catch {}
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'page_snapshots', filter: `page_id=eq.${pageId}` }, async (_payload: any) => {
        try {
          const { data } = await supabase.from('page_snapshots').select('*').eq('page_id', pageId).order('created_at', { ascending: false });
          setSnapshots(data || []);
        } catch {}
      })
      .subscribe();
    pageSubscriptionsRef.current = channel;
  }

  async function generate() {
    setStatus("Generating...");
    setUnknown([]);
    const seedIncludes = Array.from(new Set((used || []).map((u: any) => (u.exportName || (u.title?.split('/')?.pop() || u.title))).filter(Boolean)));
    const currentChat = activeChatId ? chats.find(c => c.id === activeChatId) : null;
    const lastStep = currentChat?.steps?.[currentChat.steps.length - 1];
    const removeNames = Array.from(new Set((lastStep?.removes || []).map(s => s))).filter(Boolean);
    const res = await fetch("/api/builder/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, pageName, target, seedIncludes, removeNames })
    });
    let json: any = null;
    try { json = await res.json(); } catch (e) {
      setStatus("Failed to parse response");
      return;
    }
    if (!res.ok || !("ok" in json) || !json.ok) {
      setStatus("No matching components. Update prompt or include explicit components.");
      setUnknown((json as any).unknownIntents || []);
      return;
    }
    setSourcePath(json.path);
    setComponentPath(json.componentPath || null);
    setUsed(json.used || []);
    setUnknown(json.unknownIntents || []);
    // store into active chat
    if (activeChatId) {
      setChats(prev => prev.map(c => c.id === activeChatId ? ({
        ...c,
        pageName,
        title: pageName || c.title,
        sourcePath: json.path,
        componentPath: json.componentPath || null,
        used: json.used || [],
        unknown: json.unknownIntents || [],
        messages: [ ...(c.messages || []), { role: 'assistant', content: summarizeGeneration(json.used || [], json.path, json.componentPath), meta: { kind: 'generated', snapshot: { pageName, sourcePath: json.path, componentPath: json.componentPath || null, used: json.used || [], code } } } ]
      }) : c));
    }
    // Persist page/meta/components/code in Supabase (normalized)
    await persistPageState({ name: pageName, sourcePath: json.path, componentPath: json.componentPath || null, used: json.used || [], code });
    if (json.componentPath) {
      const fr = await fetch(`/api/builder/file?path=${encodeURIComponent(json.componentPath)}`);
      const fj = await fr.json();
      let nextCode = fj.code || '';
      // cleanup if last step requested removals
      if (removeNames?.length) nextCode = removeComponentsFromCode(nextCode, removeNames);
      setCode(cleanCode(nextCode));
    }
    await saveSnapshot({ source: code, used: json.used || [], note: 'after-generate' });
    setPreviewVersion(Date.now());
    await persistActiveChat();
    await persistInstructions();
    // duplicate warnings
    const names = (json.used || []).map((u: any) => u.exportName || (u.title?.split('/')?.pop() || u.title)).filter(Boolean);
    const dup: Record<string, number> = {} as any;
    names.forEach((n: string) => { dup[n] = (dup[n] || 0) + 1; });
    const dups = Object.entries(dup).filter(([, c]) => c > 1).map(([n]) => n);
    if (dups.length) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Warning: duplicate components detected: ${dups.join(', ')}`, meta: { kind: 'info' } }]);
    }
  }

  function summarizeGeneration(usedList: any[], path: string, componentPath?: string | null): string {
    const names = (usedList || []).map((u: any) => u.exportName || (u.title?.split('/')?.pop() || u.title)).filter(Boolean);
    const list = names.slice(0, 4).join(", ");
    const more = names.length > 4 ? ` +${names.length - 4} more` : '';
    const route = path?.startsWith('src/app/') ? ('/' + path.replace('src/app/', '').replace(/\/page\.tsx$/, '')) : '';
    return `Generated ${names.length} component(s): ${list}${more}. ${route ? `Route: ${route}. ` : ''}${componentPath ? `Code: ${componentPath}.` : ''}`.trim();
  }

  function restoreFromMessage(index: number) {
    const msg = messages[index];
    const snap = msg?.meta?.snapshot;
    if (!snap) return;
    setPageName(snap.pageName || "");
    setSourcePath(snap.sourcePath || null);
    setComponentPath(snap.componentPath || null);
    setUsed(snap.used || []);
    if (typeof snap.code === 'string') setCode(snap.code);
    // announce restore
    setMessages(prev => [...prev, { role: 'assistant', content: `Restored to step #${index + 1}`, meta: { kind: 'restored', refIndex: index } }]);
    // scroll into view of restored message target
    requestAnimationFrame(() => {
      const el = document.getElementById(`msg-${index}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Basic formatting & cleanup utilities
  function cleanCode(src: string): string {
    let s = (src || '').replace(/\r\n/g, '\n');
    s = s.replace(/[ \t]+$/gm, '');
    s = s.replace(/\n{3,}/g, '\n\n');
    s = s.replace(/>\n\n</g, '>\n<');
    if (!s.endsWith('\n')) s += '\n';
    return s;
  }
  function removeComponentsFromCode(src: string, names: string[]): string {
    if (!names?.length) return src;
    let s = src;
    names.forEach((n) => {
      const name = n.trim();
      if (!name) return;
      // remove self-closing tags <Name />
      s = s.replace(new RegExp(`<${name}(\n|[^>])*?/>`, 'g'), '');
      // remove paired tags <Name>...</Name>
      s = s.replace(new RegExp(`<${name}(\n|[^>]*)>([\s\S]*?)</${name}>`, 'g'), '');
      // remove import specifier from curly imports
      s = s.replace(new RegExp(`import\\s*\\{([^}]*?)\\}\\s*from\\s*['\"][^'\"]+['\"];?`, 'g'), (m) => {
        // remove the specific specifier
        const updated = m.replace(new RegExp(`\\b${name}\\b\\s*,?|,\\s*\\b${name}\\b`, 'g'), '').replace(/\\{\\s*,\\s*\\}/, '{}');
        // if now empty braces, drop entire import
        if (/\{\s*\}/.test(updated)) return '';
        return updated;
      });
    });
    return cleanCode(s);
  }

  async function promote() {
    if (!sourcePath) return;
    // Validate before promoting
    setStatus("Validating...");
    if (code) {
      const vr = await fetch("/api/builder/validate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }) });
      const vj = await vr.json();
      if (!vj.ok) {
        setStatus("Validation failed.");
        return;
      }
    }
    setStatus("Promoting...");
    const res = await fetch("/api/builder/promote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: sourcePath, targetSlug: pageName })
    });
    const json = await res.json();
    if (res.ok) {
      setSourcePath(json.path);
      setStatus("Promoted to /app.");
    } else {
      setStatus("Promotion failed.");
    }
    await persistActiveChat();
    await persistPageState({ name: pageName, sourcePath, componentPath, used, code });
  }

  // --- Supabase-backed chat persistence ---
  async function loadChatsFromSupabase(userId: string) {
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from('builder_chats')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });
      if (!error && Array.isArray(data)) {
        const mapped = data.map((r: any) => ({
          id: r.id,
          title: r.title || 'Untitled',
          pageName: r.page_name || '',
          published: !!r.published,
          sourcePath: r.source_path || null,
          componentPath: r.component_path || null,
          used: r.used || [],
          unknown: r.unknown || [],
          messages: r.messages || [],
        })) as ChatSession[];
        setChats(mapped);
        if (mapped.length === 0) {
          // auto-create first chat in Supabase for this user
          const id = String(Date.now());
          const fallback = `Untitled 1`;
          const chat: ChatSession = { id, title: fallback, pageName: fallback, messages: [] };
          setChats([chat]);
          setActiveChatId(id);
          setPageName(fallback);
          setLeftTab("chat");
          try { await supabase.from('builder_chats').insert({ id, user_id: userId, title: fallback, page_name: fallback, messages: [] }); } catch {}
        }
      }
    } catch {
      // ignore if table is missing
    }
  }

  async function persistActiveChat() {
    const supabase = getBrowserSupabase();
    if (!supabase || !session || !activeChatId) return;
    const chat = chats.find(c => c.id === activeChatId);
    if (!chat) return;
    try {
      await supabase.from('builder_chats').upsert({
        id: chat.id,
        user_id: session.user.id,
        title: chat.title,
        page_name: chat.pageName || '',
        published: !!chat.published,
        source_path: chat.sourcePath || null,
        component_path: chat.componentPath || null,
        used: chat.used || [],
        unknown: chat.unknown || [],
        messages: chat.messages || [],
        updated_at: new Date().toISOString(),
      });
    } catch {
      // ignore
    }
  }

  function extractAddsFromContent(text: string): string[] {
    const tokens = new Set<string>();
    const re = /@(\w+)/g; let m: RegExpExecArray | null;
    while ((m = re.exec(text))) tokens.add(m[1]);
    return Array.from(tokens);
  }

  async function persistInstructions() {
    const supabase = getBrowserSupabase();
    if (!supabase || !session || !activeChatId) return;
    const chat = chats.find(c => c.id === activeChatId);
    if (!chat) return;
    const pageId = chat.pageId || chat.id;
    const steps = chat.steps || [];
    try {
      await supabase.from('page_instructions').upsert({ page_id: pageId, steps, updated_at: new Date().toISOString() });
    } catch {}
  }

  async function ensurePageForActiveChat(): Promise<string | null> {
    const supabase = getBrowserSupabase();
    if (!supabase || !session || !activeChatId) return null;
    const chat = chats.find(c => c.id === activeChatId);
    if (!chat) return null;
    const pageId = chat.pageId || chat.id; // reuse chat id as page id
    try {
      await supabase.from('pages').upsert({
        id: pageId,
        user_id: session.user.id,
        name: chat.pageName || chat.title,
        preview_path: chat.sourcePath || null,
        component_path: chat.componentPath || null,
        updated_at: new Date().toISOString(),
      });
      if (!chat.pageId) setChats(prev => prev.map(c => c.id === chat.id ? ({ ...c, pageId }) : c));
      return pageId;
    } catch {
      return null;
    }
  }

  async function persistPageState(params: { name: string; sourcePath: string | null; componentPath: string | null; used: any[]; code: string }) {
    const supabase = getBrowserSupabase();
    if (!supabase || !session || !activeChatId) return;
    const pageId = await ensurePageForActiveChat();
    if (!pageId) return;
    try {
      await supabase.from('pages').update({
        name: params.name,
        preview_path: params.sourcePath,
        component_path: params.componentPath,
        updated_at: new Date().toISOString(),
      }).eq('id', pageId).eq('user_id', session.user.id);
    } catch {}
    try {
      // Replace components for this page
      await supabase.from('page_components').delete().eq('page_id', pageId);
      if (Array.isArray(params.used) && params.used.length) {
        await supabase.from('page_components').insert(params.used.map((u: any) => ({
          page_id: pageId,
          component_id: u.id,
          title: u.title,
          export_name: u.exportName || null,
          import_path: u.importPath || null,
          storybook_url: u.storybookUrl || null,
        })));
      }
    } catch {}
    try {
      if (params.componentPath || params.code) {
        await supabase.from('page_code').upsert({
          page_id: pageId,
          file_path: params.componentPath,
          source: cleanCode(params.code),
          updated_at: new Date().toISOString(),
        }, { onConflict: 'page_id' });
      }
    } catch {}
    try {
      await saveSnapshot({ source: cleanCode(params.code), used: params.used, note: 'persist' });
    } catch {}
  }

  async function removeChat(id: string) {
    setChats(prev => prev.filter(c => c.id !== id));
    if (activeChatId === id) {
      setActiveChatId(null);
      setMessages([]);
      setSourcePath(null);
      setComponentPath(null);
      setUsed([]);
      setUnknown([]);
    }
    const supabase = getBrowserSupabase();
    if (supabase && session) {
      try { await supabase.from('builder_chats').delete().eq('id', id).eq('user_id', session.user.id); } catch {}
    }
  }

  function extractRemovesFromContent(text: string): string[] {
    const out = new Set<string>();
    const re = /(remove|delete)\s+([A-Za-z][A-Za-z0-9_]*)/gi; let m: RegExpExecArray | null;
    while ((m = re.exec(text))) out.add(m[2]);
    return Array.from(out);
  }

  async function saveSnapshot({ source, used, note }: { source: string; used: any[]; note?: string }) {
    const supabase = getBrowserSupabase();
    if (!supabase || !session || !activeChatId) return;
    const chat = chats.find(c => c.id === activeChatId);
    if (!chat) return;
    const pageId = chat.pageId || chat.id;
    const id = `${Date.now()}`;
    try {
      await supabase.from('page_snapshots').insert({
        id,
        page_id: pageId,
        source: cleanCode(source),
        used,
        note: note || null,
        created_at: new Date().toISOString(),
      });
      setSnapshots(prev => [{ id, page_id: pageId, source: cleanCode(source), used, note: note || null, created_at: new Date().toISOString() }, ...prev]);
    } catch {}
  }

  async function restoreSnapshot(snap: any) {
    setCode(cleanCode(snap?.source || ""));
    setUsed(Array.isArray(snap?.used) ? snap.used : []);
    await persistPageState({ name: pageName, sourcePath: sourcePath, componentPath: componentPath, used: Array.isArray(snap?.used) ? snap.used : [], code: snap?.source || "" });
    setMessages(prev => [...prev, { role: 'assistant', content: 'Restored snapshot', meta: { kind: 'restored' } }]);
    setRightTab('code');
  }

  async function rebuildToStep(stepIndex: number) {
    const chat = activeChatId ? chats.find(c => c.id === activeChatId) : null;
    if (!chat) return;
    const steps = chat.steps || [];
    const upto = steps.slice(0, stepIndex + 1);
    const adds = Array.from(new Set(upto.flatMap(s => s.adds || [])));
    const removes = Array.from(new Set(upto.flatMap(s => s.removes || [])));
    setStatus('Rebuilding...');
    try {
      const res = await fetch('/api/builder/generate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt: '', pageName, target, seedIncludes: adds, removeNames: removes }) });
      const j = await res.json();
      if (res.ok && j?.ok) {
        setSourcePath(j.path);
        setComponentPath(j.componentPath || null);
        setUsed(j.used || []);
        if (j.componentPath) {
          const fr = await fetch(`/api/builder/file?path=${encodeURIComponent(j.componentPath)}`);
          const fj = await fr.json();
          setCode(cleanCode(fj.code || ""));
        }
        await persistPageState({ name: pageName, sourcePath: j.path, componentPath: j.componentPath || null, used: j.used || [], code });
        setMessages(prev => [...prev, { role: 'assistant', content: `Rebuilt to step #${stepIndex + 1}`, meta: { kind: 'restored' } }]);
        setRightTab('code');
      } else {
        setStatus('Rebuild failed');
      }
    } catch {
      setStatus('Rebuild failed');
    }
  }

  return (
    <>
    <ResizablePanelGroup direction="horizontal" className="h-screen">
      {/* Auth gate (skipped if no Supabase env configured) */}
      {(!authChecked && supabaseConfigured) ? null : (!session && supabaseConfigured ? (
        <div className="w-full h-full grid place-items-center p-8">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              <AuthForm onAuthenticated={(s) => setSession(s)} />
            </CardContent>
          </Card>
        </div>
      ) : null)}
      {(authChecked && (session || !supabaseConfigured)) ? (
      <>
      {/* Left: Chat / History */}
      <ResizablePanel defaultSize={40} minSize={28} className="p-4">
        <Tabs value={leftTab} onValueChange={(v) => setLeftTab(v as any)} className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <TabsList>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <Button variant="secondary" onClick={() => {
                  const id = String(Date.now());
                  const fallback = `Untitled ${nextUntitledNumber(chats)}`;
                  const chat: ChatSession = { id, title: fallback, pageName: fallback, messages: [] };
                  setChats([chat, ...chats]);
                  setActiveChatId(id);
                  setMessages([]);
                  setPageName(fallback);
                  setSourcePath(null);
                  setComponentPath(null);
                  setUsed([]);
                  setUnknown([]);
                  setLeftTab("chat");
                  (async () => {
                    const supabase = getBrowserSupabase();
                    if (supabase && session) {
                      try { await supabase.from('builder_chats').insert({ id, user_id: session.user.id, title: chat.title, messages: [] }); } catch {}
                    }
                  })();
                }}>New Chat</Button>
          </div>
          <Card className="h-full flex flex-col">
            <CardContent className="flex-1 min-h-0 grid gap-3 md:grid-cols-[1fr,240px]">
              {!supabaseConfigured ? (
                <Alert>
                  <AlertTitle>Auth disabled</AlertTitle>
                  <AlertDescription>
                    Supabase credentials are not configured. This page is accessible without sign-in.
                    To enable auth, add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and restart.
                  </AlertDescription>
                </Alert>
              ) : null}
              <TabsContent value="chat" className="grid gap-3 flex-1 min-h-0">
                <div className="flex-1 min-h-0 flex flex-col gap-2">
                  {/* conversation */}
                  <div ref={messagesRef} className="flex-1 overflow-auto rounded border p-3 space-y-2 bg-card">
                    {messages.map((m, idx) => {
                      const isAssistant = m.role === 'assistant';
                      const showRestore = isAssistant && !!m.meta?.snapshot && idx < messages.length - 1;
                      const restored = m.meta?.kind === 'restored';
                      return (
                        <div key={idx} id={`msg-${idx}`} className={`${m.role === 'user' ? 'justify-end' : 'justify-start'} flex`}> 
                          <div className={`${m.role === 'user' ? 'bg-primary text-primary-foreground' : restored ? 'bg-yellow-100 text-yellow-900 dark:bg-yellow-900/30 dark:text-yellow-200' : 'bg-muted'} rounded px-3 py-2 max-w-[80%] whitespace-pre-wrap`}>
                            {m.content}
                            {showRestore ? (
                              <div className="mt-1 text-xs text-muted-foreground flex items-center gap-2">
                                <button className="inline-flex items-center gap-1 hover:underline" onClick={() => restoreFromMessage(idx)} title="Restore to this step">
                                  <RotateCcw className="w-3 h-3" /> Restore
                                </button>
                              </div>
                            ) : null}
                            {restored && typeof m.meta?.refIndex === 'number' ? (
                              <div className="mt-1 text-xs">
                                <button className="underline" onClick={() => {
                                  const el = document.getElementById(`msg-${m.meta!.refIndex}`);
                                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                }}>View restored message</button>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      );
                    })}
                    {!messages.length ? <div className="text-xs text-muted-foreground">No messages yet. Describe your page to get started.</div> : null}
                  </div>
                  {/* suggestions block moved above input */}
                  {unknown.length ? (
                    <div className="text-xs space-y-3">
                      <div className="text-amber-600">Unknown intents: {unknown.join(", ")}</div>
                      {!Object.keys(synSuggestions).length ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={async () => {
                            const r = await fetch('/api/builder/synonyms/suggest', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ terms: unknown }) });
                            const j = await r.json();
                            if (j?.suggestions) setSynSuggestions(j.suggestions);
                          }}
                        >Get suggestions</Button>
                      ) : null}
                      {Object.keys(synSuggestions).length ? (
                        <div className="grid gap-3">
                          {unknown.map(term => (
                            <div key={term} className="grid gap-1">
                              <div className="font-medium">{term}</div>
                              <div className="flex flex-wrap gap-2">
                                {(synSuggestions[term] || []).map((c: any) => {
                                  const selected = synChosen[term]?.id === c.id;
                                  return (
                                    <Button key={c.id} variant={selected ? 'default' : 'outline'} size="sm" onClick={() => setSynChosen({ ...synChosen, [term]: c })}>
                                      {(c.exportName || c.title)}{typeof c.confidence === 'number' ? ` (${c.confidence})` : ''}
                                    </Button>
                                  );
                                })}
                                {!(synSuggestions[term] || []).length ? (
                                  <div className="text-muted-foreground">No candidates.</div>
                                ) : null}
                              </div>
                            </div>
                          ))}
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={async () => {
                                const includes: string[] = [];
                                unknown.forEach(t => { const c = synChosen[t]; if (c?.exportName) includes.push(c.exportName); });
                                if (includes.length) {
                                  setPrompt(prev => (prev ? prev + '\n' : '') + 'Include: ' + includes.join(', '));
                                  await generate();
                                }
                              }}
                            >Apply</Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={async () => {
                                for (const t of unknown) {
                                  const c = synChosen[t];
                                  if (c?.id) {
                                    await fetch('/api/builder/synonyms/save', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ term: t, componentId: c.id }) });
                                  }
                                }
                                const includes: string[] = [];
                                unknown.forEach(t => { const c = synChosen[t]; if (c?.exportName) includes.push(c.exportName); });
                                if (includes.length) {
                                  setPrompt(prev => (prev ? prev + '\n' : '') + 'Include: ' + includes.join(', '));
                                  await generate();
                                }
                              }}
                            >Apply and remember</Button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="sticky bottom-0 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t pt-2">
                    <div className="relative">
                    <Textarea
                      rows={4}
                      placeholder="Describe or refine the page... Use @ to mention components"
                      value={prompt}
                      onChange={(e) => {
                        const v = e.target.value;
                        setPrompt(v);
                        const m = /(^|\s)@(\w*)$/.exec(v.split("\n").pop() || "");
                        if (m) {
                          setMentionOpen(true);
                          setMentionQuery(m[2] || "");
                        } else {
                          setMentionOpen(false);
                          setMentionQuery("");
                        }
                      }}
                    />
                    {mentionOpen ? (
                      <div className="absolute bottom-12 left-0 z-10 w-[420px] max-h-64 overflow-auto rounded border bg-popover text-popover-foreground shadow">
                        <div className="p-2 text-xs text-muted-foreground">Components</div>
                        <ul>
                          {allComponents.filter(c => {
                            const q = mentionQuery.toLowerCase();
                            return !q || (c.exportName || '').toLowerCase().includes(q) || (c.title || '').toLowerCase().includes(q);
                          }).slice(0, 20).map(c => (
                            <li key={c.id}>
                              <button
                                className="w-full text-left px-3 py-1.5 hover:bg-muted"
                                onClick={() => {
                                  // replace trailing @query with exact exportName or leaf title
                                  const token = c.exportName || (c.title.split('/').pop() || '').replace(/\s+/g, '');
                                  setPrompt(prev => prev.replace(/(^|[\s\S]*?)@(\w*)$/m, (_m, pre) => `${pre}${token}`));
                                  setMentionOpen(false);
                                  setMentionQuery("");
                                }}
                              >
                                <div className="text-sm">{c.exportName || c.title}</div>
                                <div className="text-xs text-muted-foreground truncate">{c.title}</div>
                              </button>
                            </li>
                          ))}
                          {!allComponents.length ? <li className="px-3 py-2 text-xs text-muted-foreground">Loading…</li> : null}
                        </ul>
                      </div>
                    ) : null}
                    </div>
                    <div className="flex gap-2 pt-2">
                    <Button onClick={async () => {
                      if (!activeChatId) {
                        const id = String(Date.now());
                        const fallback = `Untitled ${chats.length + 1}`;
                        const effectiveTitle = pageName || fallback;
                        const chat: ChatSession = { id, title: effectiveTitle, pageName: effectiveTitle, messages: [] };
                        setChats([chat, ...chats]);
                        setActiveChatId(id);
                        setPageName(effectiveTitle);
                      }
                      const content = prompt.trim();
                      if (!content) return;
                      setMessages(prev => [...prev, { role: 'user', content }]);
                      if (activeChatId) {
                        const adds = extractAddsFromContent(content);
                        const removes = extractRemovesFromContent(content);
                        setChats(prev => prev.map(c => c.id === activeChatId ? ({ ...c, messages: [...c.messages, { role: 'user', content }], steps: [...(c.steps||[]), { content, adds, removes, at: new Date().toISOString() }] }) : c));
                      }
                      await persistActiveChat();
                      await persistInstructions();
                      generate();
                      setPrompt("");
                    }}>Send</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <div className="hidden md:flex flex-col border-l pl-3">
                <div className="text-xs text-muted-foreground mb-1">Steps timeline</div>
                <div className="flex-1 overflow-auto space-y-1">
                  {(chats.find(c => c.id === activeChatId)?.steps || []).map((s, i) => (
                    <button key={i} className="w-full text-left text-xs rounded px-2 py-1 hover:bg-muted" onClick={() => rebuildToStep(i)}>
                      <div className="truncate">{s.content}</div>
                      <div className="text-[10px] text-muted-foreground">{new Date(s.at || Date.now()).toLocaleTimeString()}</div>
                    </button>
                  ))}
                  {!((chats.find(c => c.id === activeChatId)?.steps || []).length) ? (
                    <div className="text-xs text-muted-foreground">No steps yet.</div>
                  ) : null}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2"></CardFooter>
          </Card>
        </Tabs>
        {/* Used Components moved to right panel tab */}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60} minSize={40} className="p-4">
        <Tabs value={rightTab} onValueChange={(v) => setRightTab(v as any)} className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="w-1/3 pr-2">
              <Input placeholder="Page name" value={pageName} onChange={(e) => {
                const v = e.target.value;
                setPageName(v);
                if (activeChatId) {
                  setChats(prev => prev.map(c => c.id === activeChatId ? ({ ...c, title: v || c.title, pageName: v }) : c));
                }
              }} />
              {previewUrl ? <div className="text-xs text-muted-foreground mt-1 truncate" title={previewUrl}>{previewUrl}</div> : null}
            </div>
            <div className="w-1/3 flex justify-center">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="used">Used Components</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </div>
            <div className="w-1/3 pl-2 flex items-center justify-end gap-2">
              <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border bg-background">
                <Database className="w-3 h-3" />
                <span>design</span>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  if (!activeChatId) return;
                  setStatus('Cloning...');
                  try {
                    const res = await fetch('/api/builder/clone', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pageId: activeChatId, newName: `${pageName || 'Page'} Copy` }) });
                    const j = await res.json();
                    if (res.ok && j?.ok) {
                      setStatus(`Cloned: ${j.name}`);
                    } else {
                      setStatus(j?.error || 'Clone failed');
                    }
                  } catch (e: any) {
                    setStatus(e?.message || 'Clone failed');
                  }
                }}
              >Clone</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="inline-flex items-center justify-center w-7 h-7 rounded-full border bg-background">
                    <Avatar className="w-6 h-6" data-initial={`${(profileName||'').charAt(0)}`.toUpperCase()}>
                      <AvatarFallback>
                        {profileName || profileLast ? `${(profileName||'').charAt(0)}${(profileLast||'').charAt(0)}`.toUpperCase() : (
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
                            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7h2c0-2.761 2.239-5 5-5s5 2.239 5 5h2c0-3.866-3.134-7-7-7z"/>
                          </svg>
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setProfileOpen(true)}>User Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={async () => {
                    const supabase = getBrowserSupabase();
                    try { await supabase?.auth.signOut(); window.location.reload(); } catch {}
                  }}>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Rules dropdown removed to avoid server-only imports in client */}
              <Button
                variant="outline"
                size="icon"
                onClick={async () => {
                  setStatus("Reseeding mock data...");
                  try {
                    const r = await fetch('/api/mock/reseed', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tenant: 'design' }) });
                    const j = await r.json();
                    if (!r.ok || !j?.ok) throw new Error(j?.error || 'Reseed failed');
                    setStatus(`Reseeded tenant: ${j.tenant}`);
                    setPreviewVersion(Date.now());
                  } catch (e: any) {
                    setStatus(e?.message || 'Reseed failed');
                  }
                }}
                title="Reload tenant data"
                aria-label="Reload tenant data"
              >
                <RefreshCw className="w-3 h-3" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">Publish</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTarget('playground')}>Publish to Playground</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTarget('app')}>Publish to App</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <TabsContent value="preview" className="flex-1 min-h-0">
            <div className="h-full">
                {previewUrl ? (
                  <iframe className="w-full h-[calc(100vh-160px)] rounded border" src={`${previewUrl}?v=${previewVersion}`} />
                ) : (
                  <div className="text-sm text-muted-foreground">Generate a page to preview it here.</div>
                )}
            </div>
          </TabsContent>
          <TabsContent value="used" className="flex-1 min-h-0">
            <Card className="h-full">
              <CardContent className="h-full overflow-auto">
                {used.length ? (
                  <div className="text-sm grid gap-2">
                    {used.map((u: any) => (
                      <div key={u.id} className="grid grid-cols-[1fr,1fr,auto] items-center gap-2 border-b pb-2 last:border-b-0">
                        <div className="font-medium truncate">{u.exportName || u.title}</div>
                        <div className="text-xs text-muted-foreground truncate">{u.importPath || u.title}</div>
                        <div className="text-xs text-right">{u.storybookUrl ? <a className="underline text-muted-foreground" href={u.storybookUrl} target="_blank" rel="noreferrer">Storybook</a> : null}</div>
                      </div>
                    ))}
                    <div className="pt-2 border-t mt-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground"><History className="w-3 h-3" /> Version history</div>
                      <div className="max-h-40 overflow-auto mt-1 grid gap-1">
                        {snapshots.map((s: any, i) => (
                          <div key={s.id} className="flex items-center justify-between text-xs">
                            <span className="truncate">{new Date(s.created_at).toLocaleString()}</span>
                            <div className="flex items-center gap-2">
                              <button className="underline" onClick={() => restoreSnapshot(s)}>Restore</button>
                            </div>
                          </div>
                        ))}
                        {!snapshots.length ? <div className="text-xs text-muted-foreground">No snapshots yet.</div> : null}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">No components yet. Generate to populate.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="code" className="flex-1 min-h-0">
            <div className="h-[calc(100vh-160px)] grid grid-rows-[1fr_auto] gap-2">
                {/* top path label removed; CodeViewer already shows it */}
                <div className="min-h-0">
                  {!isEditingCode ? (
                    <CodeViewer code={code} language="tsx" filePath={componentPath || undefined} fullHeight className="h-full" />
                  ) : (
                    <Textarea className="h-full" rows={20} value={code} onChange={(e) => setCode(e.target.value)} />
                  )}
                </div>
                <div className="flex gap-2 justify-start">
                  <Button variant="outline" onClick={() => setIsEditingCode(v => !v)}>{isEditingCode ? 'View' : 'Edit'}</Button>
                  <Button
                    disabled={!componentPath}
                    onClick={async () => {
                      if (!componentPath) return;
                      setStatus("Saving...");
                      const r = await fetch("/api/builder/file", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path: componentPath, code }) });
                      if (r.ok) setStatus("Saved."); else setStatus("Save failed.");
                    }}
                  >Save</Button>
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      </>
      ) : null}
    </ResizablePanelGroup>
    <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-3 pb-2">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            <div className="grid gap-1">
              <label className="text-xs text-muted-foreground">Name</label>
              <Input value={profileName} onChange={(e) => setProfileName(e.target.value)} />
            </div>
            <div className="grid gap-1">
              <label className="text-xs text-muted-foreground">Last Name</label>
              <Input value={profileLast} onChange={(e) => setProfileLast(e.target.value)} />
            </div>
          </div>
          <div className="grid gap-1">
            <label className="text-xs text-muted-foreground">Email</label>
            <Input value={profileEmail} readOnly disabled />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={async () => {
            const supabase = getBrowserSupabase();
            try {
              await supabase?.auth.updateUser({ data: { name: profileName, last_name: profileLast } });
              setProfileOpen(false);
              setStatus('Profile updated');
            } catch (e: any) {
              setStatus(e?.message || 'Update failed');
            }
          }}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}

function AuthForm({ onAuthenticated }: { onAuthenticated: (s: any) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  useEffect(() => {
    const supabase = getBrowserSupabase();
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }: any) => {
      if (data.session) onAuthenticated(data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e: any, s: any) => {
      if (s) onAuthenticated(s);
    });
    return () => { sub.subscription.unsubscribe(); };
  }, [onAuthenticated]);
  return (
    <div className="grid gap-3">
      <div className="grid gap-2">
        <label className="text-sm">Email</label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="grid gap-2">
        <label className="text-sm">Password</label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {status ? <div className="text-xs text-muted-foreground">{status}</div> : null}
      <div className="flex gap-2">
        <Button onClick={async () => {
          setStatus("Signing in...");
          const supabase = getBrowserSupabase();
          if (!supabase) { setStatus("Auth not configured"); return; }
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) setStatus(error.message); else { setStatus("Signed in."); if (data.session) onAuthenticated(data.session); }
        }}>Sign in</Button>
        <Button variant="secondary" onClick={async () => {
          setStatus("Creating account...");
          const supabase = getBrowserSupabase();
          if (!supabase) { setStatus("Auth not configured"); return; }
          const { error } = await supabase.auth.signUp({ email, password });
          if (error) setStatus(error.message); else setStatus("Check your email to confirm.");
        }}>Sign up</Button>
      </div>
    </div>
  );
}


