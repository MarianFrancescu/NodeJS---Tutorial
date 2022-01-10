const Employees = require('./../models/employees');

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