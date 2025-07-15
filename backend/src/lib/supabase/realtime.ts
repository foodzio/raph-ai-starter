import { supabase } from '../supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface RealtimeSubscriptionOptions {
  table: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  schema?: string;
  filter?: string;
}

export type RealtimeCallback = (payload: any) => void;

/**
 * Subscribe to real-time changes on a table
 */
export function subscribeToTable({
  table,
  event = '*',
  schema = 'public',
  filter,
}: RealtimeSubscriptionOptions, callback: RealtimeCallback): RealtimeChannel {
  
  const channel = supabase
    .channel(`${table}_changes`)
    .on('postgres_changes', 
      { 
        event: event as any, 
        schema, 
        table, 
        filter 
      } as any, 
      callback
    )
    .subscribe();

  return channel;
}

/**
 * Subscribe to presence changes (who's online)
 */
export function subscribeToPresence(
  channelName: string,
  config: {
    presence: Record<string, any>;
    onJoin?: (key: string, currentPresences: any, newPresences: any) => void;
    onLeave?: (key: string, currentPresences: any, leftPresences: any) => void;
    onSync?: () => void;
  }
): RealtimeChannel {
  
  const channel = supabase.channel(channelName, {
    config: {
      presence: {
        key: config.presence.id || 'anonymous',
      },
    },
  });

  // Track presence
  channel.on('presence', { event: 'sync' }, () => {
    config.onSync?.();
  });

  channel.on('presence', { event: 'join' }, ({ key, newPresences }) => {
    config.onJoin?.(key, channel.presenceState(), newPresences);
  });

  channel.on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
    config.onLeave?.(key, channel.presenceState(), leftPresences);
  });

  // Subscribe and track presence
  channel.subscribe(async (status) => {
    if (status !== 'SUBSCRIBED') return;
    
    await channel.track(config.presence);
  });

  return channel;
}

/**
 * Subscribe to broadcast messages
 */
export function subscribeToBroadcast(
  channelName: string,
  event: string,
  callback: (payload: any) => void
): RealtimeChannel {
  
  const channel = supabase.channel(channelName);
  
  channel.on('broadcast', { event }, callback);
  channel.subscribe();

  return channel;
}

/**
 * Send a broadcast message
 */
export async function sendBroadcast(
  channel: RealtimeChannel,
  event: string,
  payload: any
) {
  return await channel.send({
    type: 'broadcast',
    event,
    payload,
  });
}

/**
 * Unsubscribe from a channel
 */
export async function unsubscribe(channel: RealtimeChannel) {
  return await supabase.removeChannel(channel);
}

/**
 * Get all active subscriptions
 */
export function getSubscriptions() {
  return supabase.getChannels();
} 