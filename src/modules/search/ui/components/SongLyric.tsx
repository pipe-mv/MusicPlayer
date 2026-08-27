import ReactPlayer from "react-player";
import type { YouTubeSearchResponse } from "../../domain/types";

interface SongLyricProps {
  lyric?: string;
  songYouTube: YouTubeSearchResponse;
}

const SongLyric = ({ lyric, songYouTube }: SongLyricProps) => {
  const videos = songYouTube?.items ?? [];

  return (
    <div className="song-content">
      <div className="video-grid">
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
                width="100%"
                height="100%"
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
      <section className="lyrics-panel">
        <h2>Lyrics</h2>
        <blockquote>{lyric}</blockquote>
      </section>
    </div>
  );
};

export default SongLyric;
