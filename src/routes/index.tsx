import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight, Code2, Database, Brain, Cpu, GraduationCap, Award, Sparkles, Download, ExternalLink, Clock, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
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
    description: "AI-powered face recognition system that detects and recognises faces to automate classroom attendance — replacing manual roll calls with a real-time camera pipeline.",
    icon: Brain,
    accent: "from-[oklch(0.88_0.21_128)] to-[oklch(0.70_0.18_200)]",
    github: "https://github.com/girinath01/face-attendance-system",
    comingSoon: false,
  },
  {
    title: "Interactive Mathematics Platform",
    stack: ["Python", "HTML", "Algorithms"],
    description: "An educational web platform that turns abstract math concepts into interactive, beginner-friendly visualisations and logic-based demonstrations.",
    icon: Cpu,
    accent: "from-[oklch(0.70_0.18_200)] to-[oklch(0.88_0.21_128)]",
    github: "https://github.com/navin2006-kumar/MathXplore",
    comingSoon: false,
  },
  {
    title: "Notes Sharing Platform",
    stack: ["Python", "Web", "Collaboration"],
    description: "A clean platform for students to upload, browse and share academic notes — built to make collaborative learning frictionless and digital-first.",
    icon: Database,
    accent: "from-[oklch(0.88_0.21_128)] to-[oklch(0.70_0.18_200)]",
    github: "https://github.com/girinath01/notes-sharing-between-peers",
    comingSoon: false,
  },
];

const SKILL_GROUPS = [
  { title: "Programming", items: ["Python", "SQL", "Java", "C / C++", "HTML / CSS"] },
  { title: "Tools", items: ["Git & GitHub", "Linux", "VS Code", "OpenCV"] },
  { title: "Core", items: ["Machine Learning", "Data Analysis", "Data Visualization", "Problem Solving"] },
  { title: "Soft Skills", items: ["Communication", "Teamwork", "Adaptability", "Critical Thinking"] },
];

const EDUCATION = [
  { title: "B.Tech — Artificial Intelligence & Data Science", school: "KGISL Institute of Technology, Coimbatore", year: "2024 — Present" },
  { title: "Higher Secondary (HSC)", school: "Amrutha Matric Hr. Sec School, Dharmapuri", year: "2023 — 2024" },
  { title: "Secondary (SSC)", school: "Amrutha Matric Hr. Sec School, Dharmapuri", year: "2022 — 2023" },
];

const CERTS = [
  "Exploratory Data Analysis for Machine Learning",
  "Introduction to Networking and Storage — IBM Skills Network",
  "Tools of the Trade: Linux and SQL",
];

