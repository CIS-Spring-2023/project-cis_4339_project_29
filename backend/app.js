const express = require('express')
const mongoose = require('mongoose') //require mongoose library functionaility
const morgan = require('morgan') // better debugging
const Org = require('./models/orgsModel')
const Client = require('./models/clients')
const Event = require('./models/eventModel')
const User = require('./models/userModle')
const Service = require('./models/servicesModel')

const cors = require('cors')
// allow using a .env file
require('dotenv').config() //require the dotenv

// creates a new instance of express application
const app = express()

// add cors header to the server
app.use(
  cors({
    origin: '*'
  })
)

// sets up mongoose for the mongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Database connection Success!')
  })
  .catch((err) => {
    console.error('Mongo Connection Error', err)
  })

// declare port number for the api
const PORT = process.env.PORT || 3000

// setup and access request body
app.use(express.json())
app.use(morgan('dev'))

// setup middle ware for routes

// routes for org

app.get('/org', async(req,res) =>{
  try {
    const org = await Org.find({});
    res.status(200).json(org)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

app.get('/org/:id', async(req,res) =>{
  try {
    const {id} = req.params;
    const org = await Org.findById(id);
    res.status(200).json(org)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

// Routes for Client
//get all clients
app.get('/client', async(req,res) =>{
  try {
    const client = await Client.find({})
    res.status(200).json(client)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

//get client based off name
app.get('/name/:searchName', async(req,res) =>{
  try {
    let name = await Client.findOne({
      "$or":[
        {firstName:{$regex:req.params.searchName}},
        {lastName:{$regex:req.params.searchName}}
      ]
    })
    res.status(200).json(name)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

//get client based off phone number
app.get('/number/:pn', async(req,res) =>{
  try {
    const {pn} = req.params
    const number = await Client.findOne({'phoneNumber.primary': pn})
    res.status(200).json(number)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})


//get client based off id
app.get('/client/:id', async(req,res) =>{
  try {
    const {id} = req.params;
    const client = await Client.findById(id);
    res.status(200).json(client)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//post client
app.post('/client', async(req,res) =>{
  try {
    const client = await Client.create(req.body)
    res.status(200).json(client)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

//update client
app.put('/client/:id', async(req,res) =>{
  try {
    const {id} = req.params;
    const client = await Client.findByIdAndUpdate(id, req.body)
    if (!client){
      return res.status(404).json({message: `can not find client with ID ${id}`})
    }
    res.status(200).json(client)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

//delete client
app.delete('/client/:id', async(req,res) =>{
  try {
    const {id} = req.params;
    const client = await Client.findByIdAndDelete(id);
    if (!client){
      return res.status(404).json({message: `can not find client with ID ${id}`})
    }
    res.status(200).json(client)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

// routes for events
app.get('/event', async(req,res) =>{
  try {
    const event = await Event.find({})
    res.status(200).json(event)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})


//get event by id
app.get('/event/:id', async(req,res) =>{
  try {
    const {id} = req.params;
    const event = await Event.findById(id);
    res.status(200).json(event)
    console.log(event)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//post event
app.post('/event', async(req,res) =>{
  try {
    const event = await Event.create(req.body)
    res.status(200).json(event)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

//update event
app.put('/event/:id', async(req,res) => {
  try {
    const {id} = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body)
    if (!event){
      return res.status(404).json({message: `can not find event with ID ${id}`})
    }
    res.status(200).json(event)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

//delete event
app.delete('/event/:id', async (req,res) =>{
  try {
    const {id} = req.params;
    const event = await Event.findByIdAndDelete(id)
    if (!event){
      return res.status(404).json({message: `can not find event with ID ${id}`})
    }
    res.status(200).json(event)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

//User route
app.post('/user' , async(req,res) =>{
  try {
    const user = await User.findOne({email: req.body.email})
    if (user.password === req.body.password){
      res.send("logged in")
    }
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

//Service route
app.get('/service', async(req,res) =>{
  try {
    const service = await Service.find({})
    res.status(200).json(service)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})

app.post('/service', async(req,res) =>{
  try {
    const service = await Service.create(req.body)
    res.status(200).json(service)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
})





app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

// error handler
app.use(function (err, req, res, next) {
  // logs error and error code to console
  console.error(err.message, req)
  if (!err.statusCode) {
    err.statusCode = 500
  }
  res.status(err.statusCode).send(err.message)
})
