const nodemailer = require('nodemailer');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Replace with your SMTP host
  port: 587, // Common port for SMTP
  secure: false, // true for 465, false for other ports
  auth: {
    user: "kashafabdullah01@gmail.com", // Your email
    pass: "vult qnck bqns tagi", // Your email password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Function to send a reminder email
const sendReminderEmail = (email, taskTitle, deadline) => {
  const mailOptions = {
    from: "kashafabdullah01@gmail.com",
    to: email,
    subject: 'Task Reminder',
    text: `Reminder: Your task "${taskTitle}" is due at ${deadline}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendReminderEmail };