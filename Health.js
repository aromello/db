const csv = require('csv-parser');
const fs = require('fs');
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Health';

async function main(row) {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('documents');
  
  const insertResult = await collection.insertMany([{row}]);
  console.log('Inserted documents =>', insertResult);
  // the following code examples can be pasted here...

  return 'done.';
}

const filename = process.argv[2];
fs.createReadStream(filename)
.pipe(csv())
.on('data', (row) => {
  //console.log(row);
  main(row)
  .then(console.log)
  .catch(console.error);
})
.on('end', () => {
  console.log('CSV file successfully processed');
});


client.close();

