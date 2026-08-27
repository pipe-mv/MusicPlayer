import { useCallback, useState } from "react";
import {
  loadFavorites,
  saveFavorites,
} from "../infrastructure/favoritesStorage";
import type { FavoriteSong } from "../domain/types";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteSong[]>(loadFavorites);

  const addFavorite = useCallback((song: FavoriteSong) => {
    setFavorites((currentFavorites) => {
      const nextFavorites = [...currentFavorites, song];
      saveFavorites(nextFavorites);
      return nextFavorites;
    });
  }, []);

  const deleteFavorite = useCallback((id: number) => {
    setFavorites((currentFavorites) => {
      const nextFavorites = currentFavorites.filter((_song, index) => index !== id);
      saveFavorites(nextFavorites);
      return nextFavorites;
    });
  }, []);

  return { favorites, addFavorite, deleteFavorite };
};
