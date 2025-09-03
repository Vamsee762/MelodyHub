import { create } from "zustand";

export const usePlayerStore = create((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: 0,

  setQueue: (songs, index = 0) =>
    set({ queue: songs, currentIndex: index, currentSong: songs[index], isPlaying: true }),

  setSong: (song) =>
    set({ currentSong: song, isPlaying: true }),

  togglePlay: () =>
    set((state) => ({ isPlaying: !state.isPlaying })),

  nextSong: () => {
    const { queue, currentIndex } = get();
    if (queue.length > 0 && currentIndex < queue.length - 1) {
      set({ currentIndex: currentIndex + 1, currentSong: queue[currentIndex + 1], isPlaying: true });
    }
  },

  prevSong: () => {
    const { queue, currentIndex } = get();
    if (queue.length > 0 && currentIndex > 0) {
      set({ currentIndex: currentIndex - 1, currentSong: queue[currentIndex - 1], isPlaying: true });
    }
  },
}));
