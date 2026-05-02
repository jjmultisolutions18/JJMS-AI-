import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  FileSearch
} from 'lucide-react';

interface ProjectDashboardProps {
  onSelect: (prompt: string) => void;
}

export function ProjectDashboard({ onSelect }: ProjectDashboardProps) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Welcome & Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Innovation Portfolio</h2>
          <p className="text-sm text-slate-500">Track and manage your active innovation projects.</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 gap-2" onClick={() => onSelect('I want to start a new innovation project.')}>
          <Lightbulb size={18} /> New Innovation
        </Button>
      </div>

      {/* Active Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-slate-200/60 shadow-sm overflow-hidden border-l-4 border-l-orange-500">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex gap-2">
                <span className="px-2 py-0.5 bg-orange-50 text-orange-700 text-[10px] font-bold rounded uppercase tracking-tight border border-orange-100">Stage 1: Ideation</span>
                <span className="px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold rounded uppercase tracking-tight border border-green-100">Active</span>
              </div>
              <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                <Clock size={10} /> Updated 2d ago
              </span>
            </div>
            <CardTitle className="text-lg mt-3 font-bold text-slate-900 tracking-tight">Solar-Powered Irrigation</CardTitle>
            <CardDescription className="text-xs line-clamp-2 leading-relaxed">
              Sustainable high-efficiency water management solution for small-scale farmers in rural South Africa.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gate Review Score</p>
                <div className="flex items-center gap-2 mt-1">
                   <p className="text-lg font-mono font-bold text-slate-900">72%</p>
                   <span className="text-[10px] text-green-600 font-bold">+5% increase</span>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assigned Mentor</p>
                <p className="text-xs font-bold text-slate-700 mt-1">Dr. S. Khumalo</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
               <AlertCircle size={14} className="text-orange-600 shrink-0 mt-0.5" />
               <p className="text-[10px] text-slate-600 leading-normal">
                 <span className="font-bold text-slate-900">Next Milestone:</span> Submit your technical Business Plan for Supervisor approval to transition to Stage 2.
               </p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 text-[10px] font-bold uppercase tracking-tight h-9 border-slate-200" onClick={() => onSelect('I want to request a formal Gate Review for my project to move to the next stage.')}>
                Request Gate Review
              </Button>
              <Button size="sm" className="flex-1 text-[10px] font-bold uppercase tracking-tight h-9 bg-slate-900 shadow-lg shadow-slate-900/10" onClick={() => onSelect('I want to submit my Technical Business Plan for approval.')}>
                Open Submission
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Empty/Draft Slot */}
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 hover:border-orange-200 transition-all cursor-pointer bg-slate-50/50" onClick={() => onSelect('I have a rough idea for a manufacturing innovation. Help me structure it.')}>
          <div className="p-3 bg-white rounded-full shadow-sm mb-3">
            <TrendingUp size={24} className="text-slate-400" />
          </div>
          <p className="font-bold text-slate-900">Add New Draft</p>
          <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Have a rough concept? Click to start the Stage 0 classification.</p>
        </div>
      </div>

      {/* Suggested Actions */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Recommended Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: 'Business Model Canvas', icon: FileSearch, prompt: 'Help me create a Business Model Canvas for my irrigation project.' },
            { title: 'Technical Mentorship', icon: MessageSquare, prompt: 'I need a mentor to help with the Technical PoC of my irrigation project.' },
            { title: 'Stage 2 Requirements', icon: CheckCircle2, prompt: 'What specific documentation do I need to move from Ideation to Tech Development?' }
          ].map((action, i) => (
            <div 
              key={i} 
              className="p-4 bg-white border border-slate-200 rounded-lg hover:border-orange-500 transition-colors cursor-pointer group flex items-start gap-3"
              onClick={() => onSelect(action.prompt)}
            >
              <div className="p-2 bg-slate-50 rounded text-slate-400 group-hover:text-orange-600 transition-colors">
                <action.icon size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{action.title}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Click to launch assistant</p>
              </div>
              <ArrowRight size={14} className="ml-auto text-slate-300 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
