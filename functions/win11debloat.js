const SOURCE_URL = "https://raw.githubusercontent.com/HSSkyBoy/Win11DebloatCN/master/Scripts/Get.ps1";

export async function onRequestGet() {
  const upstream = await fetch(SOURCE_URL);

  if (!upstream.ok) {
    return new Response("无法获取 Win11Debloat 中文版启动器。", {
      status: 502,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(await upstream.text(), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
