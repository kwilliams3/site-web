import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database.types';

// These environment variables would be set after connecting to Supabase
// For now, using placeholder values that will be replaced after Supabase setup
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);