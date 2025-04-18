
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  LayoutDashboard, 
  Database, 
  Settings, 
  Puzzle, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Bell,
  UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GenBILogo } from "@/components/GenBILogo";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
}

const mainNavItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    label: "Query Results",
    icon: Search,
    href: "/query-results",
  },
  {
    label: "Dashboard Builder",
    icon: Puzzle,
    href: "/dashboard-builder",
  },
  {
    label: "Data Sources",
    icon: Database,
    href: "/data-sources",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
];

const bottomNavItems: NavItem[] = [
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        <GenBILogo className="mr-2" />
        
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon">
            <Bell className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Notifications</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-8 w-8 p-0 flex">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside 
          className={cn(
            "group fixed z-20 flex h-[calc(100vh-4rem)] flex-col border-r bg-background transition-all duration-300",
            expanded ? "w-[240px]" : "w-[70px] hover:w-[240px]"
          )}
        >
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex justify-end px-3 py-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setExpanded(prev => !prev)}
                className="h-6 w-6"
              >
                {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
              </Button>
            </div>
            
            <nav className="flex flex-col gap-1 px-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                    location.pathname === item.href 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", expanded ? "" : "mx-auto")} />
                  <span className={cn(
                    "whitespace-nowrap transition-all duration-300",
                    expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )}>
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
            
            <div className="mt-auto">
              <nav className="flex flex-col gap-1 px-2 pb-4">
                {bottomNavItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                      location.pathname === item.href 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", expanded ? "" : "mx-auto")} />
                    <span className={cn(
                      "whitespace-nowrap transition-all duration-300",
                      expanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}>
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className={cn(
          "flex-1 overflow-x-hidden transition-all duration-300",
          expanded ? "ml-[240px]" : "ml-[70px]"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
}
