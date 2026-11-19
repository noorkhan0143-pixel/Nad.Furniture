import { createClient } from '@supabase/supabase-js';

// These are public browser credentials (publishable/anon key), never a service-role key.
// Keep safe fallbacks so a missing CI environment variable cannot crash the entire storefront.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://rgjcaincvnxfodqxsrio.supabase.co';
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_1qDM5U2MIjNOzSM4X0Lgmg_nCW6YT_p';

export const supabase = createClient(supabaseUrl, supabaseKey);
