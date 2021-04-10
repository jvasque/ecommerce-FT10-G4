import React from "react";
import "../../scss/components/_Home.scss";


const Home = () => {
  return (
    <div className="containerHome">
   
      <form>
        <input type="radio" name="fancy" autoFocus value="clubs" id="clubs" />
        <input type="radio" name="fancy" value="hearts" id="hearts" />
        <input type="radio" name="fancy" value="spades" id="spades" />
        <input type="radio" name="fancy" value="diamonds" id="diamonds" />
        <label htmlFor="clubs"> Fertilizantes</label><label htmlFor="hearts"> Insumos</label><label htmlFor="spades"> Categoria3</label><label htmlFor="diamonds"> Categoria4</label>
        <div className="keys">Use arrows to navigate</div>
      </form>
    
    </div>
  );
};

export default Home;