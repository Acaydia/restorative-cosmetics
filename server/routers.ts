import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { consultationRequests, type InsertConsultationRequest } from "../drizzle/schema";
import { getDb } from "./db";
import { storagePut } from "./storage";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  consultation: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          email: z.string().email("Invalid email"),
          phone: z.string().optional(),
          message: z.string().min(10, "Message must be at least 10 characters"),
          images: z.array(z.instanceof(File)).optional().default([]),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        // Upload images and collect storage references
        const imageReferences: Array<{ url: string; key: string; filename: string; uploadedAt: string }> = [];

        if (input.images && input.images.length > 0) {
          for (const file of input.images) {
            try {
              const buffer = await file.arrayBuffer();
              const fileKey = `consultations/${Date.now()}-${Math.random().toString(36).substring(7)}-${file.name}`;
              const { url, key } = await storagePut(fileKey, Buffer.from(buffer), file.type);
              imageReferences.push({
                url,
                key,
                filename: file.name,
                uploadedAt: new Date().toISOString(),
              });
            } catch (error) {
              console.error(`Failed to upload image ${file.name}:`, error);
              // Continue with other images even if one fails
            }
          }
        }

        // Create consultation request in database
        const consultationData: InsertConsultationRequest = {
          name: input.name,
          email: input.email,
          phone: input.phone || null,
          message: input.message,
          images: imageReferences,
          status: "new",
        };

        await db.insert(consultationRequests).values(consultationData);

        return {
          success: true,
          message: "Consultation request submitted successfully",
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
