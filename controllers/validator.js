const { check, validationResult } = require('express-validator');
const w = require('./../controllers/winston_config');

const fieldChecks = function() {
    return[
        check('empName', 'Name required').not().isEmpty()

    ];
}

const validate = function(req, res, next) {
    const errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }
    w.log({
        level: 'error',
        message: errors.array()
    });

    const extractedErrors = [];
    errors.array().map(
        err => extractedErrors.push({ [err.param]: err.msg })
    )

    req.status(400).end(errors.array()[0].msg);
}

module.exports = {
    fieldChecks,
    validate
}

