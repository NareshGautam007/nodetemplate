/**
* @description index.js is main file of the employee services which is responsible for the initiate the employee service.
* @author Emptra - Venky
* @date 16/08/2021
*/
'use strict'

// Built-in Modules
const http = require('http')

// NPM Modules
const express = require('express')
const responseTime = require('response-time')
const cors = require('cors')

// Custom Modules
const { application } = require('./config')
const { middleware } = require('./middleware/controllers')
const routes = require('./routes/routes')

// Initiate express
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(responseTime((req, res, time) => console.log(req.method, req.url, time.toFixed(2))))
app.use((error, req, res, next) => middleware.trackRequest(error, req, res, next))

// Serve routes
routes.handler(app)

let startServer = () => {
  try {
    http.createServer(app).listen(application.port, () => {
      console.log(`Verification Engine server started at ${new Date().toLocaleString()}`)
      console.log(`PID: ${process.pid}.`)
      console.log(`HTTP Port: ${application.port}`)
    })
  } catch (error) {
    console.log(`DB Connection Failed: `, error)
  }
}

startServer()

