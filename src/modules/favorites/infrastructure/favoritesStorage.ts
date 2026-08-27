import type { FavoriteSong } from "../domain/types";

const STORAGE_KEY = "mySongs";

export const loadFavorites = (): FavoriteSong[] => {
  const savedSongs = localStorage.getItem(STORAGE_KEY);

  if (!savedSongs) return [];

  try {
    const parsedSongs: unknown = JSON.parse(savedSongs);
    return Array.isArray(parsedSongs) ? (parsedSongs as FavoriteSong[]) : [];
  } catch {
    return [];
  }
};

export const saveFavorites = (songs: FavoriteSong[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
};
