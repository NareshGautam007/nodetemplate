/**
* @description send/verify otp of verification service
* @author Emptra - Naresh 
* @date 30/08/2021
*/

'use strict'

// Custom Modules
const { failureHandler, validate, db, utils, integrations, employees } = require('../middleware/controllers')

/**
 *
 * @description employee register handler
 * @param {object} req express request object
 * @param {object} res express response object
 * @return {object} json response
 */
const manual = async (req, res) => {
    try {
        let verificationBody = req.body
        let payload = await validate.payload(verificationBody, 'manualVerification')
        let doesExist = await db.get('verificationMaster', `userId $eq ${payload.userId} $and organizationId $eq ${payload.organizationId}`)
        if (payload.requestBy != 'admin@emptra.com' && ['approved', 'rejected'].includes(payload.verificationStatus.toLowerCase())) return failureHandler.manageError(req, res, `UnAuthorized verification transaction`, 'validate')
        if (doesExist && doesExist.verificationStatus == 'Approved') return failureHandler.manageError(req, res, `Invalid Request, docType(${payload.organizationName}) is already ${payload.verificationStatus}`, 'validate')
        if (doesExist && doesExist.verificationStatus == payload.verificationStatus) return failureHandler.manageError(req, res, `Requested docType(${payload.organizationName}) is already in ${payload.verificationStatus} state`, 'validate')
        if (doesExist && doesExist.userId) {
            payload.updatedAt = new Date().getTime()
            payload.updatedBy = payload.requestBy
            await db.update('verificationMaster', `userId $eq ${payload.userId} $and organizationId $eq ${payload.organizationId}`, payload).then(result => console.log('UpdatedVerificationRequest')).catch(err => console.log('UpdatedVerificationRequest:ERROR', err))
        } else {
            payload.createdAt = new Date().getTime()
            payload.createdBy = payload.requestBy
            db.insert('verificationMaster', [payload]).then(result => console.log('InsertedVerificationRequest')).catch(err => console.log('InsertedVerificationRequest:ERROR', err))
        }

        payload.createdAt = new Date().getTime()
        payload.createdBy = payload.requestBy
        await db.insert('verificationTransactions', [payload]).then(result => console.log('Added verification request')).catch(err => console.log('verificationTransactions:ERROR', err))
        employees.updateVerificationStatus(payload).then(console.log).catch(console.error)
        return res.status(200).json({ code: 100, message: 'Added verification request' })

    } catch (exception) {
        console.log(exception)
        return failureHandler.manageError(req, res, exception.message ? 'Operation Failed' : exception, exception.message ? 'exception' : 'validate')
    }
}



/**
 *
 * @description employee register handler
 * @param {object} req express request object
 * @param {object} res express response object
 * @return {object} json response
 */
const govtDocs = async (req, res) => {
    try {
        let verificationBody = req.body
        let payload = await validate.payload(verificationBody, 'govtDocs')
        let doesExist = await db.get('verificationMaster', `${payload.userId}`)
        if (payload.requestBy != 'admin@emptra.com' && ['approved', 'rejected'].includes(payload.verificationStatus.toLowerCase())) return failureHandler.manageError(req, res, `UnAuthorized verification transaction`, 'validate')
        if (doesExist && doesExist.verificationStatus == 'Approved') return failureHandler.manageError(req, res, `Invalid Request, docType(${payload.organizationName}) is already ${payload.verificationStatus}`, 'validate')
        if (doesExist && doesExist.verificationStatus == payload.verificationStatus) return failureHandler.manageError(req, res, `Requested docType(${payload.organizationName}) is already in ${payload.verificationStatus} state`, 'validate')
        if (doesExist && doesExist.userId) {
            payload.updatedAt = new Date().getTime()
            payload.updatedBy = payload.requestBy
            await db.update('verificationMaster', `userId $eq ${payload.userId} $and organizationId $eq ${payload.organizationId}`, payload).then(result => console.log('UpdatedVerificationRequest')).catch(err => console.log('UpdatedVerificationRequest:ERROR', err))
        } else {
            payload.createdAt = new Date().getTime()
            payload.createdBy = payload.requestBy
            db.insert('verificationMaster', [payload]).then(result => console.log('InsertedVerificationRequest')).catch(err => console.log('InsertedVerificationRequest:ERROR', err))
        }

        payload.createdAt = new Date().getTime()
        payload.createdBy = payload.requestBy
        await db.insert('verificationTransactions', [payload]).then(result => console.log('Added verification request')).catch(err => console.log('verificationTransactions:ERROR', err))

        return res.status(200).json({ code: 100, message: 'Added verification request' })

        //let employeeUpdate = employee.update(payload,etId)

        //TODO: Send data to employee service to update the verification status


    } catch (exception) {
        console.log(exception)
        return failureHandler.manageError(req, res, exception.message ? 'Operation Failed' : exception, exception.message ? 'exception' : 'validate')
    }
}



