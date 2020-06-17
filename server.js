import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import morgan from 'morgan'

import apiRoutes from './routes'

const app = express()

// Load environment vars
dotenv.config()

const startServer = async () => {
  // Connect to DB
  await mongoose.connect(
    `${process.env.DB_CONNECT}`,
    () => console.log( 'Connected to MongoDB' ),
  )

  // Middleware
  app.use( morgan( 'dev' ) ) // Deprecation warning is because of https://github.com/expressjs/morgan/issues/190
  app.use( bodyParser.json() )

  // Routes
  app.get( '/', ( _req, res ) => {
    res.json( {
      name: 'Carleton Web Dev Club RESTful API',
      version: '0.1.0',
      docs: 'Coming Soon!!!',
    } )
  } )

  app.use( apiRoutes )

  // 404 errors
  app.use( ( _res, _req, next ) => {
    const error = new Error( 'Not found' )
    error.status = 404
    next( error )
  } )

  // Error handler (all errors are passed to this)
  app.use( ( { message, status }, { method, path }, res, next ) => {
    res.status( status || 500 ).json( {
      error: true,
      request: { method, path },
      message,
    } )
    next()
  } )

  // Server
  app.listen( 5000, () => {
    console.log( 'Server ready at http://localhost:5000/' )
  } )
}

startServer()
