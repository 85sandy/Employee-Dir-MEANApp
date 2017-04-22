var chalk = require('chalk');
var mongoose = require( 'mongoose' );

mongoose.Promise = global.Promise; 
var Schema = mongoose.Schema;


//var dbURI = 'mongodb://localhost/employee';


//var dbURI = 'mongodb://root:root@ds161400.mlab.com:61400/leavethemarks';
var dbURI = 'mongodb://root:root@ds135680.mlab.com:35680/employee'

mongoose.connect(dbURI);


mongoose.connection.on('connected', function () {
  console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error',function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
  console.log(chalk.red('Mongoose disconnected'));
});



var employeeSchema = new Schema({
  name: {type: String, unique:true},
  email:{type: String, unique:true},
  dob:{type: Date},
  department:{type: String},
  gender:{type: String},
  age:{type: Number}
});

/*
employeeSchema.pre('save', function(next) {
    var employee = this;
    console.log("Before Saving the employee");
});
*/

// Build the Employee model
module.exports = mongoose.model( 'Employee', employeeSchema );

