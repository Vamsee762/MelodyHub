import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { body, param, validationResult } from "express-validator";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Serve static songs from /public/songs
app.use("/songs", express.static("public/songs"));

/* ----------------------- MongoDB Connection ----------------------- */
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ Missing MONGO_URI in .env");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error("❌ Missing JWT_SECRET in .env");
  process.exit(1);
}

await mongoose.connect(MONGO_URI);
console.log("✅ MongoDB connected");

/* ----------------------------- Models ----------------------------- */
const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    cover: String,
    url: { type: String, required: true },
  },
  { timestamps: true }
);
const Song = mongoose.model("Song", songSchema);

const playlistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }, // null = public/seeded
  },
  { timestamps: true }
);
const Playlist = mongoose.model("Playlist", playlistSchema);

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    displayName: { type: String, required: true },
    passwordHash: { type: String, required: true },
    likedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);

/* --------------------------- Seed helper -------------------------- */
async function seedIfEmpty() {
  const count = await Song.countDocuments();
  if (count > 0) return;

  const initialSongs = [
    {
      title: "Shape of You",
      artist: "Ed Sheeran",
      url: "http://localhost:5000/songs/shape.mp3",
      cover:
        "https://i.scdn.co/image/ab67616d0000b273d58f35b77d37fa6e0a2be3a0",
    },
    {
      title: "Blinding Lights",
      artist: "The Weeknd",
      url: "http://localhost:5000/songs/blind.mp3",
      cover:
        "https://i.scdn.co/image/ab67616d0000b273c7f918ca9cf48a5b9a59f75f",
    },
    {
      title: "Stay",
      artist: "Justin Bieber",
      url: "http://localhost:5000/songs/stay.mp3",
      cover:
        "https://i.scdn.co/image/ab67616d0000b273879fba83cd4c0b9168536a24",
    },
    {
      title: "Attention",
      artist: "Charlie Puth",
      url: "http://localhost:5000/songs/attention.mp3",
      cover:
        "https://i.scdn.co/image/ab67616d0000b273948e5dcf64f8571a8b6a6e5e",
    },
    {
      title: "Like My Father",
      artist: "Jax",
      url: "http://localhost:5000/songs/like-my-father.mp3",
      cover:
        "https://i.scdn.co/image/ab67616d0000b2730f1e9c162a9c9d3f1f4e6c47",
    },
    {
      title: "Sapphire",
      artist: "Meroitic",
      url: "http://localhost:5000/songs/sapphire.mp3",
      cover:
        "https://i.scdn.co/image/ab67616d0000b2730b8e4fa9c4e97c5812c32712",
    },
  ];

  const created = await Song.insertMany(initialSongs);
  const byTitle = Object.fromEntries(created.map((s) => [s.title, s._id]));

  await Playlist.insertMany([
    {
      name: "My Playlist",
      songs: [
        byTitle["Shape of You"],
        byTitle["Blinding Lights"],
        byTitle["Stay"],
      ],
      owner: null,
    },
    {
      name: "Chill Vibes",
      songs: [
        byTitle["Blinding Lights"],
        byTitle["Attention"],
        byTitle["Like My Father"],
      ],
      owner: null,
    },
    {
      name: "Romantic",
      songs: [
        byTitle["Shape of You"],
        byTitle["Attention"],
        byTitle["Like My Father"],
      ],
      owner: null,
    },
    {
      name: "Focus Mode",
      songs: [byTitle["Blinding Lights"], byTitle["Sapphire"]],
      owner: null,
    },
  ]);

  console.log(`🌱 Seeded ${created.length} songs and sample playlists`);
}

/* ------------------ TEMP RESET (one-time wipe & reseed) ------------ */
await Song.deleteMany({});
await Playlist.deleteMany({});
await seedIfEmpty(); // ✅ reseeds with covers
// ⚠️ Remove the 3 lines above after running once

/* ------------------------- Auth middleware ------------------------ */
function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.uid;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

/* ------------------------------ Routes ---------------------------- */
// (keep all your routes here, unchanged)

/* --------------------------- Error handling ----------------------- */
app.use((req, res) => res.status(404).json({ error: "Not found" }));
app.use((err, req, res, _next) => {
  console.error("API Error:", err);
  res.status(500).json({ error: err.message || "Server error" });
});

/* ----------------------------- Listen ----------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
