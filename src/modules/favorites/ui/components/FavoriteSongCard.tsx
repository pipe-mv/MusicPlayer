import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { FavoriteSong } from "../../domain/types";

interface FavoriteSongCardProps {
  id: number;
  elem: FavoriteSong;
  handleDeleteSong: (id: number) => void;
  handleDirection: (id: number) => void;
}

const FavoriteSongCard = ({
  id,
  elem,
  handleDeleteSong,
  handleDirection,
}: FavoriteSongCardProps) => {
  const { bio, search } = elem;

  const avatar = bio.artists?.[0]?.strArtistThumb ?? "";

  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="card-image">
          <img src={avatar} alt={search.artist} />
        </div>
        <ul className="social-icons">
          <li>
            <button
              type="button"
              aria-label={`View ${search.song} by ${search.artist}`}
              onClick={() => handleDirection(id)}
            >
              <i className="fa fa-eye" aria-hidden="true"></i>
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-label={`Delete ${search.song} by ${search.artist}`}
              onClick={() => handleDeleteSong(id)}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </li>
        </ul>
        <div className="details">
          <h2>
            {search.artist} <span className="job-title">{search.song}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default FavoriteSongCard;
