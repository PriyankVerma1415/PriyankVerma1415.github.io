import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
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
            className="relative w-[95vw] md:w-[80vw] h-[85vh] md:h-[90vh] bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
              <h2 className="text-xl md:text-2xl font-display italic text-[#F5F5F5]">
                Resume
              </h2>
              <button
                onClick={onClose}
                aria-label="Close Resume"
                className="p-2 rounded-full hover:bg-white/10 text-[#888888] hover:text-[#F5F5F5] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* PDF Preview */}
            <div className="flex-1 w-full bg-black/50 relative overflow-hidden">
              <iframe
                src="/resume.pdf"
                className="w-full h-full border-none"
                title="Resume PDF"
              />
            </div>

            {/* Footer with Download Button */}
            <div className="p-4 md:p-6 border-t border-white/10 flex justify-end">
              <a
                href="/resume.pdf"
                download
                className="group relative inline-flex items-center gap-2 rounded-full text-sm font-medium px-6 py-3 hover:scale-105 transition-transform border-2 border-white/10 bg-[#0A0A0A] text-[#F5F5F5] hover:border-transparent overflow-hidden"
              >
                <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity p-[2px]">
                  <span className="absolute inset-[2px] bg-[#0A0A0A] rounded-full" />
                </span>
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download Resume
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
