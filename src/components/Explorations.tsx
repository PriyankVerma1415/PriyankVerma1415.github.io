import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Code2, LayoutTemplate, Server, Database, Cloud } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "Java"],
    color: "from-blue-500/20 to-transparent",
  },
  {
    title: "Frontend",
    icon: LayoutTemplate,
    skills: ["React", "Next.js", "Tailwind CSS", "Material UI", "PySide6", "Qt Widgets"],
    color: "from-purple-500/20 to-transparent",
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["FastAPI", "REST APIs", "WebSockets", "Node.js"],
    color: "from-emerald-500/20 to-transparent",
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "Supabase", "MySQL", "MongoDB", "AWS RDS"],
    color: "from-orange-500/20 to-transparent",
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["Docker", "AWS", "ECR", "Lightsail", "SageMaker", "GitHub Actions"],
    color: "from-cyan-500/20 to-transparent",
  },
];

export default function Explorations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });

      gsap.to(col1Ref.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(col2Ref.current, {
        yPercent: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-[300vh] bg-bg overflow-hidden"
    >
      <div
        ref={contentRef}
        className="absolute inset-0 h-screen w-full flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="text-center flex flex-col items-center px-4 pointer-events-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Skills
            </span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-6xl md:text-8xl lg:text-9xl text-text-primary tracking-tight mb-8 drop-shadow-2xl">
            Engineering <span className="font-display italic">Stack</span>
          </h2>
          <p className="text-muted text-sm md:text-base max-w-md mx-auto mb-10 drop-shadow-md">
            Technologies, tools, and platforms I use to build scalable applications and modern systems.
          </p>
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full z-20 pointer-events-none px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-40 h-full pt-[50vh]">
          <div
            ref={col1Ref}
            className="flex flex-col gap-12 md:gap-40 mt-[20vh] items-center"
          >
            {[skillCategories[0], skillCategories[1]].map(
              (category, i) => (
                <div
                  key={`col1-${i}`}
                  className="w-full max-w-[380px] p-8 rounded-[32px] bg-bg border border-stroke pointer-events-auto cursor-pointer hover:scale-105 transition-all duration-500 shadow-2xl relative overflow-hidden group"
                  style={{
                    transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)`,
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-text-primary group-hover:text-white transition-colors">
                      <category.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-display italic text-text-primary mb-6 group-hover:text-white transition-colors">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-muted group-hover:border-white/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <div ref={col2Ref} className="flex flex-col gap-12 md:gap-40 items-center">
            {[skillCategories[2], skillCategories[3], skillCategories[4]].map(
              (category, i) => (
                <div
                  key={`col2-${i}`}
                  className="w-full max-w-[380px] p-8 rounded-[32px] bg-bg border border-stroke pointer-events-auto cursor-pointer hover:scale-105 transition-all duration-500 shadow-2xl relative overflow-hidden group"
                  style={{
                    transform: `rotate(${i % 2 === 0 ? 4 : -4}deg)`,
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-text-primary group-hover:text-white transition-colors">
                      <category.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-display italic text-text-primary mb-6 group-hover:text-white transition-colors">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-muted group-hover:border-white/20 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
