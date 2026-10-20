import { createClient } from "@supabase/supabase-js";

/**
 * Supabase: public anon credentials, safe for the browser by design
 * (Row Level Security restricts what anonymous users can do: insert
 * demo requests, upload documents, nothing else).
 *
 * Values are baked in after `supabase login` provisions the project;
 * NEXT_PUBLIC_* env vars override them if ever rotated.
 */
const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://nuewjaxzvipkqehzmzrf.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZXdqYXh6dmlwa3FlaHptenJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI0MzEwNDgsImV4cCI6MjEwODAwNzA0OH0.JqZvukioExurKIb461B9bzqk8JHGpr6GQMql8rC4I1I";

export const supabaseEnabled =
  !SUPABASE_URL.includes("PENDING") && SUPABASE_ANON_KEY !== "PENDING";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
