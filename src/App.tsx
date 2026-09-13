import { useState, useEffect, useCallback } from "react";

const projects = [
  {
    id: "01",
    name: "AuthService API",
    description:
      "Authentication REST API with JWT and refresh tokens. Implemented rate limiting, input validation, and structured error handling following security best practices.",
    longDescription:
      "This project started as a need to provide a centralized authentication layer for multiple internal services. The API handles user registration, login, JWT issuance, and silent token refresh. I built a custom filter chain using Spring Security that validates tokens on every request before hitting protected endpoints. Rate limiting is enforced via a Redis-backed counter per IP. Error responses follow RFC 7807 (Problem Details for HTTP APIs), making integration straightforward for consumers.",
    stack: ["Spring Boot", "Spring Security", "JWT", "PostgreSQL", "Docker"],
    repo: "https://github.com/alejandrovargas/authservice-api",
    status: "Production",
    image: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?w=800&h=400&fit=crop&auto=format",
    imageAlt: "Code on a laptop screen",
    gallery: [
      { url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&h=500&fit=crop&auto=format", alt: "Code editor with authentication logic" },
      { url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=500&fit=crop&auto=format", alt: "Java code on monitor" },
      { url: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=900&h=500&fit=crop&auto=format", alt: "Colorful code on laptop" },
    ],
    highlights: ["JWT + Refresh Token flow", "Redis rate limiting", "RFC 7807 error responses", "Dockerized deployment"],
  },
  {
    id: "02",
    name: "E-Commerce Backend",
    description:
      "Online store backend with inventory, order, and payment management. Layered architecture with clear separation of concerns and unit tests written in JUnit 5.",
    longDescription:
      "A full backend for a small e-commerce platform covering product catalog, stock management, cart sessions, order processing, and payment status tracking. I used a strict layered architecture: Controller → Service → Repository, keeping business logic out of controllers entirely. Hibernate handles entity relationships, and I wrote integration tests using Testcontainers to spin up a real MySQL instance. The payment module is designed for easy provider swapping via a strategy pattern.",
    stack: ["Spring Boot", "Hibernate", "MySQL", "Maven", "JUnit 5"],
    repo: "https://github.com/alejandrovargas/ecommerce-backend",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?w=800&h=400&fit=crop&auto=format",
    imageAlt: "Terminal with code output",
    gallery: [
      { url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=500&fit=crop&auto=format", alt: "MacBook with programming code" },
      { url: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=900&h=500&fit=crop&auto=format", alt: "JavaScript code on dark screen" },
      { url: "https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec?w=900&h=500&fit=crop&auto=format", alt: "Computer setup" },
    ],
    highlights: ["Layered architecture", "Strategy pattern for payments", "Testcontainers integration tests", "Stock tracking with pessimistic locking"],
  },
  {
    id: "03",
    name: "Task Queue Worker",
    description:
      "Asynchronous task processing system using message queues. Handles automatic retries, dead letter queues, and monitoring with metrics exposed via Spring Actuator.",
    longDescription:
      "Built to offload time-consuming background jobs from the main request cycle. Producers publish tasks to RabbitMQ queues; consumers pick them up and process them independently. I implemented exponential backoff for retries, a dead letter exchange for failed messages, and a dashboard feed powered by Spring Actuator metrics. Redis is used to deduplicate tasks and prevent double-processing in edge cases. The system is fully containerized and can scale workers horizontally.",
    stack: ["Spring Boot", "RabbitMQ", "Redis", "Spring Actuator"],
    repo: "https://github.com/alejandrovargas/task-queue-worker",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1599837565318-67429bde7162?w=800&h=400&fit=crop&auto=format",
    imageAlt: "Computer monitor with code",
    gallery: [
      { url: "https://images.unsplash.com/photo-1607706189992-eae578626c86?w=900&h=500&fit=crop&auto=format", alt: "HTML code on screen" },
      { url: "https://images.unsplash.com/photo-1518773553398-650c184e0bb3?w=900&h=500&fit=crop&auto=format", alt: "Programming language on monitor" },
      { url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&h=500&fit=crop&auto=format", alt: "Code editor screen" },
    ],
    highlights: ["Exponential backoff retries", "Dead letter exchange", "Redis deduplication", "Horizontal worker scaling"],
  },
  {
    id: "04",
    name: "Blog API — REST + Docs",
    description:
      "Public blog Api with interactive documentation generated with OpenAPI/Swagger. Includes pagination, filters, and user role management.",
    longDescription:
      "A clean Rest API for a blogging platform, designed to be consumed by any frontend. I used Spring Data JPA for persistence and built a flexible filtering system that lets consumers query posts by tag, author, date range, and status. Role-based access control separates readers, authors, and admins. The OpenAPI documentation is auto-generated from annotations and served interactively via Swagger UI, making it easy to test endpoints directly from the browser. H2 is used for local development; the schema is production-ready for PostgreSQL.",
    stack: ["Spring Boot", "Spring Data JPA", "OpenAPI", "H2", "Lombok"],
    repo: "https://github.com/alejandrovargas/blog-api",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop&auto=format",
    imageAlt: "Source code on screen",
    gallery: [
      { url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=500&fit=crop&auto=format", alt: "Java code on monitor" },
      { url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&h=500&fit=crop&auto=format", alt: "Code on MacBook Pro" },
      { url: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=900&h=500&fit=crop&auto=format", alt: "Colorful code editor" },
    ],
    highlights: ["OpenAPI / Swagger UI", "RBAC with 3 roles", "Flexible query filters", "H2 → PostgreSQL ready"],
  },
];

const skills = [
  { category: "Core", items: ["Java 17+", "Spring Boot", "Spring Security", "Spring Data JPA"] },
  { category: "Databases", items: ["PostgreSQL", "MySQL", "Redis", "H2"] },
  { category: "Tools", items: ["Docker", "Maven", "Git", "IntelliJ IDEA"] },
  { category: "Testing", items: ["JUnit 5", "Mockito", "Testcontainers"] },
  { category: "APIs", items: ["REST", "OpenAPI/Swagger", "JWT", "OAuth2"] },
  { category: "Learning", items: ["Kafka", "Kubernetes", "Spring Cloud", "Microservices"] },
];

const statusColor: Record<string, string> = {
  "Production": "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
  "In Progress": "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30",
  "Completed": "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30",
};

type Project = typeof projects[0];

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setActiveImg((i) => (i + 1) % project.gallery.length);
      if (e.key === "ArrowLeft") setActiveImg((i) => (i - 1 + project.gallery.length) % project.gallery.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, project.gallery.length]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded"
        style={{ backgroundColor: "var(--background)", border: "1px solid var(--border)" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded transition-colors hover:opacity-70"
          style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1" y2="13" />
          </svg>
        </button>

        {/* Image gallery */}
        <div className="relative" style={{ height: "340px", backgroundColor: "var(--muted)" }}>
          <img
            key={activeImg}
            src={project.gallery[activeImg].url}
            alt={project.gallery[activeImg].alt}
            className="w-full h-full object-cover"
            style={{ animation: "fadeIn 0.3s ease" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, var(--background) 0%, transparent 50%)" }}
          />

          {/* Prev / Next */}
          <button
            onClick={() => setActiveImg((i) => (i - 1 + project.gallery.length) % project.gallery.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded transition-opacity hover:opacity-100 opacity-70"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 1 3 7 9 13" />
            </svg>
          </button>
          <button
            onClick={() => setActiveImg((i) => (i + 1) % project.gallery.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded transition-opacity hover:opacity-100 opacity-70"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="5 1 11 7 5 13" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {project.gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className="w-2 h-2 rounded-full transition-all"
                style={{ backgroundColor: i === activeImg ? "var(--primary)" : "rgba(255,255,255,0.4)" }}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-3 px-8 -mt-2 mb-2">
          {project.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className="shrink-0 rounded overflow-hidden transition-all"
              style={{
                width: 80,
                height: 52,
                border: i === activeImg ? "2px solid var(--primary)" : "2px solid transparent",
                opacity: i === activeImg ? 1 : 0.55,
              }}
            >
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-8 pb-8 pt-4">
          <div className="flex items-start justify-between gap-4 mb-1">
            <span className="font-mono text-xs tracking-widest" style={{ color: "var(--muted-foreground)" }}>
              {project.id}
            </span>
            <span className={`font-mono text-xs px-2 py-1 rounded ${statusColor[project.status]}`}>
              {project.status}
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">{project.name}</h2>

          <p className="leading-relaxed mb-8 font-light" style={{ color: "var(--muted-foreground)" }}>
            {project.longDescription}
          </p>

          {/* Highlights */}
          <div className="mb-8">
            <h3
              className="font-mono text-xs uppercase tracking-widest mb-4 pb-2"
              style={{ color: "var(--primary)", borderBottom: "1px solid var(--border)" }}
            >
              Key highlights
            </h3>
            <ul className="grid sm:grid-cols-2 gap-2">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm">
                  <span style={{ color: "var(--accent)" }}>▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div className="mb-8">
            <h3
              className="font-mono text-xs uppercase tracking-widest mb-4 pb-2"
              style={{ color: "var(--primary)", borderBottom: "1px solid var(--border)" }}
            >
              Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-3 py-1"
                  style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)", borderRadius: "2px" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Repo link */}
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 font-mono text-sm font-medium tracking-wide transition-all hover:opacity-90 active:scale-95 rounded"
            style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(preferred);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["intro", "projects", "skills", "contact"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const closeDetail = useCallback(() => setSelectedProject(null), []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      {selectedProject && (
        <ProjectDetail project={selectedProject} onClose={closeDetail} />
      )}

      {/* NAV */}
      <header
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ backgroundColor: "var(--background)", borderBottom: "1px solid var(--border)" }}
      >
        <button
          onClick={() => scrollTo("intro")}
          className="font-mono text-sm font-medium tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity"
        >
          {"<AV />"}
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { id: "intro", label: "Intro" },
            { id: "projects", label: "Projects" },
            { id: "skills", label: "Skills" },
            { id: "contact", label: "Contact" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="font-mono text-xs uppercase tracking-widest transition-colors"
              style={{ color: activeSection === s.id ? "var(--primary)" : "var(--muted-foreground)" }}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setDark((d) => !d)}
          className="w-9 h-9 rounded flex items-center justify-center transition-colors hover:opacity-80"
          style={{ border: "1px solid var(--border)", backgroundColor: "var(--card)" }}
          aria-label="Toggle theme"
        >
          {dark ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </header>

      <main className="pt-20">
        {/* INTRO */}
        <section id="intro" className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] mb-8" style={{ color: "var(--primary)" }}>
                Backend Developer — Java &amp; Spring Boot
              </p>
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-none mb-8 font-semibold">
                Marcos
                <br />
                <span style={{ color: "var(--primary)" }}>Fernández.</span>
              </h1>
              <p className="text-lg md:text-xl leading-relaxed max-w-xl mb-12 font-light" style={{ color: "var(--muted-foreground)" }}>
                Junior backend developer specialized in building robust and scalable APIs
                with Java and Spring Boot. Focused on clean code, security, and best
                practices from the very first commit.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollTo("projects")}
                  className="px-6 py-3 font-mono text-sm font-medium tracking-wide transition-all hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius)" }}
                >
                  View projects →
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="px-6 py-3 font-mono text-sm font-medium tracking-wide transition-all hover:opacity-80"
                  style={{ border: "1px solid var(--border)", backgroundColor: "transparent", color: "var(--foreground)", borderRadius: "var(--radius)" }}
                >
                  Contact
                </button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="p-6 font-mono text-sm leading-7 rounded" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)", minWidth: "280px" }}>
                <p style={{ color: "var(--muted-foreground)" }}>{"// current stack"}</p>
                <p><span style={{ color: "var(--primary)" }}>Java</span><span style={{ color: "var(--muted-foreground)" }}> 17+</span></p>
                <p><span style={{ color: "var(--primary)" }}>Spring Boot</span><span style={{ color: "var(--muted-foreground)" }}> 3.x</span></p>
                <p><span style={{ color: "var(--primary)" }}>PostgreSQL</span><span style={{ color: "var(--muted-foreground)" }}> / Redis</span></p>
                <p><span style={{ color: "var(--primary)" }}>Docker</span><span style={{ color: "var(--muted-foreground)" }}> + Maven</span></p>
                <p><span style={{ color: "var(--primary)" }}>REST</span><span style={{ color: "var(--muted-foreground)" }}> APIs</span></p>
                <br />
                <p style={{ color: "var(--muted-foreground)" }}>{"// available for"}</p>
                <p style={{ color: "var(--accent)" }}>on-site work</p>
                <p style={{ color: "var(--accent)" }}>+ remote</p>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-8 flex flex-wrap gap-12" style={{ borderTop: "1px solid var(--border)" }}>
            {[
              { label: "Completed projects", value: "4+" },
              { label: "Years of experience", value: "1+" },
              { label: "Technologies mastered", value: "12+" },
              { label: "Commits this year", value: "340+" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-4xl font-semibold mb-1" style={{ color: "var(--primary)" }}>{stat.value}</p>
                <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-24 px-6 md:px-12 lg:px-24" style={{ backgroundColor: "var(--card)", borderTop: "1px solid var(--border)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-baseline gap-6 mb-4">
              <span className="font-mono text-xs tracking-widest" style={{ color: "var(--primary)" }}>02</span>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold">Projects</h2>
            </div>
            <p className="font-mono text-xs mb-12" style={{ color: "var(--muted-foreground)" }}>
              Click any card to see details, gallery &amp; repo link
            </p>

            <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: "var(--border)" }}>
              {projects.map((p) => (
                <button
                  key={p.id}
                  className="group transition-colors overflow-hidden text-left cursor-pointer"
                  style={{ backgroundColor: "var(--card)" }}
                  onClick={() => setSelectedProject(p)}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--secondary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--card)")}
                >
                  {/* Project image */}
                  <div className="relative overflow-hidden" style={{ height: "200px", backgroundColor: "var(--muted)" }}>
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--card) 0%, transparent 60%)" }} />
                    {/* Overlay hint */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-mono text-xs uppercase tracking-widest px-3 py-2 rounded" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}>
                        View details →
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <span className="font-mono text-xs tracking-widest" style={{ color: "var(--muted-foreground)" }}>{p.id}</span>
                      <span className={`font-mono text-xs px-2 py-1 rounded ${statusColor[p.status]}`}>{p.status}</span>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold mb-3">{p.name}</h3>
                    <p className="text-sm leading-relaxed mb-6 font-light" style={{ color: "var(--muted-foreground)" }}>{p.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((tech) => (
                        <span key={tech} className="font-mono text-xs px-2 py-1" style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)", borderRadius: "2px" }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-24 px-6 md:px-12 lg:px-24" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-baseline gap-6 mb-16">
              <span className="font-mono text-xs tracking-widest" style={{ color: "var(--primary)" }}>03</span>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold">Skills</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((group) => (
                <div key={group.category}>
                  <h3 className="font-mono text-xs uppercase tracking-widest mb-4 pb-3" style={{ color: "var(--primary)", borderBottom: "1px solid var(--border)" }}>
                    {group.category}
                  </h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "var(--foreground)" }}>
                        <span style={{ color: "var(--accent)" }}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-20 grid md:grid-cols-2 gap-12 pt-16" style={{ borderTop: "1px solid var(--border)" }}>
              <div>
                <h3 className="font-serif text-3xl font-semibold mb-6">About me</h3>
                <p className="leading-relaxed mb-4 font-light" style={{ color: "var(--muted-foreground)" }}>
                  I am a backend developer passionate about building systems that hold up
                  under pressure. I enjoy understanding the "why" behind every architectural
                  decision, not just the "how."
                </p>
                <p className="leading-relaxed font-light" style={{ color: "var(--muted-foreground)" }}>
                  When I am not coding, I study design patterns, read Spring documentation,
                  and contribute to open source projects to keep growing as an engineer.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Languages", value: "Spanish (native), English (technical B2)" },
                  { label: "Education", value: "Software Engineering — National University" },
                  { label: "Location", value: "Buenos Aires, Argentina" },
                  { label: "Availability", value: "Immediate — full time" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                    <span className="font-mono text-xs uppercase tracking-wide shrink-0 w-28 mt-0.5" style={{ color: "var(--muted-foreground)" }}>{item.label}</span>
                    <span className="text-sm">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 px-6 md:px-12 lg:px-24" style={{ backgroundColor: "var(--card)", borderTop: "1px solid var(--border)" }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-baseline gap-6 mb-16">
              <span className="font-mono text-xs tracking-widest" style={{ color: "var(--primary)" }}>04</span>
              <h2 className="font-serif text-4xl md:text-5xl font-semibold">Contact</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <p className="text-xl leading-relaxed mb-8 font-light" style={{ color: "var(--muted-foreground)" }}>
                  Have a project or position in mind? I am open to serious proposals.
                  I respond within 48 hours.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: "✉", label: "Email", value: "alejandro.vargas@dev.com", href: "mailto:alejandro.vargas@dev.com" },
                    { icon: "⌥", label: "GitHub", value: "github.com/alejandrovargas", href: "#" },
                    { icon: "in", label: "LinkedIn", value: "linkedin.com/in/alejandrovargas", href: "#" },
                  ].map((contact) => (
                    <a key={contact.label} href={contact.href} className="flex items-center gap-4 py-4 group transition-colors" style={{ borderBottom: "1px solid var(--border)" }}>
                      <span className="font-mono text-sm w-8 shrink-0 group-hover:scale-110 transition-transform inline-block" style={{ color: "var(--primary)" }}>{contact.icon}</span>
                      <div>
                        <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: "var(--muted-foreground)" }}>{contact.label}</p>
                        <p className="text-sm">{contact.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message sent — thank you!"); }}>
                {[
                  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { id: "email", label: "Email", type: "email", placeholder: "you@email.com" },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: "var(--muted-foreground)" }}>{field.label}</label>
                    <input
                      id={field.id} type={field.type} placeholder={field.placeholder} required
                      className="w-full px-4 py-3 text-sm bg-transparent outline-none transition-colors"
                      style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", color: "var(--foreground)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest block mb-2" style={{ color: "var(--muted-foreground)" }}>Message</label>
                  <textarea
                    id="message" rows={5} required placeholder="Tell me about the project or role..."
                    className="w-full px-4 py-3 text-sm bg-transparent outline-none resize-none transition-colors"
                    style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", color: "var(--foreground)" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--primary)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                  />
                </div>

                <button type="submit" className="w-full py-3 font-mono text-sm font-medium tracking-wide transition-all hover:opacity-90 active:scale-95" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", borderRadius: "var(--radius)" }}>
                  Send message →
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 px-6 md:px-12 flex flex-wrap items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>© 2026 Alejandro Vargas — Backend Developer</p>
          <p className="font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>Built with React + Spring Boot at heart</p>
        </footer>
      </main>
    </div>
  );
}
