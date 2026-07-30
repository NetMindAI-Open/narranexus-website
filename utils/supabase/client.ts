import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Returns null when the Supabase env vars are not configured (they are inlined
// at build time), so pages can degrade gracefully instead of throwing.
export const createClient = () =>
  supabaseUrl && supabaseKey
    ? createBrowserClient(supabaseUrl, supabaseKey)
    : null;
