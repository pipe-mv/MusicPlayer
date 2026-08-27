import { httpClient } from "../../../shared/api/httpClient";
import type { LyricResponse } from "../domain/types";

export const searchLyrics = (artist: string, song: string) =>
  httpClient().get<LyricResponse>(
    `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`
  );
