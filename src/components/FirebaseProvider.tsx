import * as React from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserRole } from '../types';

interface AuthContextType {
  user: FirebaseUser | null;
  role: UserRole | null;
  loading: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
});

export const useAuth = () => React.useContext(AuthContext);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<FirebaseUser | null>(null);
  const [role, setRole] = React.useState<UserRole | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setRole(userDoc.data().role as UserRole);
          } else {
            // Default role for new users who haven't been provisioned yet
            // In a real app, this might trigger a registration flow
            setRole('INNOVATOR');
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setRole(null);
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