const initiateHrVerification = async (req, res) => {
    try {
        let verificationBody = req.body
        let payload = await validate.payload(verificationBody, 'govtDocs')
        let doesExist = await db.get('verificationMaster', `userId $eq ${payload.userId} $and organizationId $eq ${payload.organizationId}`)
        if (doesExist && doesExist.verificationStatus == 'Approved') return failureHandler.manageError(req, res, `Invalid Request, docType(${payload.organizationName}) is already ${payload.verificationStatus}`, 'validate')
        if (doesExist && doesExist.verificationStatus == payload.verificationStatus) return failureHandler.manageError(req, res, `Requested docType(${payload.organizationName}) is already in ${payload.verificationStatus} state`, 'validate')
        if (doesExist && doesExist.userId) {
            payload.updatedAt = new Date().getTime()
            payload.updatedBy = payload.requestBy
            await db.update('verificationMaster', `userId $eq ${payload.userId} $and organizationId $eq ${payload.organizationId}`, payload).then(result => console.log('UpdatedVerificationRequest')).catch(err => console.log('UpdatedVerificationRequest:ERROR', err))
        } else {
            payload.createdAt = new Date().getTime()
            payload.createdBy = payload.requestBy
            await db.insert('verificationMaster', [payload]).then(result => console.log('InsertedVerificationRequest')).catch(err => console.log('InsertedVerificationRequest:ERROR', err))
        }
        payload.createdAt = new Date().getTime()
        payload.createdBy = payload.requestBy
        await db.insert('verificationTransactions', [payload]).then(result => console.log('Added verification request')).catch(err => console.log('verificationTransactions:ERROR', err))

        return res.status(200).json({ code: 100, message: 'Added verification request' })

    } catch (exception) {
        console.log(exception)
        return failureHandler.manageError(req, res, exception.message ? 'Operation Failed' : exception, exception.message ? 'exception' : 'validate')
    }

}

const hrVerification = async (req, res) => {
    try {

        let hrVerificationBody = req.body
        let payload = await validate.payload(hrVerificationBody, 'hrVerification')
        let doesExist = await db.get('verificationMaster', `userId $eq ${payload.userId} $and organizationId $eq ${payload.organizationId}`)
        if (payload.requestBy != doesExist.hrEmail && ['approved', 'rejected'].includes(payload.verificationStatus.toLowerCase())) return failureHandler.manageError(req, res, `UnAuthorized verification transaction`, 'validate')
        if (doesExist && doesExist.verificationStatus == payload.verificationStatus) return failureHandler.manageError(req, res, `Requested docType(${payload.organizationName}) is already in ${payload.verificationStatus} state`, 'validate')
        if (doesExist && doesExist.userId) {
            payload.updatedAt = new Date().getTime()
            payload.updatedBy = payload.requestBy
            await db.update('verificationMaster', `userId $eq ${payload.userId} $and organizationId $eq ${payload.organizationId}`, payload).then(result => console.log('UpdatedVerificationRequest')).catch(err => console.log('UpdatedVerificationRequest:ERROR', err))
        } else {
            payload.createdAt = new Date().getTime()
            payload.createdBy = payload.requestBy
            await db.insert('verificationMaster', [payload]).then(result => console.log('InsertedVerificationRequest')).catch(err => console.log('InsertedVerificationRequest:ERROR', err))
        }
        payload.createdAt = new Date().getTime()
        payload.createdBy = payload.requestBy
        await db.insert('verificationTransactions', [payload]).then(result => console.log('Added verification request')).catch(err => console.log('verificationTransactions:ERROR', err))
        return res.status(200).json({ code: 100, message: 'Added verification request' })
    } catch (exception) {
        console.log(exception)

    }
}

