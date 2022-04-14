import ReactPlayer from "react-player";
import _ from "lodash";

const SongLyric = ({ title, lyric, songYouTube }) => {
  // console.log(songYouTube);

  return (
    <div>
      <div>
        {_.map(songYouTube.items, (item, index) => {
          /* console.log("item", item); */
          const { id = {}, snippet = {} } = item;
          const { videoId } = id;
          const { thumbnails = {} } = snippet;
          const { standard = {} } = thumbnails;
          /* console.log("item id", videoId); */

          return (
            <div className="player-wrapper" key={index}>
              <ReactPlayer
                className="react-player"
                controls
                key={id}
                url={`https://www.youtube.com/watch?v=${videoId}`}
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
                    ],
                  },
                }}
              />
            </div>
          );
        })}
      </div>
      <div>
        <blockquote>{lyric}</blockquote>
      </div>
    </div>
  );
};

export default SongLyric;
