import React from "react";
import HomeCategories from './HomeCategories';
import HomeRecommend from './HomeRecommend';
import "../../scss/components/Home/_Home.scss";

const Home = () => {
  return (
    <div id="HomeMain">      
      <HomeRecommend />
      <HomeCategories />
      <div id="HomeBest">
        <h2>Más Vendidos...</h2>
      </div>
    </div>
  );
};

export default Home;
