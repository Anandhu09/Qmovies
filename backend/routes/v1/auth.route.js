const express = require("express");
const validate = require("../../middlewares/validate.js");
const auth = require("../../middlewares/auth");
const authValidation = require("../../validations/auth.validation.js");
const authController = require("../../controllers/auth.controller.js");

const router = express.Router();

const validateRegisterRequest = validate(authValidation.register)
const validateLoginRequest = validate(authValidation.login)
const validateMovie = validate(authValidation.movieSchema)
const ValidateMove = validate(authValidation.move)



router.get("/playlist/public/", authController.getPlaylist);

router.post("/register",validateRegisterRequest,authController.register)

router.post("/login",validateLoginRequest,authController.login)

router.post("/playlist",auth,validateMovie,authController.addMovieToPlaylist)

router.get("/playlist/:e", authController.getPlaylist);

router.post("/movePrivate",auth,ValidateMove,authController.MoveToPrivate)

router.post("/movePublic",auth,ValidateMove,authController.MoveToPublic)

module.exports = router;