// // Import router from express
// import { Router } from "express";
// import userController from "../controllers/userController.js";

// // All the routes for the user
// const router = Router();

// router.post("/create", userController.createUser);



// // Export
// export default router;










// import router from express
const router = require("express").Router();
const userController = require("../controllers/userController.js");

//all the routes for the user
router.post("/create", userController.createUser);

router.post("/login", userController.loginUser);

//export
module.exports = router;