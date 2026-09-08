import { spawn } from "node:child_process";
import { existsSync, createReadStream, statSync } from "node:fs";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { basename, extname, join, resolve } from "node:path";
import { tmpdir } from "node:os";

const root = resolve("dist");
const base = `/${basename(process.cwd())}`;
const pages = [
  ["home", "/"],
  ["week 3", "/lectures/week-03/"],
  ["week 10", "/lectures/week-10/"],
  ["assessment", "/assessments/"],
  ["deck", "/decks/week-01/"],
  ["policies", "/policies/"],
  ["atlas", "/tools/matchup-atlas/"],
  ["playbook", "/tools/volibear-playbook/"],
];
const viewports = [
  ["desktop", 1920, 1080],
  ["phone", 390, 844],
];
const mime = {
  ".avif": "image/avif", ".css": "text/css", ".html": "text/html; charset=utf-8",
  ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml",
  ".webp": "image/webp", ".woff2": "font/woff2",
};

function chromePath() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
  ].filter(Boolean);
  const found = candidates.find((candidate) => existsSync(candidate));
  if (!found) throw new Error("Chrome not found. Set CHROME_PATH to run the viewport contract.");
  return found;
}

function staticServer() {
  return createServer((request, response) => {
    const rawPath = new URL(request.url, "http://localhost").pathname;
    const relative = rawPath.startsWith(base) ? rawPath.slice(base.length) : rawPath;
    let file = resolve(root, relative.replace(/^\/+/, ""));
    if (!file.startsWith(root)) {
      response.writeHead(403).end();
      return;
    }
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    if (!existsSync(file)) {
      response.writeHead(404).end("Not found");
      return;
    }
    response.setHeader("Content-Type", mime[extname(file)] ?? "application/octet-stream");
    createReadStream(file).pipe(response);
  });
}

async function freePort() {
  const server = createServer();
  await new Promise((resolveReady) => server.listen(0, "127.0.0.1", resolveReady));
  const { port } = server.address();
  await new Promise((resolveClose) => server.close(resolveClose));
  return port;
}

