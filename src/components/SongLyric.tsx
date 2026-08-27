import ReactPlayer from "react-player";
import type { YouTubeSearchResponse } from "../types/music";

interface SongLyricProps {
  lyric?: string;
  songYouTube: YouTubeSearchResponse;
}

const SongLyric = ({ lyric, songYouTube }: SongLyricProps) => {
  const videos = songYouTube?.items ?? [];

  return (
    <div>
      <div>
        {videos.map((item) => {
          const { id = {} } = item;
          const { videoId } = id;

          if (!videoId) return null;

          return (
            <div className="player-wrapper" key={videoId}>
              <ReactPlayer
                className="react-player"
                controls
                src={`https://www.youtube.com/watch?v=${videoId}`}
                width="30%"
                height={340}
                config={{
                  youtube: {
                    hl: "en",
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
