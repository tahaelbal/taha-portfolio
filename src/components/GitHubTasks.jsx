import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

const GITHUB_USERNAME = (import.meta.env.VITE_GITHUB_USERNAME || "tahaelbal").trim();
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function toUtcDate(dateString) {
  return new Date(`${dateString}T00:00:00Z`);
}

function getContributionColor(level) {
  if (level >= 4) return "bg-[#39d353]";
  if (level === 3) return "bg-[#26a641]";
  if (level === 2) return "bg-[#006d32]";
  if (level === 1) return "bg-[#0e4429]";
  return "bg-[#161b22]";
}

function buildWeeksForYear(contributions, year) {
  const startOfYear = new Date(Date.UTC(year, 0, 1));
  const endOfYear = new Date(Date.UTC(year, 11, 31));

  const firstSunday = new Date(startOfYear);
  firstSunday.setUTCDate(firstSunday.getUTCDate() - firstSunday.getUTCDay());

  const lastSaturday = new Date(endOfYear);
  lastSaturday.setUTCDate(lastSaturday.getUTCDate() + (6 - lastSaturday.getUTCDay()));

  const byDate = new Map(contributions.map((item) => [item.date, item]));
  const weeks = [];
  const cursor = new Date(firstSunday);

  while (cursor <= lastSaturday) {
    const week = [];

    for (let dayIndex = 0; dayIndex < 7; dayIndex += 1) {
      const dateKey = cursor.toISOString().slice(0, 10);
      const isInSelectedYear = cursor >= startOfYear && cursor <= endOfYear;
      const existing = byDate.get(dateKey);

      week.push({
        date: dateKey,
        count: existing?.count || 0,
        level: existing?.level || 0,
        isInSelectedYear,
      });

      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    weeks.push(week);
  }

  return weeks;
}

function getMonthMarkers(weeks) {
  return weeks.map((week, weekIndex) => {
    for (const day of week) {
      if (!day.isInSelectedYear) continue;
      const date = toUtcDate(day.date);

      if (date.getUTCDate() === 1) {
        return {
          weekIndex,
          label: MONTH_NAMES[date.getUTCMonth()],
        };
      }
    }

    return null;
  });
}

export default function GitHubTasks() {
  const [totalsByYear, setTotalsByYear] = useState({});
  const [allContributions, setAllContributions] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getUTCFullYear());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadContributions() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load GitHub contributions.");
        }

        const payload = await response.json();
        const safeTotals = payload?.total && typeof payload.total === "object" ? payload.total : {};
        const safeContributions = Array.isArray(payload?.contributions) ? payload.contributions : [];

        setTotalsByYear(safeTotals);
        setAllContributions(safeContributions);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError("GitHub contributions are temporarily unavailable.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadContributions();
    return () => controller.abort();
  }, []);

  const availableYears = useMemo(() => {
    return Object.keys(totalsByYear)
      .map((year) => Number(year))
      .filter((year) => Number.isFinite(year))
      .sort((a, b) => b - a);
  }, [totalsByYear]);

  useEffect(() => {
    if (availableYears.length === 0) return;

    if (!availableYears.includes(selectedYear)) {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears, selectedYear]);

  const selectedYearContributions = useMemo(() => {
    return allContributions.filter((entry) => toUtcDate(entry.date).getUTCFullYear() === selectedYear);
  }, [allContributions, selectedYear]);

  const weeks = useMemo(() => {
    if (!selectedYear || selectedYearContributions.length === 0) {
      return [];
    }

    return buildWeeksForYear(selectedYearContributions, selectedYear);
  }, [selectedYearContributions, selectedYear]);

  const monthMarkers = useMemo(() => {
    if (!selectedYear || weeks.length === 0) {
      return [];
    }

    return getMonthMarkers(weeks);
  }, [weeks, selectedYear]);

  const yearlyTotal = totalsByYear[String(selectedYear)] ?? selectedYearContributions.reduce((sum, day) => sum + (day.count || 0), 0);
  const flatDays = weeks.flat();

  return (
    <section id="github" className="relative overflow-hidden px-6 py-20 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_80%_75%,rgba(2,132,199,0.09),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="GitHub"
          title="Tasks & Contributions"
          description="A GitHub-style contribution view with year navigation, connected to my account."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mt-10 grid gap-5 lg:grid-cols-[1fr_140px]"
        >
          <article className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-base font-semibold text-[#c9d1d9]">
                {loading ? "Loading contributions..." : `${yearlyTotal} contributions in ${selectedYear}`}
              </p>

              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#8b949e] transition hover:text-[#c9d1d9]"
              >
                Contribution settings
                <ArrowUpRight size={14} />
              </a>
            </div>

            {error ? (
              <p className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">
                {error}
              </p>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <div className="min-w-[760px]">
                    <div
                      className="mb-2 ml-8"
                      style={{
                        display: "grid",
                        gridAutoFlow: "column",
                        gridAutoColumns: "12px",
                        columnGap: "3px",
                      }}
                    >
                      {monthMarkers.map((marker, index) => (
                        <div key={`month-${index}`} className="relative h-4">
                          {marker ? (
                            <span className="absolute -left-1 top-0 text-[11px] text-[#8b949e]">{marker.label}</span>
                          ) : null}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-start gap-2">
                      <div className="grid h-[102px] grid-rows-7 text-[11px] text-[#8b949e]">
                        <span className="flex h-3 items-center">&nbsp;</span>
                        <span className="flex h-3 items-center">Mon</span>
                        <span className="flex h-3 items-center">&nbsp;</span>
                        <span className="flex h-3 items-center">Wed</span>
                        <span className="flex h-3 items-center">&nbsp;</span>
                        <span className="flex h-3 items-center">Fri</span>
                        <span className="flex h-3 items-center">&nbsp;</span>
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridAutoFlow: "column",
                          gridTemplateRows: "repeat(7, 12px)",
                          gridAutoColumns: "12px",
                          gap: "3px",
                        }}
                      >
                        {flatDays.map((day) => (
                          <div
                            key={day.date}
                            title={`${day.count} contribution${day.count > 1 ? "s" : ""} on ${day.date}`}
                            aria-label={`${day.count} contribution${day.count > 1 ? "s" : ""} on ${day.date}`}
                            role="img"
                            className={`h-3 w-3 rounded-[2px] border border-[#30363d]/40 ${day.isInSelectedYear ? getContributionColor(day.level) : "bg-transparent"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 text-xs text-[#8b949e]">
                  <a
                    href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile"
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-[#c9d1d9]"
                  >
                    Learn how we count contributions
                  </a>

                  <div className="flex items-center gap-2">
                    <span>Less</span>
                    <div className="h-3 w-3 rounded-[2px] border border-[#30363d]/40 bg-[#161b22]" />
                    <div className="h-3 w-3 rounded-[2px] border border-[#30363d]/40 bg-[#0e4429]" />
                    <div className="h-3 w-3 rounded-[2px] border border-[#30363d]/40 bg-[#006d32]" />
                    <div className="h-3 w-3 rounded-[2px] border border-[#30363d]/40 bg-[#26a641]" />
                    <div className="h-3 w-3 rounded-[2px] border border-[#30363d]/40 bg-[#39d353]" />
                    <span>More</span>
                  </div>
                </div>
              </>
            )}
          </article>

          <aside className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-3 lg:p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8b949e]">Years</p>

            <div className="space-y-1.5">
              {availableYears.length === 0 && !loading ? (
                <p className="text-sm text-[#8b949e]">No years available.</p>
              ) : (
                availableYears.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setSelectedYear(year)}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium transition ${
                      year === selectedYear
                        ? "bg-[#1f6feb] text-white"
                        : "text-[#8b949e] hover:bg-[#161b22] hover:text-[#c9d1d9]"
                    }`}
                  >
                    {year}
                  </button>
                ))
              )}
            </div>
          </aside>
        </motion.div>
      </div>
    </section>
  );
}
