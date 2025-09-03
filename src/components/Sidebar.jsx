import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-60 h-screen bg-slate-950 text-white flex flex-col p-4">
      <h1 className="text-2xl font-extrabold mb-6">
        <span className="bg-gradient-to-r from-sky-300 via-sky-400 to-sky-500 bg-clip-text text-transparent">
          MelodyHub
        </span>{" "}
        <span className="text-violet-400">🎵</span>
      </h1>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:text-sky-400 transition duration-200">🏠 Home</Link>
        <Link to="/search" className="hover:text-sky-400 transition duration-200">🔍 Search</Link>
        <Link to="/library" className="hover:text-sky-400 transition duration-200">📚 Library</Link>
        <Link to="/playlist" className="hover:text-sky-400 transition duration-200">🎶 Playlist</Link>
      </nav>
    </div>
  );
}
