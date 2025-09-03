import { useState } from "react";
import SongCard from "../components/SongCard";
import Navbar from "../components/Navbar";

const dummySongs = [
  { title: "Shape of You", artist: "Ed Sheeran", url: "/songs/shape.mp3" },
  { title: "Blinding Lights", artist: "The Weeknd", url: "/songs/blind.mp3" },
  { title: "Stay", artist: "Justin Bieber", url: "/songs/stay.mp3" },
];

export default function Search() {
  const [query, setQuery] = useState("");

  const results = dummySongs.filter(
    (song) =>
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="page-fade text-white">
      <Navbar title="Search" />

      {/* Sticky search bar */}
      <div className="sticky top-0 z-10 bg-slate-900 p-6">
        <input
          type="text"
          placeholder="Search for songs, artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 rounded bg-slate-800 text-white outline-none"
        />
      </div>

      {/* Results */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((song, i) => (
          <SongCard key={i} song={song} allSongs={results} index={i} />
        ))}
      </div>

      {results.length === 0 && (
        <p className="text-gray-400 p-6">No results found.</p>
      )}
    </div>
  );
}
