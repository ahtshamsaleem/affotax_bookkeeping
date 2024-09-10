

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
    });

    // Set up email data
    const mailOptions = {
      from: "info@affotax.com",
      to: "ahtshamsaleem51@gmail.com",    // "info@affotax.com"
      subject: `Affotax Bookkeeping | New message from ${name} `,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: 'Message sent successfully.' });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Failed to send message.' });
    }


}



