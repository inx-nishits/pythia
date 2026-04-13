import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Server-Side Clients
 * 
 * Objectives:
 * 1. Provide an 'admin' client with the service_role key to bypass RLS for API-driven writes.
 * 2. Provide a 'public' client for standard operations.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Standard client (respects RLS)
// We provide a fallback to prevent the app from crashing on import if variables are missing
export const supabase = createClient(
  supabaseUrl || "https://placeholder-project.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

// Admin client (bypasses RLS - use only for server-side qualified lead writes)
export const supabaseAdmin = createClient(
  supabaseUrl || "https://placeholder-project.supabase.co",
  supabaseServiceKey || "placeholder-key"
);
