"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validation = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        res.status(400).send({
            success: false,
            errors: result.error.issues,
        });
        return;
    }
    req.body = result.data;
    next();
};
exports.validation = validation;
exports.default = exports.validation;
