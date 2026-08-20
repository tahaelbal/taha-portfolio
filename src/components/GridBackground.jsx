export default function GridBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />
      <div className="absolute left-1/4 top-0 h-125 w-125 rounded-full bg-blue-600/20 blur-[180px]" />
      <div className="absolute bottom-0 right-0 h-150 w-150 rounded-full bg-cyan-500/10 blur-[200px]" />
    </div>
  );
}