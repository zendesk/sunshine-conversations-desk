'use strict';

exports.__esModule = true;
exports.generate = generate;
var jwt = require('jsonwebtoken');

function generate(body, secret, keyId) {
    return jwt.sign(body, secret, {
        headers: {
            kid: keyId
        }
    });
}