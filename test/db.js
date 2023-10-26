
const { db } = require('../middleware/controllers')

db.insert('verification', [{ name: 'venky', isVerified: true }]).then(result => console.log(result)).catch(err => console.log(err))
