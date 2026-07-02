/**
 * Email Service Module using Resend
 * Handles sending emails for consultation notifications
 */

import { Resend } from "resend";

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Send an email via Resend
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const fromEmail = process.env.SMTP_FROM_EMAIL || "noreply@restorativecosmetics.com";

    const result = await resend.emails.send({
      from: fromEmail,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    if (result.error) {
      console.error("[Email] Resend error:", result.error);
      return false;
    }

    console.log(`[Email] Sent to ${options.to}:`, result.data?.id);
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
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #1B1512;
            background-color: #F6F1E7;
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
          }
          .email-wrapper {
            background-color: #FFFFFF;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(27, 21, 18, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #B8956A 0%, #5B2A35 100%); 
            color: #F6F1E7; 
            padding: 30px 20px; 
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-family: 'Cormorant Garamond', serif;
            font-weight: 600;
          }
          .header p {
            margin: 5px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .content { 
            padding: 30px 20px; 
          }
          .intro {
            font-size: 16px;
            margin-bottom: 20px;
            color: #1B1512;
          }
          .field { 
            margin-bottom: 15px; 
            padding-bottom: 15px;
            border-bottom: 1px solid #E3C9AE;
          }
          .field:last-of-type {
            border-bottom: none;
          }
          .label { 
            font-weight: 600; 
            color: #B8956A;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .value { 
            margin-top: 5px; 
            color: #1B1512;
            font-size: 15px;
          }
          .message-box {
            background-color: #F6F1E7;
            border-left: 4px solid #B8956A;
            padding: 15px;
            margin-top: 5px;
            border-radius: 4px;
          }
          .button-container {
            text-align: center;
            margin-top: 25px;
          }
          .button { 
            display: inline-block; 
            background: #B8956A; 
            color: white; 
            padding: 12px 30px; 
            text-decoration: none; 
            border-radius: 4px;
            font-weight: 600;
            font-size: 14px;
          }
          .button:hover {
            background: #A07B52;
          }
          .footer { 
            background: #F6F1E7; 
            padding: 20px; 
            text-align: center; 
            font-size: 12px; 
            color: #5B2A35;
            border-top: 1px solid #E3C9AE;
          }
          .footer p {
            margin: 5px 0;
          }
          a {
            color: #B8956A;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email-wrapper">
            <div class="header">
              <h1>New Consultation Request</h1>
              <p>Artistry in Restoration</p>
            </div>
            <div class="content">
              <p class="intro">
                A new consultation request has arrived. Review the details below:
              </p>
              
              <div class="field">
                <div class="label">Client Name</div>
                <div class="value">${escapeHtml(data.clientName)}</div>
              </div>
              
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${escapeHtml(data.clientEmail)}">${escapeHtml(data.clientEmail)}</a></div>
              </div>
              
              ${data.clientPhone ? `
                <div class="field">
                  <div class="label">Phone</div>
                  <div class="value"><a href="tel:${escapeHtml(data.clientPhone)}">${escapeHtml(data.clientPhone)}</a></div>
                </div>
              ` : ""}
              
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">${escapeHtml(data.message).replace(/\n/g, "<br>")}</div>
              </div>
              
              <div class="field">
                <div class="label">Images Attached</div>
                <div class="value">${data.imageCount} image${data.imageCount !== 1 ? "s" : ""}</div>
              </div>
              
              <div class="button-container">
                <a href="${process.env.VITE_FRONTEND_URL || "https://restorativecosmetics.com"}/admin/consultations/${data.consultationId}" class="button">
                  View in Admin Dashboard
                </a>
              </div>
            </div>
            <div class="footer">
              <p><strong>Restorative Cosmetics</strong></p>
              <p>Healing Through Artistry</p>
              <p>Saint Martinville, Louisiana</p>
            </div>
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
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #1B1512;
            background-color: #F6F1E7;
            margin: 0;
            padding: 0;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
          }
          .email-wrapper {
            background-color: #FFFFFF;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(27, 21, 18, 0.1);
          }
          .header { 
            background: linear-gradient(135deg, #B8956A 0%, #5B2A35 100%); 
            color: #F6F1E7; 
            padding: 40px 20px; 
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-family: 'Cormorant Garamond', serif;
            font-weight: 600;
          }
          .header p {
            margin: 8px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
            letter-spacing: 2px;
            text-transform: uppercase;
          }
          .content { 
            padding: 40px 20px; 
          }
          .greeting {
            font-size: 16px;
            margin-bottom: 20px;
            color: #1B1512;
          }
          .greeting .name {
            color: #B8956A;
            font-weight: 600;
          }
          .message-section {
            margin: 25px 0;
            line-height: 1.8;
            color: #1B1512;
            font-size: 15px;
          }
          .highlight-box {
            background-color: #F6F1E7;
            border-left: 4px solid #B8956A;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
          }
          .highlight-box strong {
            color: #5B2A35;
          }
          .highlight-box li {
            margin-bottom: 8px;
          }
          .divider { 
            border-top: 2px solid #E3C9AE; 
            margin: 30px 0; 
          }
          .signature {
            margin-top: 30px;
            font-style: italic;
            color: #5B2A35;
          }
          .footer { 
            background: #F6F1E7; 
            padding: 25px 20px; 
            text-align: center; 
            font-size: 12px; 
            color: #5B2A35;
            border-top: 1px solid #E3C9AE;
          }
          .footer p {
            margin: 5px 0;
          }
          .footer-tagline {
            font-size: 11px;
            opacity: 0.8;
            margin-top: 10px;
          }
          a {
            color: #B8956A;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email-wrapper">
            <div class="header">
              <h1>Restorative Cosmetics</h1>
              <p>Artistry in Restoration</p>
            </div>
            <div class="content">
              <p class="greeting">
                Dear <span class="name">${escapeHtml(data.clientName)}</span>,
              </p>
              
              <p class="message-section">
                Thank you for reaching out to Restorative Cosmetics. We have received your consultation request and deeply appreciate you sharing your story and photos with us.
              </p>
              
              <p class="message-section">
                We understand that every scar tells a story, and we are honored to be part of your healing journey. Our team will carefully review your submission and reach out to you within 1–2 business days to discuss your options and answer any questions you may have.
              </p>
              
              <div class="highlight-box">
                <strong>What to expect next:</strong>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>Our team will review your photos and message</li>
                  <li>We'll contact you via email or phone to discuss your consultation</li>
                  <li>We'll answer any questions about our restorative tattooing and permanent makeup services</li>
                  <li>Together, we'll create a personalized plan for your transformation</li>
                </ul>
              </div>
              
              <div class="divider"></div>
              
              <p class="message-section">
                If you have any urgent questions in the meantime, feel free to reach out directly. We're here to help.
              </p>
              
              <p class="signature">
                With warmth and care,<br>
                <strong>The Restorative Cosmetics Team</strong>
              </p>
            </div>
            <div class="footer">
              <p><strong>Restorative Cosmetics</strong></p>
              <p>Paramedical Cosmetic Artistry</p>
              <p>Saint Martinville, Louisiana</p>
              <p class="footer-tagline">© 2026 Restorative Cosmetics. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: data.clientEmail,
    subject: "We Received Your Consultation Request — Thank You!",
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
