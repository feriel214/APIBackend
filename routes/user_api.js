const express = require('express');
const router = express.Router();
router.use(express.json());
//import of blog Model 
const User=require("../models/userModel");   //Model mte3 e donnees 

//POST ajout user 
router.post("/addUser",async (req,res)=>{
    try{
        //our codes 
        //creation d'echntilon avec les donnees du requete
        const user = new User({
          id: req.body.id,
          firstName:req.body.firstName,
          tel:req.body.tel
         
        })
        console.log("useer from postman ",user);
        const userToSave = await user.save(); //connexion avec BD
        console.log()
        res.status(201).json(userToSave)
    }catch(err){
        res.status(500).json({"msg":err})
    }
})

//Get liste des blogs 
router.get("/getAllUsers",async(req,res)=>{
    try{
        //our codes 
        const users = await User.find();
        res.status(200).json(users)
    }catch(err){
        res.status(500).json({"msg":err})
    }
})

//PUT, PATCH modifcation du blog 
router.put("/updateUser/:id",async (req,res)=>{
    try{
        //our codes 
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(id, updatedData, options)

        res.send(result)
    }catch(err){
        res.status(500).json({"msg":err})
    }
})

//Delete blog 
router.delete("/deleteUser/:id",async(req,res)=>{
    try{
        //our codes 
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        res.status(200).send(`Document with ${data.firstName} has been deleted..`)


    }catch(err){
        res.status(500).json({"msg":err})
    }
})



//Get by ID Method
router.get('/getOneUser/:id', async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.json(user)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})




//CRUD 
//rehc 
//emna : mdp cryptage ç_&èéçè&çé_&àçèéç&_èé_ç&èéç&é















module.exports = router;