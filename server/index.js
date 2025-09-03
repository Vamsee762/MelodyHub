import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static songs
app.use("/songs", express.static("public/songs"));

// Songs with covers + URLs
const songs = [
  {
    id: 1,
    title: "Shape of You",
    artist: "Ed Sheeran",
    url: "http://localhost:5000/songs/shape.mp3",
    cover: "https://i.scdn.co/image/ab67616d0000b273d58f35b77d37fa6e0a2be3a0"
  },
  {
    id: 2,
    title: "Blinding Lights",
    artist: "The Weeknd",
    url: "http://localhost:5000/songs/blind.mp3",
    cover: "https://i.scdn.co/image/ab67616d0000b273c7f918ca9cf48a5b9a59f75f"
  },
  {
    id: 3,
    title: "Stay",
    artist: "Justin Bieber",
    url: "http://localhost:5000/songs/stay.mp3",
    cover: "https://i.scdn.co/image/ab67616d0000b273879fba83cd4c0b9168536a24"
  },
  {
    id: 4,
    title: "Attention",
    artist: "Charlie Puth",
    url: "http://localhost:5000/songs/attention.mp3",
    cover: "https://i.scdn.co/image/ab67616d0000b273948e5dcf64f8571a8b6a6e5e"
  },
  {
    id: 5,
    title: "Like My Father",
    artist: "Jax",
    url: "http://localhost:5000/songs/like-my-father.mp3",
    cover: "https://i.scdn.co/image/ab67616d0000b2730f1e9c162a9c9d3f1f4e6c47"
  },
  {
    id: 6,
    title: "Sapphire",
    artist: "Meroitic",
    url: "http://localhost:5000/songs/sapphire.mp3",
    cover: "https://i.scdn.co/image/ab67616d0000b2730b8e4fa9c4e97c5812c32712"
  }
];




// Playlists
const playlists = [
  { id: 1, name: "My Playlist", songs: [1, 2, 3] },
  { id: 2, name: "Chill Vibes", songs: [2, 4, 5] },
  { id: 3, name: "Romantic", songs: [1, 4, 5] },
  { id: 4, name: "Focus Mode", songs: [2, 6] }
];

// Routes
app.get("/", (req, res) => {
  res.send("🎵 MelodyHub Backend Running...");
});

app.get("/api/songs", (req, res) => {
  res.json(songs);
});

app.get("/api/playlists", (req, res) => {
  res.json(playlists);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
