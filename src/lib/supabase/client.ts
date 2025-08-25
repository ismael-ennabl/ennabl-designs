import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

let cachedClient: any | null | undefined;

export function getBrowserSupabase() {
  if (cachedClient !== undefined) return cachedClient;
  if (typeof window === "undefined") {
    cachedClient = null;
    return cachedClient;
  }
  if (!supabaseUrl || !supabaseAnonKey) {
    cachedClient = null;
    return cachedClient;
  }
  cachedClient = createClient(
    supabaseUrl,
    supabaseAnonKey,
    { auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true } }
  );
  return cachedClient;
}



