import { usePlayerStore } from "../store/playerStore";
import { useEffect, useState } from "react";
import { fetchCover } from "../utils/fetchCover";

export default function SongCard({ song, allSongs, index }) {
  const setQueue = usePlayerStore((s) => s.setQueue);
  const [cover, setCover] = useState(null); // start empty

  useEffect(() => {
    let mounted = true;
    fetchCover(song.title, song.artist).then((img) => {
      if (mounted && img) setCover(img);
    });
    return () => {
      mounted = false;
    };
  }, [song]);

  return (
    <div
      onClick={() => setQueue(allSongs, index)}
      className="bg-slate-800 text-white p-4 rounded-lg cursor-pointer 
                 hover:bg-slate-700 hover:scale-105 hover:shadow-xl 
                 transition-transform duration-300 ease-in-out"
    >
      {!cover ? (
        // ✅ Skeleton shimmer loader
        <div className="w-full h-40 bg-slate-700 rounded-lg mb-2 animate-pulse"></div>
      ) : (
        <img
          src={cover}
          alt={song.title}
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/200x200/0f172a/38bdf8?text=🎵";
          }}
          className="rounded-lg mb-2 shadow-md transition-transform duration-300 hover:scale-110"
        />
      )}
      <h3 className="font-bold truncate">{song.title}</h3>
      <p className="text-sm text-gray-300 truncate">{song.artist}</p>
    </div>
  );
}
