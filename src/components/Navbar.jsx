import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { name: "About", to: "about" },
  { name: "Services", to: "services" },
  { name: "Work", to: "work" },
  { name: "Education", to: "education" },
  { name: "GitHub", to: "github" },
  { name: "Contact", to: "contact" },
];

const resumeUrl = "/resume.pdf";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fermer le menu Resume avec ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setResumeOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed left-0 top-0 z-50 w-full border-b border-white/10 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/90 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">

          {/* LOGO */}
          <a
            href="#hero"
            className="text-2xl font-semibold tracking-[0.35em] text-white"
            onClick={closeMobileMenu}
          >
            TAHA<span className="text-sky-400">.</span>
          </a>

          {/* ================= DESKTOP LINKS ================= */}
          <ul className="hidden items-center gap-10 lg:flex">
            {links.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  smooth
                  duration={500}
                  offset={-80}
                  className="cursor-pointer text-sm font-semibold uppercase tracking-[0.3em] text-slate-300 transition hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* ================= DESKTOP RESUME ================= */}
          <div className="relative hidden lg:block">

            <button
              onClick={() => setResumeOpen((open) => !open)}
              aria-expanded={resumeOpen}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] transition-all duration-300 ${
                resumeOpen
                  ? "border-sky-400 bg-sky-400/10 text-sky-300"
                  : "border-slate-700 text-slate-200 hover:border-sky-400 hover:text-sky-300"
              }`}
            >
              Resume
              <ArrowUpRight
                size={18}
                className={`transition-transform duration-300 ${
                  resumeOpen ? "rotate-45" : ""
                }`}
              />
            </button>

            {/* ================= RESUME DROPDOWN ================= */}
            <AnimatePresence>
              {resumeOpen && (
                <>
                  {/* Invisible overlay */}
                  <div
                    className="fixed inset-0 z-[-1]"
                    onClick={() => setResumeOpen(false)}
                  />

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                      scale: 0.97,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.97,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-[calc(100%+14px)] w-[430px] overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl shadow-black/50"
                  >

                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-400">
                          <FileText size={20} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-white">
                            Taha El Bal
                          </p>

                          <p className="text-xs text-slate-500">
                            Full Stack Developer · AI & Data Engineer
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setResumeOpen(false)}
                        className="rounded-full p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
                        aria-label="Close resume"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* PDF PREVIEW */}
                    <div className="h-[480px] overflow-hidden bg-white">
                      <iframe
                        src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        title="Taha El Bal Resume"
                        className="h-full w-full border-0"
                      />
                    </div>

                    {/* Footer buttons */}
                    <div className="flex items-center gap-3 border-t border-slate-800 p-4">

                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
                      >
                        <ExternalLink size={16} />
                        Open
                      </a>

                      <a
                        href={resumeUrl}
                        download="Taha-El-Bal-Resume.pdf"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-sky-400"
                      >
                        <Download size={16} />
                        Download
                      </a>

                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            className="rounded-full border border-slate-700 p-2 text-white transition hover:border-sky-400 hover:text-sky-400 lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* ================= MOBILE NAVIGATION ================= */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{ duration: 0.25 }}
              id="mobile-navigation"
              className="overflow-hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl lg:hidden"
            >
              <div className="px-6 py-8">

                <ul className="flex flex-col items-center gap-7">
                  {links.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        smooth
                        duration={500}
                        offset={-80}
                        onClick={closeMobileMenu}
                        className="cursor-pointer text-sm font-semibold uppercase tracking-[0.3em] text-slate-300 transition hover:text-sky-400"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* MOBILE RESUME */}
                <div className="mt-8 border-t border-slate-800 pt-7">

                  <button
                    onClick={() => setResumeOpen((open) => !open)}
                    className="mx-auto flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
                  >
                    Resume
                    <ArrowUpRight size={18} />
                  </button>

                  {/* MOBILE PDF */}
                  <AnimatePresence>
                    {resumeOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 10,
                        }}
                        className="mx-auto mt-5 max-w-md overflow-hidden rounded-2xl border border-slate-700 bg-slate-900"
                      >
                        <div className="h-[420px]">
                          <iframe
                            src={resumeUrl}
                            title="Taha El Bal Resume"
                            className="h-full w-full"
                          />
                        </div>

                        <div className="flex gap-3 border-t border-slate-800 p-4">

                          <a
                            href={resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-700 px-3 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-200"
                          >
                            <ExternalLink size={15} />
                            Open
                          </a>

                          <a
                            href={resumeUrl}
                            download="Taha-El-Bal-Resume.pdf"
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-sky-500 px-3 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white"
                          >
                            <Download size={15} />
                            Download
                          </a>

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}