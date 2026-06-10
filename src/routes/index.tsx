import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight, Code2, Database, Brain, Cpu, GraduationCap, Award, Sparkles, Download, ExternalLink, Clock, Menu, Send, CheckCircle2, AlertCircle, Loader2, Sun, Moon, Wrench, Users, Terminal } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { AnimatedSection } from "@/components/AnimatedSection";
import { StaggerContainer, StaggerItem } from "@/components/StaggerContainer";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import girinathPhoto from "@/assets/girinath.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Girinath K — AI & Data Science Portfolio" },
      { name: "description", content: "Portfolio of Girinath K — Artificial Intelligence & Data Science student building practical ML, computer vision, and Python applications." },
      { property: "og:title", content: "Girinath K — AI & Data Science Portfolio" },
      { property: "og:description", content: "AI & Data Science student crafting practical machine learning, computer vision and Python projects." },
    ],
  }),
  component: Portfolio,
});

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const PROJECTS = [
  {
    title: "Face Attendance System",
    stack: ["Python", "OpenCV", "Computer Vision"],
    description: "Eliminated manual roll-calls for a class of 60+ students — built a real-time face-recognition pipeline with OpenCV that logs attendance in under 15 seconds, replacing a 5-minute paper process.",
    icon: Brain,
    accent: "from-[oklch(0.88_0.21_128)] to-[oklch(0.70_0.18_200)]",
    github: "https://github.com/girinath01/face-attendance-system",
    comingSoon: false,
  },
  {
    title: "Interactive Mathematics Platform",
    stack: ["Python", "HTML", "Algorithms"],
    description: "Made abstract maths accessible for students by transforming dry textbook concepts into step-by-step interactive visualisations and logic-based problem solvers — learning by doing, not memorising.",
    icon: Cpu,
    accent: "from-[oklch(0.70_0.18_200)] to-[oklch(0.88_0.21_128)]",
    github: "https://github.com/navin2006-kumar/MathXplore",
    comingSoon: false,
  },
  {
    title: "Notes Sharing Platform",
    stack: ["Python", "Web", "Collaboration"],
    description: "Replaced scattered WhatsApp groups and shared drives with a dedicated peer-to-peer notes platform — enabling students to upload, discover, and share academic notes in one clean place.",
    icon: Database,
    accent: "from-[oklch(0.88_0.21_128)] to-[oklch(0.70_0.18_200)]",
    github: "https://github.com/girinath01/notes-sharing-between-peers",
    comingSoon: false,
  },
  {
    title: "SMS Spam Detection",
    stack: ["Python", "Scikit-learn", "NLP", "Flask", "TF-IDF"],
    description: "Built an ML pipeline that classifies incoming SMS messages as spam or legitimate in real time — combining TF-IDF vectorisation with Naive Bayes and Logistic Regression to outperform keyword-based filters and cut cyber fraud risk for everyday users.",
    icon: Terminal,
    accent: "from-[oklch(0.75_0.18_30)] to-[oklch(0.88_0.21_128)]",
    github: null,
    comingSoon: false,
    badge: "Planning stage",
  },
];

const SKILL_GROUPS = [
  { title: "Programming", icon: Code2,    items: ["Python", "SQL", "Java", "C / C++", "HTML / CSS"] },
  { title: "Tools",       icon: Wrench,   items: ["Git & GitHub", "Linux", "VS Code", "OpenCV"] },
  { title: "Core AI/DS",  icon: Sparkles, items: ["Machine Learning", "Data Analysis", "Data Visualization", "Problem Solving"] },
  { title: "Soft Skills", icon: Users,    items: ["Communication", "Teamwork", "Adaptability", "Critical Thinking"] },
];

const EDUCATION = [
  {
    title: "B.Tech — Artificial Intelligence & Data Science",
    school: "KGISL Institute of Technology, Coimbatore",
    year: "2024 — Present",
    status: "active",
    tags: ["Machine Learning", "Deep Learning", "Data Science", "Python"],
    highlight: "CGPA tracking · AI specialisation",
  },
  {
    title: "Higher Secondary (HSC)",
    school: "Amrutha Matric Hr. Sec School, Dharmapuri",
    year: "2023 — 2024",
    status: "completed",
    tags: ["Mathematics", "Physics"],
    highlight: "Science stream",
  },
  {
    title: "Secondary (SSC)",
    school: "Amrutha Matric Hr. Sec School, Dharmapuri",
    year: "2022 — 2023",
    status: "completed",
    tags: ["Mathematics", "Science"],
    highlight: "Strong academic foundation",
  },
];

