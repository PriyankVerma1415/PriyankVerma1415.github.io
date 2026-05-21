import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import { cn } from "../lib/utils";
import ProjectModal from "./ProjectModal";
import ScrollTrigger from "gsap/ScrollTrigger";

export type Project = {
  title: string;
  subtitle: string;
  description: string;
  stack: string[];
  highlights: string[];
  isConfidential?: boolean;
  image: string;
  span: string;
  aspect: string;
  content: {
    overview: string;
    architecture: string;
    challenges: string;
    responsibilities: string;
    impact: string;
  };
};

const projects: Project[] = [
  {
    title: "Talos Helm & Talos Relay",
    subtitle: "Distributed Container Management Platform",
    description: "Built a distributed desktop infrastructure platform for container lifecycle management, remote operations, and real-time synchronization across multiple systems.",
    stack: ["PySide6", "FastAPI", "Docker", "AWS", "WebSockets", "PostgreSQL"],
    highlights: ["remote container management", "distributed execution architecture", "WebSocket-based real-time updates", "AWS deployment", "offline command queueing"],
    isConfidential: true,
    image: "/projects/talos_helm.png",
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
    content: {
      overview: "Built a distributed desktop infrastructure platform for container lifecycle management, remote operations, and real-time synchronization across multiple systems. The platform allows enterprise engineering teams to seamlessly manage edge container deployments.",
      architecture: "The system utilizes a distributed execution architecture with FastAPI handling the core REST endpoints. WebSockets are used for real-time state synchronization across distributed nodes. The frontend client is a cross-platform PySide6 desktop application.",
      challenges: "Ensuring eventual consistency and offline command queueing across nodes with intermittent connectivity. Managing secure remote container execution and preventing unauthorized access to core infrastructure.",
      responsibilities: "Lead Backend Developer | Architected WebSocket infrastructure | Designed offline syncing mechanism | Configured AWS deployments",
      impact: "Reduced operational overhead by 40% for container management. Improved deployment reliability across edge systems with robust offline command queueing and auto-reconciliation."
    }
  },
  {
    title: "Match Reports",
    subtitle: "Next.js Full Stack Reporting System",
    description: "Developed a scalable badge management and debrief reporting system with approval workflows and PDF export functionality.",
    stack: ["Next.js", "Supabase", "PostgreSQL", "REST APIs"],
    highlights: ["Row-Level Security (RLS)", "optimized database queries", "approval workflows", "PDF export generation"],
    isConfidential: true,
    image: "/projects/match_reports.png",
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-[4/5]",
    content: {
      overview: "Developed a scalable badge management and debrief reporting system tailored for organizational feedback and performance tracking. The system features complex approval workflows and automated report generation.",
      architecture: "Built on Next.js App Router for server-side rendering and API routes. Data persistence is handled via Supabase (PostgreSQL) with strict Row-Level Security policies to ensure data isolation between different operational teams.",
      challenges: "Implementing granular role-based access control and approval chains within Supabase RLS. Designing an efficient PDF generation pipeline that doesn't block the main application thread.",
      responsibilities: "Full Stack Developer | Implemented Supabase RLS | Built PDF export pipeline | Designed approval workflows",
      impact: "Streamlined the debriefing process, saving an average of 15 hours per week in administrative tasks. Ensured 100% data compliance through strict RLS enforcement."
    }
  },
  {
    title: "Incentivise",
    subtitle: "Performance Optimization & API Enhancements",
    description: "Optimized API integrations and improved cross-project workflow performance for internal enterprise systems.",
    stack: ["Next.js", "APIs", "PostgreSQL"],
    highlights: ["reduced latency", "improved data fetching", "enhanced integration workflows"],
    isConfidential: true,
    image: "/projects/incentivise.png",
    span: "md:col-span-5",
    aspect: "aspect-[4/3] md:aspect-[4/5]",
    content: {
      overview: "Focused on optimizing API integrations and improving cross-project workflow performance for existing internal enterprise systems. The goal was to eliminate bottlenecks in heavy data-processing pipelines.",
      architecture: "Analyzed existing REST API endpoints and PostgreSQL queries. Introduced advanced caching layers, implemented batch processing for heavy data mutations, and optimized Next.js data fetching strategies.",
      challenges: "Refactoring legacy endpoints without causing downtime. Identifying slow database queries and adding appropriate indexes. Handling race conditions in high-concurrency environments.",
      responsibilities: "Backend Optimization Specialist | Query Optimization | API Refactoring | Performance Auditing",
      impact: "Reduced average API latency by 60%. Significantly improved data fetching times, leading to a much smoother user experience for internal workflow tools."
    }
  },
  {
    title: "Bank Account Management System",
    subtitle: "Secure Transaction Processing System",
    description: "Developed a secure bank account management system handling account operations, transaction processing, and database design.",
    stack: ["Python", "MySQL", "VS Code"],
    highlights: ["transaction processing", "relational database design", "data integrity & validation"],
    isConfidential: true,
    image: "/projects/bank_system.png",
    span: "md:col-span-7",
    aspect: "aspect-[4/3] md:aspect-[16/10]",
    content: {
      overview: "Developed a comprehensive Bank Account Management System during an internship at Ns Corporation India. The system focuses on robust account management and secure financial transaction processing (deposits and withdrawals).",
      architecture: "Built with Python for the core application logic and MySQL for the backend relational database. The architecture prioritizes data integrity, ensuring secure transaction handling and input validation.",
      challenges: "Designing a normalized relational database schema to accurately track financial records and prevent data anomalies. Implementing secure transaction handling to maintain strict data integrity during deposits and withdrawals.",
      responsibilities: "Software Engineering Intern | Developed Core Python Logic | Designed MySQL Database Schema | Implemented Input Validation",
      impact: "Successfully delivered a robust system with optimized query execution. Ensured 100% data integrity and secure handling of simulated financial transactions."
    }
  },
  {
    title: "Go-Back-N ARQ Protocol",
    subtitle: "Network Data Transmission Simulator",
    description: "Simulated the Go-Back-N ARQ protocol in Java, implementing sender-receiver architecture and reliable data transmission.",
    stack: ["Java", "IntelliJ IDEA", "Networking"],
    highlights: ["sliding window mechanism", "timeout-based retransmissions", "packet loss simulation"],
    isConfidential: true,
    image: "/projects/go_back_n.png",
    span: "md:col-span-12",
    aspect: "aspect-[4/3] md:aspect-[21/9]",
    content: {
      overview: "Developed a comprehensive simulation of the Go-Back-N ARQ (Automatic Repeat reQuest) protocol in Java during an internship at Swarnim Infosoft PVT. LTD. The project accurately models reliable data transmission over unreliable networks.",
      architecture: "Implemented a robust sender-receiver architecture featuring a sliding window mechanism, cumulative acknowledgements, and timeout-based retransmissions. The simulation supports multi-threading to handle asynchronous packet delivery.",
      challenges: "Accurately simulating packet loss, corruption, and network delays. Designing an efficient timeout and retransmission mechanism without overwhelming the simulated network or causing deadlocks.",
      responsibilities: "Software Engineering Intern | Implemented Core Protocol Logic | Designed Packet Loss Simulation | Tracked Performance Metrics",
      impact: "Successfully incorporated error detection, handling, and comprehensive performance metrics tracking (throughput, retransmissions), providing a clear visualization of network protocol efficiency under various conditions."
    }
  }
];

