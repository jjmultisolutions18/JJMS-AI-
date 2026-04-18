import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Briefcase, Presentation, FileCheck, Landmark } from 'lucide-react';

interface DocumentToolsProps {
  onSelect: (prompt: string) => void;
}

export function DocumentTools({ onSelect }: DocumentToolsProps) {
  const tools = [
    {
      title: 'Business Plan',
      description: 'Generate a structured business plan for your startup.',
      icon: Briefcase,
      prompt: 'I need a complete, structured Business Plan for my innovation. Please ask me for the necessary details one by one or provide a template I can fill.',
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Pitch Deck Content',
      description: 'Create compelling content for your investor presentation.',
      icon: Presentation,
      prompt: 'I need to create a Pitch Deck. Please provide a slide-by-slide content outline for a 10-slide investor deck based on my innovation.',
      color: 'text-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Funding Application',
      description: 'Draft content for TIA, SEDA, or RISP applications.',
      icon: Landmark,
      prompt: 'I am applying for innovation funding in South Africa (e.g., TIA or SEDA). Help me draft the project description and impact section.',
      color: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    {
      title: 'Proposal / Quotation',
      description: 'Generate professional business proposals for clients.',
      icon: FileCheck,
      prompt: 'I need to generate a professional Business Proposal for a potential client. What information do you need from me to start?',
      color: 'text-green-600',
      bg: 'bg-green-50'
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
              Start Generation <FileText size={14} />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
