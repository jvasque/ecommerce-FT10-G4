const { Router } = require("express");
const { Category } = require("../../db.js");

const info = Router();

info.get("/", async (req, res) => {
  let data = [
    {
      categoryId: 1,
      name: "Proteccion de Cultivos",
    },
    {
      categoryId: 2,
      name: "Fertilizantes",
    },
    {
      categoryId: 3,
      name: "Otros Insumos Agricolas",
    },
    {
      categoryId: 4,
      name: "Semillas e Hibridos",
    },
  ];

  for (let i = 0; i < data.length; i++) {
    await Category.findOrCreate({
      where: {
        name: data[i].name,
      },
    });
  }
  res.send("info");
});

module.exports = info;
