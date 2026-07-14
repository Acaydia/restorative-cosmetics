/**
 * Knowledge Hub Router
 * tRPC procedures for querying the ProDream Academy knowledge base
 */

import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

let supabase: ReturnType<typeof createClient> | null = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export interface KnowledgeEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  source: string;
  tags: string[];
  featured?: boolean;
  created_at: string;
}

export const knowledgeRouter = router({
  /**
   * Search knowledge base by query
   */
  search: publicProcedure
    .input(
      z.object({
        query: z.string().min(1).max(200),
        limit: z.number().int().min(1).max(50).default(10),
      })
    )
    .query(async ({ input }) => {
      if (!supabase) {
        return {
          success: false,
          data: [],
          error: "Knowledge base not available",
        };
      }

      try {
        const { data, error } = await supabase
          .from("knowledge_entries")
          .select("*")
          .or(
            `title.ilike.%${input.query}%,content.ilike.%${input.query}%,tags.cs.{${input.query}}`
          )
          .limit(input.limit);

        if (error) {
          console.error("[Knowledge] Search error:", error);
          return {
            success: false,
            data: [],
            error: error.message,
          };
        }

        return {
          success: true,
          data: data || [],
        };
      } catch (error) {
        console.error("[Knowledge] Search failed:", error);
        return {
          success: false,
          data: [],
          error: "Search failed",
        };
      }
    }),

  /**
   * Get knowledge entries by category
   */
  byCategory: publicProcedure
    .input(
      z.object({
        category: z.string().min(1).max(100),
        limit: z.number().int().min(1).max(50).default(20),
      })
    )
    .query(async ({ input }) => {
      if (!supabase) {
        return {
          success: false,
          data: [],
          error: "Knowledge base not available",
        };
      }

      try {
        const { data, error } = await supabase
          .from("knowledge_entries")
          .select("*")
          .eq("category", input.category)
          .order("created_at", { ascending: false })
          .limit(input.limit);

        if (error) {
          console.error("[Knowledge] Category query error:", error);
          return {
            success: false,
            data: [],
            error: error.message,
          };
        }

        return {
          success: true,
          data: data || [],
        };
      } catch (error) {
        console.error("[Knowledge] Category query failed:", error);
        return {
          success: false,
          data: [],
          error: "Query failed",
        };
      }
    }),

  /**
   * Get all available categories
   */
  categories: publicProcedure.query(async () => {
    if (!supabase) {
      return {
        success: false,
        data: [],
        error: "Knowledge base not available",
      };
    }

    try {
      const { data, error } = await supabase
        .from("knowledge_entries")
        .select("category")
        .order("category");

      if (error) {
        console.error("[Knowledge] Categories query error:", error);
        return {
          success: false,
          data: [],
          error: error.message,
        };
      }

      // Get unique categories
      const categories = new Set<string>();
      data?.forEach((d: any) => {
        if (d.category) categories.add(d.category);
      });

      return {
        success: true,
        data: Array.from(categories).sort(),
      };
    } catch (error) {
      console.error("[Knowledge] Categories query failed:", error);
      return {
        success: false,
        data: [],
        error: "Query failed",
      };
    }
  }),

  /**
   * Get featured knowledge entries
   */
  featured: publicProcedure
    .input(
      z.object({
        limit: z.number().int().min(1).max(20).default(5),
      })
    )
    .query(async ({ input }) => {
      if (!supabase) {
        return {
          success: false,
          data: [],
          error: "Knowledge base not available",
        };
      }

      try {
        const { data, error } = await supabase
          .from("knowledge_entries")
          .select("*")
          .eq("featured", true)
          .order("created_at", { ascending: false })
          .limit(input.limit);

        if (error) {
          console.error("[Knowledge] Featured query error:", error);
          return {
            success: false,
            data: [],
            error: error.message,
          };
        }

        return {
          success: true,
          data: data || [],
        };
      } catch (error) {
        console.error("[Knowledge] Featured query failed:", error);
        return {
          success: false,
          data: [],
          error: "Query failed",
        };
      }
    }),

  /**
   * Get single knowledge entry by ID
   */
  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      if (!supabase) {
        return {
          success: false,
          data: null,
          error: "Knowledge base not available",
        };
      }

      try {
        const { data, error } = await supabase
          .from("knowledge_entries")
          .select("*")
          .eq("id", input.id)
          .single();

        if (error) {
          console.error("[Knowledge] Get by ID error:", error);
          return {
            success: false,
            data: null,
            error: error.message,
          };
        }

        return {
          success: true,
          data,
        };
      } catch (error) {
        console.error("[Knowledge] Get by ID failed:", error);
        return {
          success: false,
          data: null,
          error: "Query failed",
        };
      }
    }),

  /**
   * Get knowledge base statistics
   */
  stats: publicProcedure.query(async () => {
    if (!supabase) {
      return {
        success: false,
        data: null,
        error: "Knowledge base not available",
      };
    }

    try {
      // Get total entries
      const { count: totalEntries } = await supabase
        .from("knowledge_entries")
        .select("*", { count: "exact", head: true });

      // Get categories
      const { data: categories } = await supabase
        .from("knowledge_entries")
        .select("category");

      const uniqueCategories = new Set(
        categories?.map((c: any) => c.category).filter(Boolean)
      ).size;

      // Get sources
      const { data: sources } = await supabase
        .from("knowledge_entries")
        .select("source");

      const uniqueSources = new Set(
        sources?.map((s: any) => s.source).filter(Boolean)
      ).size;

      return {
        success: true,
        data: {
          totalEntries: totalEntries || 0,
          categories: uniqueCategories,
          sources: uniqueSources,
          lastUpdated: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error("[Knowledge] Stats query failed:", error);
      return {
        success: false,
        data: null,
        error: "Query failed",
      };
    }
  }),
});
