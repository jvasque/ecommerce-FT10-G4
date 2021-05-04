const juice = require("juice");

const BlockEmail = () => {
  const html = `
  <style>
  div{
    color:white;
  }
  .card-block{
    width: fit-content;
    height: 100%;
    padding: 10px 10px;
    margin: 5px 50px;
    border-radius: 8px;
    background-color: #f7f7f7;
  }
  .hola{
    background-color: grey;
    text-align:right;
  }
  .chao{
    background-color: #45A14A;
    text-align:left;
  }
 
  </style>
  <div class="card-block">
  <div class="hola">Hola!</div>
  <div class="chao">Chao!</div>
  </div>`;
  return juice(html);
};

const TestEmail = (name = "usuario") => {
  const html = `
  <style>
    .emailNewsletter {
      width: 800px;
      margin: 20px 100px;
      padding: 10px 20px 20px 20px;
      background: linear-gradient(to bottom, #45A14A 0%,#45A14A 30%,grey 30%,grey 100%);
      display:block;
    }
    .name-newsletter{
      margin-left: 650px;
      font-size: 30px;
      color: white;
    }
    .title-newsletter{
      font-size: 30px;
      color: white;
    }
    .card-product{
      
      width: 400px;
      height: 300px;
      margin: 10px 0 0 210px;
      padding: 10px;
      background-color: white;
      border: 1px solid red;
      border-radius: 0.8em;
    }
    .img-card{
      width: 40%;
      height: 40%;
     margin: 10px 0 0  10px;
     border-radius: 0.8em;
   
    }
   
  </style>

  <div class='emailNewsletter'>
    <div class="name-newsletter">
      ${name}
    </div>
    <div class="title-newsletter">
      Ven y aprovecha nuestro nuevo stock de tu producto preferido!
    </div>
    <div class="card-product">  

      <a href="http://localhost:3000/newsletter/prueba" target="_blank" rel="nooponner noreferrer"><img class="img-card" src="https://www.duplos.cl/wp-content/uploads/2021/03/Arturo-Vidal-Inter-de-Milan-2021-696x464.jpg" alt="no"/></a>
    </div>

  </div>
`;

  return juice(html);
};

module.exports = {
  TestEmail
} 