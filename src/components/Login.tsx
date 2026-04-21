import * as React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

export function Login() {
  const [loading, setLoading] = React.useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Create user profile if it doesn't exist
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: 'INNOVATOR', // Default role
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
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center transform rotate-12">
              <span className="text-white font-black text-xl">JJ</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">JJMS Innovation System AI</CardTitle>
          <CardDescription>
            South Africa's professional innovation management platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button 
            onClick={handleGoogleLogin} 
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white gap-3 py-6"
          >
            <LogIn size={20} />
            {loading ? 'Authenticating...' : 'Sign in with Google'}
          </Button>
          <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-semibold">
            Secure Innovation Portal
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
