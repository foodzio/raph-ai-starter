// Main Supabase client
export { supabase, createSupabaseServerClient, createSupabaseClientWithAuth } from '../supabase';

// Storage utilities
export { 
  uploadFile, 
  getPublicUrl, 
  deleteFile, 
  createSignedUrl, 
  listFiles,
  type UploadFileOptions,
  type UploadResult 
} from './storage';

// Auth utilities
export { 
  getCurrentSession, 
  signOut, 
  signInWithPassword, 
  signUpWithPassword, 
  resetPassword, 
  onAuthStateChange,
  type AuthUser 
} from './auth';

// Real-time utilities
export { 
  subscribeToTable, 
  subscribeToPresence, 
  subscribeToBroadcast, 
  sendBroadcast, 
  unsubscribe, 
  getSubscriptions,
  type RealtimeSubscriptionOptions,
  type RealtimeCallback 
} from './realtime'; 