async function waitForChrome(port) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`, {
        signal: AbortSignal.timeout(500),
      });
      if (response.ok) return;
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  throw new Error("Chrome DevTools endpoint did not become ready");
}

async function connect(url) {
  const socket = new WebSocket(url);
  await new Promise((resolveOpen, rejectOpen) => {
    const timeout = setTimeout(() => rejectOpen(new Error("Chrome DevTools WebSocket timed out")), 5000);
    socket.addEventListener("open", () => {
      clearTimeout(timeout);
      resolveOpen();
    }, { once: true });
    socket.addEventListener("error", (event) => {
      clearTimeout(timeout);
      rejectOpen(event.error ?? new Error("Chrome DevTools WebSocket failed"));
    }, { once: true });
  });
  let sequence = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    const call = pending.get(message.id);
    if (!call) return;
    pending.delete(message.id);
    clearTimeout(call.timeout);
    message.error ? call.reject(new Error(message.error.message)) : call.resolve(message.result);
  });
  socket.addEventListener("close", () => {
    for (const call of pending.values()) {
      clearTimeout(call.timeout);
      call.reject(new Error("Chrome DevTools WebSocket closed unexpectedly"));
    }
    pending.clear();
  });
  return {
    close: () => socket.close(),
    send: (method, params = {}) => new Promise((resolveCall, rejectCall) => {
      const id = ++sequence;
      const timeout = setTimeout(() => {
        pending.delete(id);
        rejectCall(new Error(`Chrome DevTools command timed out: ${method}`));
      }, 10000);
      pending.set(id, { resolve: resolveCall, reject: rejectCall, timeout });
      socket.send(JSON.stringify({ id, method, params }));
    }),
  };
}

async function waitForPage(send) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const state = await send("Runtime.evaluate", { expression: "document.readyState", returnByValue: true });
    if (state.result.value === "complete") break;
    await new Promise((resolveWait) => setTimeout(resolveWait, 100));
  }
  await new Promise((resolveWait) => setTimeout(resolveWait, 250));
}

const server = staticServer();
await new Promise((resolveReady) => server.listen(0, "127.0.0.1", resolveReady));
const sitePort = server.address().port;
const debugPort = await freePort();
const profile = await mkdtemp(join(tmpdir(), "slop3745-viewports-"));
const chrome = spawn(chromePath(), [
  "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
  "--disable-background-networking", `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profile}`, "about:blank",
], { stdio: "ignore", windowsHide: true });

let cdp;
let target;
try {
  await waitForChrome(debugPort);
  target = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, {
    method: "PUT",
    signal: AbortSignal.timeout(3000),
  }).then((response) => response.json());
  cdp = await connect(target.webSocketDebuggerUrl);
  await cdp.send("Page.enable");

  for (const [viewport, width, height] of viewports) {
    await cdp.send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: viewport === "phone" });
    for (const [name, path] of pages) {
      const url = `http://127.0.0.1:${sitePort}${base}${path}`;
      await cdp.send("Page.navigate", { url });
      await waitForPage(cdp.send);
      const audit = await cdp.send("Runtime.evaluate", {
        expression: `(() => {
          const externalImages = [...document.images]
            .map((image) => image.currentSrc || image.src)
            .filter((src) => src && new URL(src, location.href).origin !== location.origin);
          const atlasHero = document.querySelector('.atlas-hero');
          const heroRect = atlasHero?.getBoundingClientRect();
          const clippedAtlas = [...document.querySelectorAll('.atlas-hero h1, .atlas-lede, .playbook-link')]
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              return heroRect && (rect.left < heroRect.left - 1 || rect.right > heroRect.right + 1 || element.scrollWidth > element.clientWidth + 1);
            })
            .map((element) => element.className || element.tagName);
          return {
            innerWidth,
            scrollWidth: document.documentElement.scrollWidth,
            externalImages,
            clippedAtlas,
          };
        })()`,
        returnByValue: true,
      });
      const result = audit.result.value;
      if (result.innerWidth !== width || result.scrollWidth > width || result.externalImages.length || result.clippedAtlas.length) {
        throw new Error(`${name} @ ${viewport} failed: ${JSON.stringify(result)}`);
      }
      if (process.env.VIEWPORT_EVIDENCE_DIR && viewport === "phone" && name === "atlas") {
        const screenshot = await cdp.send("Page.captureScreenshot", { format: "png", fromSurface: true });
        const directory = resolve(process.env.VIEWPORT_EVIDENCE_DIR);
        await mkdir(directory, { recursive: true });
        await writeFile(join(directory, "atlas-mobile-after.png"), Buffer.from(screenshot.data, "base64"));
      }
      console.log(`✓ ${name} @ ${width}×${height}`);
    }
  }

  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await cdp.send("Page.navigate", { url: `http://127.0.0.1:${sitePort}${base}/tools/matchup-atlas/` });
  await waitForPage(cdp.send);
  await cdp.send("Runtime.evaluate", { expression: "document.querySelector('[data-status-button]')?.click()" });
  const phoneState = await cdp.send("Runtime.evaluate", { expression: "document.querySelector('[data-status-button]')?.textContent", returnByValue: true });
  await cdp.send("Emulation.setDeviceMetricsOverride", { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
  const resizedState = await cdp.send("Runtime.evaluate", {
    expression: `({label: document.querySelector('[data-status-button]')?.textContent, width: document.documentElement.scrollWidth})`,
    returnByValue: true,
  });
  if (phoneState.result.value !== resizedState.result.value.label || resizedState.result.value.width > 1920) {
    throw new Error("Atlas state or layout failed after a phone-to-desktop resize");
  }
  await cdp.send("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab" });
  await cdp.send("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab" });
  const focus = await cdp.send("Runtime.evaluate", { expression: "document.activeElement?.tagName", returnByValue: true });
  if (!focus.result.value || focus.result.value === "BODY") throw new Error("Keyboard focus did not enter the page");
  console.log("✓ atlas state survives resize and keyboard focus is available");
} finally {
  cdp?.close();
  if (target) {
    await fetch(`http://127.0.0.1:${debugPort}/json/close/${target.id}`, {
      signal: AbortSignal.timeout(1000),
    }).catch(() => {});
  }
  chrome.kill();
  await Promise.race([
    new Promise((resolveExit) => chrome.once("exit", resolveExit)),
    new Promise((resolveWait) => setTimeout(resolveWait, 1500)),
  ]);
  await new Promise((resolveClose) => server.close(resolveClose));
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      await rm(profile, { recursive: true, force: true });
      break;
    } catch (error) {
      if (attempt === 4) {
        console.warn(`Viewport checks passed; Chrome will release its temporary profile later: ${error.message}`);
      } else {
        await new Promise((resolveWait) => setTimeout(resolveWait, 250));
      }
    }
  }
}
