import { httpClient } from "../../../shared/api/httpClient";
import type { YouTubeSearchResponse } from "../domain/types";

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const searchYouTube = (artist: string, song: string) => {
  const query = new URLSearchParams({
    part: "snippet",
    q: `${artist} ${song}`,
    type: "video",
    maxResults: "3",
    key: YOUTUBE_API_KEY ?? "",
    quotaUser: "test789",
  });

  return httpClient().get<YouTubeSearchResponse>(
    `https://www.googleapis.com/youtube/v3/search?${query}`
  );
};
