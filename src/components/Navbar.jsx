import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

const links = [
  { name: "About", to: "about" },
  { name: "Services", to: "services" },
  { name: "Work", to: "work" },
  { name: "Education", to: "education" },
  { name: "Contact", to: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed left-0 top-0 z-50 w-full border-b border-white/10 transition-all duration-300 ${
        scrolled ? "bg-slate-950/90 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <a href="#hero" className="text-2xl font-semibold tracking-[0.35em] text-white">
          TAHA<span className="text-sky-400">.</span>
        </a>

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

        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full border border-slate-700 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-200 transition hover:border-sky-400 hover:text-sky-300 lg:inline-flex"
        >
          Resume
          <ArrowUpRight size={18} />
        </a>

        <button
          className="rounded-full border border-slate-700 p-2 text-white lg:hidden"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/10 bg-slate-950/95 lg:hidden"
        >
          <ul className="flex flex-col items-center gap-7 py-8">
            {links.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  smooth
                  duration={500}
                  offset={-80}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      ) : null}
    </motion.header>
  );
}