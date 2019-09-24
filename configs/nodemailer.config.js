require('dotenv').config();
const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASS 
  }
});