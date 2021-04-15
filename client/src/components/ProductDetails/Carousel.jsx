import React from "react";
import "../../scss/components/ProductDetail/_Carousel.scss";

const Carousel = ( {img }) => {

  return (
    <div className="containerCar">
      <div className="carousel">
        <input
          type="radio"
          name="slides"
          defaultChecked="checked"
          id="slide-1"
        />
        <input type="radio" name="slides" id="slide-2" />
        <input type="radio" name="slides" id="slide-3" />

        <ul className="carousel__slides">
          {img.length > 0
            ? img.map((i) => (
                <li className="carousel__slide" key={img.indexOf(i)}>
                  <figure>
                    <div>
                      <img src={i} alt="" />
                    </div>
                  </figure>
                </li>
              ))
            : ""}
        </ul>
        <ul className="carousel__thumbnails">
          {img.length > 0
            ? img.map((i) => (
                <li key={img.indexOf(i)}>
                  <label htmlFor={`slide-${img.indexOf(i) + 1}`}>
                    <img src={i} alt="" />
                  </label>
                </li>
              ))
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
