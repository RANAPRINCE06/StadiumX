import { ArrowRight, EyeOff, Eye, BadgeInfo, Key } from 'lucide-react';
import { useState } from 'react';
import { signInWithGoogle } from '../lib/firebase';

const SAMPLE_USERS: Record<string, string> = {
  'admin@StadiumX.com': 'stadiumx123',
  'vip@StadiumX.com': 'vip12345',
};

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signInWithGoogle();
      onLogin();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setIsLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (SAMPLE_USERS[email] && SAMPLE_USERS[email] === password) {
      onLogin();
    } else {
      setError('Invalid credentials. Use admin@StadiumX.com / stadiumx123');
    }
  };

  return (
    <div className="flex w-full min-h-screen relative overflow-hidden bg-surface">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-surface z-0"></div>

      {/* Right Side: 3D Stadium Visual */}
      <div className="absolute lg:relative inset-0 lg:inset-auto lg:w-3/5 lg:h-screen lg:flex lg:items-center lg:justify-center z-0 lg:z-10 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAm8fhO9xvmXkLm1UZeNuwGBtpuUMR94y2PMiPerEYsbCVscs0rWH8Q5Hp8BPAVrfclnnDCvGQnpkZCL6Z0JKeqXsmgNMsTjbOfkYuET4MuSev_zp6A2nnnYXPck_BzeBD9KVOtuhP7wYnCFNHrvgXhkfc6EQE9PHEAyfSafUofSPk48X-fJKZF1RwYVHth-gOKAB7ycOH0cXC-Rv_zlWfzaM9Ok_j8HhSx8umpK10W-4cHiaS7IN2vv-aIqQEJEHrd0NEM8IlaiCA')", opacity: 0.5 }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent lg:hidden"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-surface/40 via-surface/10 to-surface lg:block hidden"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-container/15 rounded-full blur-[120px] pointer-events-none animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-secondary/10 rounded-full blur-[80px] pointer-events-none animate-pulse-glow" style={{ transform: "translate(-50%, -50%)" }}></div>

        {/* Branding Overlay */}
        <div className="relative z-10 hidden lg:flex flex-col items-start p-16 w-full h-full justify-between pointer-events-none">
          <div>
             <h1 className="text-primary font-black text-7xl tracking-tighter drop-shadow-[0_0_30px_rgba(165,231,255,0.6)] animate-pulse-glow">STADIUMX</h1>
             <p className="text-on-surface font-semibold tracking-[0.3em] uppercase mt-4 text-sm drop-shadow-md">The Digital Colosseum</p>
          </div>
          <div className="bg-surface-container-low/40 backdrop-blur-[30px] border border-white/10 p-6 rounded-2xl max-w-md pointer-events-auto shadow-[0_15px_50px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.05)]">
             <p className="text-on-surface text-lg font-medium italic drop-shadow-sm">"Initializing Zenith Engine..."</p>
             <div className="flex items-center gap-3 mt-4">
                <span className="flex h-2 w-2 rounded-full bg-secondary shadow-[0_0_12px_rgba(255,249,239,1)] animate-pulse"></span>
                <span className="text-on-surface text-sm font-bold tracking-widest uppercase">System Online</span>
             </div>
          </div>
        </div>
      </div>

      {/* Left Side: Glassmorphic Login Form */}
      <div className="relative w-full lg:w-2/5 flex flex-col justify-center items-center p-8 sm:p-12 z-20 h-screen lg:bg-surface-container-lowest/80 lg:backdrop-blur-xl bg-transparent">
        <div className="mb-10 text-center lg:hidden">
          <h1 className="text-primary font-black text-5xl tracking-tighter drop-shadow-[0_0_20px_rgba(165,231,255,0.7)]">STADIUMX</h1>
          <p className="text-on-surface font-semibold tracking-[0.2em] uppercase mt-3 text-xs drop-shadow-md">The Digital Colosseum</p>
        </div>

        <div className="w-full max-w-md bg-surface-container-lowest/60 lg:bg-surface-container-lowest/40 backdrop-blur-[40px] rounded-2xl p-8 sm:p-10 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.05)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute top-0 left-0 w-[2px] h-full bg-gradient-to-b from-white/10 to-transparent"></div>
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-[60px] pointer-events-none"></div>

          <div className="mb-8 relative z-10">
            <h2 className="text-on-surface text-3xl font-extrabold tracking-tight mb-2 drop-shadow-sm">Access Portal</h2>
            <p className="text-on-surface-variant text-sm font-medium">Authenticate to access the command center.</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/50 rounded-xl text-error text-sm font-bold relative z-10">
              {error}
            </div>
          )}

          <div className="flex p-1.5 mb-8 bg-surface-container-lowest/80 rounded-xl border border-white/5 relative z-10 shadow-inner">
            <button className="flex-1 py-2 text-sm font-bold tracking-wide rounded-lg bg-surface-container-high text-primary shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-all">
                Organizer
            </button>
            <button className="flex-1 py-2 text-sm font-semibold tracking-wide rounded-lg text-on-surface-variant hover:text-on-surface transition-colors">
                VIP User
            </button>
          </div>

          <form 
             className="space-y-6 relative z-10"
             onSubmit={handleManualSubmit}
          >
            <div className="space-y-2">
              <label className="block text-xs font-bold tracking-[0.15em] uppercase text-on-surface-variant drop-shadow-sm">Secure ID / Email</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-outline group-focus-within:text-primary transition-colors">
                  <BadgeInfo className="w-5 h-5" />
                </span>
                <input 
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@StadiumX.com"
                  required
                  className="w-full bg-surface-container-lowest/80 border border-white/10 text-on-surface rounded-xl py-3 pl-12 pr-4 text-sm font-medium transition-all focus:border-primary/60 focus:bg-surface-container-low focus:outline-none focus:ring-1 focus:ring-primary/60 shadow-inner" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold tracking-[0.15em] uppercase text-on-surface-variant drop-shadow-sm">Authorization Key</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-outline group-focus-within:text-primary transition-colors">
                  <Key className="w-5 h-5" />
                </span>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-surface-container-lowest/80 border border-white/10 text-on-surface rounded-xl py-3 pl-12 pr-12 text-sm font-medium transition-all focus:border-primary/60 focus:bg-surface-container-low focus:outline-none focus:ring-1 focus:ring-primary/60 shadow-inner" 
                />
                <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-outline hover:text-on-surface transition-colors">
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-xs font-mono text-primary/80">
              Demo: <span className="font-bold">admin@StadiumX.com</span> / <span className="font-bold">stadiumx123</span>
            </div>

            <button type="submit" className="w-full py-4 rounded-xl font-black tracking-widest text-on-primary-fixed border border-transparent bg-gradient-to-r from-primary via-primary-container to-primary shadow-[0_0_25px_rgba(165,231,255,0.3)] hover:shadow-[0_0_40px_rgba(165,231,255,0.6)] hover:brightness-125 active:scale-[0.98] transition-all flex items-center justify-center gap-2 bg-[length:200%_auto] hover:bg-right mt-4">
              Log In
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="relative flex items-center py-6 z-10">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-primary text-xs uppercase tracking-widest font-bold drop-shadow-[0_0_8px_rgba(165,231,255,0.4)]">Auth Via Federated ID</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="flex gap-4 relative z-10">
            <button 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex-1 py-4 bg-surface-container-lowest/80 border border-primary/40 rounded-xl flex justify-center items-center hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_20px_rgba(165,231,255,0.2)] transition-all text-on-surface group shadow-inner gap-3"
            >
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                 <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
               </svg>
               <span className="font-bold tracking-wider text-sm uppercase group-hover:text-primary transition-colors">{isLoading ? 'Authenticating...' : 'Google'}</span>
            </button>
          </div>
          
          <div className="mt-8 text-center relative z-10">
            <p className="text-on-surface-variant text-sm font-medium">
               New to the Engine? 
               <button className="text-primary font-bold hover:text-primary-container ml-1 transition-colors drop-shadow-[0_0_5px_rgba(165,231,255,0.3)]">Request Clearance</button>
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 text-center opacity-60 hidden lg:block">
           <p className="text-[10px] font-['Inter'] font-bold tracking-[0.2em] uppercase text-outline drop-shadow-sm">STADIUMX SECURITY PROTOCOL v2.4 • E2E ENCRYPTED</p>
        </div>
      </div>
    </div>
  );
}
