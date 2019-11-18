const mongoose = require('mongoose');
const readLine = require('readline');

let dbURI = 'mongodb+srv://htdat139:hoangtiendat139@cluster0-nae7g.mongodb.net/test?retryWrites=true';

// if (process.env.NODE_ENV === 'production') {
//   dbURI = process.env.MLAB_URI;
// }
// console.log(process.env.NODE_ENV);
// console.log(process.env.MLAB_URI);
const connect = () => {
  console.log('connected 1111');
  setTimeout(() => mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }), 1000);
}

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
console.log('connected 2222');
connect();

require('./product');