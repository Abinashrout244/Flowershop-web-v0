import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABSE_PROJECT_URL;
const supabaseKEY = import.meta.env.VITE_SUPABASE_PUBLISH_KEY;

export const supabase = createClient(supabaseURL, supabaseKEY);
