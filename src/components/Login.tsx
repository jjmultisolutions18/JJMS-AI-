import * as React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LogIn, 
  Shield, 
  Users, 
  Lightbulb, 
  TrendingUp, 
  LayoutDashboard 
} from 'lucide-react';

const roles = [
  { id: 'INNOVATOR', label: 'Innovator', icon: Lightbulb, color: 'text-orange-600', desc: 'Manage projects' },
  { id: 'COORDINATOR', label: 'Coordinator', icon: LayoutDashboard, color: 'text-blue-600', desc: 'Oversee cohorts' },
  { id: 'MANAGER', label: 'Manager', icon: TrendingUp, color: 'text-green-600', desc: 'Approve gates' },
  { id: 'ADMIN', label: 'Admin', icon: Shield, color: 'text-slate-900', desc: 'System governance' },
];

export function Login() {
  const [loading, setLoading] = React.useState(false);
  const [selectedRole, setSelectedRole] = React.useState('INNOVATOR');

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: selectedRole,
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0F2F5] p-4 font-sans">
      <div className="max-w-lg w-full">
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 bg-slate-900 flex items-center justify-center rounded-xl shadow-xl transform -rotate-6">
            <span className="text-white font-black text-2xl">IC</span>
          </div>
        </div>
        
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden">
          <CardHeader className="text-center bg-slate-50/50 border-b border-slate-100 p-8">
            <CardTitle className="text-2xl font-bold text-slate-900 tracking-tight">Innovation Command Centre</CardTitle>
            <CardDescription className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
              South Africa Institutional Ops
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Select Access Rail</p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {roles.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left ${
                    selectedRole === r.id 
                    ? 'border-slate-900 bg-slate-50 ring-2 ring-slate-900/5' 
                    : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <r.icon size={20} className={`${r.color} mb-2`} />
                  <span className="text-xs font-bold text-slate-900">{r.label}</span>
                  <span className="text-[9px] text-slate-400">{r.desc}</span>
                </button>
              ))}
            </div>

            <Button 
              onClick={handleGoogleLogin} 
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-xl transition-all shadow-lg shadow-slate-900/20"
            >
              {loading ? 'Validating Instance...' : 'Enter Hub Dashboard'}
            </Button>
            
            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Shield size={10} /> ISO 27001 COMPLIANT
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                v2.4.0-COMM-CENTRE
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
