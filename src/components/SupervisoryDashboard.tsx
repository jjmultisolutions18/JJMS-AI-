import * as React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Wallet, 
  Users, 
  FileCheck2,
  Clock,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

const COLORS = ['#ea580c', '#38bdf8', '#fbbf24', '#4ade80'];

const programmeHealth = [
  { name: 'Agri-Tech Hub', score: 85, budget: 1200000, spent: 980000 },
  { name: 'Digital Lab', score: 92, budget: 850000, spent: 420000 },
  { name: 'Clean Energy', score: 64, budget: 1500000, spent: 1450000 },
];

const pendingApprovals = [
  { id: '1', project: 'Bio-Fertilizer X', type: 'STAGE_PROGRESSION', requester: 'M. Sibiya', date: '2h ago' },
  { id: '2', project: 'Solar Mesh', type: 'FUNDING', requester: 'J. Naidoo', date: '5h ago' },
  { id: '3', project: 'P2P Payments', type: 'STAGE_PROGRESSION', requester: 'P. Zuma', date: '1d ago' },
];

export function SupervisoryDashboard() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Institutional Oversight</h2>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Operational Command Centre</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 text-[10px] uppercase font-bold tracking-tight">
            Export Audit Log
          </Button>
          <Button className="h-8 text-[10px] uppercase font-bold tracking-tight bg-slate-900">
            System Config
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Programmes', value: '12', icon: ShieldCheck, trend: 'All Systems Operational' },
          { label: 'Portfolio Value', value: 'R 8.4M', icon: Wallet, trend: '68% Utilisation' },
          { label: 'Active Innovators', value: '412', icon: Users, trend: '+45 this quarter' },
          { label: 'Pending Gate Reviews', value: '08', icon: AlertTriangle, trend: '3 High Priority', alert: true },
        ].map((stat, i) => (
          <Card key={i} className={`border-slate-200/60 shadow-sm ${stat.alert ? 'border-l-4 border-l-orange-500' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <stat.icon size={16} className={stat.alert ? 'text-orange-500' : 'text-slate-400'} />
              </div>
              <h3 className="text-xl font-mono font-bold text-slate-900">{stat.value}</h3>
              <p className={`text-[9px] font-bold mt-1 uppercase ${stat.alert ? 'text-orange-600' : 'text-slate-400'}`}>
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Programme Health Overview */}
        <Card className="lg:col-span-2 border-slate-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest">Programme Performance Index</CardTitle>
            <CardDescription className="text-xs">Aggregate health scores vs Budget burn</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={programmeHealth} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600 }} width={100} />
                <RechartsTooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="score" fill="#ea580c" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Actionable Approval Queue */}
        <Card className="border-slate-200/60 shadow-sm flex flex-col">
          <CardHeader className="bg-slate-50/50 border-bottom border-slate-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold uppercase tracking-widest">Gate Approvals</CardTitle>
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-100 text-[9px]">
                {pendingApprovals.length} ACTION REQ
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <div className="divide-y divide-slate-100">
              {pendingApprovals.map((req) => (
                <div key={req.id} className="p-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{req.type.replace('_', ' ')}</span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock size={10} /> {req.date}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-orange-600 transition-colors">{req.project}</p>
                  <p className="text-[10px] text-slate-500 mt-1">Requested by <span className="font-semibold">{req.requester}</span></p>
                  <div className="mt-3 flex gap-2 invisible group-hover:visible">
                    <Button size="sm" className="h-7 text-[9px] bg-green-600 hover:bg-green-700 flex-1">Approve</Button>
                    <Button size="sm" variant="outline" className="h-7 text-[9px] flex-1">Reject</Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full h-10 text-[10px] uppercase font-bold text-slate-400 hover:text-slate-900">
              View All Requests <ArrowRight size={12} className="ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Institutional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-slate-200/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xs font-bold uppercase tracking-widest">Sector Diversity</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[{ name: 'Agri', value: 40 }, { name: 'Fintech', value: 25 }, { name: 'Energy', value: 20 }, { name: 'Other', value: 15 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {COLORS.map((color, i) => <Cell key={i} fill={color} />)}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 shadow-sm md:col-span-1 lg:col-span-2">
          <CardHeader>
             <CardTitle className="text-xs font-bold uppercase tracking-widest">Operational Efficiency</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={[
                { month: 'Jan', active: 120, baseline: 100 },
                { month: 'Feb', active: 150, baseline: 110 },
                { month: 'Mar', active: 180, baseline: 120 },
                { month: 'Apr', active: 220, baseline: 130 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" hide />
                <YAxis hide />
                <RechartsTooltip />
                <Area type="monotone" dataKey="active" stroke="#ea580c" fill="#ea580c" fillOpacity={0.1} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
