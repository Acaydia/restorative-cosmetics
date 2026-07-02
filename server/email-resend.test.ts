import { describe, it, expect, beforeAll } from "vitest";
import { Resend } from "resend";

describe("Resend Email Service", () => {
  let resend: Resend;

  beforeAll(() => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }
    resend = new Resend(apiKey);
  });

  it("should validate Resend API key by listing domains", async () => {
    try {
      // This is a lightweight API call that validates the API key
      // without actually sending an email
      const response = await resend.domains.list();
      
      // If we get here without an error, the API key is valid
      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
    } catch (error: any) {
      // If the API key is invalid, Resend will throw an error
      if (error.message?.includes("Missing API key") || error.message?.includes("Unauthorized")) {
        throw new Error("Invalid Resend API key. Please check your credentials.");
      }
      // Re-throw other errors
      throw error;
    }
  });

  it("should have required environment variables set", () => {
    expect(process.env.RESEND_API_KEY).toBeDefined();
    expect(process.env.OWNER_EMAIL).toBeDefined();
    expect(process.env.SMTP_FROM_EMAIL).toBeDefined();
    expect(process.env.VITE_FRONTEND_URL).toBeDefined();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(process.env.OWNER_EMAIL!)).toBe(true);
    expect(emailRegex.test(process.env.SMTP_FROM_EMAIL!)).toBe(true);

    // Validate URL format
    expect(process.env.VITE_FRONTEND_URL).toMatch(/^https?:\/\//);
  });
});
