const nodemailer = require('nodemailer');

// @desc    Send contact form
// @route   POST /api/contact
// @access  Public
const sendContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Failed to send contact form' });
  }
};

module.exports = {
  sendContactForm,
}; 