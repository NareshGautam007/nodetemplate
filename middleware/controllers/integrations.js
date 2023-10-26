/**
* @description user mgt service connector
* @author Emptra - Venky
* @date 25/07/2021
*/

'use strict'

//Custom Modules
const { externalApis } = require('./../../config/')


const request = require('./request')

let getToken = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let options = { url: `${externalApis.integrations.url}/digilocker/getToken?userId=${userId}`, headers: [] }
            let response = JSON.parse(await request.get(options))
            if (response.code != 100) return reject(response.message)
            return resolve(response.result.token)
        } catch (error) {
            return reject(error)
        }
    })
}


let getIssuedDoc = (docType, token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let options = { url: `${externalApis.integrations.url}/digilocker/getIssuedFile?docType=${docType}`, headers: { access_token: token }}
            let response = JSON.parse(await request.get(options))
            if (response.code != 100) return reject(response.message)
            return resolve(response.result.S3Url)
        } catch (error) {
            return reject(error)
        }
    })
}

///digilocker/getIssuedFile

//getIssuedDoc('PANCR', 'eca6c266336d8e31e50be699f5b0bb22d7aeeb13').then((r) => console.log(r.result.buffer.data)).catch(console.error)

module.exports.getToken = getToken
module.exports.getIssuedDoc = getIssuedDoc