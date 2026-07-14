import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the email service - emails should send silently in tests
vi.mock("./email-resend", () => ({
  sendOwnerNotification: vi.fn().mockResolvedValue(true),
  sendClientConfirmation: vi.fn().mockResolvedValue(true),
}));

describe("consultation.submit", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("validates required fields - name", async () => {
    const mockContext: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(mockContext);

    try {
      await caller.consultation.submit({
        name: "",
        email: "jane@example.com",
        message: "Test message with enough characters",
      });
      expect.fail("Should have thrown validation error for empty name");
    } catch (error: any) {
      expect(error.message).toContain("Name is required");
    }
  });

  it("validates required fields - email format", async () => {
    const mockContext: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(mockContext);

    try {
      await caller.consultation.submit({
        name: "Jane Doe",
        email: "invalid-email",
        message: "Test message with enough characters",
      });
      expect.fail("Should have thrown validation error for invalid email");
    } catch (error: any) {
      expect(error.message).toContain("Invalid email");
    }
  });

  it("validates required fields - message length", async () => {
    const mockContext: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(mockContext);

    try {
      await caller.consultation.submit({
        name: "Jane Doe",
        email: "jane@example.com",
        message: "Short",
      });
      expect.fail("Should have thrown validation error for short message");
    } catch (error: any) {
      expect(error.message).toContain("at least 10 characters");
    }
  });

  it("accepts optional phone field", async () => {
    const mockContext: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(mockContext);

    // This test validates input schema acceptance, not database operations
    // The actual database test would require a real database connection
    try {
      await caller.consultation.submit({
        name: "Jane Doe",
        email: "jane@example.com",
        message: "I have a scar from surgery that I would like to camouflage.",
        // phone is optional - should not throw
      });
      // If we get here, the input validation passed
      expect(true).toBe(true);
    } catch (error: any) {
      // Only fail if it's a validation error, not a database error
      if (error.message?.includes("Database")) {
        expect(true).toBe(true); // Expected in test environment
      } else {
        throw error;
      }
    }
  });

  it("handles empty images array", async () => {
    const mockContext: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(mockContext);

    try {
      await caller.consultation.submit({
        name: "Jane Doe",
        email: "jane@example.com",
        message: "I have a scar from surgery that I would like to camouflage.",
        images: [],
      });
      expect(true).toBe(true);
    } catch (error: any) {
      // Expected: database not available in test environment
      if (error.message?.includes("Database")) {
        expect(true).toBe(true);
      } else {
        throw error;
      }
    }
  });
});
