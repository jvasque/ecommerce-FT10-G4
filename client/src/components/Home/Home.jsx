import React from "react";
import "../../scss/components/_Home.scss";



const Home = () => {
  return (
    <div className="container">
    
      <form>
        <input type="radio" name="fancy" autofocus value="clubs" id="clubs" />
        <input type="radio" name="fancy" value="hearts" id="hearts" />
        <input type="radio" name="fancy" value="spades" id="spades" />
        <input type="radio" name="fancy" value="diamonds" id="diamonds" />
        <label for="clubs"> Fertilizantes</label><label for="hearts"> Insumos</label><label for="spades"> Categoria3</label><label for="diamonds"> Categoria4</label>
        <div class="keys">Use arrows to navigate</div>
      </form>
      

     
    
    </div>
    
  );
};

export default Home;