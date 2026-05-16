import { motion } from "framer-motion";
import { Award, ExternalLink, BrainCircuit } from "lucide-react";

const certifications = [
  {
    title: "AWS Educate Machine Learning Foundations",
    subtitle: "Machine Learning Fundamentals • AWS Educate",
    icon: Award,
    link: "https://www.credly.com/badges/ba3ba7b3-b3a9-4dc7-9098-b6f804d5af4f/public_url",
  },
  {
    title: "Generative AI with AWS",
    subtitle: "AWS Certified Generative AI Fundamentals",
    icon: BrainCircuit,
    link: "https://www.udacity.com/certificate/e/d4c32822-6656-11f0-a957-3f4fa81739a4",
  },
];

export default function Stats() {
  return (
    <section id="achievements" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
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
              Achievements
            </span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary tracking-tight mb-6">
            Badges & <span className="font-display italic">Certifications</span>
          </h2>
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto">
            Industry certifications and learning milestones focused on AI, cloud, and modern software engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
                delay: i * 0.1,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative p-8 md:p-10 rounded-[32px] bg-surface/30 backdrop-blur-md border border-stroke hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col items-start"
            >
              {/* Subtle Blue Glow */}
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl rounded-[32px]" />
              <div className="absolute inset-[-1px] rounded-[32px] bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 w-full flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 text-text-primary group-hover:text-blue-400 group-hover:border-blue-500/30 transition-colors shadow-lg">
                  <cert.icon className="w-8 h-8" />
                </div>

                <h3 className="text-2xl md:text-3xl font-display italic text-text-primary mb-3 group-hover:text-white transition-colors">
                  {cert.title}
                </h3>

                <p className="text-muted text-sm md:text-base mb-10">
                  {cert.subtitle}
                </p>

                <div className="mt-auto pt-6 border-t border-stroke/50 w-full">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-text-primary hover:text-white transition-colors group/btn"
                  >
                    View Credential
                    <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
