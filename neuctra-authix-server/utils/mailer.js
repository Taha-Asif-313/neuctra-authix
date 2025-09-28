import nodemailer from "nodemailer";
console.log("SMTP_HOST:", process.env.SMTP_HOST);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// generic function
export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"Neuctra Authix" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    return true;
  } catch (err) {
    console.error("Email send error:", err);
    return false;
  }
};

// OTP mailer
export const sendOTPEmail = async (to, otp) => {
  const html = `
    <h2>Email Verification</h2>
    <p>Your OTP is: <b>${otp}</b></p>
    <p>It will expire in 10 minutes.</p>
  `;
  return sendEmail({ to, subject: "Verify your email", html });
};
