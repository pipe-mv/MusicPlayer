// import { SongTest } from "./DataTes";
import ReactPlayer from "react-player";
import _ from "lodash";

const SongLyric = ({ title, lyric, songYouTube, favId, youTubeId }) => {
  console.log(songYouTube,favId, youTubeId);

  // const youTubeData = ()
  // const dispatch = useDispatch();
  return (
    <div>
      <div>
        {_.map(songYouTube.items, (item, index) => {
          /* _.map(videoData.items, (item, index) => { */
            /* {songYouTube[0].items.map((item, index) => { */
             console.log("item", item); 
            const { id = {}, snippet = {} } = item;
            const {videoId} = id;
            const { thumbnails = {} } = snippet;
            const { standard = {} } = thumbnails;
            console.log("item id", videoId);
            return (
              <div className="player-wrapper" key={index}>
                <ReactPlayer
                  className="react-player"
                  controls
                  key={id}
                  url={`https://www.youtube.com/watch?v=${videoId}`}
                  // url={songYouTube}
                  width="30%"
                  height={standard.height}
                  config={{
                    youtube: {
                      playerVars: { showinfo: 1, hl: "en" },
                    },
                    file: {
                      tracks: [
                        {
                          kind: "subtitles",
                          src: "subs/subtitles.en.vtt",
                          srcLang: "en",
                          default: true,
                        },
                        {
                          kind: "subtitles",
                          src: "subs/subtitles.ja.vtt",
                          srcLang: "ja",
                        },
                        {
                          kind: "subtitles",
                          src: "subs/subtitles.de.vtt",
                          srcLang: "de",
                        },
                      ],
                    },
                  }}
                />
              </div>
              /* <li key={id}>
              <a href={`https://www.youtube.com/watch?v=${id}`}>
                <p>
                  <img
                    width={standard.width}
                    height={standard.height}
                    src={standard.url}
                    alt={`${title} `}
                  />
                </p>
                <h3>{title}</h3>
              </a>
            </li> */
            );
          /* }); */
        })}
      </div>
      {/* <VideoSong song={SongTest} /> */}
      <div>
        <blockquote>{lyric}</blockquote>
      </div>
      {/* <YoutubePlayer /> */}
    </div>
  );
};

export default SongLyric;
