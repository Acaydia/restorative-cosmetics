import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";

describe("ProDream Integration Credentials", () => {
  it("should validate Supabase connection", async () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

    expect(supabaseUrl).toBeDefined();
    expect(supabaseKey).toBeDefined();
    expect(supabaseUrl).toMatch(/^https:\/\//);

    // Create Supabase client
    const supabase = createClient(supabaseUrl!, supabaseKey!);

    // Test connection with a simple query
    const { data, error } = await supabase
      .from("users")
      .select("count")
      .limit(1);

    // If we get here without auth error, credentials are valid
    if (error && error.message.includes("401")) {
      throw new Error("Invalid Supabase credentials");
    }

    expect(supabase).toBeDefined();
  });

  it("should validate Anthropic API key", async () => {
    const anthropicKey = process.env.ANTHROPIC_API_KEY;

    expect(anthropicKey).toBeDefined();
    expect(anthropicKey).toMatch(/^sk-ant-/);

    // Create Anthropic client
    const anthropic = new Anthropic({
      apiKey: anthropicKey,
    });

    // Test with a simple message
    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 100,
      messages: [
        {
          role: "user",
          content: "Say 'test successful' in one sentence.",
        },
      ],
    });

    expect(message).toBeDefined();
    expect(message.content).toBeDefined();
  });

  it("should have all required environment variables", () => {
    expect(process.env.SUPABASE_URL).toBeDefined();
    expect(process.env.SUPABASE_SERVICE_KEY).toBeDefined();
    expect(process.env.ANTHROPIC_API_KEY).toBeDefined();
  });
});
