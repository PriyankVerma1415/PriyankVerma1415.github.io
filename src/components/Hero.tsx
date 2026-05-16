import { useEffect, useState } from "react";
import NetworkBackground from "./NetworkBackground";
import ResumeModal from "./ResumeModal";
import ContactModal from "./ContactModal";
import gsap from "gsap";
import { cn } from "../lib/utils";

const roles = ["Full Stack Engineer", "Backend Developer", "DevOps Enthusiast", "System Builder"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -20% 0px" }
    );

    const timeoutId = setTimeout(() => {
      const sections = ["home", "work", "projects", "skills", "achievements", "education", "resume"]
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      sections.forEach((section) => observer.observe(section as Element));
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".name-reveal",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.1 }
    ).fromTo(
      ".blur-in",
      { opacity: 0, filter: "blur(10px)", y: 20 },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
      },
      "-=0.9"
    );
  }, []);

  const navLinks = ["Home", "Work", "Projects", "Skills", "Achievements", "Education", "Resume"];

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center">
      {/* Network Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#050505]">
        <NetworkBackground />
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#050505] to-transparent z-10" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
        <div
          className={cn(
            "inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300",
            scrolled ? "shadow-md shadow-black/10" : ""
          )}
        >
          <div
            className="group relative w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
            onClick={() => window.location.reload()}
            role="button"
            aria-label="Reload Page"
          >
            <div className="absolute inset-0 rounded-full accent-gradient group-hover:rotate-180 transition-transform duration-500" />
            <div className="absolute inset-[1px] bg-bg rounded-full flex items-center justify-center">
              <span className="font-display italic text-[13px] text-text-primary">
                PV
              </span>
            </div>
          </div>

          <div className="hidden md:block w-px h-5 bg-stroke mx-1" />

          <div className="flex items-center space-x-1 mx-2">
            {navLinks.map((link) => (
              <a
                key={link}
                href={link === "Resume" ? "#" : `#${link.toLowerCase()}`}
                onClick={(e) => {
                  if (link === "Resume") {
                    e.preventDefault();
                    setIsResumeOpen(true);
                  }
                }}
                className={cn(
                  "text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors",
                  activeSection === link.toLowerCase() && link !== "Resume"
                    ? "text-text-primary bg-stroke/50"
                    : "text-muted hover:text-text-primary hover:bg-stroke/50"
                )}
              >
                {link}
              </a>
            ))}
          </div>

          <div className="w-px h-5 bg-stroke mx-1" />

          <a
            href="https://wa.me/9319227547"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative ml-2 cursor-pointer"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 bg-surface backdrop-blur-md flex items-center gap-1.5 text-text-primary border border-transparent group-hover:border-stroke transition-colors">
              Say hi on
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </div>
          </a>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <div className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
          Software Developer
        </div>
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Priyank Verma
        </h1>
        <div className="blur-in text-lg md:text-2xl text-text-primary mb-6">
          A{" "}
          <span
            key={roleIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {roles[roleIndex]}
          </span>{" "}
          building scalable digital experiences...
        </div>
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
          Building scalable applications and modern systems with clean, efficient code.
        </p>

        <div className="blur-in flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => {
              const element = document.getElementById("work");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="group relative inline-flex rounded-full text-sm font-medium px-7 py-3.5 transition-all duration-300 bg-text-primary text-bg overflow-hidden hover:bg-bg hover:text-text-primary hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] border border-transparent hover:border-white/20"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity p-[2px]">
              <span className="absolute inset-[2px] bg-bg rounded-full" />
            </span>
            <span className="relative z-10">See Works</span>
          </button>
          <button
            onClick={() => setIsContactOpen(true)}
            className="group relative inline-flex rounded-full text-sm font-medium px-7 py-3.5 hover:scale-105 transition-transform border-2 border-stroke bg-bg text-text-primary hover:border-transparent overflow-hidden"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity p-[2px]">
              <span className="absolute inset-[2px] bg-bg rounded-full" />
            </span>
            <span className="relative z-10">Reach out...</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-10">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">
          SCROLL
        </span>
        <div className="w-px h-10 bg-stroke relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-text-primary animate-scroll-down" />
        </div>
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} onOpenResume={() => setIsResumeOpen(true)} />
    </section>
  );
}
