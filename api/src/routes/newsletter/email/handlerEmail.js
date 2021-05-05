const nodemailer = require("nodemailer");

// const htmlToText = require("html-to-text");
const util = require("util");

const { user, pass } = process.env;

let transporter = nodemailer.createTransport({
  service: "gmail",
  post: 587,
  secure: false,
  auth: {
    user,
    pass,
  },
});

exports.HandlerEmail = async (html, email, subject) => {
  let mailOptions = {
    from: "AgroPlace <agroplaceofficial@gmail.com>",
    to: email,
    subject: subject,
    html: html,
  };

  const enviarEmail = util.promisify(transporter.sendMail, transporter);
  return enviarEmail.call(transporter, mailOptions);
};
