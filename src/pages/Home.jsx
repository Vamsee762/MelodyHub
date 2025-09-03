import SongCard from "../components/SongCard";
import Navbar from "../components/Navbar";

const songs = [
  { title: "Shape of You", artist: "Ed Sheeran", url: "/songs/shape.mp3" },
  { title: "Blinding Lights", artist: "The Weeknd", url: "/songs/blind.mp3" },
  { title: "Stay", artist: "Justin Bieber", url: "/songs/stay.mp3" },
];

export default function Home() {
  return (
    <div className="page-fade text-white">
      <Navbar title="Home" />
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4 text-sky-400">
          Recommended for You
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {songs.map((song, i) => (
            <SongCard key={i} song={song} allSongs={songs} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
