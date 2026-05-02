import * as React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Target, 
  Zap, 
  TrendingUp, 
  ArrowUpRight, 
  History,
  LayoutDashboard,
  ClipboardCheck,
  Plus,
  DollarSign,
  Wallet,
  BarChart3
} from 'lucide-react';

const pipelineData = [
  { stage: 'Stage 0', value: 124, name: 'Pipeline' },
  { stage: 'Stage 1', value: 85, name: 'Ideation' },
  { stage: 'Stage 2', value: 42, name: 'Tech Dev' },
  { stage: 'Stage 3', value: 18, name: 'Comm.' },
];

const sectorData = [
  { name: 'Agri-Tech', value: 400 },
  { name: 'Digital', value: 300 },
  { name: 'Energy', value: 300 },
  { name: 'Manufacturing', value: 200 },
];

const budgetData = [
  { month: 'Jan', allocated: 4500, spent: 3800 },
  { month: 'Feb', allocated: 5200, spent: 4100 },
  { month: 'Mar', allocated: 4800, spent: 4800 },
  { month: 'Apr', allocated: 6100, spent: 5200 },
];

const COLORS = ['#ea580c', '#f97316', '#fb923c', '#fdba74'];

interface ProgrammeDashboardProps {
  onSelect: (prompt: string) => void;
}

export function ProgrammeDashboard({ onSelect }: ProgrammeDashboardProps) {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Innovators', value: '269', icon: Users, trend: '+12% from last month' },
          { label: 'Active Programmes', value: '14', icon: Target, trend: '2 starting this week' },
          { label: 'Evaluations Done', value: '842', icon: ClipboardCheck, trend: '98% on target' },
          { label: 'Success Rate', value: '24%', icon: TrendingUp, trend: '+3.2% optimization' },
        ].map((stat, i) => (
          <Card key={i} className="border-slate-200/60 shadow-sm overflow-hidden group">
            <CardContent className="p-0">
              <div className="p-5 flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  <h3 className="text-2xl font-mono font-bold mt-1 text-slate-900">{stat.value}</h3>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-orange-600 transition-colors">
                  <stat.icon size={20} />
                </div>
              </div>
              <div className="px-5 py-2 bg-slate-50/50 border-t border-slate-100 flex items-center gap-1.5">
                <ArrowUpRight size={12} className="text-green-600" />
                <span className="text-[10px] font-medium text-slate-500">{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Visualization */}
        <Card className="lg:col-span-2 border-slate-200/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Innovation Pipeline Distribution</CardTitle>
              <CardDescription className="text-xs">Active projects across Stage 0 to Stage 3</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs gap-2" onClick={() => onSelect('Generate a detailed pipeline status report.')}>
              <BarChart3 size={14} /> Full Report
            </Button>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="stage" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontFamily: 'monospace', fill: '#94a3b8' }} 
                />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#ea580c" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                  className="hover:fill-orange-500 transition-colors"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Budget Track */}
        <Card className="border-slate-200/60 shadow-sm">
          <CardHeader>
             <div className="flex items-center justify-between">
              <CardTitle className="text-base">Budget Utilisation</CardTitle>
              <Wallet size={16} className="text-slate-400" />
            </div>
            <CardDescription className="text-xs">Allocated vs Actual spend (R)</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={budgetData}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 9 }} />
                <YAxis hide />
                <RechartsTooltip />
                <Area type="monotone" dataKey="spent" stroke="#ea580c" fillOpacity={1} fill="url(#colorSpent)" strokeWidth={2} />
                <Area type="monotone" dataKey="allocated" stroke="#cbd5e1" fill="transparent" strokeWidth={1} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-slate-50 rounded-lg flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Available</p>
                <p className="text-sm font-mono font-bold text-slate-900">R 1.2M</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Burn Rate</p>
                <p className="text-sm font-mono font-bold text-orange-600">82%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actionable Tools Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
          <Zap size={16} className="text-orange-600" /> 
          Operational Workflows
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Stage Progression', icon: ArrowUpRight, prompt: 'Generate a stage progression request for a project. Ask me for the project name, target stage, and technical justification.' },
            { title: 'New Evaluation', icon: Plus, prompt: 'I want to perform a new idea evaluation. Start by asking for the project name and sector.' },
            { title: 'Cohort Brief', icon: ClipboardCheck, prompt: 'Generate a briefing document for a new cohort of Stage 1 innovators.' },
            { title: 'Funder Update', icon: History, prompt: 'Draft a monthly funder update summarizing pipeline movement and impact KPIs.' },
          ].map((action, i) => (
            <Button 
              key={i} 
              variant="outline" 
              className="h-auto py-4 px-4 flex flex-col items-center gap-2 border-slate-200 hover:border-orange-600 hover:bg-orange-50/30 group transition-all"
              onClick={() => onSelect(action.prompt)}
            >
              <div className="p-2 bg-slate-50 rounded-full group-hover:bg-white group-hover:text-orange-600 transition-colors">
                <action.icon size={18} />
              </div>
              <span className="text-xs font-bold uppercase tracking-tight text-slate-700">{action.title}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
