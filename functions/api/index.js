export async function onRequestGet() {
  const content = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NKBE API Endpoints</title>
  <style>
    :root {
      --bg: #0d1117;
      --card-bg: #161b22;
      --border: #30363d;
      --text: #c9d1d9;
      --text-muted: #8b949e;
      --heading: #58a6ff;
      --badge-get: #238636;
      --code-bg: #1f242c;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
      margin: 0;
      padding: 40px 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    header {
      margin-bottom: 32px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 20px;
    }
    h1 {
      color: #fff;
      margin: 0 0 8px 0;
      font-size: 28px;
    }
    p.subtitle {
      color: var(--text-muted);
      margin: 0;
      font-size: 15px;
    }
    .api-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 20px;
      transition: border-color 0.2s;
    }
    .api-card:hover {
      border-color: var(--heading);
    }
    .api-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 10px;
      flex-wrap: wrap;
    }
    .badge {
      background: var(--badge-get);
      color: #fff;
      font-weight: 700;
      font-size: 12px;
      padding: 3px 8px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .endpoint {
      font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, monospace;
      font-size: 16px;
      font-weight: 600;
      color: var(--heading);
    }
    .desc {
      color: var(--text);
      margin: 0 0 12px 0;
      font-size: 14px;
    }
    .details {
      background: var(--code-bg);
      padding: 12px;
      border-radius: 6px;
      font-size: 13px;
      color: var(--text-muted);
    }
    .details a {
      color: var(--heading);
      text-decoration: none;
    }
    .details a:hover {
      text-decoration: underline;
    }
    footer {
      margin-top: 48px;
      text-align: center;
      font-size: 13px;
      color: var(--text-muted);
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>NKBE API 服務概覽</h1>
      <p class="subtitle">本站由 Cloudflare Pages & Workers 驅動，提供以下公開 API 與靜態服務</p>
    </header>

    <div class="api-card">
      <div class="api-header">
        <span class="badge">GET</span>
        <span class="endpoint">/api/version</span>
      </div>
      <p class="desc">版本檢查與更新策略接口，回傳最新的版本策略與統計資訊。</p>
      <div class="details">
        回傳格式：<code>application/json</code><br>
        測試連結：<a href="/api/version" target="_blank">/api/version</a>
      </div>
    </div>

    <div class="api-card">
      <div class="api-header">
        <span class="badge">GET</span>
        <span class="endpoint">/api/emoji/:file</span>
      </div>
      <p class="desc">NiagramX 表情包 CDN 快取與代理節點。代理 GitHub Releases 表情包字型（.ttf）並於 Cloudflare 邊緣節點快取 30 天。</p>
      <div class="details">
        支援路徑：<code>/api/emoji/apple.ttf</code>、<code>/api/emoji/twemoji.ttf</code> 等<br>
        回傳格式：<code>font/ttf</code> (Cache-Control: immutable)
      </div>
    </div>

    <div class="api-card">
      <div class="api-header">
        <span class="badge">GET</span>
        <span class="endpoint">/emojis/index.json</span>
      </div>
      <p class="desc">NiagramX 表情包索引清單，提供所有可下載表情包的 ID、名稱、版本、下載直鏈與預覽圖網址。</p>
      <div class="details">
        回傳格式：<code>application/json</code><br>
        測試連結：<a href="/emojis/index.json" target="_blank">/emojis/index.json</a>
      </div>
    </div>

    <div class="api-card">
      <div class="api-header">
        <span class="badge">GET</span>
        <span class="endpoint">/win11debloat</span>
      </div>
      <p class="desc">Win11Debloat 繁體/簡體中文版快速啟動腳本。</p>
      <div class="details">
        回傳格式：<code>text/plain</code> (PowerShell Script)
      </div>
    </div>

    <footer>
      &copy; 2026 nkbe.top | @HSSkyBoy. All rights reserved.
    </footer>
  </div>
</body>
</html>`;

  return new Response(content, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}