const Employees = require('./../models/employees');
const w = require('./winston_config');
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
	let empWeights = {
		date: new Date(),
		weight: empWeight
	}
	
	let query = { empName: empName };
	let data = { $push: {empWeights: empWeights} };
    Employees.updateOne(query, data, function(err, result) {
        if(err)
            res.send(err);
        res.end(`Updated ${empName}`);
    });
	
    //res.send(`POST success, you sent ${empName} with weight: ${empWeights}`);
};

exports.getEmployees = function(req, res) {
    Employees.find({}, function(err, results){
        if(err){
            w.log({
                level: 'error',
                message: err
            });
            res.status(503).send("Server error");
        }
        res.json(results);
    });
};

exports.getEmployee = function(req, res) {
    let empToFind = req.params.employeeName;
    Employees.find({empName: empToFind}, function(err, results){
        if(err){
            w.log({
                level: 'error',
                message: err
            });
            res.status(503).send("Server error");
        }
        res.json(results);
    })
}

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

exports.admin = function(req, res) {
    res.send("Admin page");
}