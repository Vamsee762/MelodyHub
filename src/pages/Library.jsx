import SongCard from "../components/SongCard";
import Navbar from "../components/Navbar";

const savedSongs = [
  { title: "Believer", artist: "Imagine Dragons", url: "/songs/believer.mp3" },
  { title: "Faded", artist: "Alan Walker", url: "/songs/faded.mp3" },
];

export default function Library() {
  return (
    <div className="page-fade text-white">
      <Navbar title="Your Library" />
      <div className="p-6">
        {savedSongs.length === 0 ? (
          <p className="text-gray-400">No songs in library.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {savedSongs.map((song, i) => (
              <SongCard key={i} song={song} allSongs={savedSongs} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
