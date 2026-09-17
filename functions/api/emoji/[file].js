/**
 * Cloudflare Pages Function to proxy and cache Emoji font files from GitHub Releases.
 * URL path: /api/emoji/:file (e.g. /api/emoji/apple.ttf)
 */

const GITHUB_RELEASE_BASE = "https://github.com/HSSkyBoy/NiagramX/releases/download/emoji-assets";

export async function onRequestGet({ request, params }) {
  const file = params.file;
  if (!file) {
    return new Response("File parameter missing", { status: 400 });
  }

  const safeFilename = file.replace(/[^a-zA-Z0-9._-]/g, "");
  if (!safeFilename.endsWith(".ttf") && !safeFilename.endsWith(".png")) {
    return new Response("Invalid file extension", { status: 400 });
  }

  const targetUrl = `${GITHUB_RELEASE_BASE}/${safeFilename}`;

  try {
    const cache = caches.default;
    const cacheKey = new Request(request.url, request);
    let response = await cache.match(cacheKey);

    if (response) {
      return response;
    }

    const upstreamRes = await fetch(targetUrl, {
      headers: {
        "User-Agent": "NiagramX-Emoji-Proxy",
      },
      redirect: "follow",
    });

    if (!upstreamRes.ok) {
      return new Response(`Upstream error: ${upstreamRes.status} ${upstreamRes.statusText}`, {
        status: upstreamRes.status,
      });
    }

    const contentType = safeFilename.endsWith(".ttf")
      ? "font/ttf"
      : "image/png";

    response = new Response(upstreamRes.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": upstreamRes.headers.get("content-length") || "",
        "Cache-Control": "public, max-age=2592000, s-maxage=2592000, immutable",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      },
    });

    await cache.put(cacheKey, response.clone());

    return response;
  } catch (err) {
    return new Response(`Proxy error: ${err.message}`, { status: 500 });
  }
}