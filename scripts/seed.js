#!/usr/bin/env node
/**
 * scripts/seed.js
 * Generates deterministic fake seed data for Sonic Souls Sync.
 *
 * Usage:
 *   node scripts/seed.js              # 400 users
 *   node scripts/seed.js --count=10   # 10 users (smoke test)
 *
 * No external dependencies — plain Node.js only.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Seeded pseudo-random number generator (Mulberry32)
// ---------------------------------------------------------------------------
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const RNG_SEED = 42;
const rng = mulberry32(RNG_SEED);

function randInt(min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function randItem(arr) {
  return arr[Math.floor(rng() * arr.length)];
}

// ---------------------------------------------------------------------------
// UUID v4 (deterministic via seeded RNG — not spec-compliant but fine for demo)
// ---------------------------------------------------------------------------
function uuidv4() {
  const hex = () =>
    Math.floor(rng() * 0x10000)
      .toString(16)
      .padStart(4, "0");
  return `${hex()}${hex()}-${hex()}-4${hex().slice(1)}-${(
    (Math.floor(rng() * 4) + 8) *
    0x1000
  )
    .toString(16)
    .padStart(4, "0")}-${hex()}${hex()}${hex()}`;
}

// ---------------------------------------------------------------------------
// Data pools
// ---------------------------------------------------------------------------
const ISRAELI_FIRST_NAMES = [
  "Avi",
  "Tal",
  "Yael",
  "Noam",
  "Noa",
  "Tamar",
  "Eitan",
  "Lior",
  "Shira",
  "Oren",
  "Maya",
  "Dani",
  "Rotem",
  "Itay",
  "Michal",
  "Gal",
  "Amir",
  "Dana",
  "Yonatan",
  "Rina",
];

const GLOBAL_FIRST_NAMES = [
  "Alex",
  "Sam",
  "Jordan",
  "Taylor",
  "Chris",
  "Morgan",
  "Riley",
  "Jamie",
  "Drew",
  "Casey",
  "Robin",
  "Blake",
  "Cameron",
  "Logan",
  "Dylan",
  "Avery",
  "Peyton",
  "Quinn",
  "Reese",
  "Skyler",
];

const LAST_NAMES = [
  "Cohen",
  "Levy",
  "Ben-David",
  "Shapiro",
  "Goldberg",
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Martinez",
  "Patel",
  "Kim",
  "Nguyen",
  "Müller",
  "Rosenberg",
  "Azouri",
  "Mizrahi",
  "Peretz",
];

const BIOS = [
  "Music lover and creator 🎵",
  "Sharing sonic experiences with the world",
  "DJ | Producer | Dreamer",
  "Finding beauty in every sound",
  "Electronic music enthusiast",
  "Guitar and soul",
  "Creating beats that move you",
  "Music is my language",
  "Indie artist on a journey",
  "Bass-heavy vibes only",
  "Ambient soundscapes for calm minds",
  "Jazz aficionado with a modern twist",
  "Mixing genres, breaking rules",
  "From Tel Aviv to the world",
  "Hip-hop heads unite",
];

const MUSIC_TITLES = [
  "Midnight Echoes",
  "Desert Sunrise",
  "Urban Pulse",
  "Tel Aviv Nights",
  "Cosmic Drift",
  "Soul Resonance",
  "Mediterranean Beat",
  "Digital Mirage",
  "Inner Rhythm",
  "Frequency Shift",
  "Wave Collapse",
  "Neon Shadows",
  "Lost in Sound",
  "Electric Soul",
  "Morning Groove",
  "Deep Blue",
  "Mountain Echo",
  "City Lights",
  "Ancient Melody",
  "Future Waves",
];

const MUSIC_DESCS = [
  "An exploration of ambient soundscapes",
  "Electronic beats meet organic instruments",
  "Inspired by late-night sessions",
  "A journey through rhythm and melody",
  "Fusion of Middle Eastern scales and modern production",
  "Raw and unfiltered expression",
  "Layered textures and deep bass",
  "Minimal techno for maximum impact",
  "Soulful vocals over driving beats",
  "A tribute to the golden era of jazz",
];

const COUNTRIES = [
  "IL",
  "IL",
  "IL",
  "IL",
  "IL",
  "IL",
  "US",
  "GB",
  "DE",
  "FR",
  "BR",
  "JP",
  "AU",
  "CA",
  "IN",
];

const LOCALES_IL = ["he-IL", "ar-IL"];
const LOCALES_GLOBAL = ["en-US", "en-GB", "de-DE", "fr-FR", "pt-BR", "ja-JP"];

const COMMENT_TEXTS = [
  "This is incredible! 🔥",
  "Love this track",
  "So good!",
  "Amazing vibes",
  "Keep it up!",
  "Pure fire 🎵",
  "This hits different",
  "Absolutely stunning",
  "More please!",
  "Sharing this with everyone I know",
];

// ---------------------------------------------------------------------------
// Parse CLI args
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
let count = 400;
for (const arg of args) {
  const m = arg.match(/^--count=(\d+)$/);
  if (m) count = parseInt(m[1], 10);
}

const ISRAELI_COUNT = Math.round(count * 0.6);

// ---------------------------------------------------------------------------
// Generate users
// ---------------------------------------------------------------------------
const users = [];
const userIds = [];

for (let i = 0; i < count; i++) {
  const isIsraeli = i < ISRAELI_COUNT;
  const firstName = isIsraeli
    ? randItem(ISRAELI_FIRST_NAMES)
    : randItem(GLOBAL_FIRST_NAMES);
  const lastName = randItem(LAST_NAMES);
  const displayName = `${firstName} ${lastName}`;
  const username = `${firstName.toLowerCase()}_${lastName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")}${i}`;
  const country = isIsraeli ? "IL" : randItem(COUNTRIES.filter((c) => c !== "IL"));
  const locale = isIsraeli ? randItem(LOCALES_IL) : randItem(LOCALES_GLOBAL);
  const avatarSeed = `${username}-${i}`;
  const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(avatarSeed)}`;

  // createdAt: random date in past 2 years
  const daysAgo = randInt(1, 730);
  const createdAt = new Date(Date.now() - daysAgo * 86400000).toISOString();

  const id = uuidv4();
  userIds.push(id);

  users.push({
    id,
    username,
    displayName,
    bio: randItem(BIOS),
    country,
    locale,
    avatar,
    createdAt,
    posts: [],
    followingIds: [],
  });
}

// ---------------------------------------------------------------------------
// Generate posts per user
// ---------------------------------------------------------------------------
for (const user of users) {
  const postCount = randInt(0, 5);
  for (let p = 0; p < postCount; p++) {
    const title = randItem(MUSIC_TITLES);
    const description = randItem(MUSIC_DESCS);
    const audioUrl = `https://example.com/audio/${user.id}-track-${p + 1}.mp3`;
    const likes = randInt(0, 500);

    const commentCount = randInt(0, 5);
    const comments = [];
    for (let c = 0; c < commentCount; c++) {
      const commenter = randItem(users);
      comments.push({
        id: uuidv4(),
        userId: commenter.id,
        username: commenter.username,
        text: randItem(COMMENT_TEXTS),
        createdAt: new Date(
          Date.now() - randInt(1, 365) * 86400000
        ).toISOString(),
      });
    }

    user.posts.push({
      id: uuidv4(),
      userId: user.id,
      title,
      description,
      audioUrl,
      likes,
      comments,
      createdAt: new Date(
        Date.now() - randInt(1, 365) * 86400000
      ).toISOString(),
    });
  }
}

// ---------------------------------------------------------------------------
// Generate follow graph
// ---------------------------------------------------------------------------
for (const user of users) {
  const followCount = randInt(0, Math.min(20, count - 1));
  const candidates = userIds.filter((id) => id !== user.id);
  const followed = new Set();
  for (let f = 0; f < followCount; f++) {
    const candidate = randItem(candidates);
    followed.add(candidate);
  }
  user.followingIds = Array.from(followed);
}

// ---------------------------------------------------------------------------
// Write output files
// ---------------------------------------------------------------------------
const outDir = path.join(__dirname);
const fullPath = path.join(outDir, "seeds.json");
const samplePath = path.join(outDir, "seeds_sample_preview.json");

// Strip followingIds from sample to keep it readable
const sample = users.slice(0, 20).map((u) => ({ ...u }));

fs.writeFileSync(fullPath, JSON.stringify(users, null, 2), "utf8");
fs.writeFileSync(samplePath, JSON.stringify(sample, null, 2), "utf8");

console.log(
  `✅ Seed complete: ${users.length} users (${ISRAELI_COUNT} Israeli), ` +
    `${users.reduce((s, u) => s + u.posts.length, 0)} posts`
);
console.log(`   Full data  → ${fullPath}`);
console.log(`   Sample     → ${samplePath}`);
