/**
* @description helper functions
* @author Emptra - Naresh 
* @date 23/09/2021
*/

'use strict'

const aws = require('aws-sdk')

const mapOrganization = (docType) => {
    switch (docType) {
        case 'ADHAR': return { id: 1, name: 'Aadhar' }
        case 'PANCR': return { id: 2, name: 'PAN' }
        default: return null
    }
}

module.exports.mapOrganization = mapOrganization
