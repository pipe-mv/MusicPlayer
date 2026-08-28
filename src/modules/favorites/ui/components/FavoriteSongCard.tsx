import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import type { FavoriteSong } from "../../domain/types";

interface FavoriteSongCardProps {
  id: number;
  elem: FavoriteSong;
  handleDeleteSong: (id: number) => void;
  handleDirection: (id: number) => void;
}

// Presents one saved song with touch-friendly view and delete actions.
const FavoriteSongCard = ({
  id,
  elem,
  handleDeleteSong,
  handleDirection,
}: FavoriteSongCardProps) => {
  const [areActionsVisible, setAreActionsVisible] = useState(false);
  const { bio, search } = elem;

  const avatar = bio.artists?.[0]?.strArtistThumb ?? "";
  const actionsId = `favorite-actions-${id}`;

  return (
    <div className="card-wrapper">
      <div className={`card${areActionsVisible ? " is-actions-visible" : ""}`}>
        <button
          type="button"
          className="card-image"
          aria-label={`Show actions for ${search.song} by ${search.artist}`}
          aria-controls={actionsId}
          aria-expanded={areActionsVisible}
          onClick={() => setAreActionsVisible((isVisible) => !isVisible)}
        >
          <img src={avatar} alt={search.artist} />
        </button>
        <ul className="social-icons" id={actionsId}>
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
