import FavSongTableRow from "./FavSongTableRow";
import { useHistory } from "react-router-dom";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FavSongTable = ({ mySongs, handleDeleteSong, favId }) => {
  let history = useHistory();

  const handleDirection = (id) => {
    // console.log(id);
    history.push(`/${id}`);
    favId(id);
  };

  let settings = {
    className: "center",
    centerMode: true,
    dots: true,
    infinite: true,
    centerPadding: "20px",
    slidesToShow: mySongs.length - 1 > 7 ? 7 : mySongs.length - 1,
    swipeToSlide: false,
    afterChange: function (index) {
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
          <h3 colSpan="4">There are not favourite songs</h3>
        </div>
      )}
    </Slider>
  );
};

export default FavSongTable;
