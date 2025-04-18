
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, LayoutPanelLeft } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardBuilder as Builder } from "@/components/builder/DashboardBuilder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardBuilder() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("My New Dashboard");
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleSave = () => {
    // In a real app, this would save the dashboard to the backend
    navigate("/");
  };

  return (
    <DashboardLayout>
      <div className="container py-6 max-w-7xl animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleGoBack}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-3">
              <LayoutPanelLeft className="h-5 w-5 text-muted-foreground" />
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="font-semibold text-lg border-none focus-visible:ring-0 p-0 h-auto bg-transparent"
              />
            </div>
          </div>
          
          <Button 
            size="sm" 
            className="flex items-center gap-2"
            onClick={handleSave}
          >
            <Save className="h-4 w-4" />
            <span>Save Dashboard</span>
          </Button>
        </div>
        
        <div className="mt-8">
          <Builder />
        </div>
      </div>
    </DashboardLayout>
  );
}
