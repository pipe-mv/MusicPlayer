import Message from "./Message";
import SongArtist from "./SongArtist";
import SongLyric from "./SongLyric";

const SongDetails = ({ search, lyric, bio, songYouTube, favId, youTubeId }) => {
  console.log(search, lyric, bio, songYouTube, favId, youTubeId);
  if (!lyric || !bio) return null;
  return (
    <div>
      {lyric.error || lyric.err || lyric.name === "AbortError" ? (
        <Message
          msg={`Error: The song "<em>${search.song}</em>" does not exist`}
        />
      ) : (
        <SongLyric title={search.song} lyric={lyric.lyrics} songYouTube={songYouTube} favId={favId} youTubeId={youTubeId} />
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
