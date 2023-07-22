const express = require('express');
const router = express.Router();
router.use(express.json());
//import of blog Model 
const Blog=require("../models/blogModel");   //Model mte3 e donnees 

//POST ajout blog 
router.post("/addBlog",async (req,res)=>{
    try{
        //our codes 
        //creation d'echntilon avec les donnees du requete
        const blog = new Blog({
          id: req.body.id,
          titre:req.body.titre,
          descreption:req.body.descreption,
          categorie:req.body.categorie,
          ref:req.body.ref,
          id_author:req.body.id_author
        })
        console.log("Blog",blog);

        const blogToSave = await blog.save(); //connexion avec BD
        res.status(201).json(blogToSave)
    }catch(err){
        res.status(500).json({"msg":err})
    }
})

//Get liste des blogs 
router.get("/getAllBlogs",async(req,res)=>{
    try{
        //our codes 
        const blogs = await Blog.find();
        res.status(200).json(blogs)
    }catch(err){
        res.status(500).json({"msg":err})
    }
})

//PUT, PATCH modifcation du blog 
router.put("/updateBlog/:id",async (req,res)=>{
    try{
        //our codes 
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Blog.findByIdAndUpdate(id, updatedData, options)

        res.send(result)







    }catch(err){
        res.status(500).json({"msg":err})
    }
})

//Delete blog 
router.delete("/deleteBlog/:id",async(req,res)=>{
    try{
        //our codes 
        const id = req.params.id;
        const data = await Blog.findByIdAndDelete(id)
        res.status(200).send(`Document with ${data.titre} has been deleted..`)


    }catch(err){
        res.status(500).json({"msg":err})
    }
})



//Get by ID Method
router.get('/getOneBlog/:id', async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.id);
        res.json(blog)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})



//get blogs of specif users 
async function getBlogsByAuthor(authorId) {
    try {
      // Find blogs where id_author matches the specified authorId
      const blogs = await Blog.find({ id_author: authorId }).toArray();
      return blogs;
    } catch (err) {
      console.error('Error occurred while connecting to MongoDB:', err);
    } 
  }

router.get("/getAuthorBlogs/:id",async(req,res)=>{
        const authorIdToFind = req.params.id;
        const blogs = await Blog.find({ id_author: authorIdToFind });
        console.log("blogs off ",blogs)
        res.status(200).send(blogs)
   
})



// retourner les blogs d'un personnes spécifique 
router.get("/getUserBlogs/:id",async(req,res)=>{
    try{

        const idUser=req.params.id; // extraction de l'id de user 
        const blogUser = await Blog.find({id_author:idUser});
        res.status(200).send(blogUser);
    
    }catch(err){
        res.status(500).send({msg:err})
    }
})


// retourner les blogs selon une catégorie
router.get("/getBlogCategorie/:categ",async(req,res)=>{
    try{
        const category=req.params.categ; // extraction de l'id de user 
        const blogCategory = await Blog.find({categorie:category});
        res.status(200).send(blogCategory);
    }catch(err){
        res.status(500).send({msg:err})
    }    
})





module.exports = router;