import Message from "../../../../shared/ui/Message";
import SongArtist from "./SongArtist";
import SongLyric from "./SongLyric";
import type {
  ArtistResponse,
  LyricResponse,
  SongSearchData,
  YouTubeSearchResponse,
} from "../../domain/types";

interface SongDetailsProps {
  search: SongSearchData;
  lyric: LyricResponse | null;
  bio: ArtistResponse | null;
  songYouTube: YouTubeSearchResponse | null;
}

const SongDetails = ({ search, lyric, bio, songYouTube }: SongDetailsProps) => {
  // console.log(search, lyric, bio, songYouTube);

  if (!lyric || !bio) return null;
  return (
    <div>
      {lyric.error || lyric.err || lyric.name === "AbortError" ? (
        <Message
          msg={`Error: The song "<em>${search.song}</em>" does not exist`}
        />
      ) : (
        songYouTube && (
          <SongLyric lyric={lyric.lyrics} songYouTube={songYouTube} />
        )
      )}
      {bio.artists ? (
        <SongArtist artist={bio.artists[0]} />
      ) : (
        <Message
          msg={`Error: the singer or the band "<em>${search.artist}</em>" does not exist`}
        />
      )}
    </div>
  );
};

export default SongDetails;
