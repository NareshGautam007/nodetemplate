/**
* @description user mgt service connector
* @author Emptra - Venky
* @date 25/07/2021
*/

'use strict'

//Custom Modules
const { externalApis } = require('./../../config/')


const request = require('./request')

let updateVerificationStatus = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let body = {
                etId: payload.userId,
                organizationId: payload.organizationId,
                docType: payload.docType,
                docUrl: payload.docUrl ? payload.docUrl : null,
                status: payload.verificationStatus,
                updatedBy: payload.createdBy
            }
            console.log(body)
            let options = { url : `${externalApis.employees.url}/verifications/update`, headers: {token: externalApis.employees.token, versionNumber: externalApis.employees.versionNumber} }
            let response = JSON.parse(await request.put(options, body))
            if (response.code != 100) return reject(response.message)
            return resolve(response)
        } catch (error) {
            return reject(error)
        }
    })
}

module.exports.updateVerificationStatus = updateVerificationStatus