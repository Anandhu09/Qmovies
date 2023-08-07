const express = require("express");
const authRoute = require("./auth.route.js");
const router = express.Router();

router.use("/auth",authRoute)

module.exports = router;