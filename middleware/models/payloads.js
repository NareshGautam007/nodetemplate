/**
* @description API payloads to validate against incoming request body
* @author Emptra - Naresh 
* @date 31/08/2021
*/

'use strict'

//NPM Modules
let joi = require('joi')

/* 

{
    "etId" : 200,
    "organizationId" : "2000",
    "organizationName" : "GOOGLE INDIA",
    "docType" : "employment",
    "docUrl" : "http://www.asdfakdl.com/i.jpeg",
    "uploadedStatus" : "Uploaded",
    "verificationStatus" : "Pending"
    "comments": "" (Required) if status is Reject)
}

*/

const manualVerification = joi.object().keys({
    userId : joi.number().integer().positive().required(),
    organizationId : joi.string().trim().required(),
    organizationName : joi.string().trim().required(),
    docType : joi.string().trim().required().valid('employment', 'health', 'education', 'help', 'courses'),
    docUrl : joi.string().trim(),
    uploadedStatus : joi.string().trim().required(),
    verificationStatus : joi.string().trim().required().valid('Pending', 'Rejected', 'Approved'),
    comments : joi.string().trim(),
    requestBy : joi.string().trim().required()
})

// Manual Verification Govt documents
const govtDocs = joi.object().keys({
    userId : joi.number().integer().positive().required(),
    organizationId : joi.number().integer().positive().required().valid(1,2,3,4),
    organizationName : joi.string().trim().required(),
    docType : joi.string().trim().required().valid('ADHAR', 'PANCR'),
    docUrl : joi.string().trim().required(),
    uploadedStatus : joi.string().trim().required(),
    verificationStatus : joi.string().trim().required().valid('Pending', 'Rejected', 'Approved'),
    comments : joi.string().trim(),
    requestBy : joi.string().trim().required()
})



const hrVerify = joi.object().keys({
    userId : joi.number().integer().positive().required(),
    organizationId : joi.number().integer().positive().required(),
    organizationName : joi.string().trim().required(),
    hrName : joi.string().trim().required(),
    hrEmail : joi.string().trim().required(),
    docType : joi.string().trim().required().valid('hrVerification'),
    uploadedStatus : joi.string().trim().required(),
    verificationStatus : joi.string().trim().required().valid('Pending', 'Rejected', 'Approved'),
    requestBy : joi.string().trim().required()
    
})

const hrVerification = joi.object().keys({
    userId : joi.number().integer().required(),
    organizationId : joi.string().trim().required(),
    review : joi.string().trim().required(),
    punctuality : joi.number().max(10).required(),
    dedicationHandwork : joi.number().required(),
    teamWork : joi.number().max(10).required(),
    clientSatisfaction : joi.number().max(10).required(),
    learningGrowth : joi.number().max(10).required(),
    requestBy : joi.string().trim().required()

})


const backgroundCheck = joi.object().keys({
    userId : joi.number().integer().required(),
    docType : joi.string().trim().required().valid('Fingerprint','Health','Criminal Record','Investigation Research','Credit Point'),
    verificationStatus : joi.string().trim().required(),
    requestBy : joi.string().trim().required(),
    level: joi.string().when(joi.ref('docType'), { is: 'Credit Point' , then: joi.required().valid('Poor','Good','Better','Excellent'), otherwise: joi.string().trim().min(1).optional() }),

})

const automationVerification = joi.object().keys({
    userId : joi.number().integer().positive().required(),
    docType : joi.string().trim().required().valid('ADHAR', 'PANCR')
})

module.exports.manualVerification = manualVerification
module.exports.hrVerify = hrVerify
module.exports.hrVerification = hrVerification
module.exports.govtDocs = govtDocs
module.exports.backgroundCheck = backgroundCheck
module.exports.automationVerification = automationVerification





