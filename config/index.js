/**
* @description manages application configurations
* @author Emptra - Naresh 
* @date 05/08/2021
*/

'use strict'

require('dotenv').config()

// Setting up the environment configurations
const env = process.env.NODE_ENV

console.log('ENVIRONMENT', env)

module.exports = require(`./${env}`)


