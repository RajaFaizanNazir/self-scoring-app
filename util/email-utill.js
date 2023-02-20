const nodemailer = require("nodemailer");
/**************************************** */
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "stel.transportation.group@gmail.com",
    pass: "ardvntgplhzvtfdt",
  },
});
// const transporter = nodemailer.createTransport({
//   host: "email-smtp.ap-southeast-2.amazonaws.com",
//   port: 465,
//   secure: true,

//   // auth: {
//   //   user: customConfigurations.SES_USER,
//   //   pass: customConfigurations.SES_PASS,
//   // },
//   auth: {
//     user: "AKIAVF6VHQZQJ2YCGJ7Y",
//     pass: "BDI5DVUvp+RxfXEcB6usl7//zJcdTJ5ZKVQdr/hGPksl",
//   },
//   tls: {
//     ciphers: "SSLv3",
//   },
// });
/**************************************** */
const sendMailSMTP = async (
  to,
  subject,
  text,
  html,
  fileName,
  bufferContent
) => {
  return await transporter.sendMail({
    from: "stel.transportation.group@gmail.com", // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    // text: text, // plain text body
    // html: html, // html body
    attachments: [
      {
        filename: fileName,
        content: bufferContent,
        // encoding: "base64",
      },
    ],
  });
};
/**************************************** */
module.exports = {
  sendMailSMTP,
};
/**************************************** */
