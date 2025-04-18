
import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface QuerySearchProps {
  onSearch: (query: string) => void;
  className?: string;
  placeholder?: string;
}

export function QuerySearch({ 
  onSearch, 
  className,
  placeholder = "Ask anything about your data..."
}: QuerySearchProps) {
  const [query, setQuery] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const exampleQueries = [
    "Show me monthly revenue trends by product category",
    "Compare sales performance across regions",
    "What are my top 5 customers by revenue?",
    "Show customer retention rates over time"
  ];

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="h-14 w-full rounded-full border border-input bg-white pl-10 pr-36 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <Button 
            type="submit" 
            className="absolute right-2 flex items-center gap-2 rounded-full"
          >
            <Sparkles className="h-4 w-4" />
            <span>Generate</span>
          </Button>
        </div>
      </form>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-sm font-medium text-muted-foreground">Try:</span>
        {exampleQueries.map((example, index) => (
          <button
            key={index}
            onClick={() => {
              setQuery(example);
              onSearch(example);
            }}
            className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}
