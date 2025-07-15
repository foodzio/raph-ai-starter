import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// For server-side operations (when you have the service role key)
export const createSupabaseServerClient = (serviceRoleKey?: string) => {
  if (!serviceRoleKey) {
    throw new Error('Service role key is required for server operations');
  }
  return createClient(supabaseUrl, serviceRoleKey);
};

// For client-side operations with user context
export const createSupabaseClientWithAuth = (accessToken: string) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  });
}; 