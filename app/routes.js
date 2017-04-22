// grab the employee model we just created
var Employee = require('../config/db');

module.exports = function (app) {

    // server routes ===========================================================
    app.get('/employee', function (req, res) {
        // use mongoose to get all employees in the database
        Employee.find(function (err, employees) {

            // if there is an error retrieving, send the error. 
            // nothing after res.send(err) will execute
            if (err)
                res.send(err);

            res.json(employees); // return all employees in JSON format
        });
    });

    // route to handle creating goes here (app.post)

    app.post('/employee', function (req, res) {

        var employee = new Employee();      // create a new instance of the Employee model
        employee.name = req.body.name;  // set the employee name (comes from the request)
        employee.email = req.body.email;
        employee.dob = req.body.dob;
        employee.department = req.body.department;
        employee.gender = req.body.gender;
        employee.age = req.body.age;
        // save the employee and check for errors
        employee.save(function (err) {
            if (err) {
                res.send(err);
            }
            else {
                console.log('Employee created!');
                res.json({ message: 'Employee created!' });
            }

        });

    });



    // get the employee with that id (accessed at GET http://localhost:8080/employee/:_id)
    app.get('/employee/:id', function (req, res) {
        // use our bear model to find the bear we want
        Employee.findById(req.params.id, function (err, employee) {
            if (err) {
                res.send(err);
            }
            else {
                console.log('Send employee to update!');
                res.json(employee);
            }
        });
    });

    // route to handle update 

    app.put('/employee/:id', function (req, res) {

        Employee.findById(req.params.id, function (err, employee) {
            if (err) {
                res.send(err);
            }
            else {
                // set the employee values
                employee.name = req.body.name;
                employee.email = req.body.email;
                employee.dob = req.body.dob;
                employee.department = req.body.department;
                employee.gender = req.body.gender;
                employee.age = req.body.age;
                // save the employee and check for errors
                employee.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        console.log('Employee updated!');
                        res.json({ message: 'Employee updated!' });
                    }

                });


            }
        });

    });

    // route to handle delete 

    app.delete('/employee/:id', function (req, res) {

        Employee.findById(req.params.id, function (err, employee) {
            if (err) {
                res.send(err);
            }
            else {
                Employee.remove({
                    _id: req.params.id
                }, function (err, employee) {
                    if (err){
                        res.send(err);
                    }
                    {
                        console.log('Employee Successfully deleted!');
                        res.json({ message: 'Successfully deleted' });
                    }
                });

            }
        });

    });


};
