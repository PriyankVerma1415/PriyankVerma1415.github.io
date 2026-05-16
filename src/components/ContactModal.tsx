import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Phone } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const isMobile = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const mailLink = isMobile 
    ? "mailto:priyankverma10@gmail.com" 
    : "https://mail.google.com/mail/?view=cm&fs=1&to=priyankverma10@gmail.com";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-md bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-white/5">
              <h2 className="text-2xl font-display italic text-[#F5F5F5]">
                Let's Connect
              </h2>
              <button
                onClick={onClose}
                aria-label="Close Contact Form"
                className="p-2 rounded-full hover:bg-white/10 text-[#888888] hover:text-[#F5F5F5] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <a
                href={mailLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#3b82f6]/30 hover:bg-[#3b82f6]/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#3b82f6]/20 group-hover:text-[#3b82f6]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[#888888] text-xs uppercase tracking-wider mb-1">Email Me</div>
                  <div className="text-[#F5F5F5] font-medium group-hover:text-[#3b82f6] transition-colors">
                    priyankverma10@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="tel:+919319227547"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#3b82f6]/30 hover:bg-[#3b82f6]/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 group-hover:bg-[#3b82f6]/20 group-hover:text-[#3b82f6]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[#888888] text-xs uppercase tracking-wider mb-1">Call Me</div>
                  <div className="text-[#F5F5F5] font-medium group-hover:text-[#3b82f6] transition-colors">
                    +91 93192 27547
                  </div>
                </div>
              </a>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href="https://www.linkedin.com/in/priyank-verma-13554a1b8/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#3b82f6]/30 hover:bg-[#3b82f6]/5 transition-all duration-300"
                >
                  <LinkedinIcon className="w-6 h-6 text-[#888888] group-hover:text-[#3b82f6] transition-colors" />
                  <span className="text-xs text-[#888888] group-hover:text-[#F5F5F5] transition-colors">LinkedIn</span>
                </a>

                <a
                  href="https://github.com/PriyankVerma1415"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#3b82f6]/30 hover:bg-[#3b82f6]/5 transition-all duration-300"
                >
                  <GithubIcon className="w-6 h-6 text-[#888888] group-hover:text-[#3b82f6] transition-colors" />
                  <span className="text-xs text-[#888888] group-hover:text-[#F5F5F5] transition-colors">GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
