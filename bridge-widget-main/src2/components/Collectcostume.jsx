import React, { Component } from "react";
import Slider from "react-slick";


import slide1 from '../assets/img/slide/slide_1.png';
import slide2 from '../assets/img/slide/slide_2.png';
import slide3 from '../assets/img/slide/slide_3.png';
import slide4 from '../assets/img/slide/slide_4.png';

export default class Collectcostume extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            centerPadding: 100,
            slidesToShow: 4,
            slidesToScroll: 2,
            initialSlide: 0,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                }
            ]
        };
        return (
            <div className="collecSlideCont">
                <div class="slideTitle"><h3>Costume</h3></div>
                <Slider {...settings}>
                    <div className="slideItem">
                        <img src={slide1} alt="Head Image" className="collectImg" />
                    </div>
                    <div className="slideItem">
                        <img src={slide2} alt="Head Image" className="collectImg" />
                    </div>
                    <div className="slideItem">
                        <img src={slide3} alt="Head Image" className="collectImg" />
                    </div>
                    <div className="slideItem">
                        <img src={slide4} alt="Head Image" className="collectImg" />
                    </div>
                    <div className="slideItem">
                        <img src={slide1} alt="Head Image" className="collectImg" />
                    </div>
                    <div className="slideItem">
                        <img src={slide2} alt="Head Image" className="collectImg" />
                    </div>
                    <div className="slideItem">
                        <img src={slide3} alt="Head Image" className="collectImg" />
                    </div>
                    <div className="slideItem">
                        <img src={slide4} alt="Head Image" className="collectImg" />
                    </div>
                    <div className="slideItem">
                        <img src={slide1} alt="Head Image" className="collectImg" />
                    </div>
                    <div className="slideItem">
                        <img src={slide2} alt="Head Image" className="collectImg" />
                    </div>
                    <div className="slideItem">
                        <img src={slide3} alt="Head Image" className="collectImg" />
                    </div>
                    <div className="slideItem">
                        <img src={slide4} alt="Head Image" className="collectImg" />
                    </div>
                    <div className="slideItem">
                        <img src={slide1} alt="Head Image" className="collectImg" />
                    </div>
                    <div className="slideItem">
                        <img src={slide2} alt="Head Image" className="collectImg" />
                    </div>
                    <div className="slideItem">
                        <img src={slide3} alt="Head Image" className="collectImg" />
                    </div>
                    <div className="slideItem">
                        <img src={slide4} alt="Head Image" className="collectImg" />
                    </div>
                </Slider>
            </div>
        );
    }
}