//FIXME: Manage transaction history
const backgroundCheck = async (req, res) => {
    try {
        let backgroundCheckBody = req.body
        let payload = await validate.payload(backgroundCheckBody, 'backgroundCheck')
        let doesExist = await db.get('backgroundCheck', `userId $eq ${payload.userId} $and docType $eq ${payload.docType}`)
        if (payload.requestBy != 'admin@emptra.com' && ['approved', 'rejected'].includes(payload.verificationStatus.toLowerCase())) return failureHandler.manageError(req, res, `UnAuthorized verification transaction`, 'validate')
        if (doesExist && doesExist.verificationStatus == payload.verificationStatus) return failureHandler.manageError(req, res, `Requested docType(${payload.docType}) is already in ${payload.verificationStatus} state`, 'validate')
        if (doesExist && doesExist.userId) {
            payload.updatedAt = new Date().getTime()
            payload.updatedBy = payload.requestBy
            await db.update('backgroundCheck', `userId $eq ${payload.userId} $and docType $eq ${payload.docType}`, payload).then(result => console.log('UpdatedBackgroundRequest')).catch(err => console.log('UpdatedBackgroundRequest:ERROR', err))
            return res.status(200).json({ code: 100, message: 'Updated Background verification request' })
        } else {
            payload.createdAt = new Date().getTime()
            payload.createdBy = payload.requestBy
            await db.insert('backgroundCheck', [payload]).then(result => console.log('InsertedBackgroundRequest')).catch(err => console.log('InsertedBackgroundRequest:ERROR', err))
            return res.status(200).json({ code: 100, message: 'Added Background verification request' })
        }

    } catch (exception) {
        console.log(exception)
        return failureHandler.manageError(req, res, exception.message ? 'Operation Failed' : exception, exception.message ? 'exception' : 'validate')
    }
}

/**
 *
 * @description automates govt docs verification
 * @param {object} req express request object
 * @param {object} res express response object
 * @return {object} json response
 */
const automation = async (req, res) => {
    try {
        let verificationBody = req.body
        let payload = await validate.payload(verificationBody, 'automationVerification')
        let orgDetails = utils.mapOrganization(payload.docType)
        payload.organizationId = orgDetails.id
        payload.organizationName = orgDetails.name
        let doesExist = await db.get('verificationMaster', `userId $eq ${payload.userId} $and organizationId $eq ${payload.organizationId}`)
        if (doesExist && doesExist.verificationStatus == 'Approved') return failureHandler.manageError(req, res, `Invalid Request, docType(${payload.organizationName}) is already ${doesExist.verificationStatus}`, 'validate')
        let token = await integrations.getToken(payload.userId)
        if (!doesExist || !doesExist.userId) {
            payload.docUrl = null,
            payload.uploadedStatus = 'Digilocker'
            payload.verificationStatus = 'Pending'
            payload.comments = 'Verification request via digilocker'
            payload.createdAt = new Date().getTime()
            payload.createdBy = 'Digilocker Initiated'
            await db.insert('verificationMaster', [payload]).then(result => console.log('InsertedVerificationRequest')).catch(err => console.log('InsertedVerificationRequest:ERROR', err))
            await db.insert('verificationTransactions', [payload]).then(result => console.log('Added verification request')).catch(err => console.log('verificationTransactions:ERROR', err))
        }
     
        let fileUrl = await integrations.getIssuedDoc(payload.docType, token)
        console.log(fileUrl)
        payload.docUrl = fileUrl
        delete payload.createdAt
        delete payload.createdBy
        payload.uploadedStatus = 'Submitted'
        payload.verificationStatus = 'Approved'
        payload.comments = 'Verified via digilocker'
        payload.updatedAt = new Date().getTime()
        payload.updatedBy = 'Digilocker'
        await db.update('verificationMaster', `userId $eq ${payload.userId} $and organizationId $eq ${payload.organizationId}`, payload).then(result => console.log('UpdatedVerificationRequest')).catch(err => console.log('UpdatedVerificationRequest2:ERROR', err))

        payload.createdAt = new Date().getTime()
        payload.createdBy = 'Digilocker'
       
        delete payload._id
        await db.insert('verificationTransactions', [payload]).then(result => console.log('Added verification request')).catch(err => console.log('verificationTransactions2:ERROR', err))

        return res.status(200).json({ code: 100, message: `Verified ${payload.docType} successfully via digilocker` })

        //TODO: Send data to employee service to update the verification status


    } catch (exception) {
        console.log(exception)
        return failureHandler.manageError(req, res, exception.message ? 'Operation Failed' : exception, exception.message ? 'exception' : 'validate')
    }
}

module.exports.manual = manual
module.exports.initiateHrVerification = initiateHrVerification
module.exports.hrVerification = hrVerification
module.exports.govtDocs = govtDocs
module.exports.backgroundCheck = backgroundCheck
module.exports.automation = automation
