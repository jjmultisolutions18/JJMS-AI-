import * as React from 'react';
import { 
  Lightbulb, 
  FileText, 
  LayoutDashboard, 
  Settings, 
  HelpCircle,
  MapPin,
  Hammer,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from './FirebaseProvider';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { role } = useAuth();
  
  const menuItems = [
    { id: 'chat', label: 'Assistant', icon: LayoutDashboard, roles: ['ADMIN', 'LINE MANAGER', 'PROGRAMME COORDINATOR', 'MENTOR', 'INNOVATOR'] },
    { id: 'innovation', label: 'Innovation Support', icon: Lightbulb, roles: ['ADMIN', 'INNOVATOR'] },
    { id: 'programme', label: 'Programme Management', icon: BarChart3, roles: ['ADMIN', 'LINE MANAGER', 'PROGRAMME COORDINATOR'] },
    { id: 'business', label: 'Business Dev', icon: TrendingUp, roles: ['ADMIN', 'PROGRAMME COORDINATOR', 'MENTOR', 'INNOVATOR'] },
    { id: 'documents', label: 'Documents', icon: FileText, roles: ['ADMIN', 'PROGRAMME COORDINATOR', 'MENTOR', 'INNOVATOR'] },
    { id: 'maker', label: 'Maker Space', icon: Hammer, roles: ['ADMIN', 'MENTOR', 'INNOVATOR'] },
    { id: 'sa-context', label: 'SA Institutions', icon: MapPin, roles: ['ADMIN', 'LINE MANAGER', 'PROGRAMME COORDINATOR', 'MENTOR', 'INNOVATOR'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !role || item.roles.includes(role)
  );

  return (
    <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800">
      <div className="p-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
            <span className="text-white font-black text-xs">JJ</span>
          </div>
          JJMS AI
        </h1>
        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-semibold">
          Innovation Assistant
        </p>
      </div>

      <Separator className="bg-slate-800" />

      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? 'secondary' : 'ghost'}
            className={`w-full justify-start gap-3 ${
              activeTab === item.id 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon size={18} />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
          <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">South Africa Context</p>
          <div className="space-y-1">
            <p className="text-xs text-slate-400">TIA, SEDA, CIPC</p>
            <p className="text-xs text-slate-400">RISP, DTIC</p>
          </div>
        </div>
      </div>

      <Separator className="bg-slate-800" />

      <div className="p-4 flex items-center justify-between">
        <TooltipProvider>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                <Settings size={18} />
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                <HelpCircle size={18} />
              </TooltipTrigger>
              <TooltipContent>Help</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
        <div className="text-[10px] text-slate-600">v1.0.0</div>
      </div>
    </div>
  );
}
