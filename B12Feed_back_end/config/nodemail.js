import nodemailer from 'nodemailer';
import { BREVO_PASS, BREVO_USER } from './config.js';

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: BREVO_USER,
    pass: BREVO_PASS,
  },
});

export default transporter;