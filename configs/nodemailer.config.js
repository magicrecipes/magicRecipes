const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.USER_NAME,
    pass: process.env.PASS 
  }
});