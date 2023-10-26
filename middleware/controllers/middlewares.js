/**
* @description provides middleware to track the every request
* @author Emptra - Naresh
* @date 05/08/2021
*/

'use strict'

// Custom Modules
const failureHandler = require('./failureHandler')

// Configurations
const { application } = require('../../config')

/**
 *
 * @description check CORS 
 * @param {object} req express request object
 * @param {object} res express response object
 * @param {object} next express next request
 * @return {null}
 */
const enableCors = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT")
    res.setHeader("Access-Control-Allow-Credentials", true)
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type")
    next()
}

/**
 *
 * @description track request body (payload) of every request
 * @param {object} err error object
 * @param {object} req express request object
 * @param {object} res express response object
 * @param {object} next express next request
 * @return {object} sends error response/ next request
 */
const trackRequest = (err, req, res, next) => {
    console.error(`${err.type} - ${err.message}`)
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) return failureHandler.manageError(req, res, 'Bad Request!(Requested payload is not valid JSON)', 'badRequest')
    next()
}

/**
 *
 * @description check authentication of each endpoint
 * @param {object} req express request object
 * @param {object} res express response object
 * @param {object} next express next request
 * @return {object} sends error response/ next request
 */
const isAuthenticated = (req, res, next) => {
    if (!req.header('token')) return failureHandler.manageError(req, res, 'Token not provided in header', 'auth')
    const token = req.header('token')
    if (token !== application.token) return failureHandler.manageError(req, res, 'Invalid token', 'auth')

    if (!req.header('versionnumber')) return failureHandler.manageError(req, res, 'Version number not provided in header', 'auth')
    const versionNumber = req.header('versionnumber')
    if (!application.versionNumbers.includes(versionNumber.toString().toLowerCase())) return failureHandler.manageError(req, res, 'Invalid version number', 'auth')
    next()
}

/**
 *
 * @description tracks maintenance activity on each request
 * @param {object} req express request object
 * @param {object} res express response object
 * @param {object} next express next request
 * @return {object} sends error response/ next request
 */
const trackMaintenanceActivity = (req, res, next) => {
    if (application.isMaintenance) return failureHandler.manageError(req, res, application.maintenanceMessage, 'maintenance')
    else next()
}

module.exports.cors = enableCors
module.exports.trackRequest = trackRequest
module.exports.isAuthenticated = isAuthenticated
module.exports.trackMaintenanceActivity = trackMaintenanceActivity
