import { getSupabase } from "@/lib/supabase";

/** Reads one JSON value from web_settings (written by the ERP). Null when unset or unreachable. */
export async function getSetting<T extends object>(key: string): Promise<Partial<T> | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from("web_settings").select("value").eq("key", key).maybeSingle();
    return error || !data ? null : (data.value as Partial<T>);
  } catch {
    return null;
  }
}
