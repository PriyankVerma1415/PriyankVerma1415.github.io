import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Server, Database, Code2, Activity, Cpu } from "lucide-react";
import type { Project } from "./SelectedWorks";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden"
          >
            {/* Header / Hero */}
            <div className="relative h-48 md:h-64 w-full shrink-0 overflow-hidden border-b border-white/10">
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/95 to-transparent" />
              
              <button
                onClick={onClose}
                aria-label="Close Project Details"
                className="absolute top-6 right-6 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
                {project.isConfidential && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-4">
                    <Lock className="w-3 h-3" />
                    Confidential Enterprise Project
                  </div>
                )}
                <h2 className="text-3xl md:text-5xl font-display italic text-white tracking-tight mb-2">
                  {project.title}
                </h2>
                <p className="text-[#888888] text-lg md:text-xl font-medium">
                  {project.subtitle}
                </p>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-10">
                  <section>
                    <h3 className="flex items-center gap-2 text-xl text-white font-medium mb-4">
                      <Activity className="w-5 h-5 text-[#3b82f6]" />
                      Project Overview
                    </h3>
                    <p className="text-[#A0A0A0] leading-relaxed">
                      {project.content.overview}
                    </p>
                  </section>

                  <section>
                    <h3 className="flex items-center gap-2 text-xl text-white font-medium mb-4">
                      <Server className="w-5 h-5 text-[#3b82f6]" />
                      Architecture Summary
                    </h3>
                    <p className="text-[#A0A0A0] leading-relaxed">
                      {project.content.architecture}
                    </p>
                  </section>

                  <section>
                    <h3 className="flex items-center gap-2 text-xl text-white font-medium mb-4">
                      <Code2 className="w-5 h-5 text-[#3b82f6]" />
                      Engineering Challenges
                    </h3>
                    <p className="text-[#A0A0A0] leading-relaxed">
                      {project.content.challenges}
                    </p>
                  </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-10">
                  <section>
                    <h3 className="text-sm uppercase tracking-wider text-[#666666] font-semibold mb-4">
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#3b82f6] text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3 className="text-sm uppercase tracking-wider text-[#666666] font-semibold mb-4 flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      Responsibilities
                    </h3>
                    <ul className="space-y-3">
                      {project.content.responsibilities.split("|").map((res, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#A0A0A0] text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] mt-1.5 shrink-0" />
                          {res.trim()}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-sm uppercase tracking-wider text-[#666666] font-semibold mb-4 flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Measurable Impact
                    </h3>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-[#A0A0A0] text-sm leading-relaxed">
                      {project.content.impact}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
