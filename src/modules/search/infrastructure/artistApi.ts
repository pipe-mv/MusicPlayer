import { httpClient } from "../../../shared/api/httpClient";
import type { ArtistResponse } from "../domain/types";

export const searchArtist = (artist: string) =>
  httpClient().get<ArtistResponse>(
    `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${encodeURIComponent(artist)}`
  );
