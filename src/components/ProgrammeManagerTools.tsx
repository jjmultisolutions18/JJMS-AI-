import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, BarChart3, ClipboardCheck, MessageSquare } from 'lucide-react';

interface ProgrammeManagerToolsProps {
  onSelect: (prompt: string) => void;
}

export function ProgrammeManagerTools({ onSelect }: ProgrammeManagerToolsProps) {
  const tools = [
    {
      title: 'Pipeline Report',
      description: 'Generate a summary of innovators across all stages (0-3).',
      icon: BarChart3,
      prompt: 'I am a Programme Manager. Please generate a structured Pipeline Report template that tracks innovators across Stage 0 (Awareness) to Stage 3 (Commercialisation). Include KPIs for conversion between stages.',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Idea Evaluation',
      description: 'Score an innovation based on Innovation, Feasibility, Impact, and Market Potential.',
      icon: ClipboardCheck,
      prompt: 'I need to evaluate an innovation idea. Please provide the scoring criteria (Innovation 30%, Feasibility 25%, Impact 25%, Market Potential 20%) and ask me for the project details to begin the evaluation.',
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Intervention Design',
      description: 'Design workshops or mentorship programmes for specific cohorts.',
      icon: Users,
      prompt: 'I need to design a 4-week intervention for a cohort of innovators stuck at STAGE 1 (Ideation). Suggest a mix of Design Thinking workshops and mentorship sessions.',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Funder Reporting',
      description: 'Generate progress summaries for RISP, TIA, or DTIC.',
      icon: MessageSquare,
      prompt: 'I need to draft a progress report for our funders (e.g., TIA/NCIF). Help me structure the impact section focusing on pipeline growth and economic potential.',
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
      {tools.map((tool, index) => (
        <Card key={index} className="hover:border-orange-200 transition-colors cursor-pointer group" onClick={() => onSelect(tool.prompt)}>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0">
            <div className={`p-3 rounded-lg ${tool.bg} ${tool.color} group-hover:scale-110 transition-transform`}>
              <tool.icon size={24} />
            </div>
            <div>
              <CardTitle className="text-lg">{tool.title}</CardTitle>
              <CardDescription className="text-xs">{tool.description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="w-full justify-between text-xs font-semibold group-hover:text-orange-600">
              Open Tool <LayoutDashboard size={14} />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
