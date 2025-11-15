import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Check if email is configured
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('📧 Email not configured. Skipping email send.');
    console.log('📧 Would send email to:', options.email);
    console.log('📧 Subject:', options.subject);
    // In development, just log instead of sending
    return Promise.resolve();
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email options
    const message = {
      from: `${process.env.EMAIL_FROM || 'LocalSkill Exchange'} <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html || options.message
    };

    // Send email
    await transporter.sendMail(message);
    console.log('✅ Email sent successfully to:', options.email);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    throw error;
  }
};

export default sendEmail;