function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="w-8 h-8 rounded-md bg-primary text-primary-foreground grid place-items-center font-mono">G</span>
          <span>Girinath<span className="text-primary">.</span>K</span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="hover:text-foreground transition-colors">{n.label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm font-medium text-foreground hover:border-primary/60 hover:text-primary transition"
          >
            <Download className="w-3.5 h-3.5" /> Resume
          </a>
          <a href="#contact" className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">
            Hire me <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-3">
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

function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 md:pt-44 md:pb-32 bg-hero">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-mono text-muted-foreground mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            Available for internships · AI / Data Science
          </motion.div>
          <motion.h1
            className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-[0.95] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Building <span className="text-gradient-accent">intelligent</span><br />
            systems that<br />
            <span className="text-gradient">solve real problems.</span>
          </motion.h1>
          <motion.p
            className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            I'm <span className="text-foreground font-medium">Girinath K</span> — an Artificial Intelligence & Data Science student passionate about machine learning, computer vision, and turning Python prototypes into useful, production-shaped tools.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-glow transition"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View my work <ArrowUpRight className="w-4 h-4" />
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-6 py-3 font-medium text-foreground hover:bg-surface transition"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              Get in touch
            </motion.a>
            <motion.a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 font-medium text-primary hover:bg-primary/20 hover:border-primary/70 transition"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" /> Resume
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto lg:mx-0 w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
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
            { k: "3+", v: "Projects shipped" },
            { k: "5+", v: "Languages" },
            { k: "3", v: "Certifications" },
            { k: "B.Tech", v: "AI & DS · 2024" },
          ].map((s) => (
            <StaggerItem key={s.v}>
              <div className="bg-surface p-5">
                <div className="text-3xl font-display font-bold text-primary">{s.k}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        <AnimatedSection>
          <SectionLabel>01 · About</SectionLabel>
          <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold">A student-engineer obsessed with <span className="text-primary">building</span>.</h2>
        </AnimatedSection>
        <AnimatedSection className="md:col-span-2 space-y-5 text-lg text-muted-foreground leading-relaxed" delay={0.15}>
          <p>
            I'm currently pursuing my B.Tech in Artificial Intelligence and Data Science at KGISL Institute of Technology, Coimbatore. My focus is on machine learning fundamentals, Python development, and shipping projects that solve practical problems — not toy demos.
          </p>
          <p>
            I learn fastest by building. Whether it's a face-recognition attendance pipeline with OpenCV or an interactive math platform for students, I treat every project as a chance to sharpen both the engineering and the design thinking.
          </p>
          <p>
            I'm actively seeking <span className="text-foreground font-medium">internship opportunities</span> in AI, Data Science and Software Development where I can contribute, learn from senior engineers, and ship work that ends up in production.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <AnimatedSection>
          <SectionLabel>02 · Toolkit</SectionLabel>
          <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold max-w-2xl">The stack I reach for.</h2>
        </AnimatedSection>
        <StaggerContainer className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_GROUPS.map((g) => (
            <StaggerItem key={g.title}>
              <motion.div
                className="group relative rounded-2xl border border-border bg-surface p-6 hover:border-primary/50 transition shadow-card h-full"
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <div className="font-mono text-xs text-primary uppercase tracking-wider">{g.title}</div>
                <ul className="mt-4 space-y-2">
                  {g.items.map((i) => (
                    <li key={i} className="flex items-center gap-2 text-foreground">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {i}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection className="mt-10 flex flex-wrap gap-3" delay={0.3}>
          {["Python", "Machine Learning", "OpenCV", "SQL", "Linux", "Git", "Data Analysis"].map((t) => (
            <motion.span
              key={t}
              className="rounded-full border border-border bg-surface/60 px-4 py-1.5 text-sm font-mono text-muted-foreground"
              whileHover={{ y: -3, scale: 1.05, borderColor: "var(--primary)" }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {t}
            </motion.span>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
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
                <motion.article
                  className="group relative rounded-3xl border border-border bg-surface p-7 hover:bg-surface-elevated transition shadow-card overflow-hidden h-full flex flex-col"
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
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
                </motion.article>
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
    <section id="education" className="py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <AnimatedSection>
            <SectionLabel>04 · Education</SectionLabel>
            <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold">Where I've studied.</h2>
          </AnimatedSection>
          <StaggerContainer className="mt-10 space-y-6">
            {EDUCATION.map((e) => (
              <StaggerItem key={e.title}>
                <li className="relative pl-8 border-l border-border list-none">
                  <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-primary shadow-glow" />
                  <div className="font-mono text-xs text-primary">{e.year}</div>
                  <div className="mt-1 font-display font-semibold text-lg flex items-start gap-2">
                    <GraduationCap className="w-5 h-5 mt-1 text-muted-foreground" />{e.title}
                  </div>
                  <div className="text-muted-foreground text-sm">{e.school}</div>
                </li>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div>
          <AnimatedSection>
            <SectionLabel>05 · Certifications</SectionLabel>
            <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold">Always learning.</h2>
          </AnimatedSection>
          <StaggerContainer className="mt-10 space-y-4">
            {CERTS.map((c) => (
              <StaggerItem key={c}>
                <motion.li
                  className="rounded-2xl border border-border bg-surface p-5 flex items-start gap-4 hover:border-primary/50 transition list-none"
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Award className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-foreground">{c}</span>
                </motion.li>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <AnimatedSection className="mt-8 rounded-2xl border border-border bg-surface p-6" delay={0.3}>
            <div className="flex items-center gap-2 text-sm font-mono text-primary">
              <Sparkles className="w-4 h-4" /> Coursework
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Python", "DSA", "DBMS", "Machine Learning", "Statistics"].map((c) => (
                <span key={c} className="text-xs rounded-md bg-background px-2.5 py-1 text-muted-foreground border border-border">{c}</span>
              ))}
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
        <div className="relative rounded-[2rem] overflow-hidden border border-border bg-surface p-10 md:p-16 shadow-card">
          <div className="absolute inset-0 bg-hero opacity-60 pointer-events-none" />
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
          <div className="relative">
            <SectionLabel>06 · Let's build</SectionLabel>
            <h2 className="mt-4 text-4xl md:text-6xl font-display font-bold max-w-3xl leading-[1.05]">
              Have an idea, an internship, or a problem worth solving? <span className="text-gradient-accent">Let's talk.</span>
            </h2>

            <div className="mt-12 grid sm:grid-cols-2 gap-4">
              <ContactCard icon={Mail} label="Email" value="girinath445@gmail.com" href="mailto:girinath445@gmail.com" />
              <ContactCard icon={Phone} label="Phone" value="+91 87786 01692" href="tel:+918778601692" />
              <ContactCard icon={Github} label="GitHub" value="github.com/girinath01" href="https://github.com/girinath01" />
              <ContactCard icon={Linkedin} label="LinkedIn" value="girinath-k" href="https://linkedin.com/in/girinath-k-b63a30314" />
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
              <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary" /> Based in Dharmapuri, Tamil Nadu · Open to remote
              </div>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-glow hover:opacity-90 transition"
              >
                <Download className="w-4 h-4" /> Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
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
    <footer className="border-t border-border py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 font-mono">
          <Code2 className="w-4 h-4 text-primary" /> Designed & built by Girinath K · 2025
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/girinath01" target="_blank" rel="noreferrer" className="hover:text-primary transition"><Github className="w-4 h-4" /></a>
          <a href="https://linkedin.com/in/girinath-k-b63a30314" target="_blank" rel="noreferrer" className="hover:text-primary transition"><Linkedin className="w-4 h-4" /></a>
          <a href="mailto:girinath445@gmail.com" className="hover:text-primary transition"><Mail className="w-4 h-4" /></a>
        </div>
      </div>
    </footer>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{children}</div>;
}
