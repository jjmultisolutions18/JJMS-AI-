import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { InnovationStage } from '@/src/types';
import { Send, Lightbulb } from 'lucide-react';

interface InnovationFormProps {
  onSubmit: (prompt: string) => void;
}

export function InnovationForm({ onSubmit }: InnovationFormProps) {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    problem: '',
    targetMarket: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = `I have an innovation idea.
Title: ${formData.title}
Description: ${formData.description}
Problem being solved: ${formData.problem}
Target Market: ${formData.targetMarket}

Please provide a structured analysis including:
1. Simple Description
2. Problem Being Solved
3. Proposed Solution
4. Target Market
5. Unique Value Proposition
6. Suggested Business Model
7. Innovation Stage Classification (Stage 0–3)
8. Recommended Next Steps (VERY PRACTICAL)
9. Suggested Tools / Support (Maker space, Digital, Training)`;
    
    onSubmit(prompt);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-slate-200 shadow-sm">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center gap-2 text-orange-600 mb-1">
          <Lightbulb size={20} />
          <span className="text-xs font-bold uppercase tracking-wider">Innovation Support</span>
        </div>
        <CardTitle className="text-2xl font-bold text-slate-900">Refine Your Idea</CardTitle>
        <CardDescription>
          Provide some basic details about your innovation, and JJMS AI will help you structure it professionally.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Idea Title</label>
            <Input 
              placeholder="e.g., Solar-Powered Irrigation System" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Problem Statement</label>
            <Textarea 
              placeholder="What specific challenge are you addressing in the South African context?" 
              value={formData.problem}
              onChange={(e) => setFormData({...formData, problem: e.target.value})}
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Description of Solution</label>
            <Textarea 
              placeholder="How does your innovation work?" 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Target Market</label>
            <Input 
              placeholder="e.g., Small-scale farmers in Limpopo" 
              value={formData.targetMarket}
              onChange={(e) => setFormData({...formData, targetMarket: e.target.value})}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 gap-2">
            Analyze with JJMS AI <Send size={16} />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
