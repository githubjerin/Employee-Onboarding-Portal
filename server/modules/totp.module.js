const speakeasy = require('speakeasy');

const secret = speakeasy.generateSecret({
    name: "Employee OnBoarding"
});

module.exports = secret;