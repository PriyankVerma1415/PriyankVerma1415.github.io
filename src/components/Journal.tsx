import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";
import ScrollTrigger from "gsap/ScrollTrigger";

const projects = [
  {
    title: "Real-Time Messaging Platform",
    subtitle: "Concurrent Java-based client-server communication system",
    description: "Developed a scalable real-time messaging system with authenticated communication, bidirectional streams, and concurrent client handling.",
    stack: ["Java", "Socket Programming", "Servlets", "Multithreading"],
    image: "/projects/messaging_platform.png",
    github: "#",
  },
  {
    title: "Resume Analyzer",
    subtitle: "AI-powered ATS Resume Analysis & Optimization Platform",
    description: "Built an AI-powered Resume Analyzer platform that performs ATS-style resume evaluation, skill extraction, and job compatibility analysis using Gemini AI. Implemented secure authentication, intelligent resume parsing, structured AI analysis pipelines, caching, rate-limit handling, and persistent analysis history with Supabase. Designed a modern full-stack architecture with scalable backend APIs and optimized AI request management.",
    stack: ["Python", "FastAPI", "React", "Next.js", "TypeScript", "Gemini AI", "Supabase", "PostgreSQL", "TailwindCSS"],
    image: "/projects/resume_analyzer.png",
    github: "https://github.com/PriyankVerma1415/Resume_analyzer",
    link: "https://resume-analyzer-three-vert.vercel.app/"
  },
  {
    title: "Smart Helmet Voice Assistant",
    subtitle: "AI-powered collision detection and intelligent alert system",
    description: "Built an edge + cloud intelligent safety system using computer vision, real-time object detection, and voice-based alerts.",
    stack: ["Python", "YOLO", "AWS SageMaker", "Raspberry Pi"],
    image: "/projects/smart_helmet.png",
    github: "#",
  }
];

export default function Journal() {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Refresh ScrollTrigger to update positions after DOM height changes
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [showAll]);

  return (
    <section id="projects" className="bg-bg py-16 md:py-24">
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
                Projects
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight mb-6">
              Featured <span className="font-display italic">Projects</span>
            </h2>
            <p className="text-muted text-sm md:text-base">
              A collection of personal projects focused on AI, backend systems, and scalable software engineering.
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
              {showAll ? "Go back" : "View all"} <ArrowRight className={cn("w-4 h-4 transition-transform", showAll && "rotate-180")} />
            </span>
          </button>
        </motion.div>

        <div className="flex flex-col gap-8 md:gap-12">
          {(showAll ? projects : projects.slice(0, 2)).map((project, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              key={i}
              className="group relative flex flex-col md:flex-row gap-6 md:gap-10 p-6 md:p-8 rounded-[32px] md:rounded-[40px] bg-surface/30 hover:bg-surface/60 border border-stroke transition-all duration-500 overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-[-1px] rounded-[32px] md:rounded-[40px] bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Image Container */}
              <div className="w-full md:w-[45%] shrink-0 rounded-[24px] overflow-hidden aspect-[16/10] md:aspect-[4/3] relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 border border-white/10 rounded-[24px] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center flex-1 relative z-10">
                <h3 className="text-2xl md:text-3xl font-display italic text-text-primary mb-2 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-primary/80 font-medium text-sm md:text-base mb-4">
                  {project.subtitle}
                </p>
                <p className="text-muted text-sm md:text-base mb-6 leading-relaxed max-w-lg">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.stack.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-muted group-hover:border-white/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-white transition-colors bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-2.5 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
                    </svg>
                    Code
                  </a>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-white transition-colors group/btn"
                    >
                      Live Project
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </a>
                  ) : (
                    <button className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-white transition-colors group/btn">
                      View Case Study
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
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
            {showAll ? "Go back" : "View all"} <ArrowRight className={cn("w-4 h-4 transition-transform", showAll && "rotate-180")} />
          </span>
        </button>
      </div>
    </section>
  );
}
