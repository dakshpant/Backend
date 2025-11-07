import nodemailer from "nodemailer";

export const otpMail = async (to, otp) => {
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✅ set" : "❌ missing");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Auth System <${process.env.EMAIL_USER}>`,
    to,
    subject: "OTP Verification Code",
    html: `<h2>Your OTP is ${otp}</h2><p>It expires in 5 minutes.</p>`,
  };
  await transporter.sendMail(mailOptions);
};
