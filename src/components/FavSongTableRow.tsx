import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { MouseEvent } from "react";
import type { FavoriteSong } from "../types/music";

interface FavSongTableRowProps {
  id: number;
  elem: FavoriteSong;
  handleDeleteSong: (id: number) => void;
  handleDirection: (id: number) => void;
}

const FavSongTableRow = ({
  id,
  elem,
  handleDeleteSong,
  handleDirection,
}: FavSongTableRowProps) => {
  const { bio, search } = elem;

  const avatar = bio.artists?.[0]?.strArtistThumb ?? "";

  const handleAction = (
    event: MouseEvent<HTMLAnchorElement>,
    action: (songId: number) => void
  ) => {
    event.preventDefault();
    action(id);
  };

  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="card-image">
          <img src={avatar} alt={search.artist} />
        </div>
        <ul className="social-icons">
          <li>
            <a href={`#/${id}`} onClick={(event) => handleAction(event, handleDirection)}>
              <i className="fa fa-eye"></i>
            </a>
          </li>
          <li>
            <a href="#delete" onClick={(event) => handleAction(event, handleDeleteSong)}>
              <i className="fa fa-trash"></i>
            </a>
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

export default FavSongTableRow;
