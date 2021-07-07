/**************************************************************************************************
* WEB422 – Assignment 2 
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source 
* (including web sites) or distributed to other students. 
* 
* Name: _Rony Alberto Boscan Leon____ Student ID: _136-346-194____ Date: _05-02-2021_____ 
* Heroku Link: _https://peaceful-tundra-65893.herokuapp.com/
* 
**************************************************************************************************/

// ******************** 1. Load Server Resources ********************
const express = require("express"); // Load Express Server
const app = express();
const cors = require("cors"); // Load Cors Package
const RestaurantDB = require("./modules/restaurantDB.js"); // Load Restaurant DB Connection Module
const db = new RestaurantDB("mongodb+srv://raboscan-leon:136346194@cluster0.axpfu.mongodb.net/sample_restaurants?retryWrites=true&w=majority");
const path = require("path"); // Path


// ******************** 2. Configure Server Resources ********************
// Configuring body parser (Express built-in)
app.use(express.json());
// Configure use of Cors Package
app.use(cors());
// Port configuration for Express / Heroku
const HTTP_PORT = process.env.PORT || 8080; // Port for express server


// ******************** 3. Configure Server Routes / Handlers ********************

// // setup virtual directory for public (static) elements
// app.use('/public', express.static(path.join(__dirname, 'public')));

// // setup route for the home page
// app.get("/", function(req, res){
//   res.sendFile(path.join(__dirname, '/public/index.html')); // res.sendFile(path.join(__dirname, '/index.html'));
// });

app.use('/', express.static("build"));

// Redirect Users to "index.html" if route not accessed using client side routing
// app.use((req, res) => {
//     res.sendFile(path.join(__dirname + "/public/index.html"));
// });

app.get("/api", function(req, res){
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
  db.addNewRestaurant(data).then(msg => {
    res.status(201).json({ message: msg });
  })
  .catch(err => {
    res.json({ message: `Unexpected error: ${err}` });
  });
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