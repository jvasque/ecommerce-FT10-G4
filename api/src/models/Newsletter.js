const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('newsletter', {
    //newsLetterEmail
    type: { //el template elegido.
      type: DataTypes.STRING,
      allowNull: false
    },
    html:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    // email:{
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    //newsLetterOption
    // promotion: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true
    // },
    // information:{
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true
    // },
    // daily: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: true
    // }
   

    
  });
};


////// ocurrencia
// when change the stock of the product {wishlist, favoritos, compras} 
// when a product is in promote {wishlist, favoritos, compras} 
// user.add{userNewsLetter contiene {suscribe: true || false}} --> userNewsletter // uno es a uno // aqui puedes hacer match con estos modelos
//  // {wishlist, favoritos, compras} solo con verdadero se enviara por stock o boletin informativo.
// NewsLetter contain {id, razonDeEnvio, email(tamplate) }
// emailNewsLetter puede tener muchos userNewsLetter // historial de email { guardar tipo, guardar email}


///// rutas 

// enviar --> se debe enviar segun: {tipo (oferta, stock), aQuienSeLeEnvia (wishlist, favoritos, compras)}


/////funcionalidades del e-mail (crear tamplate)
// link del producto si se envia a un producto
// agregar o quitar seccion a boletin informativo.
// crear templates. 
