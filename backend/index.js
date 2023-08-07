const mongoose = require("mongoose");
const app = require("./app.js");
require('dotenv').config();

let server;
const  port= process.env.PORT;
const url = process.env.URL

mongoose 
.connect(url)
.then(() => {
    console.log("Connected to database")
    server = app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    })
})
.catch((err) => console.log(err));