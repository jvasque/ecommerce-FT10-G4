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
                      <img src={img[0]} alt="" />
                    </div>
                  </figure>
                </li>
                {img[1]&&
                <li className="carousel__slide">
                  <figure>
                    <div>
                      <img src={img[1]} alt="" />
                    </div>
                  </figure>
                </li>
                 }
                {img[2]&&
                <li className="carousel__slide">
                  <figure>
                    <div>
                      <img src={img[2]} alt="" />
                    </div>
                  </figure>
                </li>
                 }
              </ul>
              <ul className="carousel__thumbnails">
                <li>
                  <label htmlFor="slide-1">
                    <img src={img[0]} alt="" />
                  </label>
                </li>
                {img[1]&&
                <li>
                  <label htmlFor="slide-2">
                    <img src={img[1]} alt="" />
                  </label>
                </li>
                 }
                 {img[2]&&
                <li>
                  <label htmlFor="slide-3">
                    <img src={img[2]} alt="" />
                  </label>
                </li>
                 }
              </ul>
            </div>
          </div>
    )
}

export default Carousel
