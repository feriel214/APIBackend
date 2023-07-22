const express = require("express");
const app = express();
require('dotenv').config();
const routes_product=require("./routes/product_api");
app.use(routes_product);
const routes_blog=require("./routes/blog_api")
app.use('/blog',routes_blog)
app.use(express.json());


const routes_user=require("./routes/user_api");
app.use("/user",routes_user)


//connect to Mongo db 
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.listen(3000,() => console.log("Server listening at port 3000"));


//localhost:3000/blog
//post : localhost:3000/blog/addBlog

