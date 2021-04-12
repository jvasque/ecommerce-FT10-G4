const addCategory = require("./addCategory");
const allCategories = require("./allCategories");
const deleteCategory = require("./deleteCategory");
const putCategory = require("./putCategory");

const router = require("express").Router();

router.post("/addCategory", addCategory);
router.get("/allCategories", allCategories);
router.post("/deleteCategory", deleteCategory);
router.post("/putCategory", putCategory);
