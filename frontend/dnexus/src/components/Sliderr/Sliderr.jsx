import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./Sliderr.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import SliderImage1 from "../assets/StockImages/slider2.jpg";

const MySlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
       <div className='slick-container'>
         <Slider {...settings} style={{height: '600px'}}>

            <div className="single-slider" style={{backgroundImage: `url(${SliderImage1})`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="text">
                                <h1>Bridging <span>Expertise</span> Empowering <span>Healthcare!</span></h1>
                                <p>Empowering Precision Healthcare Through Seamless Collaboration and Data-Driven Insights! </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="single-slider" style={{backgroundImage: `url(${SliderImage1})`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="text">
                                <h1>Bridging <span>Expertise</span> Empowering <span>Healthcare!</span></h1>
                                <p>Empowering Precision Healthcare Through Seamless Collaboration and Data-Driven Insights! </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="single-slider" style={{backgroundImage: `url(${SliderImage1})`}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="text">
                                <h1>Bridging <span>Expertise</span> Empowering <span>Healthcare!</span></h1>
                                <p>Empowering Precision Healthcare Through Seamless Collaboration and Data-Driven Insights! </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Slider>
       </div>
    );
}

export default MySlider;
