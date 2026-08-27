import ReactPlayer from "react-player";

const SongLyric = ({ title, lyric, songYouTube }) => {
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
