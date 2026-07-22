import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { contactSubmissions, bookingRequests, newsletterSubscriptions, testimonials, trainingInquiries } from "../../drizzle/schema";
import { sendEmail } from "../email-resend";

export const formsRouter = router({
  // Contact Form Submission
  submitContact: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email required"),
        message: z.string().min(10, "Message must be at least 10 characters"),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      try {
        // Save to database
        await db.insert(contactSubmissions).values({
          name: input.fullName,
          email: input.email,
          subject: "Website Contact Form",
          message: input.message,
        });

        // Send confirmation email to client
        await sendEmail({
          to: input.email,
          subject: "We Received Your Message",
          html: `
            <p>Hi ${input.fullName},</p>
            <p>Thank you for reaching out to Restorative Cosmetics. We've received your message and will get back to you within 1-2 business days.</p>
            <p>Best regards,<br/>Bethani Broussard<br/>Restorative Cosmetics</p>
          `,
        });

        // Send notification to owner
        await sendEmail({
          to: process.env.OWNER_EMAIL || "bethani@restorativecosmetics.com",
          subject: `New Contact Form Submission from ${input.fullName}`,
          html: `
            <p><strong>New Contact Form Submission</strong></p>
            <p><strong>Name:</strong> ${input.fullName}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Message:</strong></p>
            <p>${input.message}</p>
          `,
        });

        return { success: true };
      } catch (error) {
        console.error("Contact form submission error:", error);
        throw new Error("Failed to submit contact form");
      }
    }),

  // Newsletter Subscription
  subscribeNewsletter: publicProcedure
    .input(
      z.object({
        email: z.string().email("Valid email required"),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      try {
        await db.insert(newsletterSubscriptions).values({
          email: input.email,
          subscribed: "yes",
        }).onDuplicateKeyUpdate({
          set: { subscribed: "yes" },
        });

        // Send confirmation email
        await sendEmail({
          to: input.email,
          subject: "Welcome to Restorative Cosmetics Newsletter",
          html: `
            <p>Thank you for subscribing to our newsletter!</p>
            <p>You'll receive updates about new techniques, client stories, and special offers.</p>
            <p>Best regards,<br/>Bethani Broussard<br/>Restorative Cosmetics</p>
          `,
        });

        return { success: true };
      } catch (error) {
        console.error("Newsletter subscription error:", error);
        throw new Error("Failed to subscribe to newsletter");
      }
    }),

  // Booking Request
  submitBooking: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email required"),
        phone: z.string().min(10, "Valid phone required"),
        service: z.string().min(1, "Service is required"),
        preferredDate: z.string().optional(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      try {
        await db.insert(bookingRequests).values({
          name: input.fullName,
          email: input.email,
          phone: input.phone,
          serviceType: input.service,
          preferredDate: input.preferredDate,
          message: input.message,
        });

        // Send confirmation to client
        await sendEmail({
          to: input.email,
          subject: "Booking Request Received",
          html: `
            <p>Hi ${input.fullName},</p>
            <p>Thank you for your booking request! We've received your information and will confirm availability shortly.</p>
            <p><strong>Service:</strong> ${input.service}</p>
            <p><strong>Preferred Date:</strong> ${input.preferredDate || "To be discussed"}</p>
            <p>We'll contact you within 1-2 business days.</p>
            <p>Best regards,<br/>Bethani Broussard<br/>Restorative Cosmetics</p>
          `,
        });

        // Send notification to owner
        await sendEmail({
          to: process.env.OWNER_EMAIL || "bethani@restorativecosmetics.com",
          subject: `New Booking Request from ${input.fullName}`,
          html: `
            <p><strong>New Booking Request</strong></p>
            <p><strong>Name:</strong> ${input.fullName}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Phone:</strong> ${input.phone}</p>
            <p><strong>Service:</strong> ${input.service}</p>
            <p><strong>Preferred Date:</strong> ${input.preferredDate || "Not specified"}</p>
            <p><strong>Message:</strong> ${input.message || "None"}</p>
          `,
        });

        return { success: true };
      } catch (error) {
        console.error("Booking submission error:", error);
        throw new Error("Failed to submit booking request");
      }
    }),

  // Testimonial Submission
  submitTestimonial: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email required"),
        service: z.string().min(1, "Service is required"),
        testimonial: z.string().min(20, "Testimonial must be at least 20 characters"),
        rating: z.number().min(1).max(5).default(5),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      try {
        await db.insert(testimonials).values({
          name: input.fullName,
          email: input.email,
          serviceType: input.service,
          testimonial: input.testimonial,
          rating: input.rating,
        });

        // Send confirmation to client
        await sendEmail({
          to: input.email,
          subject: "Thank You for Your Testimonial",
          html: `
            <p>Hi ${input.fullName},</p>
            <p>Thank you so much for sharing your story! Your testimonial means the world to us and helps other clients understand the transformation we can provide.</p>
            <p>We'll review and feature your story on our website soon.</p>
            <p>Best regards,<br/>Bethani Broussard<br/>Restorative Cosmetics</p>
          `,
        });

        // Send notification to owner
        await sendEmail({
          to: process.env.OWNER_EMAIL || "bethani@restorativecosmetics.com",
          subject: `New Testimonial from ${input.fullName}`,
          html: `
            <p><strong>New Testimonial Submission</strong></p>
            <p><strong>Name:</strong> ${input.fullName}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Service:</strong> ${input.service}</p>
            <p><strong>Rating:</strong> ${"⭐".repeat(input.rating)}</p>
            <p><strong>Testimonial:</strong></p>
            <p>${input.testimonial}</p>
          `,
        });

        return { success: true };
      } catch (error) {
        console.error("Testimonial submission error:", error);
        throw new Error("Failed to submit testimonial");
      }
    }),

  // Training Inquiry
  submitTrainingInquiry: publicProcedure
    .input(
      z.object({
        fullName: z.string().min(1, "Name is required"),
        email: z.string().email("Valid email required"),
        phone: z.string().min(10, "Valid phone required"),
        experience: z.string().min(1, "Experience level is required"),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database not available");

      try {
        await db.insert(trainingInquiries).values({
          name: input.fullName,
          email: input.email,
          phone: input.phone,
          experience: input.experience,
          message: input.message,
        });

        // Send confirmation to client
        await sendEmail({
          to: input.email,
          subject: "Training Inquiry Received",
          html: `
            <p>Hi ${input.fullName},</p>
            <p>Thank you for your interest in Restorative Cosmetics training! We're excited to learn about your background and goals.</p>
            <p>Bethani will review your inquiry and reach out within 2-3 business days to discuss training options.</p>
            <p>Best regards,<br/>Bethani Broussard<br/>Restorative Cosmetics</p>
          `,
        });

        // Send notification to owner
        await sendEmail({
          to: process.env.OWNER_EMAIL || "bethani@restorativecosmetics.com",
          subject: `New Training Inquiry from ${input.fullName}`,
          html: `
            <p><strong>New Training Inquiry</strong></p>
            <p><strong>Name:</strong> ${input.fullName}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            <p><strong>Phone:</strong> ${input.phone}</p>
            <p><strong>Experience Level:</strong> ${input.experience}</p>
            <p><strong>Message:</strong> ${input.message || "None"}</p>
          `,
        });

        return { success: true };
      } catch (error) {
        console.error("Training inquiry submission error:", error);
        throw new Error("Failed to submit training inquiry");
      }
    }),
});
