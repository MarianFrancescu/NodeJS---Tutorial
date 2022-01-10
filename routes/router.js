const controller = require("./../controllers/controller");

module.exports = function(router) {
    router.get('/', controller.getDefault);
    router.post('/addWeight', controller.addWeight);
    router.get('/aboutus', controller.aboutUs);
    router.get('/getEmployees', controller.getEmployees);
    router.delete('/deleteByName', controller.deleteByName);
    router.post('/addEmployee', controller.addEmployee);
    router.put('/updateEmployee', controller.updateEmployee);
};