export default function SelectedWorks() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Refresh ScrollTrigger to update positions after DOM height changes
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [showAll]);

  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Selected Work
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight mb-6">
              Professional <span className="font-display italic">Experience</span>
            </h2>
            <p className="text-muted text-sm md:text-base">
              A collection of scalable applications, distributed systems, and engineering solutions built with modern technologies.
            </p>
          </div>

          <button
            onClick={() => setShowAll(!showAll)}
            className="hidden md:inline-flex group relative rounded-full items-center justify-center border border-stroke bg-bg text-text-primary hover:border-transparent px-6 py-3 transition-colors overflow-hidden"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity p-[2px]">
              <span className="absolute inset-[2px] bg-bg rounded-full" />
            </span>
            <span className="relative z-10 flex items-center gap-2 text-sm font-medium">
              {showAll ? "Go back" : "View all work"} <ArrowRight className={cn("w-4 h-4 transition-transform", showAll && "rotate-180")} />
            </span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {(showAll ? projects : projects.slice(0, 4)).map((project, i) => (
            <div
              key={i}
              onClick={() => setSelectedProject(project)}
              className={cn(
                "group relative bg-surface border border-stroke rounded-3xl overflow-hidden cursor-pointer min-h-[380px] sm:min-h-0",
                project.span,
                project.aspect
              )}
            >
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 mix-blend-multiply opacity-40 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Project Card Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                {project.isConfidential && (
                  <div className="self-start inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-3 backdrop-blur-md">
                    <Lock className="w-3 h-3" />
                    Confidential Enterprise Project
                  </div>
                )}

                <h3 className="text-2xl md:text-3xl font-display italic text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm md:text-base mb-4 max-w-lg">
                  {project.subtitle}
                </p>

                <div className="flex flex-wrap gap-2 mb-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-2 py-1 rounded bg-white/10 border border-white/10 text-white/80 text-xs backdrop-blur-md">
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="px-2 py-1 rounded bg-white/10 border border-white/10 text-white/80 text-xs backdrop-blur-md">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative rounded-full p-[1px] overflow-hidden">
                    <div className="absolute inset-0 animate-gradient-shift accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative bg-[#0A0A0A] text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 border border-white/10 group-hover:border-transparent transition-colors">
                      View Case Study <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-xs text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-1">
                    {project.highlights[0]}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowAll(!showAll)}
          className="md:hidden mt-8 w-full group relative rounded-full flex items-center justify-center border border-stroke bg-bg text-text-primary hover:border-transparent px-6 py-4 transition-colors overflow-hidden"
        >
          <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity p-[2px]">
            <span className="absolute inset-[2px] bg-bg rounded-full" />
          </span>
          <span className="relative z-10 flex items-center gap-2 text-sm font-medium">
            {showAll ? "Go back" : "View all work"} <ArrowRight className={cn("w-4 h-4 transition-transform", showAll && "rotate-180")} />
          </span>
        </button>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
