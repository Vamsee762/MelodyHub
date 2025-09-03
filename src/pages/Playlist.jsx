import SongCard from "../components/SongCard";
import Navbar from "../components/Navbar";

const playlistSongs = [
  { title: "Levitating", artist: "Dua Lipa", url: "/songs/levitating.mp3" },
  { title: "Peaches", artist: "Justin Bieber", url: "/songs/peaches.mp3" },
  { title: "Señorita", artist: "Shawn Mendes", url: "/songs/senorita.mp3" },
];

export default function Playlist() {
  return (
    <div className="page-fade text-white">
      <Navbar title="My Playlist" />
      <div className="p-6">
        {playlistSongs.length === 0 ? (
          <p className="text-gray-400">No songs in playlist.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {playlistSongs.map((song, i) => (
              <SongCard
                key={i}
                song={song}
                allSongs={playlistSongs}
                index={i}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
