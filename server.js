/**************************************************************************************************
* WEB422 – Assignment 1 
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source 
* (including web sites) or distributed to other students. 
* 
* Name: _Rony Alberto Boscan Leon__ Student ID: _136-346-194__ Date: _22-01-2021_____ 
* Heroku Link: _______________________________________________________________ 
* 
**************************************************************************************************/

// ******************** 1. Load Server Resources ********************
// Load Express Server
const express = require("express");
const app = express();
// Load Cors Package
const cors = require("cors");
// Load Restaurant DB Connection Module
const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB("mongodb+srv://raboscan-leon:136346194@cluster0.axpfu.mongodb.net/sample_restaurants?retryWrites=true&w=majority");

// ******************** 2. Configure Server Resources ********************
// Configuring body parser (Express built-in)
app.use(express.json());
// Configure use of Cors Package
app.use(cors());
// Port configuration for Express / Heroku
const HTTP_PORT = process.env.PORT || 8080; // Port for express server
// call this function after the http server starts listening for requests
// function onHttpStart() {
//   console.log("Express http server listening on: " + HTTP_PORT);
// }

// ******************** 3. Configure Server Routes / Handlers ********************
// setup route for the home page
app.get("/", function(req, res){
  res.json({message: "API Listening"});
});

// setup route to retrieve all restaurants
app.get("/api/restaurants", function(req, res){
  let page = req.query.page;
  let perPage = req.query.perPage;
  let borough = req.query.borough;
  db.getAllRestaurants(page, perPage, borough).then(data => {
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.json({ message: `Unexpected error: ${err}` });
  });
});

// setup route to retrieve a restaurant by ID
app.get("/api/restaurants/:id", function(req, res){
  let id = req.params.id;
  db.getRestaurantById(id).then(data => {
    res.json(data);
  })
  .catch(err => {
    console.log(err);
    res.json({ message: `Unexpected error: ${err}` });
  });
});

// setup route to add a new restaurant
app.post("/api/restaurants", function(req, res){
  data = req.body;
  // call db function to add restaurant
  res.status(201).json({ message: `added a new restaurant: ${data}` });
});

// setup route to update/edit a restaurant
app.put("/api/restaurants/:id", function(req, res){
  let id = req.params.id;
  let data = req.body;
  db.updateRestaurantById(data, id).then(msg => {
    res.json({ message: msg });
  }).catch(err => {
    res.json({ message: `Unexpected error: ${err}` });
  });
});

// setup route to delete a restaurant
app.delete("/api/restaurants/:id", function(req, res){
  let id = req.params.id;
  db.deleteRestaurantById(id).then(msg => {
    res.status(200).json({ message: msg });
  }).catch(err => {
    res.json({ message: `Unexpected error: ${err}` });
  });
});

// setup handling resource not found
app.use((req, res) => {
  res.status(404).send("Resource not found");
});

// ******************** 4. Start DB Connection And Server ********************
// app.listen(HTTP_PORT, onHttpStart);
db.initialize().then(()=>{
  app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
  });
}).catch((err)=>{
  console.log(err);
});