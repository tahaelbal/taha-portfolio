import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SiReact, SiNextdotjs, SiFastapi, SiPython, SiDocker, SiPostgresql } from "react-icons/si";
import { TbRobot } from "react-icons/tb";
import profileImage from "../assets/images/taha.jpeg";

const techStack = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "FastAPI", icon: SiFastapi, color: "#059669" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "YOLOv8", icon: TbRobot, color: "#F97316" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateMatch = () => setIsMobile(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);
    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, []);

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
      {/* FIX: h-150/w-150 n'existent pas par défaut dans Tailwind -> valeurs arbitraires explicites */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-blue-600/15 blur-[180px]" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[160px]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16">
        <div className="flex flex-col items-center justify-center gap-4 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex items-center gap-3 rounded-full border border-slate-700/80 px-6 py-3">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
              Available for work
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
            <MapPin size={16} />
            Marrakech, Morocco
          </div>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl transform md:-translate-y-12 lg:-translate-y-20"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.45em] text-sky-400">
              FULL STACK DEVELOPER • AI & DATA ENGINEER
            </p>
            <div className="mt-6 space-y-3">
              <h1 className="text-6xl font-serif italic text-white sm:text-7xl lg:text-[7rem]">
                Taha
              </h1>
              <h1 className="text-6xl font-black tracking-tight text-slate-500 sm:text-7xl lg:text-[7rem]">
                El Bal.
              </h1>
            </div>
            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400 sm:text-xl">
              Engineering robust, scalable web platforms while building my future in AI & Data Engineering at IADATA.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-950 transition hover:bg-sky-400 hover:text-white"
              >
                Get in touch
                <ArrowUpRight size={18} />
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-7 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-slate-200 transition hover:border-sky-400 hover:text-sky-300"
              >
                View work
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center transform lg:justify-end lg:-translate-y-10"
          >
            {/* FIX: max-w-105 -> max-w-[420px] explicite */}
            <div className="relative w-full max-w-[420px]">
              <div className="absolute inset-0 scale-110 rounded-full bg-sky-500/20 blur-[180px]" />
              <div className="absolute -left-5 -top-5 h-full w-full rounded-2xl border border-slate-700" />
              <div className="absolute left-5 top-5 h-full w-full rounded-2xl border-2 border-sky-500" />

              <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">
                {/* FIX: h-140 -> h-[560px] explicite, + z-10 sur le badge pour rester au-dessus */}
                <img
                  src={profileImage}
                  alt="Taha El Bal portrait"
                  className="h-[560px] w-full object-cover"
                />

                <div className="absolute right-0 top-5 z-10 bg-sky-600 px-5 py-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white">
                    FULL STACK • AI & DATA
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 z-10 rounded-2xl bg-white px-7 py-6 text-slate-950 shadow-2xl">
                <h2 className="text-3xl font-bold">5+</h2>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
                  Years learning
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="overflow-hidden rounded-[2rem] border border-slate-800/80 bg-slate-950/70 px-4 py-8 shadow-[0_0_80px_rgba(2,132,199,0.12)] backdrop-blur-xl sm:px-6 sm:py-10"
        >
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-950 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-950 to-transparent" />
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: isMobile ? 22 : 25, repeat: Infinity, ease: "linear" }}
              className="flex w-max items-center gap-3 sm:gap-4"
            >
              {[...techStack, ...techStack].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={`${item.name}-${index}`}
                    whileHover={{ y: -4, scale: 1.03, boxShadow: `0 0 0 1px ${item.color}35, 0 0 24px ${item.color}22` }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    className="flex items-center gap-3 rounded-full border border-slate-800/80 bg-slate-900/80 px-4 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-slate-200 shadow-lg shadow-black/20 sm:px-5"
                  >
                    <span className="text-lg" style={{ color: item.color }}>
                      <Icon />
                    </span>
                    <span>{item.name}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-10 grid gap-8 text-center md:grid-cols-3">
            <div>
              <h2 className="text-3xl font-bold text-white">6+</h2>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Projects</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">15+</h2>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Technologies</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">100%</h2>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Passion</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex h-12 w-7 justify-center rounded-full border border-slate-600">
          <div className="mt-2 h-3 w-1 rounded-full bg-white animate-bounce" />
        </div>
      </div>
    </section>
  );
}
