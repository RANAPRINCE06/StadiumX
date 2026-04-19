/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import Login from './screens/Login';
import Home from './screens/Home';
import GlobalMap from './screens/GlobalMap';
import ZenithCommand from './screens/ZenithCommand';
import LiveDashboard from './screens/LiveDashboard';
import NavigationRoute from './screens/NavigationRoute';
import DigitalCanteen from './screens/DigitalCanteen';
import Support from './screens/Support';
import { onAuthStateChange, signOut } from './lib/firebase';
import { ensureUserProfile } from './lib/db';
import { User } from 'firebase/auth';

const MOCK_USER = {
  uid: 'sample-user-001',
  email: 'admin@StadiumX.com',
  displayName: 'Admin User',
  photoURL: null,
} as unknown as User;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const isLoggedIn = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await ensureUserProfile(firebaseUser);
        if (!isLoggedIn.current) {
          isLoggedIn.current = true;
          setCurrentScreen('home');
        }
      } else {
        isLoggedIn.current = false;
        setCurrentScreen('login');
      }
      setIsInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setUser(MOCK_USER);
    setCurrentScreen('home');
    isLoggedIn.current = true;
  };

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    isLoggedIn.current = false;
    setCurrentScreen('login');
  };

  if (isInitializing) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
       <span className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></span>
    </div>;
  }

  if (currentScreen === 'login' || !user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} user={user} onLogout={handleLogout}>
      {currentScreen === 'home' && <Home setCurrentScreen={setCurrentScreen} />}
      {currentScreen === 'map' && <GlobalMap />}
      {currentScreen === 'zenith' && <ZenithCommand user={user} />}
      {currentScreen === 'live' && <LiveDashboard />}
      {currentScreen === 'nav' && <NavigationRoute />}
      {currentScreen === 'canteen' && <DigitalCanteen user={user} />}
      {currentScreen === 'support' && <Support />}
    </Layout>
  );
}
