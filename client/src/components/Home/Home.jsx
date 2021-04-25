import React from "react";
import HomeCategories from './HomeCategories';
import HomeRecommend from './HomeRecommend';
import "../../scss/components/Home/_Home.scss";

const Home = () => {
  return (
    <div className="HomeMain">      
      <HomeRecommend />
      <HomeCategories />
    </div>
  );
};

export default Home;
