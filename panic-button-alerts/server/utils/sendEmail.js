const nodemailer = require("nodemailer");
const logger = require("../logger/logger");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  try {
    logger.info(`${process.env.USER}=${process.env.PASS}`);
    
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    console.log(email)
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    console.log(source)
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.USER,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send emaile 
    console.log("came to send mail")
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    return error;
  }

};

module.exports = sendEmail;
