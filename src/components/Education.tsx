import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";

const educationData = [
  {
    title: "Bachelor of Technology — Computer Science Engineering",
    subtitle: "Amity University • Noida, India",
    meta: "2019 — 2022",
    icon: GraduationCap,
  },
  {
    title: "Diploma — Computer Engineering",
    subtitle: "PDM University • Haryana, India",
    meta: "2016 — 2019",
    icon: BookOpen,
  },
];

export default function Education() {
  return (
    <section id="education" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1000px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Education
            </span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight mb-6">
            Academic <span className="font-display italic">Background</span>
          </h2>
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto">
            My academic journey in computer science and software engineering.
          </p>
        </motion.div>

        <div className="relative space-y-8 md:space-y-0">
          {/* Timeline Line */}
          <div className="absolute left-[39px] md:left-1/2 top-4 bottom-4 w-px bg-stroke hidden md:block" />

          {educationData.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.15,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative flex flex-col md:flex-row items-center md:py-12 ${i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
            >
              {/* Timeline Dot/Icon */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-bg border border-stroke items-center justify-center z-10 text-muted shadow-xl">
                <edu.icon className="w-5 h-5" />
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-1/2 flex flex-col group ${i % 2 === 0 ? "md:pl-16" : "md:pr-16"
                }`}>
                <div className="p-8 md:p-10 rounded-[32px] bg-surface/30 backdrop-blur-md border border-stroke hover:border-white/20 transition-all duration-500 relative overflow-hidden shadow-2xl hover:-translate-y-2">
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl rounded-[32px]" />
                  <div className="absolute inset-[-1px] rounded-[32px] bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 md:hidden rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-primary shadow-lg">
                        <edu.icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted">
                        {edu.meta}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-display italic text-text-primary mb-2 group-hover:text-white transition-colors">
                      {edu.title}
                    </h3>

                    <p className="text-muted text-sm md:text-base mb-2">
                      {edu.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
