const controller = require("./../controllers/controller");
const authUser = require('./../controllers/auth');

module.exports = function(router) {
    router.get('/', controller.getDefault);
    router.post('/addWeight', controller.addWeight);
    router.get('/aboutus', controller.aboutUs);
    router.get('/getEmployees', authUser, controller.getEmployees);
    router.delete('/deleteByName', controller.deleteByName);
    router.post('/addEmployee', controller.addEmployee);
    router.put('/updateEmployee', controller.updateEmployee);
    router.post('/loginUser', controller.loginUser);
};