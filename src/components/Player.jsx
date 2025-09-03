import { usePlayerStore } from "../store/playerStore";
import { useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
} from "lucide-react";

export default function Player() {
  const { currentSong, isPlaying, togglePlay, nextSong, prevSong } =
    usePlayerStore();
  const audioRef = useRef();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  // Sync play/pause
  useEffect(() => {
    if (currentSong) {
      if (isPlaying) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  // Update progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    audio.addEventListener("timeupdate", updateProgress);

    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [currentSong]);

  if (!currentSong) return null;

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(e.target.value);
  };

  const handleVolume = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-950 border-t border-slate-800 text-white px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Song Info */}
      <div className="flex items-center gap-4 w-full md:w-1/3">
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-14 h-14 rounded-md shadow-md"
        />
        <div>
          <p className="font-bold">{currentSong.title}</p>
          <p className="text-sm text-gray-400">{currentSong.artist}</p>
        </div>
      </div>

      {/* Controls + Seek */}
      <div className="flex flex-col items-center w-full md:w-1/3">
        <div className="flex gap-6 items-center mb-2">
          <button
            onClick={() => setShuffle(!shuffle)}
            className={shuffle ? "text-sky-400" : "hover:text-sky-400"}
          >
            <Shuffle size={18} />
          </button>
          <button
            onClick={prevSong}
            className="hover:text-sky-400 transition"
          >
            <SkipBack />
          </button>
          <button
            onClick={togglePlay}
            className="bg-sky-400 hover:bg-sky-500 text-black rounded-full p-3 transition"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={nextSong}
            className="hover:text-sky-400 transition"
          >
            <SkipForward />
          </button>
          <button
            onClick={() => setRepeat(!repeat)}
            className={repeat ? "text-sky-400" : "hover:text-sky-400"}
          >
            <Repeat size={18} />
          </button>
        </div>

        {/* Progress Bar with time */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="w-full accent-sky-400 cursor-pointer"
          />
          <span className="text-xs">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 w-full md:w-1/3 justify-end">
        <Volume2 size={20} />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
          className="w-24 accent-violet-400 cursor-pointer"
        />
      </div>

      <audio
        ref={audioRef}
        src={currentSong.url}
        onEnded={nextSong}
        loop={repeat}
      />
    </div>
  );
}
