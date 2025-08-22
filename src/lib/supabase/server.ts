import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export function getServerSupabase() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase env not configured");
  }
  return createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });
}