const CERTS = [
  {
    name: "Exploratory Data Analysis for Machine Learning",
    issuer: "IBM / Coursera",
    category: "AI & ML",
  },
  {
    name: "Introduction to Networking and Storage",
    issuer: "IBM Skills Network",
    category: "Infrastructure",
  },
  {
    name: "Tools of the Trade: Linux and SQL",
    issuer: "Google / Coursera",
    category: "DevTools",
  },
];

function Portfolio() {
  // Always start hidden to prevent SSR flash of nav before loader mounts
  const [loading, setLoading] = useState(true);
  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("portfolio_visited")) {
      // Returning visitor — skip loader, reveal instantly
      setLoading(false);
    } else {
      // First visit — mount the loader
      setShouldShowLoader(true);
    }
  }, []);

  const handleLoaderComplete = useCallback(() => {
    sessionStorage.setItem("portfolio_visited", "1");
    setLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {shouldShowLoader && loading && <PageLoader onComplete={handleLoaderComplete} />}
      </AnimatePresence>
      <motion.div
        className="grain min-h-screen bg-background text-foreground overflow-x-hidden"
        initial={false}
        animate={loading ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <Nav />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
        <Footer />
      </motion.div>
    </>
  );
}

/* ── Page Loader ──────────────────────────────────────────────────────────── */
function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "progress" | "done">("enter");
  const [displayPct, setDisplayPct] = useState(0);

  useEffect(() => {
    // Phase 1 — logo entrance (550ms)
    const t1 = setTimeout(() => setPhase("progress"), 550);

    // Phase 2 — counter display (mirrors bar duration ~1000ms)
    let rafId: number;
    let startTs: number | null = null;
    const DURATION = 1000;

    const t2 = setTimeout(() => {
      function countUp(ts: number) {
        if (!startTs) startTs = ts;
        const pct = Math.min(Math.round(((ts - startTs) / DURATION) * 100), 100);
        setDisplayPct(pct);
        if (pct < 100) {
          rafId = requestAnimationFrame(countUp);
        } else {
          // Phase 3 — small pause then reveal
          setTimeout(() => setPhase("done"), 120);
          setTimeout(onComplete, 680);
        }
      }
      rafId = requestAnimationFrame(countUp);
    }, 550);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(rafId);
    };
  }, [onComplete]);

  return (
    <motion.div
      key="page-loader"
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
      transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Grid backdrop */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Ambient glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.88 0.21 128 / 0.12) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo block */}
      <motion.div
        className="relative flex flex-col items-center gap-7"
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* [G] badge with springy pop */}
        <motion.div
          className="relative w-20 h-20 rounded-2xl bg-primary text-primary-foreground grid place-items-center font-mono font-bold text-4xl shadow-glow select-none"
          initial={{ scale: 0.6, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.05 }}
        >
          G
          {/* Expanding ring pulse */}
          <motion.span
            className="absolute inset-0 rounded-2xl border-2 border-primary"
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.7, 0, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: [0.25, 0.46, 0.45, 0.94], repeatDelay: 0.4 }}
          />
        </motion.div>

        {/* Name — each part fades in sequentially */}
        <motion.div
          className="flex items-center gap-0.5 font-display font-bold text-2xl tracking-tight"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span>Girinath</span>
          <span className="text-primary mx-0.5">.</span>
          <span>K</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="font-mono text-[11px] text-muted-foreground tracking-[0.25em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.36, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          AI &amp; Data Science
        </motion.p>
      </motion.div>

      {/* Progress bar — GPU-accelerated scaleX + shimmer */}
      <motion.div
        className="absolute bottom-14 left-1/2 -translate-x-1/2 w-52"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: phase !== "enter" ? 1 : 0, y: phase !== "enter" ? 0 : 6 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Track */}
        <div className="relative w-full h-[2px] rounded-full bg-border overflow-hidden">
          {/* Fill — scaleX is GPU-accelerated unlike width */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === "progress" || phase === "done" ? 1 : 0 }}
            transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1], delay: 0 }}
          />
          {/* Shimmer sweep on top */}
          <motion.div
            className="absolute inset-0 rounded-full origin-left"
            style={{
              background: "linear-gradient(90deg, transparent 0%, oklch(1 0 0 / 0.45) 50%, transparent 100%)",
            }}
            initial={{ x: "-100%" }}
            animate={{ x: phase === "progress" || phase === "done" ? "200%" : "-100%" }}
            transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1], delay: 0 }}
          />
        </div>

        {/* Percentage counter */}
        <motion.div
          className="mt-3 text-center font-mono text-[11px] text-muted-foreground tabular-nums"
          animate={{ opacity: phase !== "enter" ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {String(displayPct).padStart(2, "0")}%
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeSection, setActiveSection] = useState("top");
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  useEffect(() => {
    const sections = ["top", "about", "skills", "projects", "education", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Restore saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);
  }, []);

  // Apply theme to <html> and persist
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header className={`fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
      scrolled ? "bg-background/80 border-border shadow-card" : "bg-background/30 border-transparent"
    }`}>
      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left z-10"
        style={{ scaleX: scrollYProgress }}
      />
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="w-8 h-8 rounded-md bg-primary text-primary-foreground grid place-items-center font-mono">G</span>
          <span>Girinath<span className="text-primary">.</span>K</span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {NAV.map((n) => {
            const sectionId = n.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <li key={n.href} className="relative">
                <a
                  href={n.href}
                  className={`transition-colors ${
                    isActive ? "text-primary font-medium" : "hover:text-foreground"
                  }`}
                >
                  {n.label}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle light / dark mode"
            className="w-9 h-9 rounded-xl border border-border bg-surface/60 grid place-items-center text-foreground hover:border-primary/60 hover:text-primary transition"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm font-medium text-foreground hover:border-primary/60 hover:text-primary transition"
          >
            <Download className="w-3.5 h-3.5" /> Resume
          </a>
          <MagneticButton href="#contact" className="shimmer-btn inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
            Hire me <ArrowUpRight className="w-4 h-4" />
          </MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle light / dark mode"
            className="w-9 h-9 rounded-xl border border-border bg-surface/60 grid place-items-center text-foreground hover:border-primary/60 hover:text-primary transition"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a href="#contact" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
            Hire me
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open navigation menu"
                className="w-10 h-10 rounded-xl border border-border bg-surface/60 grid place-items-center text-foreground hover:border-primary/60 hover:text-primary transition"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-background border-border p-0 flex flex-col">
              {/* Drawer header */}
              <div className="px-6 py-5 border-b border-border flex items-center gap-3">
                <span className="w-8 h-8 rounded-md bg-primary text-primary-foreground grid place-items-center font-mono font-bold text-sm">G</span>
                <span className="font-display font-bold">Girinath<span className="text-primary">.</span>K</span>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-6 space-y-1">
                {NAV.map((n) => (
                  <SheetClose asChild key={n.href}>
                    <a
                      href={n.href}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-surface transition font-medium"
                    >
                      {n.label}
                      <ArrowUpRight className="w-4 h-4 opacity-40" />
                    </a>
                  </SheetClose>
                ))}
              </nav>

              {/* Drawer footer actions */}
              <div className="px-4 py-6 border-t border-border space-y-3">
                <a
                  href="/resume.pdf"
                  download
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm font-medium text-foreground hover:border-primary/60 hover:text-primary transition"
                >
                  <Download className="w-4 h-4" /> Download Resume
                </a>
                <SheetClose asChild>
                  <a
                    href="#contact"
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
                  >
                    Hire me <ArrowUpRight className="w-4 h-4" />
                  </a>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

const ROLES = ["ML Engineer", "Python Developer", "AI Enthusiast", "Problem Solver"];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section id="top" className="relative pt-20 pb-16 md:pt-24 md:pb-24 overflow-hidden">
      {/* Aurora orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="aurora-1 absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-[oklch(0.88_0.21_128/0.12)] blur-[120px]" />
        <div className="aurora-2 absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[oklch(0.70_0.18_200/0.10)] blur-[100px]" />
        <div className="aurora-3 absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-[oklch(0.65_0.20_280/0.08)] blur-[80px]" />
      </div>
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-mono text-muted-foreground mb-8 hover:border-primary/60 hover:text-primary transition cursor-pointer"
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            Open to work · AI / Data Science · Let's talk →
          </motion.a>
          {/* Typewriter role line */}
          <motion.div
            className="flex items-center gap-2 font-mono text-sm text-muted-foreground mb-5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.28, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Terminal className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary">&gt;</span>
            <span className="text-foreground font-medium min-w-[160px]">{role}</span>
            <span className="cursor-blink text-primary font-bold">|</span>
          </motion.div>

          <motion.h1
            className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            Building <span className="text-gradient-animate">intelligent</span><br />
            systems that<br />
            <span className="text-gradient">solve real problems.</span>
          </motion.h1>
          <motion.p
            className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.48, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            I'm <span className="text-foreground font-medium">Girinath K</span> — an Artificial Intelligence & Data Science student passionate about machine learning, computer vision, and turning Python prototypes into useful, production-shaped tools.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <MagneticButton
              href="#projects"
              className="border-beam shimmer-btn inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-glow transition"
            >
              View my work <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton
              href="#contact"
              className="shimmer-btn inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-6 py-3 font-medium text-foreground hover:bg-surface transition"
            >
              Get in touch
            </MagneticButton>
            <motion.a
              href="/resume.pdf"
              download
              className="shimmer-btn inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 font-medium text-primary hover:bg-primary/20 hover:border-primary/70 transition"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" /> Resume
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto lg:mx-0 w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.93, x: 24 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.95, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/40 to-accent/30 rounded-[2rem] blur-2xl opacity-60 animate-pulse-glow" />
          <motion.div
            className="relative rounded-[2rem] overflow-hidden border border-border bg-surface shadow-card animate-float"
            whileHover={{ scale: 1.02, rotate: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <img
              src={girinathPhoto}
              alt="Portrait of Girinath K"
              className="w-full h-auto object-cover aspect-[4/5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div>
                <div className="font-display font-bold text-lg">Girinath K</div>
                <div className="text-xs font-mono text-primary">AI & DS · India</div>
              </div>
              <span className="w-3 h-3 rounded-full bg-primary shadow-glow animate-pulse-glow" />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="relative max-w-6xl mx-auto px-6 mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {[
            { k: "3+", v: "Projects shipped", sub: "& counting" },
            { k: "5+", v: "Languages", sub: "Python-first" },
            { k: "3", v: "Certifications", sub: "IBM · Coursera" },
            { k: "2nd", v: "Year · KGISL", sub: "AI & Data Science" },
          ].map((s) => (
            <StaggerItem key={s.v}>
              <motion.div
                className="bg-surface p-6 h-full group cursor-default"
                whileHover={{ backgroundColor: "var(--surface-elevated)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl font-display font-bold text-primary group-hover:scale-110 transition-transform origin-left">{s.k}</div>
                <div className="text-sm font-medium text-foreground mt-1">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-0.5 font-mono">{s.sub}</div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </motion.div>
    </section>
  );
}

function MagneticButton({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.6 });

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.3);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const scale = useMotionValue(1);

  const sx = useSpring(mx, { stiffness: 300, damping: 26, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 300, damping: 26, mass: 0.4 });
  const scaleSpring = useSpring(scale, { stiffness: 320, damping: 22 });

  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);

  const [spotX, setSpotX] = useState(50);
  const [spotY, setSpotY] = useState(50);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    scale.set(1.022);
    setHovered(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    mx.set(nx - 0.5);
    my.set(ny - 0.5);
    setSpotX(nx * 100);
    setSpotY(ny * 100);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
    scale.set(1);
    setHovered(false);
  };

  return (
    <div
      className="tilt-container h-full"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, scale: scaleSpring }}
        className={`glow-card relative rounded-3xl border border-border bg-surface shadow-card overflow-hidden h-full flex flex-col ${className ?? ""}`}
      >
        {/* Cursor spotlight — always JS-driven, never CSS group-hover */}
        <div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-200"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${spotX}% ${spotY}%, oklch(0.88 0.21 128 / 0.12), transparent 65%)`,
          }}
        />
        {children}
      </motion.div>
    </div>
  );
}

