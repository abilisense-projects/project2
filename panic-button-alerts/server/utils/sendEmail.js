const nodemailer = require("nodemailer");
const logger = require("../logger/logger");

const sendEmail = async (email, subject, resetPasswordLink) => {
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
    const htmlContent = `
    <p>Click the button below to reset your password:</p>
    <button onclick="window.location.href='${resetPasswordLink}'" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Email</button>
`;

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: htmlContent,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = sendEmail;
