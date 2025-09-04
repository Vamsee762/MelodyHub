// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Allow your Vite dev client
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Serve local mp3 files
app.use("/songs", express.static("public/songs"));

/* -------------------------- SONGS (static) -------------------------- */
const songs = [
  {
    id: 1,
    title: "Shape of You",
    artist: "Ed Sheeran",
    url: "http://localhost:5000/songs/shape.mp3",
    cover:
      "https://is4-ssl.mzstatic.com/image/thumb/Music125/v4/26/b3/9a/26b39a08-7ec0-9be1-e7f7-124a9f554b8d/source/600x600bb.jpg",
  },
  {
    id: 2,
    title: "Blinding Lights",
    artist: "The Weeknd",
    url: "http://localhost:5000/songs/blind.mp3",
    cover:
      "https://is5-ssl.mzstatic.com/image/thumb/Music123/v4/19/5c/2f/195c2fef-78c1-7a75-5d17-8a3ac2ffb7a6/source/600x600bb.jpg",
  },
  {
    id: 3,
    title: "Stay",
    artist: "Justin Bieber",
    url: "http://localhost:5000/songs/stay.mp3",
    cover:
      "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/87/2d/1e/872d1e8d-2f91-1b3d-6c14-1b5a556f0a6f/source/600x600bb.jpg",
  },
  {
    id: 4,
    title: "Attention",
    artist: "Charlie Puth",
    url: "http://localhost:5000/songs/attention.mp3",
    cover:
      "https://is3-ssl.mzstatic.com/image/thumb/Music125/v4/23/5f/2e/235f2ee2-0a2b-7f3f-ea4b-8c2a1a35a7d2/source/600x600bb.jpg",
  },
  {
    id: 5,
    title: "Like My Father",
    artist: "Jax",
    url: "http://localhost:5000/songs/like-my-father.mp3",
    cover:
      "https://is5-ssl.mzstatic.com/image/thumb/Music116/v4/5d/10/86/5d10861c-4bfb-98a0-34b9-22a4f1a3d2a4/source/600x600bb.jpg",
  },
  {
    id: 6,
    title: "Sapphire",
    artist: "Meroitic",
    url: "http://localhost:5000/songs/sapphire.mp3",
    cover:
      "https://is4-ssl.mzstatic.com/image/thumb/Music112/v4/2a/5d/0d/2a5d0d07-73e9-4d79-8ba1-3d6b7d7b8a60/source/600x600bb.jpg",
  },
];

/* ------------------------ PLAYLISTS (in-memory) --------------------- */
let playlists = [
  { id: 1, name: "My Playlist", songs: [1, 2, 3] },
  { id: 2, name: "Chill Vibes", songs: [2, 4, 5] },
  { id: 3, name: "Romantic", songs: [1, 4, 5] },
  { id: 4, name: "Focus Mode", songs: [2, 6] },
];

/* ----------------------------- Helpers ------------------------------ */
function populatePlaylist(pl) {
  return {
    ...pl,
    songs: pl.songs
      .map((id) => songs.find((s) => s.id === id))
      .filter(Boolean),
  };
}

/* ------------------------------ Routes ----------------------------- */

// Health
app.get("/", (_req, res) => res.send("🎵 MelodyHub Backend Running..."));

// All songs
app.get("/api/songs", (_req, res) => res.json(songs));

// All playlists (populated)
app.get("/api/playlists", (_req, res) => {
  res.json(playlists.map(populatePlaylist));
});

// One playlist by id (populated)
app.get("/api/playlists/:id", (req, res) => {
  const id = Number(req.params.id);
  const pl = playlists.find((p) => p.id === id);
  if (!pl) return res.status(404).json({ message: "Playlist not found" });
  res.json(populatePlaylist(pl));
});

// Create playlist: { name, songs?: number[] }
app.post("/api/playlists", (req, res) => {
  const { name, songs: songIds = [] } = req.body || {};
  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Playlist name is required" });
  }

  // keep only valid song ids
  const validIds = songIds
    .map((n) => Number(n))
    .filter((n) => songs.some((s) => s.id === n));

  const newPlaylist = {
    id: playlists.length ? Math.max(...playlists.map((p) => p.id)) + 1 : 1,
    name: name.trim(),
    songs: validIds,
  };

  playlists.push(newPlaylist);
  res.status(201).json(populatePlaylist(newPlaylist));
});

// Delete playlist
app.delete("/api/playlists/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = playlists.length;
  playlists = playlists.filter((p) => p.id !== id);
  if (playlists.length === before) {
    return res.status(404).json({ message: "Playlist not found" });
  }
  res.json({ success: true });
});

// Update playlist (rename or modify songs)
app.put("/api/playlists/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, songs } = req.body;

  const idx = playlists.findIndex((p) => p.id === id);
  if (idx === -1) {
    return res.status(404).json({ message: "Playlist not found" });
  }

  // Update fields
  if (name) playlists[idx].name = name;
  if (Array.isArray(songs)) playlists[idx].songs = songs;

  res.json(playlists[idx]);
});


/* ------------------------------ Start ------------------------------ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
