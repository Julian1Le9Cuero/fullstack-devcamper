const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { to, subject, text } = options;

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `Devcamper  <${process.env.SMTP_FROM}>`, // sender address
    to,
    subject,
    text,
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;
