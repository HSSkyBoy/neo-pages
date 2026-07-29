const CURRENT_VERSION = 30;
const STATS_BINDING = "GRANNY_VERSION_STATS";

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Pragma": "no-cache",
    },
  });
}

async function increment(kv, key) {
  const current = Number.parseInt((await kv.get(key)) || "0", 10);
  const next = Number.isFinite(current) ? current + 1 : 1;
  await kv.put(key, String(next));
  return next;
}

export async function onRequestGet({ env }) {
  const kv = env[STATS_BINDING];
  if (!kv) {
    return json({
      sourceUrl: "https://www.nkbe.top/api/version",
      service: "granny-gelin",
      status: "storage_unavailable",
    }, 503);
  }

  const day = new Date().toISOString().slice(0, 10);
  const totalConnections = await increment(kv, "stats:connections:total");
  const todayConnections = await increment(kv, `stats:connections:${day}`);

  return json({
    sourceUrl: "https://www.nkbe.top/api/version",
    service: "granny-gelin",
    status: "active",
    latest: CURRENT_VERSION,
    issuedAt: new Date().toISOString(),
    totalConnections,
    todayConnections,
  });
}
