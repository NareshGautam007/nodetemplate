/**
* @description mongo db interface
* @author Emptra - Nareshjsdev
* @date 05/08/2021
*/

'use strict'

// NPM Modules
let mongo = require('mongodb').MongoClient

// Custom Modules
const filter = require('./filter')

// Configurations
const { databases } = require('../../config').storage

// get mongo connection client
const client = new mongo(databases.mongo.writer)
let db = null

async function main() {
    // Use connect method to connect to the server
    try {
        await client.connect()
        console.log(`Connected successfully to: ${databases.mongo.writer}`)
        db = client.db(databases.mongo.database)
        return `Connected to: ${databases.mongo.database}`  
    } catch (error) {
        return error
    }
   
}

main().then(console.log).catch(console.error)

/**
 * @description gets single document from a collection provided the ID is known
 * @param {string} collection collection name
 * @param {string} id 
 * @return {Promise} document found
 */
let findDoc = (collection, etId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lower = collection.toLowerCase()
            const result = await db.collection(lower).findOne({ etId: etId })
            return resolve(result)
        }
        catch (exception) {
            return reject(exception)
        }
    })
}

/**
 * @description gets single document from a collection provided the ID is known
 * @param {string} collection collection name
 * @param {string} id 
 * @return {Promise} document found
 */
let findManyDocs = (collection, etIds) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lower = collection.toLowerCase()
            const result = await db.collection(lower).find({ etId: { $in: etIds.split(',').map(each => each) } }).toArray()
            return resolve(result)
        }
        catch (exception) {
            return reject(exception)
        }
    })
}

/**
 * @description gets documents from a collection applying filters
 * @param {string} collection collection name
 * @param {object} filters object with fields and values
 * @return {Promise} array of documents found
 */
let getDocs = (collection, filterString, offset = 0, limit = 100) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lower = collection.toLowerCase()
            const filters = await filter.parse(filterString)
            const result = await db.collection(lower).find(filters).skip(offset).limit(limit).toArray()
            return resolve(result)
        }
        catch (exception) {
            console.error("exception", exception)
            return reject(exception)
        }
    })
}

/**
 * @description gets document from a collection applying filters
 * @param {string} collection collection name
 * @param {object} filters object with fields and values
 * @return {Promise} array of documents found
 */
let getDoc = (collection, filterString) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lower = collection.toLowerCase()
            const filters = await filter.parse(filterString)
            const result = await db.collection(lower).findOne(filters)
            return resolve(result)
        }
        catch (exception) {
            console.error("exception", exception)
            return reject(exception)
        }
    })
}

/**
 * @description inserts one or more documents into a collection
 * @param {string} collection collection name
 * @param {array} data array of objects to insert
 * @return {Promise} result
 */
let insertDoc = (collection, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lower = collection.toLowerCase()
            const result = await db.collection(lower).insertMany(data)
            return resolve(result)
        }
        catch (exception) {
            return reject(exception)
        }
    })
}

/**
 * @description updates one document in a collection
 * @param {string} collection collection name
 * @param {string} id  
 * @param {object} data object to update
 * @return {Promise} result
 */
let updateDoc = (collection, filterString, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lower = collection.toLowerCase()
            const filters = await filter.parse(filterString)
            const result = await db.collection(lower).updateOne(filters, { $set: data })
            return resolve(result)
        }
        catch (exception) {
            return reject(exception)
        }
    })
}

/**
 * @description updates documents in a collection
 * @param {string} collection collection name
 * @param {string} filters  
 * @param {object} data object to update
 * @return {Promise} result
 */
let updateMany = (collection, filters, data, upsert) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lower = collection.toLowerCase()
            const result = await db.collection(lower).updateMany(filters, { $set: data }, { upsert })
            return resolve(result)
        }
        catch (exception) {
            return reject(exception)
        }
    })
}

/**
 * @description deletes document from a collection provided the ID is known
 * @param {string} collection collection name
 * @param {string} id  
 * @return {Promise} result
 */
let deleteDoc = (collection, etId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lower = collection.toLowerCase()
            const result = await db.collection(lower).deleteOne({ etId: etId })
            return resolve(result)
        }
        catch (exception) {
            return reject(exception)
        }
    })
}

/**
 * @description deletes documents from a collection
 * @param {string} collection collection name
 * @param {string} filters  
 * @return {Promise} result
 */
let deleteMany = (collection, filters) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lower = collection.toLowerCase()
            const result = await db.collection(lower).deleteMany(filters)
            return resolve(result)
        }
        catch (exception) {
            return reject(exception)
        }
    })
}

/**
 * @description pushes value in array inside a document
 * @param {string} collection collection name
 * @param {string} filters  
 * @return {Promise} result
 */
let pushArray = (collection, etId, field, values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lower = collection.toLowerCase()
            let object = { $push: {} }
            object['$push'][field] = { $each: values }
            const result = await db.collection(lower).updateOne({ etId: etId }, object)
            return resolve(result)
        }
        catch (exception) {
            return reject(exception)
        }
    })
}

/**
 * @description pushes value in array inside a document
 * @param {string} collection collection name
 * @param {string} filters  
 * @return {Promise} result
 */
let pullArray = (collection, id, field, values) => {
    return new Promise(async (resolve, reject) => {
        try {
            let lower = collection.toLowerCase()
            let object = { $pullAll: {} }
            object['$pullAll'][field] = values.filter(x => x)
            const result = await db.collection(lower).updateOne({ etId: etId }, object)
            return resolve(result)
        }
        catch (exception) {
            return reject(exception)
        }
    })
}

module.exports.find = findDoc
module.exports.findMany = findManyDocs
module.exports.get = getDoc
module.exports.getMany = getDocs
module.exports.insert = insertDoc
module.exports.update = updateDoc
module.exports.updateMany = updateMany
module.exports.delete = deleteDoc
module.exports.deleteMany = deleteMany
module.exports.push = pushArray
module.exports.pull = pullArray

