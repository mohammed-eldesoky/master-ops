import * as nodemailer from 'nodemailer';

export async function sendMail(options: nodemailer.SendMailOptions) {
  // create Transporter

  const transportar = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  //define mail options
  await transportar.sendMail(options);
}
