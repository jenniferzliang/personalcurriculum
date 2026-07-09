import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Curriculum } from './types';

// Cross-device sync is optional: it activates only when a Supabase project
// is configured at build time (see SYNC_SETUP.md). Without it the app is
// fully local, exactly as before.
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const syncEnabled = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = syncEnabled
  ? createClient(url!, anonKey!)
  : null;

export interface RemoteData {
  curricula: Curriculum[];
  updatedAt: string;
}

export async function fetchRemote(userId: string): Promise<RemoteData | null> {
  const { data, error } = await supabase!
    .from('user_data')
    .select('curricula, updated_at')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return { curricula: data.curricula as Curriculum[], updatedAt: data.updated_at as string };
}

export async function pushRemote(userId: string, curricula: Curriculum[]): Promise<void> {
  const { error } = await supabase!.from('user_data').upsert({
    user_id: userId,
    curricula,
    updated_at: new Date().toISOString(),
  });
  if (error) throw error;
}

export async function sendMagicLink(email: string): Promise<void> {
  const { error } = await supabase!.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin + window.location.pathname,
    },
  });
  if (error) throw error;
}

export async function signOut(): Promise<void> {
  await supabase!.auth.signOut();
}
