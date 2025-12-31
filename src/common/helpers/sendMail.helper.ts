import * as nodemailer from 'nodemailer';

export async function sendMail(options: nodemailer.SendMailOptions) {
  // create Transporter

  const transportar = nodemailer.createTransport({
    service: 'gmail',
  host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    } 
  });

  //define mail options
  await transportar.sendMail(options);
}
