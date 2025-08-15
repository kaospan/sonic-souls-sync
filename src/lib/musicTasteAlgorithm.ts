export interface UserMusicProfile {
  id: string;
  topArtists: Array<{
    name: string;
    playCount: number;
    genres: string[];
  }>;
  topTracks: Array<{
    title: string;
    artist: string;
    playCount: number;
  }>;
  topGenres: Array<{
    name: string;
    score: number;
  }>;
  listeningHabits: {
    averageTracksPerDay: number;
    favoriteTimeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    diversityScore: number; // 0-1, higher = more diverse taste
  };
}

export interface MusicCompatibilityResult {
  overallScore: number; // 0-100
  breakdown: {
    artistCompatibility: number;
    genreCompatibility: number;
    listeningHabitsCompatibility: number;
  };
  commonArtists: string[];
  commonGenres: string[];
  recommendations: string[];
}

/**
 * Advanced music taste compatibility algorithm
 * Uses weighted scoring across multiple dimensions
 */
export function calculateMusicCompatibility(
  user1: UserMusicProfile,
  user2: UserMusicProfile
): MusicCompatibilityResult {
  
  // 1. Artist Compatibility (40% weight)
  const artistCompatibility = calculateArtistCompatibility(user1, user2);
  
  // 2. Genre Compatibility (35% weight)
  const genreCompatibility = calculateGenreCompatibility(user1, user2);
  
  // 3. Listening Habits Compatibility (25% weight)
  const habitsCompatibility = calculateListeningHabitsCompatibility(user1, user2);
  
  // Weighted overall score
  const overallScore = Math.round(
    artistCompatibility.score * 0.4 +
    genreCompatibility.score * 0.35 +
    habitsCompatibility.score * 0.25
  );

  return {
    overallScore,
    breakdown: {
      artistCompatibility: artistCompatibility.score,
      genreCompatibility: genreCompatibility.score,
      listeningHabitsCompatibility: habitsCompatibility.score,
    },
    commonArtists: artistCompatibility.common,
    commonGenres: genreCompatibility.common,
    recommendations: generateRecommendations(user1, user2),
  };
}

function calculateArtistCompatibility(user1: UserMusicProfile, user2: UserMusicProfile) {
  const user1Artists = new Set(user1.topArtists.map(a => a.name.toLowerCase()));
  const user2Artists = new Set(user2.topArtists.map(a => a.name.toLowerCase()));
  
  const commonArtists = Array.from(user1Artists).filter(artist => 
    user2Artists.has(artist)
  );
  
  // Jaccard similarity with play count weighting
  const union = new Set([...user1Artists, ...user2Artists]);
  const intersection = commonArtists.length;
  
  // Bonus for highly played common artists
  let weightedScore = (intersection / union.size) * 100;
  
  // Add bonus for shared top artists (higher play counts)
  const topArtistBonus = calculateTopArtistBonus(user1, user2, commonArtists);
  weightedScore = Math.min(100, weightedScore + topArtistBonus);
  
  return {
    score: Math.round(weightedScore),
    common: commonArtists
  };
}

function calculateGenreCompatibility(user1: UserMusicProfile, user2: UserMusicProfile) {
  const user1Genres = new Map(user1.topGenres.map(g => [g.name.toLowerCase(), g.score]));
  const user2Genres = new Map(user2.topGenres.map(g => [g.name.toLowerCase(), g.score]));
  
  const allGenres = new Set([...user1Genres.keys(), ...user2Genres.keys()]);
  const commonGenres: string[] = [];
  
  let totalSimilarity = 0;
  let maxPossibleSimilarity = 0;
  
  for (const genre of allGenres) {
    const score1 = user1Genres.get(genre) || 0;
    const score2 = user2Genres.get(genre) || 0;
    
    if (score1 > 0 && score2 > 0) {
      commonGenres.push(genre);
    }
    
    // Cosine similarity for genre preferences
    totalSimilarity += score1 * score2;
    maxPossibleSimilarity += Math.max(score1, score2) ** 2;
  }
  
  const similarity = maxPossibleSimilarity > 0 ? 
    (totalSimilarity / Math.sqrt(maxPossibleSimilarity)) * 100 : 0;
  
  return {
    score: Math.round(similarity),
    common: commonGenres
  };
}

