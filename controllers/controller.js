const Employees = require('./../models/employees');
const jwt = require('jsonwebtoken');

exports.getDefault = function(req, res) {
    res.send("You are on root route");
};

exports.aboutUs = function(req, res) {
    res.send("You are on about us route");
};

exports.addWeight = function(req, res) {
    let empName = req.body.empName;
    let empWeight = req.body.empWeight;
    res.send(`POST success, you sent ${empName} with weight: ${empWeight}`);
};

exports.getEmployees = function(req, res) {
    Employees.find({}, function(err, results){
        if(err)
            res.end(err);
        res.json(results);
    });
};

exports.deleteByName = function(req, res) {
    let empToDelete = req.body.empName;
    Employees.deleteOne({empName: empToDelete}, function(err, results){
        if(err)
            res.send(err);
        res.end(`Deleted: ${empToDelete}`);
    });
};

exports.addEmployee = function(req, res) {
    let empName = req.body.empName;
    let empPass = req.body.empPass;
    const Emp = new Employees();
    Emp.empName = empName;
    Emp.empPass = empPass;
    Emp.save({}, function(err){
        if(err)
            res.end(err);
        res.end(`Created ${empName}`);
    });
};

exports.updateEmployee = function(req, res) {
    let empName = req.body.empName;
    let newPass = req.body.newPass;
    let query = { empName: empName };
    let data = { $set: {empPass: newPass} };
    Employees.updateOne(query, data, function(err, result) {
        if(err)
            res.send(err);
        res.end(`Updated ${empName}`);
    });
};

exports.loginUser = function(req, res) {
    let empName = req.body.empName;
    let empPass = req.body.empPass;
    Employees.find({empName: empName}, function(err, result){
        if(err)
            res.send(err);
        if(result[0].empPass === empPass){
            jwt.sign({empName: empName}, 
                "secret", //secret is the key of the token
                {expiresIn: '1h'}, 
                function(err, token) {
                    if(err)
                        throw err;
                    res.end(token)
            });
        } else {
            res.end("Login failed");
        }
    });
    // Emp.empName = empName;
    // Emp.empPass = empPass;
    // Emp.save({}, function(err){
    //     if(err)
    //         res.end(err);
    //     res.end(`Successfully logged in as ${empName}`);
    // });
};