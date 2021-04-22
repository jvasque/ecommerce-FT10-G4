const { User } = require("../../db");
const { SECRET_KEY, GOOGLE_CONSUMER_KEY } = process.env;
const jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(

    GOOGLE_CONSUMER_KEY
  );

module.exports=  async (req, res) => {
    const { tokenId } = req.body;
    
    try {
      const response = await client.verifyIdToken({
        idToken: tokenId,
        audience:
        GOOGLE_CONSUMER_KEY,
      });
      // console.log(response)
      const {
        email_verified,
        sub,
        given_name,
        family_name,
        email,
        picture,
      } = response.payload;
      if (email_verified) {
        const find = await User.findOne({
          where: {
            email: email,
          },
        });
        if (find) {
          
          if (!find.firstName) await find.update({ firstName: given_name });
          if (!find.lastName) await find.update({ lastName: family_name });
          if (!find.googleId) await find.update({ googleId: sub });
          if (!find.photoURL) await find.update({ photoURL: picture });
          const token = jwt.sign(find.toJSON(), SECRET_KEY)
          
          res.json(token);
        } else {
          
          const newUser = await User.create({
            firstName: given_name,
            lastName: family_name,
            email: email,
            password: "Henry@12#$",
            googleId: sub,
            photoURL: picture
          });
          const token = jwt.sign(newUser.toJSON(), SECRET_KEY)
          res.json(token)
        }
      } else {
        res.status(401).json({message: "email no verificado"})
      }
    } catch (e) {
     res.status(401).json({message: 'no fue autorizado'})
    }
  }