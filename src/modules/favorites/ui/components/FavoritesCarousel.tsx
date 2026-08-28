import FavoriteSongCard from "./FavoriteSongCard";
import { useNavigate } from "react-router-dom";
import { Children, isValidElement, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Settings } from "react-slick";
import type { FavoriteSong } from "../../domain/types";
import { getCarouselLayout, getDotWindowStart } from "./carouselLayout";

interface FavoritesCarouselProps {
  favorites: FavoriteSong[];
  onDelete: (id: number) => void;
  onSelect: (id: number) => void;
}

// Displays saved songs in a responsive carousel with bounded pagination.
const FavoritesCarousel = ({
  favorites,
  onDelete,
  onSelect,
}: FavoritesCarouselProps) => {
  const navigate = useNavigate();
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);

    window.addEventListener("resize", updateViewportWidth);
    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  const handleDirection = (id: number) => {
    navigate(`/${id}`);
    onSelect(id);
  };

  const layout = getCarouselLayout(viewportWidth);
  const visibleSlides = Math.max(
    1,
    Math.min(layout.slidesToShow, favorites.length),
  );
  const settings: Settings = {
    appendDots: (dots) => {
      const dotItems = Children.toArray(dots);
      const activeIndex = dotItems.findIndex(
        (dot) =>
          isValidElement<{ className?: string }>(dot) &&
          dot.props.className?.includes("slick-active"),
      );
      const start = getDotWindowStart(
        Math.max(0, activeIndex),
        dotItems.length,
        layout.dotLimit,
      );

      return <ul>{dotItems.slice(start, start + layout.dotLimit)}</ul>;
    },
    arrows: layout.arrows,
    className: "favorites-slider",
    centerMode: false,
    dots: true,
    infinite: favorites.length > 4,
    slidesToShow: visibleSlides,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  if (!favorites.length) {
    return <p className="favorites-empty">No favourite songs saved yet.</p>;
  }

  return (
    <Slider key={`${layout.slidesToShow}-${layout.arrows}`} {...settings}>
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
