/**
 * Email Service Module
 * Handles sending emails for consultation notifications
 */

import nodemailer from "nodemailer";
import { ENV } from "./_core/env";

// Initialize email transporter
// For production, configure with your email service provider (Gmail, SendGrid, etc.)
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    // Configure based on environment
    // For development, use ethereal (test email service)
    // For production, use your email provider credentials

    if (process.env.NODE_ENV === "production") {
      // Production: Use SendGrid, Gmail, or other SMTP provider
      // Set these environment variables:
      // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM_EMAIL

      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Development: Use test email service (ethereal)
      // Emails won't actually send but you can view them in the test inbox
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: "test@ethereal.email",
          pass: "test-password",
        },
      });
    }
  }

  return transporter;
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const transporter = getTransporter();

    const fromEmail = process.env.SMTP_FROM_EMAIL || "noreply@restorativecosmetics.com";

    const result = await transporter.sendMail({
      from: fromEmail,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    console.log(`[Email] Sent to ${options.to}:`, result.messageId);
    return true;
  } catch (error) {
    console.error("[Email] Failed to send email:", error);
    return false;
  }
}

/**
 * Send owner notification email when new consultation arrives
 */
export async function sendOwnerNotification(data: {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  message: string;
  imageCount: number;
  consultationId: number;
}): Promise<boolean> {
  const ownerEmail = process.env.OWNER_EMAIL || "owner@restorativecosmetics.com";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #d4a574 0%, #b8956a 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { border: 1px solid #ddd; border-top: none; padding: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: 600; color: #666; }
          .value { margin-top: 5px; color: #333; }
          .button { display: inline-block; background: #d4a574; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 15px; }
          .footer { background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #ddd; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0;">New Consultation Request</h2>
          </div>
          <div class="content">
            <p>You have received a new consultation request:</p>
            
            <div class="field">
              <div class="label">Client Name:</div>
              <div class="value">${escapeHtml(data.clientName)}</div>
            </div>
            
            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${escapeHtml(data.clientEmail)}">${escapeHtml(data.clientEmail)}</a></div>
            </div>
            
            ${data.clientPhone ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value"><a href="tel:${escapeHtml(data.clientPhone)}">${escapeHtml(data.clientPhone)}</a></div>
              </div>
            ` : ""}
            
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${escapeHtml(data.message).replace(/\n/g, "<br>")}</div>
            </div>
            
            <div class="field">
              <div class="label">Images Attached:</div>
              <div class="value">${data.imageCount} image${data.imageCount !== 1 ? "s" : ""}</div>
            </div>
            
            <a href="${process.env.VITE_FRONTEND_URL || "https://restorativecosmetics.com"}/admin/consultations/${data.consultationId}" class="button">
              View in Admin Dashboard
            </a>
          </div>
          <div class="footer">
            <p>Restorative Cosmetics | Healing Through Artistry</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: ownerEmail,
    subject: `New Consultation Request from ${data.clientName}`,
    html,
    text: `New consultation request from ${data.clientName}. Email: ${data.clientEmail}. Message: ${data.message}`,
  });
}

/**
 * Send client confirmation email
 */
export async function sendClientConfirmation(data: {
  clientName: string;
  clientEmail: string;
}): Promise<boolean> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #d4a574 0%, #b8956a 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .content { border: 1px solid #ddd; border-top: none; padding: 30px; }
          .message { font-size: 16px; margin-bottom: 20px; }
          .highlight { color: #d4a574; font-weight: 600; }
          .footer { background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #ddd; }
          .divider { border-top: 1px solid #ddd; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">Restorative Cosmetics</h1>
            <p style="margin: 5px 0 0 0; font-size: 14px;">Healing Through Artistry</p>
          </div>
          <div class="content">
            <p class="message">
              Dear <span class="highlight">${escapeHtml(data.clientName)}</span>,
            </p>
            
            <p>
              Thank you for reaching out to Restorative Cosmetics. We have received your consultation request and appreciate you sharing your story and photos with us.
            </p>
            
            <p>
              We understand that every scar tells a story, and we're honored to be part of your healing journey. Our team will carefully review your submission and reach out to you within 1-2 business days to discuss your options and answer any questions you may have.
            </p>
            
            <div class="divider"></div>
            
            <p style="color: #666; font-size: 14px;">
              <strong>What to expect next:</strong><br>
              • Our team will review your photos and message<br>
              • We'll contact you via email or phone to discuss your consultation<br>
              • We'll answer any questions about our restorative tattooing and permanent makeup services<br>
              • Together, we'll create a personalized plan for your transformation
            </p>
            
            <div class="divider"></div>
            
            <p style="color: #666; font-size: 14px;">
              If you have any urgent questions in the meantime, feel free to reach out directly. We're here to help.
            </p>
            
            <p>
              With warmth and care,<br>
              <strong>The Restorative Cosmetics Team</strong>
            </p>
          </div>
          <div class="footer">
            <p>© 2026 Restorative Cosmetics. All rights reserved.</p>
            <p>Healing and restoring dignity through the art of restorative tattooing</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: data.clientEmail,
    subject: "We Received Your Consultation Request - Thank You!",
    html,
    text: `Thank you for your consultation request. We have received your submission and will review it shortly. Our team will reach out to you within 1-2 business days.`,
  });
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
