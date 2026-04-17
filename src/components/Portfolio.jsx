import { useState, useEffect, useRef, useCallback } from "react";
import { Mail, ExternalLink, Code2, ChevronDown, ArrowUp, Menu, X } from "lucide-react";

const SKILLS = {
  Frontend: [
    { name: "HTML5", level: 90 }, { name: "CSS3", level: 90 }, { name: "JavaScript", level: 85 },
    { name: "React", level: 80 }, { name: "Tailwind", level: 78 }, { name: "Bootstrap", level: 75 },
  ],
  Backend: [
    { name: "Node.js", level: 75 }, { name: "Express.js", level: 70 }, { name: "PHP", level: 72 },
    { name: "Python", level: 68 }, { name: "C++", level: 70 },
  ],
  Mobile: [
    { name: "Flutter", level: 72 }, { name: "Dart", level: 70 },
  ],
  Database: [
    { name: "MySQL", level: 78 }, { name: "Firebase", level: 70 }, { name: "Oracle", level: 60 },
  ],
  Tools: [
    { name: "Git", level: 85 }, { name: "GitHub", level: 85 }, { name: "VS Code", level: 90 },
    { name: "Linux", level: 60 }, { name: "Figma", level: 65 }, { name: "Vite", level: 70 },
  ],
};

const PROJECTS = [
  {
    title: "Employee Task Organizer",
    period: "Nov 2025 – Jan 2026",
    tech: ["React", "JavaScript", "Node.js", "HTML", "CSS", "Git"],
    desc: "Role-based task management system where admins assign tasks with deadlines and employees can negotiate timelines through a collaborative workflow.",
    github: "https://github.com/Aditya-255",
    featured: true,
  },
  {
    title: "Car Rental Application",
    period: "July 2025 – Dec 2025",
    tech: ["Flutter", "Firebase"],
    desc: "Mobile app with Firebase auth, vehicle listing, booking workflow, and a full management dashboard for fleet owners.",
    github: "https://github.com/Aditya-255",
    featured: false,
  },
  {
    title: "Hotel Room Booking System",
    period: "Dec 2024 – May 2025",
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    desc: "Full-stack web app with secure auth, role-based access control, and a comprehensive admin panel for hotel management.",
    github: "https://github.com/Aditya-255/Hotel_Booking_Website_PHP",
    featured: false,
  },
];

const CERTS = [
  { title: "SQL and Relational Databases 101", issuer: "IBM", icon: "🏆" },
  { title: "Software Engineering Job Simulation", issuer: "Forage", icon: "🏆" },
  { title: "Front-End Web Development", issuer: "Reliance Foundation", icon: "🏆" },
];

const STATS = [
  { label: "Years Coding", value: 2, suffix: "+" },
  { label: "Projects Built", value: 3, suffix: "" },
  { label: "CGPA", value: 8.10, suffix: "", decimal: true },
  { label: "GitHub Repos", value: 17, suffix: "" },
];

const NAME_LETTERS = "Aditya Dodiya".split("");
const SUBTITLES = ["Full Stack Developer", "React Developer", "Flutter Developer", "Open Source Enthusiast"];
const NAV_LINKS = ["Home", "About", "Skills", "Projects", "Certifications", "Contact"];
const ORBIT_ICONS = ["⚛️", "🔥", "💻", "🐍", "📱"];

