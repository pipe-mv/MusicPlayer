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
    className: "center",
    centerMode: true,
    dots: true,
    infinite: true,
    centerPadding: "20px",
    slidesToShow: Math.max(1, Math.min(7, favorites.length)),
    swipeToSlide: false,
    afterChange: function (index: number) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  return (
    <Slider {...settings}>
      {favorites.length > 0 ? (
        favorites.map((elem, index) => (
          <FavoriteSongCard
            key={index}
            elem={elem}
            id={index}
            handleDeleteSong={onDelete}
            handleDirection={handleDirection}
          />
        ))
      ) : (
        <div className="container mt-5 carousel">
          <h3>There are not favourite songs</h3>
        </div>
      )}
    </Slider>
  );
};

export default FavoritesCarousel;