function calculateListeningHabitsCompatibility(user1: UserMusicProfile, user2: UserMusicProfile) {
  const habits1 = user1.listeningHabits;
  const habits2 = user2.listeningHabits;
  
  // Time preference compatibility
  const timeScores = {
    'morning': 0, 'afternoon': 1, 'evening': 2, 'night': 3
  };
  const timeDiff = Math.abs(timeScores[habits1.favoriteTimeOfDay] - timeScores[habits2.favoriteTimeOfDay]);
  const timeCompatibility = Math.max(0, 100 - (timeDiff * 25));
  
  // Listening volume compatibility (similar daily track counts)
  const volumeDiff = Math.abs(habits1.averageTracksPerDay - habits2.averageTracksPerDay);
  const maxVolume = Math.max(habits1.averageTracksPerDay, habits2.averageTracksPerDay);
  const volumeCompatibility = maxVolume > 0 ? Math.max(0, 100 - (volumeDiff / maxVolume * 100)) : 100;
  
  // Diversity compatibility
  const diversityDiff = Math.abs(habits1.diversityScore - habits2.diversityScore);
  const diversityCompatibility = Math.max(0, 100 - (diversityDiff * 100));
  
  // Weighted average
  const overall = (timeCompatibility * 0.4 + volumeCompatibility * 0.3 + diversityCompatibility * 0.3);
  
  return {
    score: Math.round(overall)
  };
}

function calculateTopArtistBonus(
  user1: UserMusicProfile, 
  user2: UserMusicProfile, 
  commonArtists: string[]
): number {
  let bonus = 0;
  
  for (const artistName of commonArtists) {
    const artist1 = user1.topArtists.find(a => a.name.toLowerCase() === artistName);
    const artist2 = user2.topArtists.find(a => a.name.toLowerCase() === artistName);
    
    if (artist1 && artist2) {
      // Higher bonus for artists in both users' top 10
      const user1Rank = user1.topArtists.findIndex(a => a.name.toLowerCase() === artistName);
      const user2Rank = user2.topArtists.findIndex(a => a.name.toLowerCase() === artistName);
      
      if (user1Rank < 10 && user2Rank < 10) {
        bonus += Math.max(0, 20 - (user1Rank + user2Rank));
      }
    }
  }
  
  return Math.min(30, bonus); // Cap bonus at 30 points
}

function generateRecommendations(user1: UserMusicProfile, user2: UserMusicProfile): string[] {
  const recommendations: string[] = [];
  
  // Recommend user2's top artists that user1 doesn't have
  const user1ArtistNames = new Set(user1.topArtists.map(a => a.name.toLowerCase()));
  
  for (const artist of user2.topArtists.slice(0, 10)) {
    if (!user1ArtistNames.has(artist.name.toLowerCase())) {
      recommendations.push(artist.name);
    }
  }
  
  return recommendations.slice(0, 5);
}

// Utility function for demo/testing
export function createMockUserProfile(id: string): UserMusicProfile {
  const genres = ['indie rock', 'electronic', 'jazz', 'hip hop', 'classical', 'folk'];
  const artists = ['The Strokes', 'Radiohead', 'Daft Punk', 'Miles Davis', 'Bon Iver'];
  
  return {
    id,
    topArtists: artists.map((name, i) => ({
      name,
      playCount: Math.floor(Math.random() * 1000) + 100,
      genres: [genres[Math.floor(Math.random() * genres.length)]]
    })),
    topTracks: [],
    topGenres: genres.map(name => ({
      name,
      score: Math.random()
    })),
    listeningHabits: {
      averageTracksPerDay: Math.floor(Math.random() * 100) + 20,
      favoriteTimeOfDay: ['morning', 'afternoon', 'evening', 'night'][Math.floor(Math.random() * 4)] as any,
      diversityScore: Math.random()
    }
  };
}