import { useParams } from "react-router-dom";
import SongDetails from "./SongDetails";

const SongPage = ({ mySongs }) => {
  let { id } = useParams();
//   console.log(id, mySongs);
//   console.log(mySongs[id]);
  let currentSong = mySongs[id];
  let { search, lyric, bio } = currentSong;
  
  return <SongDetails search={search} lyric={lyric} bio={bio} />;
  
};

export default SongPage;
