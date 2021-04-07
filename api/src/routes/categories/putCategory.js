const { Router } = require("express");
const { Category} = require("../../db.js");

const putCategory = Router();

putCategory.post("/", async (req, res) => {


 let {newName, name} = req.body

  let category = await Category.findOne({where:{
     name:name
  }});

  category.name = newName 
  await category.save();

  console.log(req)
  res.send("PutCategory");
});

module.exports = putCategory;
