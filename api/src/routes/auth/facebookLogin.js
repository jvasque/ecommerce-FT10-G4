const { User } = require("../../db.js");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const axios = require('axios')


module.exports= async(req,res)=> {
    const {accessToken, userID} = req.body
    // console.log("TUID", userID)
    // console.log("al token", accessToken)
   let urlGraphFacebook = `https://graph.facebook.com/v8.0/${userID}/?fields=email,first_name,last_name,picture&access_token=${accessToken}`
  try{
  const response = await axios.get(urlGraphFacebook)
  // console.log(response.data)
  const {email, first_name, last_name, picture, id} = response.data
    const find = await User.findOne({
      where: {
        email: email,
      },
    });
   
    if (find) {
      //  console.log(find) // hay que preguntar por el status
      if (!find.firstName) await find.update({ firstName: first_name });
      if (!find.lastName) await find.update({ lastName: last_name });
      if (!find.facebookUser) await find.update({ facebookUser: id });
      if (!find.photoURL) await find.update({ photoURL: picture.data.url});
      const token = jwt.sign(find.toJSON(), SECRET_KEY)
      // console.log(find.toJSON.status, find.toJSON())
      //setear logica de status, type ando reset password
      res.json(token);
    } else {
      
      const newUser = await User.create({
        firstName: first_name,
        lastName: last_name,
        email: email,
        password: "Henry@12#$",
        facebookUser: id,
        photoURL: picture.data.url
      });
      // console.log(newUser)
      const token = jwt.sign(newUser.toJSON(), SECRET_KEY)
      res.json(token)
    }
  
  } catch (e) {
  res.status(401).json({message: 'no fue autorizado'})
  }
  
  }