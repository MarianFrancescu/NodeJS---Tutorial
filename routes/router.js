const controller = require("./../controllers/controller");
const {authUser, authRole} = require('./../controllers/auth');
const { fieldChecks, validate } = require('./../controllers/validator');
const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
  }

module.exports = function(router) {
    router.get('/', controller.getDefault);
    router.post('/addWeight', controller.addWeight);
    router.get('/aboutus', controller.aboutUs);
    router.get('/getEmployees', authUser, controller.getEmployees);
    router.get('/getEmployee/:employeeName', controller.getEmployee);
    router.delete('/deleteByName', controller.deleteByName);
    router.post('/addEmployee', fieldChecks(), validate, controller.addEmployee);
    router.put('/updateEmployee', controller.updateEmployee);
    router.post('/loginUser', controller.loginUser);
    router.get('/admin', authUser, authRole(ROLE.ADMIN), controller.admin);
};