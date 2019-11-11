const mongoose = require('mongoose');
const readLine = require('readline');
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://htdat139:hoangtiendat139@cluster0-nae7g.mongodb.net/customer?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});
// client.connect(err => {
//   const collection = client.db("customer").collection("product");
//   // perform actions on the collection object
//   // console.log(collection);
//   collection.find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//   });
//   client.close();
// });
// require('./product');
// const Product = mongoose.model('Product');


// const conn = mongoose.createConnection('mongodb+srv://htdat139:hoangtiendat139@cluster0-nae7g.mongodb.net/customer?retryWrites=true&w=majority');
// console.log(conn);
// conn
let dbURI = 'mongodb+srv://htdat139:hoangtiendat139@cluster0-nae7g.mongodb.net/customer?retryWrites=true&w=majority';

// if (process.env.NODE_ENV === 'production') {
//   dbURI = process.env.MLAB_URI;
// }
// console.log(process.env.NODE_ENV);

const connect = () => {
  setTimeout(() => mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }), 1000);
}

// mongoose.connect(dbURI, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("customer");
//   dbo.collection("product").findOne({}, function(err, result) {
//     if (err) throw err;
//     console.log(result.name);
//     db.close();
//   });
// });

mongoose.connection.on('connected', () => {
  console.log('connected');
  
});

mongoose.connection.on('error', err => {
  console.log('error: ' + err);
  return connect();
});

mongoose.connection.on('disconnected', () => {
  console.log('disconnected');
});

if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.on ('SIGINT', () => {
    process.emit("SIGINT");
  });
}

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close( () => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});


connect();


require('./product');