/**
 * Cloudflare Pages Function to proxy and cache Emoji font files from GitHub Releases.
 * URL path: /api/emoji/:file (e.g. /api/emoji/apple.ttf)
 */

const GITHUB_RELEASE_BASE = "https://github.com/HSSkyBoy/NiagramX/releases/download/emoji-assets";

export async function onRequestGet({ params }) {
  const file = params.file;
  if (!file) {
    return new Response("File parameter missing", { status: 400 });
  }

  const safeFilename = file.replace(/[^a-zA-Z0-9._-]/g, "");
  if (!safeFilename.endsWith(".ttf") && !safeFilename.endsWith(".png")) {
    return new Response("Invalid file extension", { status: 400 });
  }

  const targetUrl = `${GITHUB_RELEASE_BASE}/${safeFilename}`;
  return Response.redirect(targetUrl, 302);
}