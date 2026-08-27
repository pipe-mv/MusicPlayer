export interface SongSearchData {
  artist: string;
  song: string;
}

export interface Artist {
  strArtist: string;
  strArtistThumb?: string | null;
  intBornYear?: string | null;
  intDiedYear?: string | null;
  strCountry?: string | null;
  strGenre?: string | null;
  strStyle?: string | null;
  strWebsite?: string | null;
  strBiographyEN?: string | null;
}

export interface ArtistResponse {
  artists: Artist[] | null;
}

export interface LyricResponse {
  lyrics?: string;
  error?: string;
  err?: boolean;
  name?: string;
}

export interface YouTubeVideo {
  id: {
    videoId?: string;
  };
}

export interface YouTubeSearchResponse {
  items: YouTubeVideo[];
}

export interface FavoriteSong {
  search: SongSearchData;
  lyric: LyricResponse;
  bio: ArtistResponse;
  songYouTube: YouTubeSearchResponse;
}
