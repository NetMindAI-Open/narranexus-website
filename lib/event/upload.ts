import type { SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "event-uploads";
const MAX_DIMENSION = 1600; // px — cap the longest edge to keep phone photos small
const JPEG_QUALITY = 0.82;

/**
 * Downscale a large image to a reasonable JPEG in the browser. Falls back to the
 * original file if anything goes wrong or the file is already small / not an
 * image we can process.
 */
async function compressImage(file: File): Promise<Blob> {
  if (!file.type.startsWith("image/") || typeof createImageBitmap === "undefined") {
    return file;
  }
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    if (scale >= 1 && file.size < 1_500_000) {
      bitmap.close?.();
      return file;
    }
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close?.();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
    );
    return blob ?? file;
  } catch {
    return file;
  }
}

/**
 * Compress and upload a list of image files to Supabase Storage, returning their
 * public URLs. Throws if any upload fails.
 */
export async function uploadEventImages(
  supabase: SupabaseClient,
  participantId: string,
  files: File[],
): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    const blob = await compressImage(file);
    const isJpeg = blob.type === "image/jpeg" || blob !== file;
    const ext = isJpeg ? "jpg" : file.name.split(".").pop() || "bin";
    const path = `${participantId}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext}`;

    const { error } = await supabase.storage.from(BUCKET).upload(path, blob, {
      contentType: isJpeg ? "image/jpeg" : file.type || undefined,
      upsert: false,
    });
    if (error) throw error;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
  }
  return urls;
}
