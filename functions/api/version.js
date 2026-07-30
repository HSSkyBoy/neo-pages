const CURRENT_VERSION = 31;
const STATS_BINDING = "GRANNY_VERSION_STATS";
const POLICY_SCHEMA = "nkbe-version-policy/v1";
const POLICY_SOURCE = "neo-pages";
const POLICY_URL = "https://www.nkbe.top/api/version";
const POLICY_SERVICE = "granny-gelin";

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
      schema: POLICY_SCHEMA,
      source: POLICY_SOURCE,
      sourceUrl: POLICY_URL,
      service: POLICY_SERVICE,
      status: "storage_unavailable",
    }, 503);
  }

  const day = new Date().toISOString().slice(0, 10);
  const totalConnections = await increment(kv, "stats:connections:total");
  const todayConnections = await increment(kv, `stats:connections:${day}`);

  return json({
    schema: POLICY_SCHEMA,
    source: POLICY_SOURCE,
    sourceUrl: POLICY_URL,
    service: POLICY_SERVICE,
    status: "active",
    latest: CURRENT_VERSION,
    issuedAt: new Date().toISOString(),
    totalConnections,
    todayConnections,
  });
}
