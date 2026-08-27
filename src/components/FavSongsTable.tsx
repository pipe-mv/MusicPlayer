import FavSongTableRow from "./FavSongTableRow";
import { useNavigate } from "react-router-dom";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Settings } from "react-slick";
import type { FavoriteSong } from "../types/music";

interface FavSongsTableProps {
  mySongs: FavoriteSong[];
  handleDeleteSong: (id: number) => void;
  favId: (id: number) => void;
}

const FavSongTable = ({ mySongs, handleDeleteSong, favId }: FavSongsTableProps) => {
  const navigate = useNavigate();

  const handleDirection = (id: number) => {
    // console.log(id);
    navigate(`/${id}`);
    favId(id);
  };

  const settings: Settings = {
    className: "center",
    centerMode: true,
    dots: true,
    infinite: true,
    centerPadding: "20px",
    slidesToShow: mySongs.length - 1 > 7 ? 7 : mySongs.length - 1,
    swipeToSlide: false,
    afterChange: function (index: number) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  // console.log(mySongs);
  return (
    <Slider {...settings}>
      {mySongs.length > 0 ? (
        mySongs.map((elem, index) => (
          <FavSongTableRow
            key={index}
            elem={elem}
            id={index}
            handleDeleteSong={handleDeleteSong}
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

export default FavSongTable;
