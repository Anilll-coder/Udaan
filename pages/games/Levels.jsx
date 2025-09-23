import React, { useEffect, useMemo, useRef, useState } from "react";

const styles = `
:root{
  --text:#1f2a44; --muted:#6b7da8; --border: rgba(91,141,255,0.2);
  --shadow: 0 8px 18px rgba(0,0,0,0.08);
  --math:#5b8dff; --sci:#39b36e; --soc:#ff7aa7;

  --node:#ffffff; --node-border:#5b8dff; --node-locked:#b9c7f5; --node-active:#ffb84d;
  --path:#7aa7ff;

  --leftbar-w: 260px;
  --offcanvas-w: 420px;
  --pad: 16px; --topbar-h: 56px;
}

html, body, #root { height: 100%; margin: 0; }
body { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; color: var(--text); }
body.noscroll { overflow: hidden; }
.app { min-height: 100vh; background: #f4f6fb; display: flex; flex-direction: column; }

/* Subject bar */
.subjectBar { position: fixed; top: var(--pad); left: var(--pad); right: var(--pad); display: flex; justify-content: center; z-index: 60; pointer-events: none; }
.subjectBarInner { display: flex; gap: 10px; pointer-events: auto; background: rgba(255,255,255,0.9); border: 1px solid var(--border); border-radius: 999px; padding: 6px; box-shadow: var(--shadow); }
.subjectBtn { appearance: none; cursor: pointer; border: 1px solid var(--border); background: #fff; color: #1f2a44; padding: 8px 14px; border-radius: 999px; font-weight: 800; letter-spacing: .3px; transition: transform 160ms ease, background 200ms ease, color 200ms ease, border-color 200ms ease; }
.subjectBtn:hover { transform: translateY(-1px); }
.subjectBtn:active { transform: translateY(0); }
.subjectBtn.math.active { background: var(--math); border-color: var(--math); color: #fff; }
.subjectBtn.sci.active  { background: var(--sci);  border-color: var(--sci);  color: #fff; }
.subjectBtn.soc.active  { background: var(--soc);  border-color: var(--soc);  color: #fff; }

/* LEFT: User profile (collapsible) */
.leftSidebar { position: fixed; top: calc(var(--pad) + var(--topbar-h) + 8px); bottom: var(--pad); left: var(--pad); width: var(--leftbar-w); z-index: 40; display: flex; flex-direction: column; background: rgba(255,255,255,0.95); border: 1px solid var(--border); border-radius: 12px; box-shadow: var(--shadow); overflow: hidden; transition: transform 200ms ease, opacity 200ms ease; }
.leftSidebar.minimized { transform: translateX(calc(-100% - 12px)); opacity: 0.001; pointer-events: none; }
.leftHeader { padding: 14px; font-weight: 800; letter-spacing: .3px; border-bottom: 1px solid var(--border); background: #fff; }
.leftScroll { flex: 1 1 auto; overflow: auto; padding: 12px; }
.profileNav { display: grid; gap: 10px; }
.navItem { display: grid; grid-template-columns: 36px 1fr auto; gap: 10px; align-items: center; padding: 10px; border-radius: 10px; background: #fff; border: 1px solid rgba(91,141,255,0.15); cursor: pointer; transition: transform 140ms ease, box-shadow 140ms ease; }
.navItem:hover { transform: translateY(-1px); box-shadow: var(--shadow); }
.icon { width: 36px; height: 36px; border-radius: 8px; display: grid; place-items: center; background: #eef3ff; color: #2a3a5e; font-weight: 800; border: 1px solid rgba(91,141,255,0.2); }
.label { font-weight: 700; }
.chev { color: #9aa6c0; }

/* Floating Profile FAB and popover */
.userFab { position: fixed; left: 16px; bottom: 16px; z-index: 95; display: inline-flex; align-items: center; gap: 8px; background: #1f2a44; color: #fff; border: none; border-radius: 999px; padding: 12px 14px; box-shadow: var(--shadow); font-weight: 800; cursor: pointer; }
.userPopover { position: fixed; left: 16px; bottom: 68px; z-index: 96; background: rgba(255,255,255,0.98); border: 1px solid var(--border); border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.12); min-width: 220px; padding: 8px; display: none; }
.userPopover.open { display: block; }
.userMenu { margin: 0; padding: 0; list-style: none; display: grid; gap: 6px; }
.userMenuItem { display: grid; grid-template-columns: 36px 1fr; gap: 10px; align-items: center; padding: 10px; border-radius: 10px; background: #fff; border: 1px solid rgba(91,141,255,0.15); cursor: pointer; transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease; }
.userMenuItem:focus { outline: 2px solid #1f5fff; outline-offset: 2px; }
.userMenuItem:hover { transform: translateY(-1px); box-shadow: var(--shadow); }
.userMenuIcon { width: 36px; height: 36px; border-radius: 8px; display: grid; place-items: center; background: #eef3ff; color: #2a3a5e; font-weight: 800; border: 1px solid rgba(91,141,255,0.2); }

/* Stage */
.stage { flex: 1 1 auto; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: calc(var(--topbar-h) + var(--pad) + 24px) var(--pad) var(--pad) calc(var(--leftbar-w) + var(--pad)); box-sizing: border-box; transition: padding-left 200ms ease; }
.stage.compact { padding-left: var(--pad); }

/* Map panel */
.mapPanel { width: min(1200px, 100%); height: min(88vh, 1400px); min-height: 520px; border-radius: 12px; overflow: hidden; background: rgba(255,255,255,0.85); border: 1px solid var(--border); position: relative; box-shadow: var(--shadow); }

/* Viewports */
.viewportStack { position: absolute; inset: 0; overflow: hidden; }
.viewport { position: absolute; inset: 0; overflow: auto; scroll-behavior: smooth; opacity: 0; transform: translateY(8px) scale(0.995); transition: opacity 220ms ease, transform 220ms ease; will-change: opacity, transform; pointer-events: none; }
.viewport.active { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }

/* Map area */
.map { position: relative; }
canvas { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }

/* Nodes */
.node { position:absolute; width:68px; height:68px; transform: translate(-50%,-50%); display:grid; place-items:center; border-radius:50%; background:var(--node); border:3px solid var(--node-border); box-shadow: var(--shadow); cursor:pointer; user-select:none; z-index: 1; transition: transform 180ms ease, filter 180ms ease, opacity 180ms ease; will-change: transform, opacity; }
.node.locked { border-color:var(--node-locked); background:#f3f6ff; cursor: default; }
.node.active { border-color:var(--node-active); background:#fff7e8; }
.label { font-weight:700; font-size:18px; }
.sub { position:absolute; top:74px; font-size:12px; color:#6b7da8; background:rgba(255,255,255,.95); padding:4px 8px; border-radius:999px; border:1px solid rgba(91,141,255,.15); display:none; }
.node.active .sub { display:block; }
.node::after { content: ""; position: absolute; inset: -6px; border-radius: 50%; pointer-events: none; box-shadow: 0 0 .5rem rgba(91,141,255,0.35), 0 0 1.25rem rgba(91,141,255,0.25); opacity: 0; transition: opacity 200ms ease; }
.node:hover { transform: translate(-50%,-50%) scale(1.06) translateY(-2px); filter: saturate(1.05); }
.node:hover::after { opacity: 1; }
.node:active { transform: translate(-50%,-50%) scale(0.98); }

/* Off-canvas leaderboard */
.leaderToggle { position: fixed; right: var(--pad); bottom: var(--pad); z-index: 80; background: #1f2a44; color: #fff; border: none; border-radius: 999px; padding: 12px 14px; box-shadow: var(--shadow); font-weight: 800; cursor: pointer; }
.offcanvas { position: fixed; top: 0; right: 0; bottom: 0; width: var(--offcanvas-w); max-width: 520px; background: rgba(255,255,255,0.98); border-left: 1px solid var(--border); box-shadow: -10px 0 30px rgba(0,0,0,0.08); transform: translateX(100%); transition: transform 260ms ease; z-index: 90; display: flex; flex-direction: column; }
.offcanvas.open { transform: translateX(0); }
.offHeader { padding: 14px; font-weight: 800; letter-spacing: .3px; border-bottom: 1px solid var(--border); background: #fff; display:flex; align-items:center; justify-content: space-between; }
.closeBtn { background: transparent; border: none; font-weight: 800; font-size: 18px; cursor: pointer; color: #1f2a44; }
.offScroll { overflow: auto; flex: 1 1 auto; padding: 12px; }
.leader-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
.leader-item { display: grid; grid-template-columns: 28px 40px 1fr auto; gap: 10px; align-items: center; background: #fff; border: 1px solid rgba(91,141,255,0.15); border-radius: 10px; padding: 8px; }
.rank { width:28px;height:28px;border-radius:8px;display:grid;place-items:center;background:#eef3ff;color:#1f2a44;font-weight:800;font-size:12px;border:1px solid rgba(91,141,255,0.2); }
.avatar { width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(135deg,#a7b7ff,#ffd3a7);border:1px solid rgba(91,141,255,0.25);font-weight:700;color:#1f2a44; }
.meta { display:grid; gap:2px; min-width:0; }
.name { font-weight:700; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.subtle { font-size:12px; color: var(--muted); }
.stat { text-align:right; display:grid; gap:6px; min-width:120px; }
.level-badge { display:inline-block; background:#fff7e8; border:1px solid rgba(255,184,77,0.5); color:#a06400; font-weight:800; font-size:12px; padding:2px 8px; border-radius:999px; }
.progressRow { display:grid; grid-template-columns: 1fr auto; gap:8px; align-items:center; }
.progress { width:100%; height:6px; background:#e9eefc; border-radius:999px; overflow:hidden; border:1px solid rgba(91,141,255,0.15); }
.progress > span { display:block; height:100%; background: linear-gradient(90deg,#7aa7ff,#39b36e); }

@media (max-width: 800px) {
  :root { --leftbar-w: 0px; --offcanvas-w: 86vw; }
  .leftSidebar { display: none; }
  .stage { padding-left: var(--pad); }
}
`;
function useResizeObserverDebounced(ref, onResize) {
  const rafId = useRef();
  const last = useRef({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries.contentRect;
      if (width === last.current.w && height === last.current.h) return;
      last.current = { w: width, h: height };
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => onResize({ width, height }));
    });
    ro.observe(el);
    return () => { cancelAnimationFrame(rafId.current); ro.disconnect(); };
  }, [ref, onResize]);
}

