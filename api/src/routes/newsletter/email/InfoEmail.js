const juice = require("juice");



const InfoEmail = (
  name = "usuario",
  id = 0,
  productName = "producto",
  unitPrice = 200,
  picture = [
    "https://argentina.agrofystatic.com/media/catalog/product/cache/1/image/850x600/0dc2d03fe217f8c83829496872af24a0/g/l/gl_agrofy_piezas_seleccion_punto-35.jpg?usewebp=true",
  ],
  score= "city, province, country",
  unitsOnStock = 69,
  cat = ["fertilizantes"]
) => {
  const html = `
  <style>
    .emailNewsletter {
      width: 800px;
      margin: 20px 100px;
      padding: 10px 20px 20px 20px;
      background: linear-gradient(to bottom, rgba(255, 153, 0, 0.85) 0%,rgba(255, 153, 0, 0.85) 25%,white 40%,white 88%, rgba(69, 161, 74, 0.85) 90%, rgba(69, 161, 74, 0.85) 100%);
      display:block;
    }
    .name-newsletter{
      text-align: left;
      margin-left: 10px;
     padding:10px;
      font-size: 30px;
      color: rgba(42, 46, 42, 0.5)
    }
    .title-newsletter{
      margin-left: 10px;
      font-size: 30px;
      color: rgba(42, 46, 42, 1)
    }
    .card-product{
      display: inline-block;
      width: 40%;
      margin: 10px 0 0 210px;
      padding: 10px;
      background-color: rgba(247, 247, 247, 1);
      border: 0.5px solid grey;
      border-radius: 0.8em;
    }
    .img-card{
      width: 90%;
      height: 40%;
     margin: 10px 0 0  0px;
     border-radius: 0.8em;
   
    }
    .product-img{
      text-align: center;
    }
    a{
      text-decoration: none;
      color: #45A14A
    }
    .news-logo{
      text-align: center;
      width: 90%;
      margin: 10px 0 0 30px;
      height: 100%;
      padding: 10px;
      border-radius: 2em;
      background: linear-gradient(to bottom,rgb(255,153,0) 0%,rgba(201,67,94,1) 100%);
        }
    .img-logo{
      width: 30%;
      height: 30%;
     
   
    }
  </style>

  <div class='emailNewsletter'>
  <div class="news-logo"><img class="img-logo" src="https://cdn.discordapp.com/attachments/803407061203025931/835991187286130698/AgroPlace-logo_new_png.png"/></div>
    <div class="name-newsletter">
      ${name}
    </div>
    <div class="title-newsletter">
      Ven y aprovecha nuestro nuevo stock de tu producto favorito!
    </div>
    <a ${id !== 0?`href=http://localhost:3000/${id} target="_blank" rel="nooponner noreferrer"`:''}>
    <div class="card-product">  
      <div class="product-img">
        <img class="img-card" src=${picture[0]} alt="no"/>
        <h2>${productName}</h2>
      </div>
      <div class="list-product">
        <ul>
          <li>Precio: ${unitPrice} USD</li>
          <li>Stock: ${unitsOnStock}</li>
          <li>Ubicacion: ${score}</li>
          <li>
            Categorias:
              <ul>
                <li >${cat[0]}</li>
                ${cat[1]!==undefined?`<li >${cat[1]}</li>`:''}
              </ul>
          </li>

        </ul>
      </div>
      </a>
    </div>

  </div>
`;

  return juice(html);
};

module.exports = {
  InfoEmail,
};
