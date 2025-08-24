"use client";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { supabase } from "@/lib/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
  type ChatSession = {
    id: string;
    title: string;
    pageName?: string;
    published?: boolean;
    sourcePath?: string | null;
    componentPath?: string | null;
    used?: { id: string; title: string; exportName?: string }[];
    unknown?: string[];
    messages: { role: "user" | "assistant"; content: string }[];
  };
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [synSuggestions, setSynSuggestions] = useState<Record<string, Array<{ id: string; title: string; exportName?: string; confidence?: number; reason?: string }>>>({});
  const [synChosen, setSynChosen] = useState<Record<string, { id: string; title: string; exportName?: string }>>({});

  const previewUrl = useMemo(() => {
    if (!sourcePath) return null;
    if (sourcePath.startsWith("src/app/")) return "/" + sourcePath.replace("src/app/", "").replace(/\/page\.tsx$/, "");
    return null;
  }, [sourcePath]);

  async function generate() {
    setStatus("Generating...");
    setUnknown([]);
    const res = await fetch("/api/builder/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, pageName, target })
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
        messages: [ ...(c.messages || []), { role: 'assistant', content: res.ok ? 'Generated' : 'No matching components' } ]
      }) : c));
    }
    if (json.componentPath) {
      const fr = await fetch(`/api/builder/file?path=${encodeURIComponent(json.componentPath)}`);
      const fj = await fr.json();
      setCode(fj.code || "");
    }
    setStatus("Generated.");
    setPreviewVersion(Date.now());
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
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-screen">
      {/* Auth gate (skipped if no Supabase env configured) */}
      {!session && supabaseConfigured ? (
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
      ) : null}
      {session || !supabaseConfigured ? (
      <>
      {/* Left: Chat / History */}
      <ResizablePanel defaultSize={40} minSize={28} className="p-4">
        <Card className="h-full flex flex-col">
          <CardContent className="flex-1 min-h-0 grid gap-3">
            {!supabaseConfigured ? (
              <Alert>
                <AlertTitle>Auth disabled</AlertTitle>
                <AlertDescription>
                  Supabase credentials are not configured. This page is accessible without sign-in.
                  To enable auth, add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and restart.
                </AlertDescription>
              </Alert>
            ) : null}
            <Tabs defaultValue="chat" className="h-full flex flex-col">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <Button variant="secondary" onClick={() => {
                  const id = String(Date.now());
                  const fallback = `Untitled ${chats.length + 1}`;
                  const chat: ChatSession = { id, title: fallback, pageName: '', messages: [] };
                  setChats([chat, ...chats]);
                  setActiveChatId(id);
                  setMessages([]);
                  setPageName('');
                  setSourcePath(null);
                  setComponentPath(null);
                  setUsed([]);
                  setUnknown([]);
                }}>New Chat</Button>
              </div>
              <TabsContent value="chat" className="mt-3 grid gap-3 flex-1 min-h-0">
                <div className="flex-1 min-h-0 flex flex-col gap-2">
                  {/* conversation */}
                  <div className="flex-1 overflow-auto rounded border p-3 space-y-2 bg-card">
                    {messages.map((m, idx) => (
                      <div key={idx} className={`${m.role === 'user' ? 'justify-end' : 'justify-start'} flex`}>
                        <div className={`${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded px-3 py-2 max-w-[80%] whitespace-pre-wrap`}>{m.content}</div>
                      </div>
                    ))}
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
                  <Textarea rows={4} placeholder="Describe or refine the page..." value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                  <div className="flex gap-2">
                    <Button onClick={() => {
                      if (!activeChatId) {
                        const id = String(Date.now());
                        const fallback = `Untitled ${chats.length + 1}`;
                        const chat: ChatSession = { id, title: pageName || fallback, pageName: pageName || '', messages: [] };
                        setChats([chat, ...chats]);
                        setActiveChatId(id);
                      }
                      const content = prompt.trim();
                      if (!content) return;
                      setMessages(prev => [...prev, { role: 'user', content }]);
                      if (activeChatId) {
                        setChats(prev => prev.map(c => c.id === activeChatId ? ({ ...c, messages: [...c.messages, { role: 'user', content }] }) : c));
                      }
                      generate();
                      setPrompt("");
                    }}>Send</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="history" className="mt-3 flex-1 min-h-0">
                <div className="space-y-1 overflow-auto h-full">
                  {chats.map(c => (
                    <button key={c.id} onClick={() => {
                      setActiveChatId(c.id);
                      setPageName(c.pageName || '');
                      setMessages(c.messages || []);
                      setSourcePath(c.sourcePath || null);
                      setComponentPath(c.componentPath || null);
                      setUsed(c.used || []);
                      setUnknown(c.unknown || []);
                    }} className={`w-full text-left rounded px-2 py-1.5 text-sm hover:bg-muted ${activeChatId===c.id ? 'bg-muted' : ''}`}>
                      <div className="flex items-center gap-2">
                        <span className="truncate">{c.title || 'Untitled'}</span>
                        {c.published ? <Badge variant="secondary">Published</Badge> : null}
                      </div>
                    </button>
                  ))}
                  {!chats.length ? <div className="text-xs text-muted-foreground">No conversations yet.</div> : null}
                </div>
              </TabsContent>
            </Tabs>
            {/* README field removed per request */}
            {status ? <div className="text-sm text-muted-foreground">{status}</div> : null}
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
                          // persist choices, then apply
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
          </CardContent>
          <CardFooter className="flex gap-2"></CardFooter>
        </Card>
        {/* Used Components moved to right panel tab */}
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={60} minSize={40} className="p-4">
        <Tabs defaultValue="preview" className="h-full flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <div className="w-1/3 pr-2">
              <Input placeholder="Page name" value={pageName} onChange={(e) => setPageName(e.target.value)} />
            </div>
            <div className="w-1/3 flex justify-center">
              <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="used">Used Components</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
              </TabsList>
            </div>
            <div className="w-1/3 pl-2 flex justify-end">
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
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <div className="flex items-center gap-2 mb-3">
                  <Button
                    variant="outline"
                    size="sm"
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
                  >Reseed mock data</Button>
                </div>
                {previewUrl ? (
                  <iframe className="w-full h-full rounded border" src={`${previewUrl}?v=${previewVersion}`} />
                ) : (
                  <div className="text-sm text-muted-foreground">Generate a page to preview it here.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="used" className="flex-1 min-h-0">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Used Components</CardTitle>
              </CardHeader>
              <CardContent className="h-full overflow-auto">
                {used.length ? (
                  <ul className="text-sm list-disc pl-6">
                    {used.map(u => (
                      <li key={u.id}>{u.exportName || u.title} <span className="text-muted-foreground">({u.title})</span></li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-muted-foreground">No components yet. Generate to populate.</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="code" className="flex-1 min-h-0">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Source</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                {componentPath ? (
                  <div className="text-xs text-muted-foreground">{componentPath}</div>
                ) : null}
                <Textarea rows={20} value={code} onChange={(e) => setCode(e.target.value)} />
                <div>
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </ResizablePanel>
      </>
      ) : null}
    </ResizablePanelGroup>
  );
}

function AuthForm({ onAuthenticated }: { onAuthenticated: (s: any) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) onAuthenticated(data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
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
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) setStatus(error.message); else { setStatus("Signed in."); if (data.session) onAuthenticated(data.session); }
        }}>Sign in</Button>
        <Button variant="secondary" onClick={async () => {
          setStatus("Creating account...");
          const { error } = await supabase.auth.signUp({ email, password });
          if (error) setStatus(error.message); else setStatus("Check your email to confirm.");
        }}>Sign up</Button>
      </div>
    </div>
  );
}


