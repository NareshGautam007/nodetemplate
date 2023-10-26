/**
* 
* @description generates mongodb filter object
* @author Emptra - Naresh 
* @date 05/08/2021
*/

'use strict'

// NPM Modules
const objectId = require('mongodb').ObjectID

// MongoDB Operators
let operators = {
    $eq: '$eq',
    $ne: '$ne',
    $gt: '$gt',
    $lt: '$lt',
    $ge: '$gte',
    $gte: '$gte',
    $le: '$lte',
    $lte: '$lte',
    $in: '$in',
    $nin: '$nin',
    $sw: '$sw',
    $ew: '$ew',
    $so: '$so',
    $and: '$and'
}

/**
 * INTERNAL Function to find conjunction in a string
 * @param {string} string 
 * @returns {string} $and/$or
 */
let findConjunction = (string) => {
    //it only checks the first operator
    //TODO: Implement more complex logics
    let pattern = /(\$and|\$or)/i
    let groups = string.match(pattern)
    return groups ? groups[0].toLowerCase() : '$and'
}

/**
 * INTERNAL Function to parse each condition
 * @param {String} string 
 * @returns {Object/null} valid MongoDB filter Object for one condition only
 */
let eachCondition = (string) => {
    let pattern = /([^\$]+)\s+(\$[a-z]+)\s+([^\$]+)\s*/i
    let [, key, operator, value] = string.match(pattern) || []
    if (key) {
        operator = operators[operator.toLowerCase()]
        if (key === '_id') {
            if (operator.match(/\$nin|\$in/i)) value = value.split(/\s*,\s*/).map(each => objectId(each))
            else value = objectId(value)
        }
        else {
            if (operator.match(/\$nin|\$in/i)) value = value.split(/\s*,\s*/)
            else {
                try {
                    value = JSON.parse(value)
                }
                catch (e) { console.log('could not parse ' + value) }
            }
        }
        return { [key]: { [operator]: value } }
    }
    else return null
}

/**
 * INTERNAL Function
 * @param {String} string
 * @returns {Object/null} string
 */
//TODO: On the way to allow for (cond OR cond ) AND ( cond AND cond) AND cond 
let combinations = (string) => {
    let pattern = /\(([^)]*)\)/ig
    let combos = string.split(pattern)
    let filters = combos.map(elem => eachCondition(elem)).filter(x => x)
    if (!filters.length) return resolve(null)
    if (filters.length > 1) {
        let conj = findConjunction(string)
        return resolve({ [conj]: filters })
    }
    else return resolve(filters[0])
}

let eachSection = (string) => {
    let pattern = /\s+\$and\s+|\s+\$or\s+/i
    let array = string.split(pattern)
    let filters = array.map(elem => eachCondition(elem)).filter(x => x)
    if (!filters.length) return null
    if (filters.length > 1) {
        let conj = findConjunction(string)
        return { [conj]: filters }
    }
    else return filters[0]

}

/**
 * PUBLIC Function
 * @param {String} string
 * @returns {Object/null} valid MongoDB filter object
 */
let parse = (string) => {
    return new Promise((resolve, reject) => {
        try {
            if (!string) return resolve({})
            let result = eachSection(string.trim()) || {}
            return resolve(result)
        }
        catch (e) {
            console.log(e)
            return resolve({})
        }
    })
}

module.exports.parse = parse