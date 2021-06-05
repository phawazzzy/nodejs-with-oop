const validator = (schema) => (req, res, next) => {
    const validationValue = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true,
        convert: false,
        skipFunctions: true
    });
    if (validationValue.error) {
        const errorMessages = validationValue.error.details.map((error) => error.message);

        return res.status(422).json({ error: errorMessages });
    }

    return next();
};
module.exports = { validator };

// class Validator {
//     constructor(schema) {
//         this.schema = schema
//     }
//     validate(req, res, next) {
//         const validationValue = this.schema.validate(req.body, {
//             abortEarly: false,
//             allowUnknown: true,
//             convert: false,
//             skipFunctions: true
//         });
//         if (validationValue.error) {
//             const errorMessages = validationValue.error.details.map((error) => error.message);

//             return res.status(422).json({ error: errorMessages });
//         }

//         return next();
//     }
// }

// module.exports =  Validator;