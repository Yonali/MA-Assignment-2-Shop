const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD
  //   }
  // });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "menakajayasekara9@gmail.com",
      pass: "Menu123@#"
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Kushnara Siriwardhana <kushnara@jonas.io>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
