export async function fetchCover(song, artist) {
  try {
    if (!song || !artist) {
      return "https://placehold.co/200x200/0f172a/38bdf8?text=🎵"; // fallback
    }

    const query = encodeURIComponent(`${artist} ${song}`);
    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`
    ).catch(() => null); // catch network errors

    if (!res || !res.ok) {
      return "https://placehold.co/200x200/0f172a/38bdf8?text=🎵";
    }

    const data = await res.json().catch(() => null);
    if (data && data.results && data.results.length > 0) {
      const cover = data.results[0].artworkUrl100.replace("100x100", "600x600");
      return cover;
    }

    return "https://placehold.co/200x200/0f172a/38bdf8?text=🎵";
  } catch (err) {
    console.error("Cover fetch failed:", err);
    return "https://placehold.co/200x200/0f172a/38bdf8?text=🎵";
  }
}
