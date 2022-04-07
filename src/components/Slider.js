import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function ImageSlider() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: "linear"
    }
    return (
        <Slider {...settings}>
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-image">
                        <img src='https://i.ytimg.com/vi/yKNxeF4KMsY/sddefault.jpg' alt="a"/>
                    </div>
                    <ul className="social-icons">
                        <li><a href="a"><i className="fa fa-trash"></i></a></li>
                        <li><a href="a"><i className="fa fa-eye"></i></a></li>
                    </ul>
                    <div className="details">
                        <h2>John Doe <span className="job-title">UI Developer</span></h2>
                    </div>
                </div>
            </div>
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-image">
                        <img src="images/15.jpg" alt="" />
                    </div>
                    <ul className="social-icons">
                        <li><a href="a"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="a"><i className="fa fa-instagram"></i></a></li>
                        <li><a href="a"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="a"><i className="fa fa-dribbble"></i></a></li>
                    </ul>
                    <div className="details">
                        <h2>John Doe <span className="job-title">UI Developer</span></h2>
                    </div>
                </div>
            </div>
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-image">
                        <img src="images/7.jpg" alt="" />
                    </div>
                    <ul className="social-icons">
                        <li><a href="a"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="a"><i className="fa fa-instagram"></i></a></li>
                        <li><a href="a"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="a"><i className="fa fa-dribbble"></i></a></li>
                    </ul>
                    <div className="details">
                        <h2>John Doe <span className="job-title">UI Developer</span></h2>
                    </div>
                </div>
            </div>
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-image">
                        <img src="images/16.jpg" alt="a" />
                    </div>
                    <ul className="social-icons">
                        <li><a href="a"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="a"><i className="fa fa-instagram"></i></a></li>
                        <li><a href="a"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="a"><i className="fa fa-dribbble"></i></a></li>
                    </ul>
                    <div className="details">
                        <h2>John Doe <span className="job-title">UI Developer</span></h2>
                    </div>
                </div>
            </div>
        </Slider>
    )
}

export default ImageSlider

//... is called spread operator

//thanks for watching
//pleae subscribe my channel