import { supabase } from '../supabase';

export interface UploadFileOptions {
  bucket: string;
  path: string;
  file: File;
  options?: {
    cacheControl?: string;
    contentType?: string;
    upsert?: boolean;
  };
}

export interface UploadResult {
  data: {
    path: string;
    id: string;
    fullPath: string;
  } | null;
  error: Error | null;
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile({
  bucket,
  path,
  file,
  options = {},
}: UploadFileOptions): Promise<UploadResult> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: options.cacheControl || '3600',
        upsert: options.upsert || false,
        contentType: options.contentType || file.type,
      });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * Get a public URL for a file in Supabase Storage
 */
export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(bucket: string, path: string) {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    
    if (error) {
      throw error;
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { success: false, error: error as Error };
  }
}

/**
 * Create a signed URL for private files
 */
export async function createSignedUrl(
  bucket: string,
  path: string,
  expiresIn: number = 3600
) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error creating signed URL:', error);
    return { data: null, error: error as Error };
  }
}

/**
 * List files in a bucket
 */
export async function listFiles(bucket: string, path?: string) {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path || '', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error listing files:', error);
    return { data: null, error: error as Error };
  }
} 