import { HashRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Playlist from "./pages/Playlist";
import Player from "./components/Player";

export default function App() {
  return (
    <HashRouter>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-slate-900 min-h-screen text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/playlist" element={<Playlist />} />
          </Routes>
        </div>
      </div>
      <Player />
    </HashRouter>
  );
}
