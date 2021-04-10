import React from 'react'
import "../../scss/components/ProductDetail/_Carousel.scss";

const Carousel = ({img}) => {
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
                <li className="carousel__slide">
                  <figure>
                    <div>
                      <img src={img} alt="" />
                    </div>
                  </figure>
                </li>
                <li className="carousel__slide">
                  <figure>
                    <div>
                      <img src={img} alt="" />
                    </div>
                  </figure>
                </li>
                <li className="carousel__slide">
                  <figure>
                    <div>
                      <img src={img} alt="" />
                    </div>
                  </figure>
                </li>
              </ul>
              <ul className="carousel__thumbnails">
                <li>
                  <label htmlFor="slide-1">
                    <img src={img} alt="" />
                  </label>
                </li>
                <li>
                  <label htmlFor="slide-2">
                    <img src={img} alt="" />
                  </label>
                </li>
                <li>
                  <label htmlFor="slide-3">
                    <img src={img} alt="" />
                  </label>
                </li>
              </ul>
            </div>
          </div>
    )
}

export default Carousel
