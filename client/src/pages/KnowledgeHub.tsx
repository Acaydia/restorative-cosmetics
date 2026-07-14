import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Search, BookOpen, Tag } from "lucide-react";

interface KnowledgeEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  source: string;
  tags: string[];
  created_at: string;
}

export default function KnowledgeHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<KnowledgeEntry | null>(null);

  // Fetch categories
  const { data: categoriesData, isLoading: categoriesLoading } =
    trpc.knowledge.categories.useQuery();

  // Fetch featured entries
  const { data: featuredData, isLoading: featuredLoading } =
    trpc.knowledge.featured.useQuery({ limit: 5 });

  // Search entries
  const { data: searchData, isLoading: searchLoading } =
    trpc.knowledge.search.useQuery(
      { query: searchQuery, limit: 20 },
      { enabled: searchQuery.length > 0 }
    );

  // Get entries by category
  const { data: categoryData, isLoading: categoryLoading } =
    trpc.knowledge.byCategory.useQuery(
      { category: selectedCategory || "", limit: 20 },
      { enabled: !!selectedCategory }
    );

  // Get knowledge stats
  const { data: statsData } = trpc.knowledge.stats.useQuery();

  // Determine which entries to display
  const displayEntries = useMemo(() => {
    if (searchQuery.length > 0 && searchData?.success) {
      return searchData.data || [];
    }
    if (selectedCategory && categoryData?.success) {
      return categoryData.data || [];
    }
    if (featuredData?.success) {
      return featuredData.data || [];
    }
    return [];
  }, [searchQuery, searchData, selectedCategory, categoryData, featuredData]);

  const isLoading = searchLoading || categoryLoading || featuredLoading;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      {/* Header */}
      <div className="bg-obsidian text-cream py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-kintsugi-gold" />
            <h1 className="text-4xl font-playfair font-bold">Knowledge Hub</h1>
          </div>
          <p className="text-lg text-cream/80 mb-6">
            Learn from industry experts about restorative tattooing, scar camouflage, and healing techniques
          </p>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-kintsugi-gold" />
            <Input
              type="text"
              placeholder="Search knowledge base..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedCategory(null);
              }}
              className="pl-10 py-2 bg-white text-obsidian placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      {statsData?.success && statsData.data && (
        <div className="bg-kintsugi-gold/10 border-b border-kintsugi-gold/20 py-6 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-obsidian">{statsData.data.totalEntries}</div>
              <div className="text-sm text-gray-600">Articles</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-obsidian">{statsData.data.categories}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-obsidian">{statsData.data.sources}</div>
              <div className="text-sm text-gray-600">Expert Sources</div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="border-kintsugi-gold/20">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery("");
                    }}
                  >
                    All Articles
                  </Button>

                  {categoriesLoading ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  ) : (
                    categoriesData?.data?.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => {
                          setSelectedCategory(category);
                          setSearchQuery("");
                        }}
                      >
                        {category}
                      </Button>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-kintsugi-gold" />
              </div>
            ) : selectedEntry ? (
              // Detail View
              <div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedEntry(null)}
                  className="mb-6"
                >
                  ← Back to Results
                </Button>

                <Card className="border-kintsugi-gold/20">
                  <CardHeader>
                    <CardTitle className="text-2xl font-playfair">
                      {selectedEntry.title}
                    </CardTitle>
                    <CardDescription>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs bg-kintsugi-gold/20 text-obsidian px-2 py-1 rounded">
                          {selectedEntry.category}
                        </span>
                        <span className="text-xs bg-rosewood/20 text-rosewood px-2 py-1 rounded">
                          {selectedEntry.source}
                        </span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none mb-6">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {selectedEntry.content}
                      </p>
                    </div>

                    {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedEntry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded flex items-center gap-1"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-gray-500 mt-6 pt-6 border-t">
                      Published: {new Date(selectedEntry.created_at).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : displayEntries.length > 0 ? (
              // List View
              <div className="space-y-4">
                {displayEntries.map((entry: KnowledgeEntry) => (
                  <Card
                    key={entry.id}
                    className="border-kintsugi-gold/20 hover:border-kintsugi-gold/50 cursor-pointer transition-colors"
                    onClick={() => setSelectedEntry(entry)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg font-playfair hover:text-kintsugi-gold transition-colors">
                        {entry.title}
                      </CardTitle>
                      <CardDescription className="flex flex-wrap gap-2 mt-2">
                        <span className="text-xs bg-kintsugi-gold/20 text-obsidian px-2 py-1 rounded">
                          {entry.category}
                        </span>
                        <span className="text-xs bg-rosewood/20 text-rosewood px-2 py-1 rounded">
                          {entry.source}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 line-clamp-2 mb-3">
                        {entry.content}
                      </p>
                      <Button
                        variant="link"
                        className="text-kintsugi-gold hover:text-kintsugi-gold/80 p-0"
                      >
                        Read More →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              // Empty State
              <Card className="border-kintsugi-gold/20 text-center py-12">
                <BookOpen className="w-12 h-12 text-kintsugi-gold/30 mx-auto mb-4" />
                <p className="text-gray-600">
                  {searchQuery
                    ? "No articles found matching your search."
                    : "No articles available yet. Check back soon!"}
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
