import { httpClient } from "../../../shared/api/httpClient";
import type { LyricResponse } from "../domain/types";

// Retrieves song lyrics from Lyrics.ovh.
export const searchLyrics = (artist: string, song: string) =>
  httpClient().get<LyricResponse>(
    `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`
  );
