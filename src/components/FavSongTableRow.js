import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FavSongTableRow = ({ id, elem, handleDeleteSong, handleDirection }) => {
  let { bio, search } = elem;

  let avatar = bio.artists[0].strArtistThumb;

  let url;

  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="card-image">
          <img src={avatar} alt={search.artist} />
        </div>
        <ul className="social-icons">
          <li>
            <a href={url} onClick={() => handleDirection(id)}>
              <i className="fa fa-eye"></i>
            </a>
          </li>
          <li>
            <a href={url} onClick={() => handleDeleteSong(id)}>
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
