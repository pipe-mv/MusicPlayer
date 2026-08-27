import { useCallback, useState } from "react";
import { isHttpError } from "../../../shared/api/httpClient";
import { searchArtist } from "../infrastructure/artistApi";
import { searchLyrics } from "../infrastructure/lyricsApi";
import { searchYouTube } from "../infrastructure/youtubeApi";
import type {
  ArtistResponse,
  LyricResponse,
  SongSearchData,
  SongSearchResult,
  YouTubeSearchResponse,
} from "../domain/types";

export const useSongSearch = () => {
  const [search, setSearch] = useState<SongSearchData | null>(null);
  const [lyric, setLyric] = useState<LyricResponse | null>(null);
  const [bio, setBio] = useState<ArtistResponse | null>(null);
  const [songYouTube, setSongYouTube] =
    useState<YouTubeSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const searchSong = useCallback(async (query: SongSearchData) => {
    setSearch(query);
    setLyric(null);
    setBio(null);
    setSongYouTube(null);
    setLoading(true);

    const [artistResponse, lyricResponse] = await Promise.all([
      searchArtist(query.artist),
      searchLyrics(query.artist, query.song),
    ]);

    setLyric(lyricResponse);

    if (
      isHttpError(artistResponse) ||
      isHttpError(lyricResponse) ||
      !artistResponse.artists?.length
    ) {
      setBio(isHttpError(artistResponse) ? null : artistResponse);
      setLoading(false);
      return;
    }

    setBio(artistResponse);
    const youtubeResponse = await searchYouTube(query.artist, query.song);

    if (!isHttpError(youtubeResponse) && youtubeResponse.items.length) {
      setSongYouTube(youtubeResponse);
    }

    setLoading(false);
  }, []);

  const selectSong = useCallback((song: SongSearchResult) => {
    setSearch(song.search);
    setLyric(song.lyric);
    setBio(song.bio);
    setSongYouTube(song.songYouTube);
    setLoading(false);
  }, []);

  const currentSong: SongSearchResult | null =
    search && lyric && bio && songYouTube
      ? { search, lyric, bio, songYouTube }
      : null;

  return {
    search,
    lyric,
    bio,
    songYouTube,
    loading,
    currentSong,
    searchSong,
    selectSong,
  };
};
