let dev_db_url = 'mongodb://verificationadmin:Emptra123@stage-verification-engine-api.cluster-cqqo6v8rnfna.ap-south-1.docdb.amazonaws.com:27017'

// const path = require('path');

const fs = require("fs");
// const certFileBuf = fs.readFileSync("rds-combined-ca-bundle.pem");

var MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://verificationadmin:Emptra123@stage-verification-engine-api.cluster-cqqo6v8rnfna.ap-south-1.docdb.amazonaws.com:27017?ssl=true&readPreference=secondaryPreferred';
//const ca = [fs.readFileSync('rds-combined-ca-bundle.pem')];
const options = {
    sslValidate: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

try {
  const client = new MongoClient(url, options).connect((err, client) => {
    console.log('connected')
    if (err) console.log('err.message.connect', err.message);
    let db = client.db('verification-engine-apis');
    db.collection('sample-collection').insertOne({name: "venky"}, (err, result) => {
      if(err) console.log('err.message.insert', err.message);
      console.log(result);
    })
  })
} catch (err) {
  console.error('ERROR:', err.message)
}


//mongodb://verificationadmin:Emptra123@stage-verification-engine-api.cluster-cqqo6v8rnfna.ap-south-1.docdb.amazonaws.com:27017/?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false
                  
//Create a MongoDB client, open a connection to Amazon DocumentDB as a replica set,
//  and specify the read preference as secondary preferred
// var client = MongoClient.connect(
// 'mongodb://verificationadmin:Emptra123@stage-verification-engine-api.cluster-cqqo6v8rnfna.ap-south-1.docdb.amazonaws.com:27017/verification-engine-apis', 
// { 
//   useNewUrlParser: true
// },

// function(err, client) {
//     console.log('connecting...')
//     if(err) {
//         console.log('db-connect-error', err)
//         throw err;
//     } 

//     console.log('connected')
        
//     //Specify the database to be used
//     db = client.db('sample-database');
    
//     //Specify the collection to be used
//     col = db.collection('sample-collection');

//     //Insert a single document
//     col.insertOne({'hello':'Amazon DocumentDB'}, function(err, result){
//       //Find the document that was previously written
//       col.findOne({'hello':'Amazon DocumentDB'}, function(err, result){
//         //Print the result to the screen
//         console.log(result);
        
//         //Close the connection
//         client.close()
//       });
//    });
// });
                    