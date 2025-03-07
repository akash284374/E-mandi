const express=require('express');

const {route}=require('express/lib/application');
const routes=express.Router();
const Detail = require("../models/Details");



routes.get("/",async (req,res)=>{
  const details= await Detail.findOne({"_id":'66ca1317eef9bfaab8a9419a'})
    res.render("index",{
        details:details
    });
})

routes.get("/about",async (req,res)=>{
    const details= await Detail.findOne({"_id":'66ca1317eef9bfaab8a9419a'})
      res.render("about",{
          details:details
      });
  })
  

routes.get("/login",async (req,res)=>{
    const details= await Detail.findOne({"_id":'66ca1317eef9bfaab8a9419a'})
      res.render("login",{
          details:details
      });
  })
    

routes.get("/veg",async(req,res)=>{
    const details= await Detail.findOne({"_id":'66ca1317eef9bfaab8a9419a'})
    res.render("Vegetables",{
        details:details
    });
})

routes.get("/fruit",async(req,res)=>{
    const details= await Detail.findOne({"_id":'66ca1317eef9bfaab8a9419a'})
    res.render("Fruits",{
        details:details
    });
})

routes.get("/profile",async(req,res)=>{
    const details= await Detail.findOne({"_id":'66ca1317eef9bfaab8a9419a'})
    res.render("Profile",{
        details:details
    });
})

routes.get("/cart",async(req,res)=>{
    const details= await Detail.findOne({"_id":'66ca1317eef9bfaab8a9419a'})
    res.render("Cart",{
        details:details
    });
})
module.exports=routes;