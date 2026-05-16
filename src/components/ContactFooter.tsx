import { useEffect, useRef } from "react";
import NetworkBackground from "./NetworkBackground";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function ContactFooter() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  const socials = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/priyank-verma-13554a1b8/" },
    { name: "GitHub", url: "https://github.com/PriyankVerma1415" }
  ];

  return (
    <footer className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      {/* Network Background Flipped */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-[#050505]">
        <div className="w-full h-full scale-y-[-1]">
          <NetworkBackground />
        </div>
        <div className="absolute inset-0 bg-[#050505]/60 z-10" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* GSAP Marquee */}
        <div className="w-full overflow-hidden flex whitespace-nowrap mb-16 md:mb-24 opacity-80 mix-blend-overlay">
          <div ref={marqueeRef} className="flex whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="text-[10vw] font-display italic text-text-primary tracking-tighter leading-none"
              >
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j}>BUILDING SCALABLE SYSTEMS&bull; </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-16 md:mb-24 px-4">
          <h2 className="text-5xl md:text-7xl lg:text-8xl text-text-primary tracking-tight mb-8">
            Let's create <span className="font-display italic">impactful systems</span>
          </h2>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=priyankverma10@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex rounded-full items-center justify-center border border-stroke bg-surface/50 backdrop-blur-md text-text-primary hover:border-transparent px-8 py-5 transition-colors overflow-hidden text-lg"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity p-[2px]">
              <span className="absolute inset-[2px] bg-bg rounded-full" />
            </span>
            <span className="relative z-10 flex items-center gap-3 font-medium">
              priyankverma10@gmail.com <ArrowUpRight className="w-5 h-5" />
            </span>
          </a>
        </div>

        {/* Footer Bar */}
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-stroke/50">
          <div className="flex items-center gap-3 bg-surface/50 backdrop-blur-md border border-stroke rounded-full px-4 py-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-text-primary">
              Available for projects
            </span>
          </div>

          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs md:text-sm text-muted hover:text-text-primary transition-colors uppercase tracking-widest"
              >
                {social.name}
              </a>
            ))}
          </div>

          <div className="text-xs text-muted uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Priyank Verma
          </div>
        </div>
      </div>
    </footer>
  );
}