function generatePathPoints(n, w, h) {
  const marginX = 80, marginY = 120;
  const usableW = Math.max(300, w - marginX * 2);
  const usableH = Math.max(1200, h - marginY * 2);
  const pts = [];
  for (let i = 0; i < n; i++) {
    const t = i / Math.max(1, n - 1);
    const x = marginX + usableW * (0.5 + 0.45 * Math.sin(t * Math.PI * 3));
    const y = marginY + usableH * t;
    pts.push({ x, y });
  }
  return pts;
}
function relax(points, iterations = 60) {
  const minDist = 92, k = 0.08;
  const pts = points.map(p => ({ ...p }));
  for (let it = 0; it < iterations; it++) {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const dx = b.x - a.x, dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 1e-3;
        if (dist < minDist) {
          const force = (minDist - dist) * k;
          const fx = (dx / dist) * force, fy = (dy / dist) * force;
          a.x -= fx; a.y -= fy; b.x += fx; b.y += fy;
        }
      }
    }
  }
  return pts;
}
function jitterPointsSeeded(points, amount, seed) {
  let s = seed;
  const next = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  return points.map(p => ({ x: p.x + (next() * 2 - 1) * amount, y: p.y + (next() * 2 - 1) * amount }));
}

/* Subject viewport */
function SubjectViewport({ active, levelCount, activeLevel, subjectKey, nodesRef, mapWidth, setMapWidth }) {
  const mapRef = useRef(null);
  const canvasRef = useRef(null);
  const totalHeight = useMemo(() => Math.max(1800, levelCount * 100), [levelCount]);

  useEffect(() => {
    if (mapRef.current) {
      const h = `${totalHeight}px`;
      if (mapRef.current.style.minHeight !== h) mapRef.current.style.minHeight = h;
    }
  }, [totalHeight]);

  useResizeObserverDebounced(mapRef, ({ width }) => {
    if (active && width > 0) setMapWidth(width);
  });
  useEffect(() => {
    if (!active || !mapRef.current) return;
    let r1 = requestAnimationFrame(() => {
      let r2 = requestAnimationFrame(() => {
        setTimeout(() => {
          const w = mapRef.current?.getBoundingClientRect().width || 0;
          if (w > 0) setMapWidth(w);
        }, 16);
      });
      return () => cancelAnimationFrame(r2);
    });
    return () => cancelAnimationFrame(r1);
  }, [active, setMapWidth]); /* stable first paint */

  useEffect(() => {
    if (nodesRef.current?.length) return;
    const seed = Math.random() * 100000 + subjectKey.length * 1000;
    const base = generatePathPoints(levelCount, mapWidth || 800, totalHeight);
    const jittered = jitterPointsSeeded(base, 28, seed);
    const relaxed = relax(jittered, 60);
    nodesRef.current = relaxed.map((p, i) => ({ id: i + 1, x: p.x, y: p.y }));
  }, [levelCount, totalHeight, mapWidth, subjectKey, nodesRef]);

  const nodes = useMemo(() => {
    if (!nodesRef.current?.length) return [];
    const marginX = 80;
    const usableW = Math.max(300, (mapWidth || 800) - marginX * 2);
    const xs = nodesRef.current.map(p => p.x);
    const minX = Math.min(...xs, marginX);
    const maxX = Math.max(...xs, marginX + usableW);
    const range = Math.max(1, maxX - minX);
    return nodesRef.current.map(p => ({ id: p.id, y: p.y, x: marginX + ((p.x - minX) / range) * usableW }));
  }, [mapWidth, nodesRef]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const mapEl = mapRef.current;
    if (!canvas || !mapEl || !nodes.length) return;
    const rect = mapEl.getBoundingClientRect();
    if (!rect || rect.width === 0 || totalHeight === 0) return;

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(totalHeight * dpr);
    if (canvas.width !== targetW) canvas.width = targetW;
    if (canvas.height !== targetH) canvas.height = targetH;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${totalHeight}px`;

    const ctx = canvas.getContext("2d");
    let frame = requestAnimationFrame(() => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, totalHeight);
      ctx.lineWidth = 4;
      ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--path").trim() || "#7aa7ff";
      for (let i = 0; i < nodes.length - 1; i++) {
        const a = nodes[i], b = nodes[i + 1];
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        const dx = b.x - a.x, dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len, ny = dx / len;
        const curvature = 18 * (i % 2 === 0 ? 1 : -1);
        const cx = mx + nx * curvature, cy = my + ny * curvature;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo(cx, cy, b.x, b.y);
        ctx.stroke();
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [active, nodes, totalHeight, mapWidth]);

  return (
    <div className={`viewport ${active ? "active" : ""}`} aria-hidden={!active}>
      <div className="map" ref={mapRef}>
        <canvas ref={canvasRef} />
        {nodes.map(n => (
          <div
            key={`${subjectKey}-${n.id}`}
            className={`node ${n.id < activeLevel ? "active" : n.id > activeLevel ? "locked" : ""}`}
            style={{ left: n.x, top: n.y }}
            data-level={n.id}
            role="button"
            aria-label={`${subjectKey} Level ${n.id}`}
          >
            <div className="label">{n.id}</div>
            <div className="sub">{n.id < activeLevel ? "Completed" : n.id > activeLevel ? "Locked" : "Current"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeftProfileNav({ minimized }) {
  return (
    <nav className={`leftSidebar ${minimized ? "minimized" : ""}`} aria-label="User profile">
      <div className="leftHeader">User</div>
      <div className="leftScroll">
        <div className="profileNav">
          <div className="navItem" role="button" tabIndex={0} aria-label="Profile"><div className="icon">U</div><div className="label">Profile</div><div className="chev">›</div></div>
          <div className="navItem" role="button" tabIndex={0} aria-label="Friends"><div className="icon">F</div><div className="label">Friends</div><div className="chev">›</div></div>
          <div className="navItem" role="button" tabIndex={0} aria-label="My Badges"><div className="icon">B</div><div className="label">My Badges</div><div className="chev">›</div></div>
          <div className="navItem" role="button" tabIndex={0} aria-label="Settings"><div className="icon">S</div><div className="label">Settings</div><div className="chev">›</div></div>
        </div>
      </div>
    </nav>
  );
}

function ProfileFABMenu() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const popRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      const b = btnRef.current, p = popRef.current;
      if ((b && b.contains(e.target)) || (p && p.contains(e.target))) return;
      setOpen(false);
    }
    function onEsc(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const first = popRef.current?.querySelector("[role='menuitem']");
    first?.focus();
  }, [open]);

  return (
    <>
      <button
        ref={btnRef}
        className="userFab"
        aria-expanded={open ? "true" : "false"}
        aria-controls="userProfilePopover"
        aria-haspopup="menu"
        onClick={() => setOpen(v => !v)}
        title="User Profile"
      >
        ☰ Profile
      </button>

      <div
        id="userProfilePopover"
        ref={popRef}
        className={`userPopover ${open ? "open" : ""}`}
        role="menu"
        aria-label="User profile options"
      >
        <ul className="userMenu" role="none">
          <li role="none"><button className="userMenuItem" role="menuitem" tabIndex={0}><span className="userMenuIcon">U</span><span>Profile</span></button></li>
          <li role="none"><button className="userMenuItem" role="menuitem" tabIndex={0}><span className="userMenuIcon">F</span><span>Friends</span></button></li>
          <li role="none"><button className="userMenuItem" role="menuitem" tabIndex={0}><span className="userMenuIcon">B</span><span>My Badges</span></button></li>
          <li role="none"><button className="userMenuItem" role="menuitem" tabIndex={0}><span className="userMenuIcon">S</span><span>Settings</span></button></li>
        </ul>
      </div>
    </>
  );
}

function OffcanvasLeaderboard({ open, onClose, friends }) {
  useEffect(() => {
    const cls = "noscroll";
    if (open) document.body.classList.add(cls); else document.body.classList.remove(cls);
    return () => document.body.classList.remove(cls);
  }, [open]);

  return (
    <aside
      id="leaderOffcanvas"
      className={`offcanvas ${open ? "open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="leaderTitle"
      aria-hidden={open ? "false" : "true"}
    >
      <div className="offHeader">
        <span id="leaderTitle">Friends Leaderboard</span>
        <button className="closeBtn" onClick={onClose} aria-label="Close leaderboard">×</button>
      </div>
      <div className="offScroll">
        <ol className="leader-list">
          {friends.map((f, i) => (
            <li key={f.id} className="leader-item">
              <div className="rank" aria-label={`Rank ${i + 1}`}>{i + 1}</div>
              <div className="avatar" aria-hidden="true">{f.initials}</div>
              <div className="meta">
                <div className="name" title={f.name}>{f.name}</div>
                <div className="subtle">{Math.round(f.progress * 100)}% progress</div>
              </div>
              <div className="stat">
                <span className="level-badge" aria-label={`Level ${f.level}`}>Lvl {f.level}</span>
                <div className="progressRow">
                  <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(f.progress * 100)}>
                    <span style={{ width: `${Math.min(100, Math.max(0, f.progress * 100))}%` }} />
                  </div>
                  <div className="subtle" aria-hidden="true">{Math.round(f.progress * 100)}%</div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}

export default function Levels() {
  const subjects = [
    { key: "Maths",   levels: 20, activeLevel: 8 },
    { key: "Science", levels: 22, activeLevel: 5 },
    { key: "Social",  levels: 18, activeLevel: 11 }
  ];
  const [activeSub, setActiveSub] = useState("Maths");
  const [openLeader, setOpenLeader] = useState(false);
  const [profileMin, setProfileMin] = useState(false);

  const mapWidth = useRef({ Maths: 0, Science: 0, Social: 0 });
  const setMapWidthFor = (key) => (w) => { mapWidth.current[key] = w; };
  const nodesRefs = { Maths: useRef([]), Science: useRef([]), Social: useRef([]) };

  const [friends] = useState(() => {
    const data = [
      { id: "u1", name: "Aarav", initials: "AA", level: 16, progress: 0.22 },
      { id: "u2", name: "Meera", initials: "ME", level: 15, progress: 0.58 },
      { id: "u3", name: "Rohit", initials: "RO", level: 14, progress: 0.44 },
      { id: "u4", name: "Sara", initials: "SA", level: 13, progress: 0.85 },
      { id: "u5", name: "Dev", initials: "DE", level: 11, progress: 0.36 },
      { id: "u6", name: "Isha", initials: "IS", level: 9, progress: 0.72 },
      { id: "u7", name: "Kiran", initials: "KI", level: 8, progress: 0.51 },
      { id: "u8", name: "Anaya", initials: "AN", level: 7, progress: 0.64 }
    ];
    return data.sort((a, b) => (b.level - a.level) || (b.progress - a.progress));
  });

  const stageRef = useRef(null);
  const mapPanelRef = useRef(null);
  useEffect(() => {
    const stage = stageRef.current;
    const panel = mapPanelRef.current;
    if (!stage || !panel) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const ratio = entry.intersectionRatio || 0;
          setProfileMin(ratio < 0.98);
        }
      },
      { root: stage, threshold: [0.0, 0.5, 0.98], rootMargin: "0px" }
    );
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <style>{styles}</style>

      <div className="subjectBar" role="tablist" aria-label="Subjects">
        <div className="subjectBarInner">
          {subjects.map(s => (
            <button
              key={s.key}
              className={`subjectBtn ${s.key.toLowerCase().slice(0,3)} ${s.key === activeSub ? "active" : ""}`}
              onClick={() => setActiveSub(s.key)}
              role="tab"
              aria-selected={s.key === activeSub}
              title={s.key}
            >
              {s.key}
            </button>
          ))}
        </div>
      </div>

      <LeftProfileNav minimized={profileMin} />

      <div className={`stage ${profileMin ? "compact" : ""}`} ref={stageRef}>
        <div className="mapPanel" ref={mapPanelRef}>
          <div className="viewportStack">
            {subjects.map(s => (
              <SubjectViewport
                key={s.key}
                active={activeSub === s.key}
                levelCount={s.levels}
                activeLevel={s.activeLevel}
                subjectKey={s.key}
                nodesRef={nodesRefs[s.key]}
                mapWidth={mapWidth.current[s.key]}
                setMapWidth={setMapWidthFor(s.key)}
              />
            ))}
          </div>
        </div>
      </div>

      <ProfileFABMenu />

      <button
        className="leaderToggle"
        aria-controls="leaderOffcanvas"
        aria-expanded={openLeader ? "true" : "false"}
        onClick={() => setOpenLeader(true)}
      >
        Leaderboard
      </button>
      <OffcanvasLeaderboard open={openLeader} onClose={() => setOpenLeader(false)} friends={friends} />
    </div>
  );
}
