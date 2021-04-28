import React from "react";
import HomeCategories from './HomeCategories';
import HomeRecommend from './HomeRecommend';
import HomeHigher from './HomeHigher'
import "../../scss/components/Home/_Home.scss";

const Home = () => {
  return (
    <div className="HomeMain">      
      <HomeRecommend />
      <HomeCategories />
      <HomeHigher />
    </div>
  );
};

export default Home;
