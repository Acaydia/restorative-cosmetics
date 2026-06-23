import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database and storage modules
vi.mock("./db", () => ({
  getDb: vi.fn(),
}));

vi.mock("./storage", () => ({
  storagePut: vi.fn(),
}));

describe("consultation.submit", () => {
  let mockDb: any;
  let mockStoragePut: any;

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Setup mock database
    mockDb = {
      insert: vi.fn().mockReturnValue({
        values: vi.fn().mockResolvedValue(undefined),
      }),
    };

    // Setup mock storage
    mockStoragePut = vi.fn().mockResolvedValue({
      url: "/manus-storage/test-key-123",
      key: "test-key-123",
    });
  });

  it("submits a consultation request with valid data", async () => {
    const mockContext: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(mockContext);

    const result = await caller.consultation.submit({
      name: "Jane Doe",
      email: "jane@example.com",
      phone: "(555) 123-4567",
      message: "I have a scar from surgery that I would like to camouflage.",
      images: [],
    });

    expect(result).toEqual({
      success: true,
      message: "Consultation request submitted successfully",
    });
  });

  it("validates required fields", async () => {
    const mockContext: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(mockContext);

    // Test missing name
    await expect(
      caller.consultation.submit({
        name: "",
        email: "jane@example.com",
        message: "Test message",
      })
    ).rejects.toThrow();

    // Test invalid email
    await expect(
      caller.consultation.submit({
        name: "Jane Doe",
        email: "invalid-email",
        message: "Test message",
      })
    ).rejects.toThrow();

    // Test short message
    await expect(
      caller.consultation.submit({
        name: "Jane Doe",
        email: "jane@example.com",
        message: "Short",
      })
    ).rejects.toThrow();
  });

  it("accepts optional phone number", async () => {
    const mockContext: TrpcContext = {
      user: null,
      req: {
        protocol: "https",
        headers: {},
      } as TrpcContext["req"],
      res: {} as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(mockContext);

    const result = await caller.consultation.submit({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "I have a scar from surgery that I would like to camouflage.",
      // phone is optional
    });

    expect(result.success).toBe(true);
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

    const result = await caller.consultation.submit({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "I have a scar from surgery that I would like to camouflage.",
      images: [],
    });

    expect(result.success).toBe(true);
  });
});
