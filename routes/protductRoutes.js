

const router = require("express").Router();
const productController = require("../controllers/productController.js");


// all routes for the product
router.post('/create',productController.creatProduct)



module.exports = router;
