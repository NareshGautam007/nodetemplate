const request = require('request')


/**
 * @description sends GET request
 * @param {object} options request with values
 * @returns Promise with body {string} 
 */
let getRequest = (options) => {
    return new Promise((resolve, reject) => {
        try {
            request.get(options, (err, res, body) => {
                if (err) return reject(err)
                return resolve(body)
            })
        } catch (error) {
            return reject(error)
        }
    })
}

/**
 * @description sends GET request
 * @param {object} options request with values
 * @returns Promise with body {string} 
 */
let deleteRequest = (options) => {
    return new Promise((resolve, reject) => {
        try {
            request.delete(options, (err, res, body) => {
                if (err) return reject(err)
                return resolve(body)
            })
        } catch (error) {
            return reject(error)
        }
    })
}

/**
 * @description sends POST request
 * @param {object} default request with default values
 * @param {string} requestUrl
 * @param {object} body
 * @returns Promise with body {string} 
 */
let postRequest = (options, payload) => {
    return new Promise((resolve, reject) => {
        try {
            if (payload) {
                options.body = JSON.stringify(payload)
                options.headers['content-type'] = 'application/json'
            }
            request.post(options, (err, res, body) => {
                if (err) return reject(err)
                return resolve(body)
            })
        } catch (error) {
            return reject(error)
        }
    })
}

/**
 * @description sends POST request
 * @param {object} default request with default values
 * @param {string} requestUrl
 * @param {object} body
 * @returns Promise with body {string} 
 */
let putRequest = (options, payload) => {
    return new Promise((resolve, reject) => {
        try {
            if (payload) {
                options.body = JSON.stringify(payload)
                options.headers['content-type'] = 'application/json'
            }
            request.put(options, (err, res, body) => {
                if (err) return reject(err)
                return resolve(body)
            })
        } catch (error) {
            return reject(error)
        }
    })
}

module.exports.get = getRequest
module.exports.delete = deleteRequest
module.exports.post = postRequest
module.exports.put = putRequest
