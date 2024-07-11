const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "asnainsdq12@gmail.com",
    pass: "xsmtpsib-f34776e5b8573841fb424a70ae118461f4bb019951c4c94d9a02d05276fa925c-nDaPFTOGw5Jmq6pv",
  },
});

// Compose the email
const mailOptions = {
  from: "asnainsdq12@gmail.com",
  to: "asnainsiddiqui910@gmail.com",
  subject: "Test Email from Nodemailer",
  text: "This is a test email sent from Nodemailer.",
  html: "<strong>This is a test email sent from Nodemailer.</strong>",
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error occurred:", error.message);
    return;
  }
  console.log("Message sent successfully!");
  console.log("Message ID:", info.messageId);
});




to: facultyMembers.map((member) => member.email)