/**
* @description defined all the application level endpoints
* @author Emptra - Naresh 
* @date 16/08/2021
*/

'use strict'

/**
 * @description routes handler
 * @param {object} accepts express app initialization
 */

// Custom Modules
const { middleware, failureHandler } = require('../middleware/controllers')
const { verification } = require('../services')

const handler = (app) => {

    app.all('*', (req, res, next) => {
        middleware.trackMaintenanceActivity(req, res, next)
    })

    app.all('*', (req, res, next) => {
        middleware.isAuthenticated(req, res, next)
    })

    //TEST Endpoint
    app.get('/checkHealth', (req, res) => {
        return res.status(200).json({ code: 100, message: "Server is live" })
    })

    app.post('/verification/manual', (req, res) => {
        verification.manual(req, res)
    })

    app.post('/verification/automation', (req, res) => {
        verification.automation(req, res)
    })
    
    app.post('/verification/initiateHrVerification',(req, res) => {
        verification.initiateHrVerification(req, res)
    })

    app.post('/verification/hrVerification',(req, res) => {
        verification.hrVerification(req, res)
    })

    app.post('/verification/govtDocs', (req, res) => {
        verification.govtDocs(req, res)
    })

    app.post('/employee/backgroundCheck', (req, res) =>{
        verification.backgroundCheck(req, res)
    })

    app.all('*', (req, res) => {
        return failureHandler.manageError(req, res, `Endpoint - ${req.url} not found`, 'notFound')
    })
}

module.exports.handler = handler