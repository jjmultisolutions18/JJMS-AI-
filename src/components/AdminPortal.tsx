import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  UserCog, 
  Activity, 
  Settings2, 
  Search, 
  Filter,
  Save,
  RotateCcw,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export function AdminPortal() {
  const [users] = React.useState([
    { id: 'u1', name: 'Dr. Sarah Khumalo', email: 's.khumalo@uni.ac.za', role: 'MANAGER', dept: 'Tech Transfer' },
    { id: 'u2', name: 'Mark Jansen', email: 'm.jansen@hub.org', role: 'COORDINATOR', dept: 'Incubation' },
    { id: 'u3', name: 'Leo Maphosa', email: 'l.maphosa@innovate.co', role: 'INNOVATOR', dept: 'Agri-Tech' },
    { id: 'u4', name: 'Nomsa Dlamini', email: 'n.dlamini@uni.ac.za', role: 'MENTOR', dept: 'Business School' },
  ]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">System Administration</h2>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">Platform Governance & Access</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-8 text-[10px] uppercase font-bold tracking-tight">
            <Activity size={14} className="mr-2" /> View All Logs
          </Button>
          <Button className="h-8 text-[10px] uppercase font-bold tracking-tight bg-orange-600">
            <Save size={14} className="mr-2" /> Commit Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* User Management Table */}
        <Card className="lg:col-span-3 border-slate-200/60 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-100 bg-slate-50/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-widest">User Directory</CardTitle>
                <CardDescription className="text-[10px]">Manage institutional roles and access levels</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <Input 
                    placeholder="Search users..." 
                    className="h-8 pl-8 text-xs w-[200px] bg-white"
                  />
                </div>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Filter size={14} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Department</th>
                    <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-slate-900">{user.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{user.email}</span>
                        </div>
                      </td>
                      <td className="p-4 text-xs">
                        <Badge variant="outline" className={`text-[9px] font-bold uppercase border-slate-200 ${
                          user.role === 'MANAGER' ? 'bg-orange-50 text-orange-700' :
                          user.role === 'ADMIN' ? 'bg-slate-900 text-white' :
                          user.role === 'COORDINATOR' ? 'bg-blue-50 text-blue-700' :
                          'bg-slate-50 text-slate-700'
                        }`}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4 text-xs text-slate-600 font-medium">{user.dept}</td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-slate-400 hover:text-orange-600">
                          <UserCog size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Global System Settings */}
        <div className="space-y-6">
          <Card className="border-slate-200/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-slate-900">
                <Settings2 size={14} className="text-orange-600" /> System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Database Auth', status: 'Online', icon: CheckCircle2, color: 'text-green-600' },
                { label: 'Gemini AI Inference', status: 'Optimal', icon: CheckCircle2, color: 'text-green-600' },
                { label: 'Firestore Sync', status: '34ms Latency', icon: CheckCircle2, color: 'text-green-600' },
                { label: 'API Rate Limits', status: '24% used', icon: Activity, color: 'text-blue-600' },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">{setting.label}</span>
                    <span className={`text-[10px] font-bold ${setting.color}`}>{setting.status}</span>
                  </div>
                  <setting.icon size={14} className={setting.color} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 shadow-sm bg-slate-900 text-slate-100">
            <CardHeader>
              <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Security Snapshot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 mb-3 border border-slate-700">
                  <Shield size={24} className="text-orange-500" />
                </div>
                <p className="text-2xl font-mono font-bold">2.4k</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Authenticated Events / 24h</p>
              </div>
              <Button className="w-full h-8 text-[9px] uppercase font-bold bg-orange-600 hover:bg-orange-700">
                 Harden Rules
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
