import nodemailer from "nodemailer";

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

export const sendOTPEmail = async (to, otp) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verify Your Email - Neuctra Authix</title>
      <style>
        body {
          font-family: 'Inter', Arial, sans-serif;
          background-color: #f4f7f6;
          margin: 0;
          padding: 0;
          color: #333;
        }
        .email-container {
          max-width: 480px;
          margin: 30px auto;
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        .header {
          background-color: #00c420;
          color: #ffffff;
          text-align: center;
          padding: 24px;
        }
        .header h1 {
          margin: 0;
          font-size: 20px;
          letter-spacing: 0.5px;
        }
        .content {
          padding: 32px 24px;
          text-align: center;
        }
        .content h2 {
          color: #111;
          font-size: 22px;
          margin-bottom: 12px;
        }
        .otp-box {
          display: inline-block;
          padding: 16px 28px;
          background-color: #00c420;
          color: white;
          border-radius: 12px;
          font-size: 24px;
          letter-spacing: 4px;
          font-weight: bold;
          margin: 20px 0;
        }
        .info {
          color: #555;
          font-size: 14px;
          line-height: 1.6;
        }
        .footer {
          background-color: #f9f9f9;
          padding: 16px;
          text-align: center;
          font-size: 12px;
          color: #888;
        }
        .footer a {
          color: #00c420;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Neuctra Authix</h1>
        </div>
        <div class="content">
          <h2>Verify Your Email</h2>
          <p class="info">
            Thanks for signing up! To finish verifying your account, use the OTP code below:
          </p>
          <div class="otp-box">${otp}</div>
          <p class="info">
            This code will expire in <strong>10 minutes</strong>.<br />
            Please do not share it with anyone.
          </p>
        </div>
        <div class="footer">
          <p>
            Need help? <a href="mailto:support@neuctra.com">Contact Support</a><br />
            © ${new Date().getFullYear()} Neuctra. All rights reserved.
          </p>
        </div>
      </div>
    </body>
  </html>
  `;

  return sendEmail({
    to,
    subject: "Verification - Neuctra Authix",
    html,
  });
};
