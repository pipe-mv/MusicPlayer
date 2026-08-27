import { useParams } from "react-router-dom";
import SongDetails from "../../../search/ui/components/SongDetails";
import type { FavoriteSong } from "../../domain/types";

interface FavoriteSongScreenProps {
  favorites: FavoriteSong[];
}

const FavoriteSongScreen = ({ favorites }: FavoriteSongScreenProps) => {
  const { id } = useParams<{ id: string }>();
  const songIndex = Number(id);
  const currentSong = Number.isInteger(songIndex)
    ? favorites[songIndex]
    : undefined;

  if (!currentSong) {
    return <p>Song not found</p>;
  }

  const { search, lyric, bio, songYouTube } = currentSong;

  return (
    <SongDetails
      search={search}
      lyric={lyric}
      bio={bio}
      songYouTube={songYouTube}
    />
  );
};

export default FavoriteSongScreen;
