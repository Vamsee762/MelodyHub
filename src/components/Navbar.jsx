export default function Navbar({ title }) {
  return (
    <div className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-sm px-6 py-3 border-b border-slate-700">
      <h2 className="text-xl font-bold text-sky-400">{title}</h2>
    </div>
  );
}
