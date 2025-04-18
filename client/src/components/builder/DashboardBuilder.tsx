
import { useState } from "react";
import { Plus, Trash, Move, Sparkles, LayoutGrid, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChartPreview } from "@/components/visualizations/ChartPreview";

interface BuilderItemProps {
  id: string;
  type: "chart" | "text" | "metric";
  content: any;
  onRemove: (id: string) => void;
}

function BuilderItem({ id, type, content, onRemove }: BuilderItemProps) {
  return (
    <div className="relative group border border-dashed border-border rounded-lg p-6 bg-white">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          size="icon" 
          variant="ghost" 
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => onRemove(id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground">
          <Move className="h-4 w-4" />
        </Button>
      </div>
      
      {type === "chart" && <ChartPreview type={content.chartType} height={250} />}
      
      {type === "text" && (
        <div className="prose max-w-none">
          <h3>{content.title}</h3>
          <p>{content.text}</p>
        </div>
      )}
      
      {type === "metric" && (
        <div className="text-center p-4">
          <p className="text-sm text-muted-foreground">{content.label}</p>
          <p className="text-3xl font-bold mt-2">{content.value}</p>
          {content.description && (
            <p className="text-xs text-muted-foreground mt-1">{content.description}</p>
          )}
        </div>
      )}
    </div>
  );
}

interface DashboardBuilderProps {
  className?: string;
}

export function DashboardBuilder({ className }: DashboardBuilderProps) {
  const [prompt, setPrompt] = useState("");
  const [items, setItems] = useState<BuilderItemProps[]>([
    {
      id: "chart-1",
      type: "chart",
      content: { chartType: "bar" },
      onRemove: () => {},
    },
    {
      id: "text-1",
      type: "text",
      content: { 
        title: "Revenue Analysis", 
        text: "This section provides an overview of monthly revenue trends across different product categories." 
      },
      onRemove: () => {},
    },
    {
      id: "metric-1",
      type: "metric",
      content: { 
        label: "Total Revenue", 
        value: "$124,500", 
        description: "+12.3% from previous period" 
      },
      onRemove: () => {},
    },
  ]);

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddItem = (type: "chart" | "text" | "metric") => {
    const newItem: BuilderItemProps = {
      id: `${type}-${Date.now()}`,
      type,
      content: type === "chart" 
        ? { chartType: "bar" } 
        : type === "text" 
          ? { title: "New Section", text: "Enter your text here" }
          : { label: "Metric", value: "0", description: "Description" },
      onRemove: handleRemoveItem,
    };
    
    setItems([...items, newItem]);
  };

  const handleGenerateFromPrompt = () => {
    if (!prompt) return;
    
    // In a real app, this would call an API to generate dashboard items
    const newItems: BuilderItemProps[] = [
      {
        id: `chart-${Date.now()}`,
        type: "chart",
        content: { chartType: "line" },
        onRemove: handleRemoveItem,
      },
      {
        id: `text-${Date.now()}`,
        type: "text",
        content: { 
          title: "AI Generated Analysis", 
          text: `Analysis based on your prompt: "${prompt}"` 
        },
        onRemove: handleRemoveItem,
      },
    ];
    
    setItems([...items, ...newItems]);
    setPrompt("");
  };

  return (
    <div className={cn("grid gap-6", className)}>
      <div className="flex flex-col gap-3 p-4 border rounded-lg bg-background data-pattern">
        <h3 className="font-medium">Generate Dashboard from Description</h3>
        <p className="text-sm text-muted-foreground">
          Describe what you want to see in your dashboard, and our AI will generate it for you.
        </p>
        
        <div className="flex gap-3 items-start">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="E.g., Create a sales dashboard showing monthly trends, top products, and regional performance"
            className="min-h-[100px] flex-1"
          />
          <Button 
            className="flex-shrink-0 flex items-center gap-2"
            onClick={handleGenerateFromPrompt}
            disabled={!prompt}
          >
            <Sparkles className="h-4 w-4" />
            <span>Generate</span>
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => handleAddItem("chart")}
          >
            <Plus className="h-4 w-4" />
            <span>Add Chart</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => handleAddItem("text")}
          >
            <Plus className="h-4 w-4" />
            <span>Add Text</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => handleAddItem("metric")}
          >
            <Plus className="h-4 w-4" />
            <span>Add Metric</span>
          </Button>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
          >
            <LayoutGrid className="h-4 w-4" />
            <span>Layout</span>
          </Button>
          <Button 
            size="sm" 
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Dashboard</span>
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <BuilderItem
            key={item.id}
            id={item.id}
            type={item.type}
            content={item.content}
            onRemove={handleRemoveItem}
          />
        ))}
      </div>
    </div>
  );
}
