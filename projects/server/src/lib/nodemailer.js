const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
      user: "dummybro06@gmail.com",
      pass: "wogt gxiz slzr vnkw",
    },
  });

  const mailOptions = {
    from: "Nginapp Support Team<NO-REPLY@nginapp.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
    html: option.html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
