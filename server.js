const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const Faculty = require("./models/Faculty.js");


const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/faculty", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Create an SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "asnainsdq12@gmail.com",
    pass: "xsmtpsib-f34776e5b8573841fb424a70ae118461f4bb019951c4c94d9a02d05276fa925c-nDaPFTOGw5Jmq6pv",
  },
});

app.get("/faculty", async (req, res) => {
  const { subject } = req.query;

  try {
    const facultyMembers = await Faculty.find({ subject });
    res.json(facultyMembers);
  } catch (err) {
    console.error("Error fetching faculty members:", err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching faculty members" });
  }
});

app.post("/send-email", async (req, res) => {
  const { facultyIds } = req.body;

  try {
    const facultyMembers = await Faculty.find({ _id: { $in: facultyIds } });

    const mailOptions = {
      from: "asnainsdq12@gmail.com",
      to: facultyMembers.map((member) => member.email),
      subject: "Paper Setting Notification",
      text: "Dear Sir/maam ,\n\nYou have been selected to set the paper. Please proceed accordingly.\n\nBest regards,\nMGM University",
      html: "<p>Dear ${facultyNames},</p><p>You have been selected to set the paper. Please proceed accordingly.</p><p>Best regards,<br>[Your Name]</p>",
    };

    // Send email using SMTP
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "An error occurred while sending email" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
