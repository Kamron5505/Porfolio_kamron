import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF, SVG" },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return Response.json(
        { error: "File too large. Maximum size: 5MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename (sanitized)
    const ext = file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "") || "jpg";
    const safeExt = ["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(ext) ? ext : "jpg";
    const filename = `project-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${safeExt}`;

    // Note: On Vercel/Edge deployments, the filesystem is read-only.
    // For production deployment, consider using external storage (Cloudinary, AWS S3, etc.).

    const uploadDir = path.join(process.cwd(), "public", "projects");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    return Response.json({
      success: true,
      url: `/projects/${filename}`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