export default function Portfolio() {
  const canvasRef = useRef(null);
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const particlesRef = useRef([]);

  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [skillTab, setSkillTab] = useState("Frontend");
  const [subtitleIdx, setSubtitleIdx] = useState(0);
  const [typeText, setTypeText] = useState("");
  const [typing, setTyping] = useState(true);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [statsCounted, setStatsCounted] = useState(false);
  const [statValues, setStatValues] = useState(STATS.map(() => 0));
  const [progressAnimated, setProgressAnimated] = useState(false);
  const [progressValues, setProgressValues] = useState({});
  const [planeSent, setPlaneSent] = useState(false);
  const sectionRefs = useRef({});

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 80;
    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      const ps = particlesRef.current;

      ps.forEach(p => {
        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.vx -= (dx / dist) * 0.015;
          p.vy -= (dy / dist) * 0.015;
        }
        p.vx *= 0.99; p.vy *= 0.99;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,212,255,0.5)";
        ctx.fill();
      });

      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(124,58,237,${(1 - d / 100) * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  // Custom cursor
  useEffect(() => {
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.left = e.clientX + "px";
        cursorInnerRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);
    const animate = () => {
      cursorPosRef.current.x += (mouseRef.current.x - cursorPosRef.current.x) * 0.12;
      cursorPosRef.current.y += (mouseRef.current.y - cursorPosRef.current.y) * 0.12;
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.left = cursorPosRef.current.x + "px";
        cursorOuterRef.current.style.top = cursorPosRef.current.y + "px";
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(rafRef.current); };
  }, []);

  // Typewriter
  useEffect(() => {
    const target = SUBTITLES[subtitleIdx];
    let timeout;
    if (typing) {
      if (typeText.length < target.length) {
        timeout = setTimeout(() => setTypeText(target.slice(0, typeText.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (typeText.length > 0) {
        timeout = setTimeout(() => setTypeText(typeText.slice(0, -1)), 35);
      } else {
        setSubtitleIdx((subtitleIdx + 1) % SUBTITLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [typeText, typing, subtitleIdx]);

  // Scroll
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, e.target.id]));
          setActiveSection(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
        }
      });
    }, { threshold: 0.15 });
    Object.values(sectionRefs.current).forEach(r => r && obs.observe(r));
    return () => obs.disconnect();
  }, []);

  // Stats counter
  useEffect(() => {
    if (!visibleSections.has("about") || statsCounted) return;
    setStatsCounted(true);
    STATS.forEach((s, i) => {
      const duration = 1500;
      const steps = 50;
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const progress = step / steps;
        const val = s.decimal
          ? parseFloat((s.value * progress).toFixed(2))
          : Math.round(s.value * progress);
        setStatValues(prev => { const n = [...prev]; n[i] = val; return n; });
        if (step >= steps) clearInterval(interval);
      }, duration / steps);
    });
  }, [visibleSections, statsCounted]);

  // Progress bars
  useEffect(() => {
    if (!visibleSections.has("skills") || progressAnimated) return;
    setProgressAnimated(true);
    const vals = {};
    Object.entries(SKILLS).forEach(([, skills]) => {
      skills.forEach(s => { vals[s.name] = 0; });
    });
    setProgressValues(vals);
    setTimeout(() => {
      const target = {};
      Object.entries(SKILLS).forEach(([, skills]) => {
        skills.forEach(s => { target[s.name] = s.level; });
      });
      let step = 0;
      const steps = 40;
      const interval = setInterval(() => {
        step++;
        const p = step / steps;
        const v = {};
        Object.entries(target).forEach(([k, val]) => { v[k] = Math.round(val * p); });
        setProgressValues(v);
        if (step >= steps) clearInterval(interval);
      }, 30);
    }, 200);
  }, [visibleSections, progressAnimated]);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const setRef = (id) => (el) => { sectionRefs.current[id] = el; };

  const sectionClass = (id) =>
    `transition-all duration-700 ${visibleSections.has(id) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`;

  return (
    <div style={{ fontFamily: "'Space Grotesk', 'Syne', sans-serif", background: "#050510", color: "#e2e8f0", minHeight: "100vh", position: "relative", overflow: "hidden", cursor: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { cursor: none !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #050510; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #00d4ff, #7c3aed); border-radius: 2px; }
        @keyframes shimmer { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(1.4); } }
        @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        @keyframes orbit { from { transform: rotate(0deg) translateX(80px) rotate(0deg); } to { transform: rotate(360deg) translateX(80px) rotate(-360deg); } }
        @keyframes float { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-10px); } }
        @keyframes slideFromLeft { from { opacity:0; transform:translateX(-60px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideFromRight { from { opacity:0; transform:translateX(60px); } to { opacity:1; transform:translateX(0); } }
        @keyframes planeFly { 0% { transform:translateX(0) translateY(0) rotate(0); opacity:1; } 100% { transform:translateX(120px) translateY(-80px) rotate(25deg); opacity:0; } }
        @keyframes gradient-border { 0% { transform:rotate(0deg); } 100% { transform:rotate(360deg); } }
        @keyframes letter-up { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
        @keyframes blob-move { 0%,100% { transform:translate(0,0) scale(1); } 33% { transform:translate(30px,-20px) scale(1.05); } 66% { transform:translate(-15px,15px) scale(0.95); } }
        @keyframes progress-glow { 0%,100% { box-shadow: 0 0 8px #00d4ff88; } 50% { box-shadow: 0 0 20px #7c3aedaa; } }
        .neon-text { background: linear-gradient(135deg, #00d4ff, #7c3aed, #f472b6); background-size: 200% 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 4s ease infinite; }
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(16px); border: 1px solid rgba(0,212,255,0.15); }
        .glass-hover:hover { background: rgba(255,255,255,0.06); border-color: rgba(0,212,255,0.35); }
        .glow-blue { box-shadow: 0 0 20px rgba(0,212,255,0.3), 0 0 40px rgba(0,212,255,0.1); }
        .glow-purple { box-shadow: 0 0 20px rgba(124,58,237,0.4), 0 0 40px rgba(124,58,237,0.15); }
        .glow-pink { box-shadow: 0 0 20px rgba(244,114,182,0.3), 0 0 40px rgba(244,114,182,0.1); }
        .btn-primary { background: linear-gradient(135deg, #00d4ff, #7c3aed); color: #fff; border: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: none; transition: all 0.3s; position: relative; overflow: hidden; }
        .btn-primary::before { content:''; position:absolute; top:0; left:-100%; width:100%; height:100%; background:linear-gradient(135deg,#7c3aed,#f472b6); transition:left 0.4s; }
        .btn-primary:hover::before { left:0; }
        .btn-primary span { position:relative; z-index:1; }
        .btn-outline { background:transparent; color:#00d4ff; border:1px solid #00d4ff; padding:12px 28px; border-radius:8px; font-weight:600; font-size:14px; cursor:none; transition:all 0.3s; }
        .btn-outline:hover { background:rgba(0,212,255,0.1); box-shadow:0 0 20px rgba(0,212,255,0.3); }
        .skill-card { perspective:1000px; }
        .skill-card-inner { transition:transform 0.6s; transform-style:preserve-3d; position:relative; }
        .skill-card:hover .skill-card-inner { transform:rotateY(180deg); }
        .skill-front, .skill-back { backface-visibility:hidden; -webkit-backface-visibility:hidden; }
        .skill-back { position:absolute; top:0; left:0; width:100%; height:100%; transform:rotateY(180deg); }
        .tilt-card { transition:transform 0.1s ease; }
        .magnetic { transition:transform 0.3s cubic-bezier(0.23,1,0.32,1); }
        .noise { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events:none; }
        .nav-indicator { position:absolute; bottom:0; height:2px; background:linear-gradient(90deg,#00d4ff,#7c3aed); border-radius:1px; box-shadow:0 0 8px #00d4ff; transition:all 0.3s ease; }
        .progress-bar { height:6px; border-radius:3px; transition:width 0.8s ease; animation:progress-glow 2s infinite; }
        .cert-card:nth-child(odd) { animation: slideFromLeft 0.7s ease forwards; }
        .cert-card:nth-child(even) { animation: slideFromRight 0.7s ease forwards; }
        .shimmer-card::after { content:''; position:absolute; top:-50%; left:-60%; width:30%; height:200%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent); transform:skewX(-20deg); animation:shimmer-slide 3s infinite; }
        @keyframes shimmer-slide { 0%{left:-60%} 100%{left:130%} }
      `}</style>

      {/* Canvas background */}
      <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* Noise overlay */}
      <div className="noise" style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", width: "100%", height: "100%" }} />

      {/* Scroll progress bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 9999, height: "3px",
        width: `${(scrollY / (document.documentElement?.scrollHeight - window.innerHeight || 1)) * 100}%`,
        background: "linear-gradient(90deg, #00d4ff, #7c3aed, #f472b6)",
        boxShadow: "0 0 10px #00d4ff",
        transition: "width 0.1s"
      }} />

      {/* Custom cursor */}
      <div ref={cursorOuterRef} style={{
        position: "fixed", width: 36, height: 36, borderRadius: "50%",
        border: "1.5px solid rgba(0,212,255,0.7)", pointerEvents: "none",
        zIndex: 99999, transform: "translate(-50%,-50%)",
        boxShadow: "0 0 12px rgba(0,212,255,0.5)", transition: "border-color 0.2s"
      }} />
      <div ref={cursorInnerRef} style={{
        position: "fixed", width: 6, height: 6, borderRadius: "50%",
        background: "#00d4ff", pointerEvents: "none", zIndex: 99999,
        transform: "translate(-50%,-50%)", boxShadow: "0 0 8px #00d4ff"
      }} />

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 60 ? "rgba(5,5,16,0.8)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(20px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid rgba(0,212,255,0.1)" : "none",
        transition: "all 0.4s"
      }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22 }} className="neon-text">AD</div>
        <div className="hidden md:flex" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link.toLowerCase())} style={{
              background: "none", border: "none", color: activeSection === link ? "#00d4ff" : "rgba(226,232,240,0.6)",
              fontWeight: 500, fontSize: 14, cursor: "none", transition: "color 0.25s ease, transform 0.25s ease, border-color 0.25s ease", letterSpacing: "0.05em",
              transform: activeSection === link ? "translateY(-1px)" : "translateY(0)",
              paddingBottom: 4, borderBottom: activeSection === link ? "2px solid #00d4ff" : "2px solid transparent",
              boxShadow: "none"
            }}>{link}</button>
          ))}
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#e2e8f0", cursor: "none", display: "none" }}
          className="hamburger">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0, zIndex: 999,
          background: "rgba(5,5,16,0.97)", backdropFilter: "blur(20px)",
          padding: "24px", display: "flex", flexDirection: "column", gap: 20,
          borderBottom: "1px solid rgba(0,212,255,0.15)"
        }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link.toLowerCase())} style={{
              background: "none", border: "none", color: "#e2e8f0", fontSize: 18, fontWeight: 600, cursor: "none", textAlign: "left"
            }}>{link}</button>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section id="home" ref={setRef("home")} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2, padding: "120px 40px 80px" }}>
        {/* Orbiting icons */}
        <div style={{ position: "relative", marginBottom: 48 }}>
          <div style={{
            width: 140, height: 140, borderRadius: "50%", position: "relative",
            background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))",
            border: "2px solid transparent",
            backgroundClip: "padding-box",
          }}>
            {/* Rotating conic gradient border */}
            <div style={{
              position: "absolute", inset: -2, borderRadius: "50%",
              background: "conic-gradient(#00d4ff, #7c3aed, #f472b6, #00d4ff)",
              zIndex: -1, animation: "spin 4s linear infinite"
            }} />
            <div style={{
              position: "absolute", inset: 2, borderRadius: "50%",
              background: "#050510", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 48
            }}>👨‍💻</div>
            {/* Available badge */}
            <div style={{
              position: "absolute", bottom: 8, right: -10,
              background: "rgba(5,5,16,0.9)", border: "1px solid rgba(0,212,255,0.3)",
              borderRadius: 20, padding: "4px 10px", display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap"
            }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", animation: "pulse-dot 1.5s infinite" }} />
              <span style={{ color: "#22c55e" }}>Available</span>
            </div>
          </div>
          {/* Orbit icons */}
          {ORBIT_ICONS.map((icon, i) => (
            <div key={i} style={{
              position: "absolute", top: "50%", left: "50%",
              width: 36, height: 36, marginTop: -18, marginLeft: -18,
              fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center",
              animation: `orbit ${4 + i * 0.8}s linear infinite`,
              animationDelay: `${i * -0.8}s`
            }}>{icon}</div>
          ))}
        </div>

        {/* Name letters */}
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(34px,6vw,72px)", fontWeight: 800, lineHeight: 1.02, textAlign: "center", marginBottom: 16, whiteSpace: "nowrap" }}>
          {NAME_LETTERS.map((ch, i) => (
            <span key={i} className="neon-text" style={{
              display: "inline-block",
              animation: `letter-up 0.5s ease ${i * 0.05}s both`,
              whiteSpace: ch === " " ? "pre" : "normal"
            }}>{ch}</span>
          ))}
        </h1>

        {/* Typewriter */}
        <div style={{ fontSize: "clamp(16px,2.5vw,22px)", color: "rgba(226,232,240,0.7)", marginBottom: 8, minHeight: 34, textAlign: "center", fontWeight: 400 }}>
          <span style={{ color: "#00d4ff" }}>{typeText}</span>
          <span style={{ animation: "pulse-dot 0.9s infinite", color: "#7c3aed", marginLeft: 2 }}>|</span>
        </div>

        <p style={{ color: "rgba(226,232,240,0.45)", fontSize: 14, marginBottom: 12, letterSpacing: "0.1em" }}>📍 Rajkot, Gujarat, India</p>
        <p style={{ color: "rgba(226,232,240,0.6)", fontSize: 15, marginBottom: 40, fontStyle: "italic" }}>⚡ Consistent practice beats talent 🚀</p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn-primary" onClick={() => scrollTo("projects")}>
            <span>View My Work →</span>
          </button>
          <button className="btn-outline" onClick={() => alert("📄 Resume download coming soon!")}>
            Download Resume
          </button>
        </div>

        {/* Scroll arrow */}
        <div style={{ position: "absolute", bottom: 40, animation: "bounce 2s infinite", color: "#00d4ff", opacity: 0.6 }}>
          <ChevronDown size={28} />
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={setRef("about")} style={{ padding: "100px 40px", maxWidth: 1100, margin: "0 auto", zIndex: 2, position: "relative" }}>
        <div className={sectionClass("about")}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, textAlign: "center", marginBottom: 64 }} className="neon-text">
            About Me
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            {/* Bio */}
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(226,232,240,0.75)", marginBottom: 20 }}>
                I'm a <strong style={{ color: "#00d4ff" }}>Computer Engineering student</strong> at RK University (Batch 2023–2027), currently maintaining a CGPA of <strong style={{ color: "#7c3aed" }}>8.10</strong>.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(226,232,240,0.75)", marginBottom: 20 }}>
                I build real-world full-stack projects — from mobile apps in Flutter to PHP-backed web platforms. I'm passionate about <strong style={{ color: "#f472b6" }}>open source</strong> and collaborative development.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(226,232,240,0.75)" }}>
                Currently seeking <strong style={{ color: "#00d4ff" }}>internships</strong> and open source opportunities where I can contribute, grow, and build impactful software.
              </p>
            </div>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {STATS.map((s, i) => (
                <div key={i} className="glass glass-hover" style={{ borderRadius: 16, padding: "28px 20px", textAlign: "center", transition: "all 0.3s" }}>
                  <div style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, fontFamily: "'Syne', sans-serif" }} className="neon-text">
                    {s.decimal ? statValues[i].toFixed(2) : statValues[i]}{s.suffix}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(226,232,240,0.5)", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={setRef("skills")} style={{ padding: "100px 40px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }} className={sectionClass("skills")}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, textAlign: "center", marginBottom: 16 }} className="neon-text">Skills</h2>
          <p style={{ textAlign: "center", color: "rgba(226,232,240,0.4)", marginBottom: 48, fontSize: 15 }}>Hover cards to flip and see proficiency</p>

          {/* Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
            {Object.keys(SKILLS).map(tab => (
              <button key={tab} onClick={() => setSkillTab(tab)} style={{
                padding: "8px 22px", borderRadius: 24, fontSize: 14, fontWeight: 600, cursor: "none", transition: "all 0.3s",
                background: skillTab === tab ? "linear-gradient(135deg, #00d4ff, #7c3aed)" : "rgba(255,255,255,0.04)",
                border: skillTab === tab ? "none" : "1px solid rgba(0,212,255,0.2)",
                color: skillTab === tab ? "#fff" : "rgba(226,232,240,0.6)",
                boxShadow: skillTab === tab ? "0 0 20px rgba(0,212,255,0.3)" : "none"
              }}>{tab}</button>
            ))}
          </div>

          {/* Skill cards grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 20 }}>
            {SKILLS[skillTab].map((skill, i) => (
              <div key={skill.name} className="skill-card" style={{ height: 120 }}>
                <div className="skill-card-inner" style={{ height: "100%" }}>
                  {/* Front */}
                  <div className="skill-front glass" style={{
                    height: "100%", borderRadius: 14, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    animation: `float 3s ease ${i * 0.2}s infinite`
                  }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>{skill.name}</div>
                    <div style={{ width: "70%", height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
                      <div className="progress-bar" style={{
                        width: `${progressValues[skill.name] || 0}%`,
                        background: "linear-gradient(90deg, #00d4ff, #7c3aed)"
                      }} />
                    </div>
                    <div style={{ fontSize: 12, color: "#00d4ff", marginTop: 6 }}>{skill.level}%</div>
                  </div>
                  {/* Back */}
                  <div className="skill-back glass" style={{
                    height: "100%", borderRadius: 14, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    background: "rgba(124,58,237,0.15)", borderColor: "rgba(124,58,237,0.4)"
                  }}>
                    <div style={{ fontSize: 28, marginBottom: 6 }}>
                      {skill.level >= 85 ? "🔥" : skill.level >= 75 ? "💪" : skill.level >= 65 ? "⚡" : "🌱"}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed" }}>
                      {skill.level >= 85 ? "Expert" : skill.level >= 75 ? "Advanced" : skill.level >= 65 ? "Intermediate" : "Learning"}
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#e2e8f0", marginTop: 4 }}>{skill.level}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={setRef("projects")} style={{ padding: "100px 40px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }} className={sectionClass("projects")}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, textAlign: "center", marginBottom: 64 }} className="neon-text">Projects</h2>

          {/* Featured project */}
          {PROJECTS.filter(p => p.featured).map((proj, i) => (
            <ProjectCard key={i} proj={proj} featured />
          ))}

          {/* Other projects */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginTop: 32 }}>
            {PROJECTS.filter(p => !p.featured).map((proj, i) => (
              <ProjectCard key={i} proj={proj} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" ref={setRef("certifications")} style={{ padding: "100px 40px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }} className={sectionClass("certifications")}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, textAlign: "center", marginBottom: 64 }} className="neon-text">Certifications</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {CERTS.map((cert, i) => (
              <div key={i} className={`cert-card shimmer-card glass glass-hover`} style={{
                borderRadius: 16, padding: "28px 32px", display: "flex", alignItems: "center", gap: 20,
                opacity: visibleSections.has("certifications") ? 1 : 0,
                animationDelay: `${i * 0.15}s`,
                animationFillMode: "both",
                position: "relative", overflow: "hidden"
              }}>
                <div style={{ fontSize: 36 }}>{cert.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: "#e2e8f0", marginBottom: 4 }}>{cert.title}</div>
                  <div style={{ fontSize: 14, color: "#00d4ff", fontWeight: 500 }}>{cert.issuer}</div>
                </div>
                <div style={{ marginLeft: "auto", padding: "6px 16px", borderRadius: 20, background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(124,58,237,0.15))", border: "1px solid rgba(0,212,255,0.3)", fontSize: 12, fontWeight: 600, color: "#00d4ff" }}>
                  Certified
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Stats */}
      <section id="github" ref={setRef("github")} style={{ padding: "80px 40px", position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }} className={sectionClass("github")}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, textAlign: "center", marginBottom: 48 }} className="neon-text">GitHub Stats</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {[
              "https://github-readme-stats.vercel.app/api?username=Aditya-255&show_icons=true&theme=tokyonight&hide_border=true",
              "https://github-readme-stats.vercel.app/api/top-langs/?username=Aditya-255&layout=compact&theme=tokyonight&hide_border=true"
            ].map((url, i) => (
              <div key={i} className="glass" style={{ borderRadius: 16, padding: 16, overflow: "hidden", transition: "all 0.5s", opacity: visibleSections.has("github") ? 1 : 0, transform: visibleSections.has("github") ? "scale(1)" : "scale(0.95)" }}>
                <img src={url} alt="GitHub stats" style={{ width: "100%", borderRadius: 8 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={setRef("contact")} style={{ padding: "100px 40px", position: "relative", zIndex: 2, overflow: "hidden" }}>
        {/* Animated blobs */}
        <div style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.08), transparent)", animation: "blob-move 8s ease infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "10%", width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.1), transparent)", animation: "blob-move 10s ease 2s infinite reverse", pointerEvents: "none" }} />

        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }} className={sectionClass("contact")}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, marginBottom: 16 }} className="neon-text">
            Let's Build Something Amazing
          </h2>
          <p style={{ color: "rgba(226,232,240,0.5)", fontSize: 16, marginBottom: 56 }}>
            Open to internships, collaborations & open source
          </p>

          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { icon: <Mail size={20} />, label: "Email Me", href: "mailto:adityadodiya449@gmail.com", color: "#f472b6" },
              { icon: <ExternalLink size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/aditya-dodiya-942218319/", color: "#00d4ff" },
              { icon: <Code2 size={20} />, label: "GitHub", href: "https://github.com/Aditya-255", color: "#7c3aed" },
            ].map((btn, i) => (
              <MagneticButton key={i} href={btn.href} icon={btn.icon} label={btn.label} color={btn.color} planeSent={planeSent} setPlaneSent={btn.label === "Email Me" ? setPlaneSent : null} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "40px", textAlign: "center", color: "rgba(226,232,240,0.25)", fontSize: 13, zIndex: 2, position: "relative", borderTop: "1px solid rgba(0,212,255,0.06)" }}>
        Designed & Built by <span style={{ color: "#00d4ff" }}>Aditya Dodiya</span> · {new Date().getFullYear()}
      </footer>

      {/* Back to top */}
      {scrollY > 300 && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{
          position: "fixed", bottom: 32, right: 32, zIndex: 500, width: 48, height: 48,
          borderRadius: "50%", background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
          border: "none", cursor: "none", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 20px rgba(0,212,255,0.5)", transition: "transform 0.2s"
        }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
          <ArrowUp size={20} color="#fff" />
        </button>
      )}
    </div>
  );
}

function ProjectCard({ proj, featured }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateZ(8px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateY(0) rotateX(0) translateZ(0)";
  }, []);

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      className="tilt-card glass glass-hover"
      style={{
        borderRadius: 20, padding: featured ? "36px 40px" : "28px 28px",
        marginBottom: featured ? 32 : 0, transition: "transform 0.15s ease, background 0.3s",
        position: "relative", overflow: "hidden"
      }}>
      {featured && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          {/* Browser dots */}
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
          <div style={{ marginLeft: "auto", fontSize: 11, padding: "3px 12px", borderRadius: 12, background: "linear-gradient(135deg, #00d4ff, #7c3aed)", color: "#fff", fontWeight: 700 }}>⭐ Featured</div>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: featured ? 26 : 20, color: "#e2e8f0" }}>{proj.title}</h3>
        <span style={{ fontSize: 12, color: "rgba(226,232,240,0.35)", paddingTop: 4 }}>{proj.period}</span>
      </div>
      <p style={{ color: "rgba(226,232,240,0.6)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{proj.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {proj.tech.map((t, i) => (
          <span key={t} style={{
            padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
            background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00d4ff",
            animation: `letter-up 0.3s ease ${i * 0.05}s both`
          }}>{t}</span>
        ))}
      </div>
      <a href={proj.github} target="_blank" rel="noopener noreferrer" style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 600,
        background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#7c3aed",
        textDecoration: "none", transition: "all 0.3s", cursor: "none"
      }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(124,58,237,0.25)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(124,58,237,0.3)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(124,58,237,0.15)"; e.currentTarget.style.boxShadow = "none"; }}>
        <Code2 size={15} />
        View Code
        <ExternalLink size={13} style={{ transition: "transform 0.3s" }} />
      </a>
    </div>
  );
}

function MagneticButton({ href, icon, label, color, planeSent, setPlaneSent }) {
  const ref = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "translate(0,0)";
      ref.current.style.background = "rgba(255,255,255,0.03)";
      ref.current.style.boxShadow = "none";
    }
  }, []);

  const handleClick = () => {
    if (setPlaneSent) {
      setPlaneSent(true);
      setTimeout(() => setPlaneSent(false), 2000);
    }
    window.open(href, "_blank");
  };

  return (
    <button ref={ref} className="magnetic" onMouseMove={handleMouseMove} onClick={handleClick}
      style={{
        display: "flex", alignItems: "center", gap: 10, padding: "14px 28px",
        borderRadius: 14, fontSize: 15, fontWeight: 600, cursor: "none",
        background: "rgba(255,255,255,0.03)", border: `1px solid ${color}44`,
        color, transition: "all 0.3s", position: "relative", overflow: "hidden"
      }}
      onMouseEnter={e => { e.currentTarget.style.background = `${color}15`; e.currentTarget.style.boxShadow = `0 0 24px ${color}44`; }}
      onMouseLeave={handleMouseLeave}>
      <span style={{ animation: setPlaneSent && planeSent ? "planeFly 0.8s ease forwards" : "none" }}>{icon}</span>
      {label}
    </button>
  );
}