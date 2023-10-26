/**
* @description handle all failures of the application
* @author Emptra - Nareshjsdev
* @date 05/08/2021
*/

'use strict'

/**
 * 
 * @description Generic error handler
 * @param {object} req express request object
 * @param {object} res express response object
 * @param {string} msg error message
 * @param {string} type type of
 * @return {object} send response back to the request
 */
let manageError = (req, res, msg, type) => {
    switch (type) {
        case 'auth':
            return res.status(200).json({ code: 101, message: msg })
        case 'validate':
            return res.status(200).json({ code: 103, message: msg })
        case 'badRequest':
            return res.status(200).json({ code: 103, message: msg })
        case 'maintenance':
            return res.status(200).json({ code: 102, message: msg })
        case 'notFound':
            return res.status(200).json({ code: 102, message: msg })
        case 'exception':
            return res.status(200).json({ code: 104, message: msg })
        default:
            return res.status(200).json({ code: 104, message: msg })
    }
}

module.exports.manageError = manageError
