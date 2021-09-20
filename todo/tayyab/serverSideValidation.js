const joi = require('joi');

module.exports.todoValidations = joi.object({
    todo: joi.object({
        task: joi.string().required()
    }).required()
});