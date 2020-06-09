import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import blog from './routes/blog'
import events from './routes/events'
import projects from './routes/projects'
import users from './routes/users'


const app = express()

// Load environment vars
dotenv.config()

// DB
mongoose.connect(
  `${process.env.DB_CONNECT}`,
  () => console.log( 'Connected to MongoDB' ),
)

// Middleware
app.use( bodyParser.json() )

// Routes
app.get( '/', ( _req, res ) => {
  res.json( {
    name: 'Carleton Web Dev Club RESTful API',
    version: '0.1.0',
    docs: 'Coming Soon!!!',
  } )
} )

app.use( '/blog', blog )
app.use( '/events', events )
app.use( '/projects', projects )
app.use( '/users', users )

// Server
app.listen( 5000, () => {
  console.log( 'Server ready at http://localhost:5000/' )
} )
