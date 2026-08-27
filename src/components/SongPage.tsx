import { useParams } from "react-router-dom";
import SongDetails from "./SongDetails";
import type { FavoriteSong } from "../types/music";

interface SongPageProps {
  mySongs: FavoriteSong[];
}

const SongPage = ({ mySongs }: SongPageProps) => {
  const { id } = useParams<{ id: string }>();
  const songIndex = Number(id);
  const currentSong = Number.isInteger(songIndex) ? mySongs[songIndex] : undefined;

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

export default SongPage;
