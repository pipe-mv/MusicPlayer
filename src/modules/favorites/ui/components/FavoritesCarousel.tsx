import FavoriteSongCard from "./FavoriteSongCard";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Settings } from "react-slick";
import type { FavoriteSong } from "../../domain/types";

interface FavoritesCarouselProps {
  favorites: FavoriteSong[];
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
}

const FavoritesCarousel = ({
  favorites,
  onDelete,
  onSelect,
}: FavoritesCarouselProps) => {
  const navigate = useNavigate();

  const handleDirection = (id: number) => {
    navigate(`/${id}`);
    onSelect(id);
  };

  const settings: Settings = {
    className: "favorites-slider",
    centerMode: false,
    dots: true,
    infinite: favorites.length > 4,
    slidesToShow: Math.max(1, Math.min(4, favorites.length)),
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.max(1, Math.min(3, favorites.length)),
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: Math.max(1, Math.min(2, favorites.length)),
        },
      },
      {
        breakpoint: 520,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  if (!favorites.length) {
    return <p className="favorites-empty">No favourite songs saved yet.</p>;
  }

  return (
    <Slider {...settings}>
      {favorites.map((elem, index) => (
        <FavoriteSongCard
          key={`${elem.search.artist}-${elem.search.song}-${index}`}
          elem={elem}
          id={index}
          handleDeleteSong={onDelete}
          handleDirection={handleDirection}
        />
      ))}
    </Slider>
  );
};

export default FavoritesCarousel;
