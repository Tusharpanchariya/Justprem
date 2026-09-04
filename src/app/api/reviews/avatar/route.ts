import { createClient } from "@supabase/supabase-js";

const maxFileSize = 3 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return Response.json({ error: "Uploads are not configured yet." }, { status: 503 });

  try {
    const formData = await request.formData();
    const file = formData.get("avatar");
    if (!(file instanceof File) || !allowedTypes.has(file.type) || file.size > maxFileSize) return Response.json({ error: "Choose a JPG, PNG, or WebP image under 3 MB." }, { status: 400 });
    const extension = file.type.split("/")[1];
    const filename = `${crypto.randomUUID()}.${extension}`;
    const supabase = createClient(url, key);
    const { error } = await supabase.storage.from("review-avatars").upload(filename, file, { contentType: file.type, upsert: false });
    if (error) throw error;
    const { data } = supabase.storage.from("review-avatars").getPublicUrl(filename);
    return Response.json({ avatarUrl: data.publicUrl });
  } catch {
    return Response.json({ error: "Unable to upload profile photo." }, { status: 500 });
  }
}