const TECH_ICONS = [
  { name: "Python",  cls: "devicon-python-plain colored" },
  { name: "Java",    cls: "devicon-java-plain colored" },
  { name: "C++",     cls: "devicon-cplusplus-plain colored" },
  { name: "HTML",    cls: "devicon-html5-plain colored" },
  { name: "Git",     cls: "devicon-git-plain colored" },
  { name: "GitHub",  cls: "devicon-github-original" },
  { name: "Linux",   cls: "devicon-linux-plain" },
  { name: "VS Code", cls: "devicon-vscode-plain colored" },
  { name: "MySQL",   cls: "devicon-mysql-plain colored" },
  { name: "OpenCV",  cls: "devicon-opencv-plain colored" },
  { name: "NumPy",   cls: "devicon-numpy-plain colored" },
  { name: "Pandas",  cls: "devicon-pandas-plain" },
];

function About() {
  return (
    <section id="about" className="relative py-24 border-t border-border overflow-hidden">
      {/* 01 watermark — direct child of section, clipped by overflow-hidden */}
      <div className="section-num absolute -top-4 -left-4 select-none pointer-events-none">01</div>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 relative">
        <AnimatedSection>
          <SectionLabel>01 · About</SectionLabel>
          <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold">A student-engineer obsessed with <span className="text-primary">building</span>.</h2>
        </AnimatedSection>
        <AnimatedSection className="md:col-span-2 space-y-5 text-lg text-muted-foreground leading-relaxed" delay={0.15}>
          <p>
            I'm a second-year B.Tech student in Artificial Intelligence and Data Science at KGISL Institute of Technology, Coimbatore. My focus is on machine learning fundamentals, Python development, and shipping projects that solve practical problems — not toy demos.
          </p>
          <p>
            I learn fastest by building. Whether it's a face-recognition attendance pipeline with OpenCV or an interactive math platform for students, I treat every project as a chance to sharpen both the engineering and the design thinking.
          </p>
          <p>
            I'm actively seeking <span className="text-foreground font-medium">internship opportunities</span> in AI, Data Science and Software Development where I can contribute, learn from senior engineers, and ship work that ends up in production.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-sm font-mono text-primary shrink-0">Currently exploring →</span>
            {["Deep Learning", "FastAPI", "LangChain", "RAG"].map((t) => (
              <span key={t} className="text-xs rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-primary font-mono">{t}</span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="relative py-24 border-t border-border overflow-hidden">
      {/* 02 watermark — direct child of section, clipped by overflow-hidden */}
      <div className="section-num absolute -top-4 right-0 text-right select-none pointer-events-none">02</div>
      <div className="max-w-6xl mx-auto px-6 relative">
        <AnimatedSection>
          <SectionLabel>02 · Toolkit</SectionLabel>
          <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold max-w-2xl">The stack I reach for.</h2>
        </AnimatedSection>

        {/* Devicon icon grid */}
        <StaggerContainer className="mt-14 grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-5">
          {TECH_ICONS.map(({ name, cls }) => (
            <StaggerItem key={name}>
              <motion.div
                className="group flex flex-col items-center gap-2 cursor-default"
                whileHover={{ y: -8, scale: 1.12 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
              >
                <div className="w-14 h-14 rounded-2xl border border-border bg-surface grid place-items-center group-hover:border-primary/50 group-hover:bg-primary/5 group-hover:shadow-glow transition-all duration-300">
                  <i className={`${cls} text-3xl`} style={{ filter: "drop-shadow(0 0 6px oklch(0.88 0.21 128 / 0))" }} />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary transition-colors text-center">{name}</span>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Skill group cards */}
        <StaggerContainer className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_GROUPS.map((g) => {
            const GroupIcon = g.icon;
            return (
              <StaggerItem key={g.title}>
                <motion.div
                  className="group relative rounded-2xl border border-border bg-surface p-6 hover:border-primary/50 transition shadow-card h-full"
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary mb-4 group-hover:bg-primary/20 transition">
                    <GroupIcon className="w-5 h-5" />
                  </div>
                  <div className="font-mono text-xs text-primary uppercase tracking-wider">{g.title}</div>
                  <ul className="mt-4 space-y-2">
                    {g.items.map((i) => (
                      <li key={i} className="flex items-center gap-2 text-foreground text-sm">
                        <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <AnimatedSection className="mt-10" delay={0.3}>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-4">Quick picks</div>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Python",           color: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400" },
              { label: "Machine Learning",  color: "border-primary/40 bg-primary/10 text-primary" },
              { label: "OpenCV",            color: "border-blue-500/40 bg-blue-500/10 text-blue-400" },
              { label: "SQL",               color: "border-orange-500/40 bg-orange-500/10 text-orange-400" },
              { label: "Linux",             color: "border-slate-400/40 bg-slate-400/10 text-slate-400" },
              { label: "Git",               color: "border-red-500/40 bg-red-500/10 text-red-400" },
              { label: "Data Analysis",     color: "border-purple-500/40 bg-purple-500/10 text-purple-400" },
              { label: "Java",              color: "border-amber-600/40 bg-amber-600/10 text-amber-500" },
            ].map(({ label, color }) => (
              <motion.span
                key={label}
                className={`rounded-full border px-4 py-1.5 text-xs font-mono ${color}`}
                whileHover={{ y: -3, scale: 1.06 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {label}
              </motion.span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative py-24 border-t border-border overflow-hidden">
      {/* 03 watermark — direct child of section, clipped by overflow-hidden */}
      <div className="section-num absolute -top-4 -left-4 select-none pointer-events-none">03</div>
      <div className="max-w-6xl mx-auto px-6 relative">
        <AnimatedSection className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <SectionLabel>03 · Selected work</SectionLabel>
            <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold max-w-2xl">Projects I've shipped.</h2>
          </div>
          <a href="https://github.com/girinath01" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
            <Github className="w-4 h-4" /> github.com/girinath01
          </a>
        </AnimatedSection>

        <StaggerContainer className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => {
            const Icon = p.icon;
            return (
              <StaggerItem key={p.title}>
                <TiltCard className="group p-7 hover:bg-surface-elevated transition">
                  <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${p.accent} opacity-10 blur-2xl group-hover:opacity-25 transition`} />
                  <div className="relative flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-12 h-12 rounded-xl bg-background border border-border grid place-items-center text-primary shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      {p.comingSoon && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 text-xs font-mono text-muted-foreground">
                          <Clock className="w-3 h-3" /> Coming soon
                        </span>
                      )}
                      {p.badge && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-mono text-amber-400">
                          <Clock className="w-3 h-3" /> {p.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-6 text-2xl font-display font-bold">{p.title}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed flex-1">{p.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span key={s} className="text-xs font-mono rounded-full border border-border bg-background/50 px-2.5 py-1 text-muted-foreground">{s}</span>
                      ))}
                    </div>
                    <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
                      {p.github ? (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3.5 py-1.5 text-xs font-mono text-muted-foreground hover:border-primary/60 hover:text-primary transition"
                        >
                          <Github className="w-3.5 h-3.5" /> View source
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground/50 cursor-not-allowed">
                          <Github className="w-3.5 h-3.5" /> Repo private
                        </span>
                      )}
                      <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground/40 font-mono">
                        <ExternalLink className="w-3 h-3" /> Open source
                      </span>
                    </div>
                  </div>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="relative py-24 border-t border-border overflow-hidden">
      {/* 04 watermark — left side, clipped by overflow-hidden */}
      <div className="section-num absolute -top-4 -left-4 select-none pointer-events-none">04</div>
      {/* 05 watermark — right side, clipped by overflow-hidden */}
      <div className="section-num absolute -top-4 right-0 text-right select-none pointer-events-none">05</div>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 relative">
        <div className="relative">
          <AnimatedSection>
            <SectionLabel>04 · Education</SectionLabel>
            <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold">Where I've studied.</h2>
          </AnimatedSection>
          <StaggerContainer className="mt-10 space-y-4">
            {EDUCATION.map((e, i) => (
              <StaggerItem key={e.title}>
                <motion.div
                  className={`relative rounded-2xl border p-6 transition-all duration-300 cursor-default overflow-hidden
                    ${
                      e.status === "active"
                        ? "border-primary/40 bg-primary/5 hover:bg-primary/8"
                        : "border-border bg-surface hover:border-primary/30 hover:bg-surface-elevated"
                    }`}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  {/* Subtle gradient wash on active card */}
                  {e.status === "active" && (
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
                  )}

                  <div className="relative flex items-start gap-4">
                    {/* Timeline dot */}
                    <div className="mt-1 shrink-0 flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full border-2 ${
                        e.status === "active"
                          ? "bg-primary border-primary shadow-glow animate-pulse-glow"
                          : "bg-muted-foreground/40 border-border"
                      }`} />
                      {i < EDUCATION.length - 1 && (
                        <div className="w-px flex-1 min-h-[1.5rem] mt-2 bg-border" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Header row */}
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <span className="font-mono text-xs text-primary">{e.year}</span>
                        {e.status === "active" && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/30 px-2.5 py-0.5 text-xs font-mono text-primary">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Pursuing
                          </span>
                        )}
                      </div>

                      {/* Degree title */}
                      <div className="mt-2 font-display font-bold text-lg leading-snug flex items-start gap-2">
                        <GraduationCap className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                        <span>{e.title}</span>
                      </div>

                      {/* School */}
                      <div className="mt-1 text-sm text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        {e.school}
                      </div>

                      {/* Tags */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {e.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs rounded-full px-2.5 py-0.5 font-mono border ${
                              e.status === "active"
                                ? "border-primary/30 bg-primary/10 text-primary"
                                : "border-border bg-background text-muted-foreground"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="relative">
          <AnimatedSection>
            <SectionLabel>05 · Certifications</SectionLabel>
            <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold">Always learning.</h2>
          </AnimatedSection>

          {/* Certification cards */}
          <StaggerContainer className="mt-10 space-y-3">
            {CERTS.map((c, i) => (
              <StaggerItem key={c.name}>
                <motion.div
                  className="group relative rounded-2xl border border-border bg-surface p-5 flex items-start gap-4 overflow-hidden cursor-default hover:border-primary/40 transition-colors duration-300"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  {/* Hover gradient wash */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary/[0.06] via-transparent to-transparent" />

                  {/* Numbered badge */}
                  <div className="relative shrink-0 w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 grid place-items-center text-primary font-mono font-bold text-sm group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="relative flex-1 min-w-0">
                    {/* Category pill */}
                    <span className="inline-block mb-1.5 text-[10px] font-mono uppercase tracking-wider text-primary/70 bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5">
                      {c.category}
                    </span>
                    {/* Cert name */}
                    <div className="text-sm font-medium text-foreground leading-snug">{c.name}</div>
                    {/* Issuer */}
                    <div className="mt-1 text-xs text-muted-foreground font-mono flex items-center gap-1">
                      <Award className="w-3 h-3" /> {c.issuer}
                    </div>
                  </div>

                  <ArrowUpRight className="relative shrink-0 w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Coursework block */}
          <AnimatedSection className="mt-4" delay={0.3}>
            <div className="rounded-2xl border border-border bg-surface overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-2 px-5 py-4 border-b border-border bg-surface-elevated">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono font-medium text-primary">Coursework</span>
                <span className="ml-auto text-xs font-mono text-muted-foreground">5 subjects</span>
              </div>
              {/* Subject list — comma separated */}
              <div className="px-5 py-4 text-sm text-muted-foreground font-mono leading-relaxed">
                {["Python", "DSA", "DBMS", "Machine Learning", "Statistics"].join(", ")}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative rounded-[2rem] overflow-hidden border border-border bg-surface shadow-card">
          <div className="absolute inset-0 bg-hero opacity-60 pointer-events-none" />
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div className="relative grid lg:grid-cols-2 gap-0">

            {/* Left — info */}
            <div className="p-10 md:p-14 border-b lg:border-b-0 lg:border-r border-border">
              <SectionLabel>06 · Let's build</SectionLabel>
              <h2 className="mt-4 text-4xl md:text-5xl font-display font-bold leading-[1.05]">
                Have an idea or internship? <span className="text-gradient-accent">Let's talk.</span>
              </h2>

              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                <ContactCard icon={Mail} label="Email" value="girinath445@gmail.com" href="mailto:girinath445@gmail.com" />
                <ContactCard icon={Phone} label="Phone" value="+91 87786 01692" href="tel:+918778601692" />
                <ContactCard icon={Github} label="GitHub" value="github.com/girinath01" href="https://github.com/girinath01" />
                <ContactCard icon={Linkedin} label="LinkedIn" value="girinath-k" href="https://linkedin.com/in/girinath-k-b63a30314" />
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 text-primary" /> Dharmapuri, TN · Open to remote
                </div>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-glow hover:opacity-90 transition"
                >
                  <Download className="w-4 h-4" /> Resume
                </a>
              </div>
            </div>

            {/* Right — contact form */}
            <div className="p-10 md:p-14">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-6">Send a message</div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── EmailJS config ─────────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Add your Email Service (Gmail works great)
// 3. Create a Template — use these variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Replace the three placeholders below with your actual IDs
const EMAILJS_SERVICE_ID  = "service_3ibifvc";
const EMAILJS_TEMPLATE_ID = "template_jc3qc7k";
const EMAILJS_PUBLIC_KEY  = "hTJQJ7CwD-CXozxQY";

type FormStatus = "idle" | "sending" | "success" | "error";

function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      formRef.current.reset();
    } catch {
      setStatus("error");
    }
  };

  const inputCls = "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/70 focus:ring-2 focus:ring-primary/20 transition";

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="flex flex-col items-center justify-center gap-4 py-16 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/40 grid place-items-center">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="font-display font-bold text-xl">Message sent!</p>
            <p className="mt-1 text-sm text-muted-foreground">I'll get back to you as soon as possible.</p>
          </div>
          <button
            onClick={() => setStatus("idle")}
            className="mt-2 text-xs font-mono text-primary hover:underline"
          >
            Send another →
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Name</label>
              <input
                name="from_name"
                required
                placeholder="Your name"
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Email</label>
              <input
                name="from_email"
                type="email"
                required
                placeholder="your@email.com"
                className={inputCls}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Subject</label>
            <input
              name="subject"
              required
              placeholder="Internship opportunity / Project idea / Just saying hi"
              className={inputCls}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Tell me what's on your mind..."
              className={`${inputCls} resize-none`}
            />
          </div>

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              Something went wrong. Try emailing me directly at kgns859@gmail.com
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={status === "sending"}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-medium text-primary-foreground shadow-glow hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition"
            whileHover={status !== "sending" ? { scale: 1.01 } : {}}
            whileTap={status !== "sending" ? { scale: 0.98 } : {}}
          >
            {status === "sending" ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
            ) : (
              <><Send className="w-4 h-4" /> Send message</>
            )}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function ContactCard({ icon: Icon, label, value, href }: { icon: typeof Mail; label: string; value: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/60 backdrop-blur p-5 hover:border-primary/60 hover:bg-background transition">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-11 h-11 rounded-xl bg-surface border border-border grid place-items-center text-primary shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="truncate font-medium">{value}</div>
        </div>
      </div>
      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
    </a>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 bg-background border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-mono">
          <Code2 className="w-4 h-4 text-primary" /> Designed & built by Girinath K · 2025
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/girinath01" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="hover:text-primary transition"><Github className="w-4 h-4" /></a>
          <a href="https://linkedin.com/in/girinath-k-b63a30314" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="hover:text-primary transition"><Linkedin className="w-4 h-4" /></a>
          <a href="mailto:kgns859@gmail.com" aria-label="Send email" className="hover:text-primary transition"><Mail className="w-4 h-4" /></a>
        </div>
      </div>
    </footer>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{children}</div>;
}
