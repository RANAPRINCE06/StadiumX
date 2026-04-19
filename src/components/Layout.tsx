import { ReactNode } from 'react';
import { cn } from '../lib/utils';
import {
  Bell,
  Settings,
  LayoutDashboard,
  Radio,
  Users,
  CreditCard,
  ShieldAlert,
  HelpCircle,
  LogOut
} from 'lucide-react';
import GlobalAlert from './GlobalAlert';

interface LayoutProps {
  children: ReactNode;
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
  user?: any;
  onLogout?: () => void;
}

export default function Layout({ children, currentScreen, setCurrentScreen, user, onLogout }: LayoutProps) {
  // Hide top/side nav entirely if on 'home' screen
  if (currentScreen === 'home') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      {/* Global Alert System Overlay */}
      <GlobalAlert />

      {/* Top Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 bg-zinc-950/60 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,210,255,0.1)] border-b border-white/5 md:pl-72">
        <div className="flex items-center gap-6 md:gap-12 pl-4 md:pl-0">
          <div 
            className="text-2xl font-black tracking-tighter text-white drop-shadow-[0_0_8px_rgba(0,210,255,0.5)] md:hidden cursor-pointer flex items-center gap-2"
            onClick={() => setCurrentScreen('home')}
          >
            <ShieldAlert className="w-6 h-6 text-cyan-400" />
            STADIUMX
          </div>
          <nav className="hidden lg:flex gap-8 font-['Inter'] tracking-tight font-bold uppercase text-sm">
             <button
              onClick={() => setCurrentScreen('map')}
              className={cn("hover:text-white transition-colors relative pb-1", currentScreen === 'map' ? "text-cyan-400 border-b-2 border-cyan-400" : "text-zinc-500")}
            >
              Venues
            </button>
            <button
              onClick={() => setCurrentScreen('live')}
              className={cn("hover:text-white transition-colors relative pb-1", currentScreen === 'live' ? "text-cyan-400 border-b-2 border-cyan-400" : "text-zinc-500")}
            >
              Live Feed
            </button>
            <button
              onClick={() => setCurrentScreen('canteen')}
              className={cn("hover:text-white transition-colors relative pb-1", currentScreen === 'canteen' ? "text-cyan-400 border-b-2 border-cyan-400" : "text-zinc-500")}
            >
              Digital Canteen
            </button>
            <button
              onClick={() => setCurrentScreen('zenith')}
              className={cn("hover:text-white transition-colors relative pb-1", currentScreen === 'zenith' ? "text-cyan-400 border-b-2 border-cyan-400" : "text-zinc-500")}
            >
              VIP Access
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-4 text-zinc-400 items-center">
            <button onClick={() => setCurrentScreen('live')} className="hover:text-cyan-400 transition-colors relative">
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full animate-pulse"></span>
              <Bell className="w-5 h-5" />
            </button>
            <button onClick={() => setCurrentScreen('zenith')} className="hover:text-cyan-400 transition-colors hidden md:block">
              <Settings className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-row items-center gap-4 pl-6 border-l border-white/10">
            <div className="hidden sm:flex flex-col items-end">
               <span className="text-xs font-bold text-white uppercase tracking-wider">{user?.displayName || 'ADMIN 01'}</span>
               <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-mono">SYS_OP</span>
            </div>
            <div className="w-9 h-9 rounded bg-surface-container-high border border-outline-variant/30 overflow-hidden flex-shrink-0 cursor-pointer transition-transform duration-200">
              <img alt="Profile" className="w-full h-full object-cover" src={user?.photoURL || "https://lh3.googleusercontent.com/aida-public/AB6AXuBWOX0E_WAgSKha-j1B8MC_jRkMY2XiUJWxC1aXhRtRhPm8Isz_vp6FS9j72sPy_c2Vq3FCri1MGfsN4DXdMNZNCWCZAVQIODShdfyB1xxD18sIg6tpJmOKFObma-SF2vVBqPT_tEdrcV9KljOcCOKdOUAWyQnebxSNA0aahERaRFE-tUNKsgFqcTf8Wnbn-TgdRBxCAn_q_34Cl8xcJB1iFBeZa78S5-appdLkva5nKU7Q6plxLrzR4Asl-_8jEiL7zVs7XQKGw6w"} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-b from-cyan-500/10 to-transparent h-[1px]"></div>
      </header>

      {/* SideNavBar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen flex-col pt-20 pb-8 bg-zinc-900/80 backdrop-blur-2xl w-64 border-r border-white/5 shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-40">
        <div className="px-6 py-6 flex flex-col gap-2">
            <div 
              className="text-cyan-400 font-black text-2xl tracking-tighter cursor-pointer flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,210,255,0.5)]"
              onClick={() => setCurrentScreen('home')}
            >
              <ShieldAlert className="w-6 h-6" />
              STADIUMX
            </div>
            <div className="text-[10px] text-zinc-500 font-['Inter'] font-semibold tracking-widest uppercase ml-8 mt-1">ZENITH ENGINE</div>
        </div>
        
        <nav className="flex-1 flex flex-col mt-4 font-['Inter'] text-xs font-semibold tracking-widest uppercase">
          <button
            onClick={() => setCurrentScreen('zenith')} // Zenith Command maps well here
            className={cn(
              "px-6 py-4 flex items-center gap-4 transition-all duration-300 group",
              currentScreen === 'zenith' ? "bg-cyan-500/10 text-cyan-400 border-r-4 border-cyan-400 shadow-[inset_0_0_20px_rgba(0,210,255,0.1)]" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
            )}
          >
            <LayoutDashboard className={cn("w-5 h-5", currentScreen !== 'zenith' && "group-hover:translate-x-1 transition-transform")} />
            Command Center
          </button>
          
          <button
            onClick={() => setCurrentScreen('map')} 
            className={cn(
              "px-6 py-4 flex items-center gap-4 transition-all duration-300 group",
              currentScreen === 'map' ? "bg-cyan-500/10 text-cyan-400 border-r-4 border-cyan-400 shadow-[inset_0_0_20px_rgba(0,210,255,0.1)]" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
            )}
          >
            <Radio className={cn("w-5 h-5", currentScreen !== 'map' && "group-hover:translate-x-1 transition-transform")} />
            Venue Health
          </button>
          
          <button
            onClick={() => setCurrentScreen('nav')}
            className={cn(
              "px-6 py-4 flex items-center gap-4 transition-all duration-300 group",
              currentScreen === 'nav' ? "bg-cyan-500/10 text-cyan-400 border-r-4 border-cyan-400 shadow-[inset_0_0_20px_rgba(0,210,255,0.1)]" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
            )}
          >
            <Users className={cn("w-5 h-5", currentScreen !== 'nav' && "group-hover:translate-x-1 transition-transform")} />
            Crowd Dynamics
          </button>

          <button
             onClick={() => setCurrentScreen('canteen')}
            className={cn(
              "px-6 py-4 flex items-center gap-4 transition-all duration-300 group",
               currentScreen === 'canteen' ? "bg-cyan-500/10 text-cyan-400 border-r-4 border-cyan-400 shadow-[inset_0_0_20px_rgba(0,210,255,0.1)]" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
            )}
          >
            <CreditCard className={cn("w-5 h-5", currentScreen !== 'canteen' && "group-hover:translate-x-1 transition-transform")} />
            Revenue
          </button>
          
          <button
             onClick={() => setCurrentScreen('live')}
             className={cn(
              "px-6 py-4 flex items-center gap-4 transition-all duration-300 group",
              currentScreen === 'live' ? "bg-cyan-500/10 text-cyan-400 border-r-4 border-cyan-400 shadow-[inset_0_0_20px_rgba(0,210,255,0.1)]" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
            )}
          >
           <ShieldAlert className={cn("w-5 h-5", currentScreen !== 'live' && "group-hover:translate-x-1 transition-transform")} />
            Security
          </button>
        </nav>
        
        <div className="px-6 mt-auto flex flex-col gap-4">
          <button className="w-full py-3 rounded-xl bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-xs tracking-widest uppercase hover:brightness-125 transition-all duration-300 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
            UPGRADE TO PRO
          </button>
          <div className="flex flex-col font-['Inter'] text-xs font-semibold tracking-widest uppercase mt-4">
            <button 
              onClick={() => setCurrentScreen('support')}
              className={cn("px-0 py-3 flex items-center gap-4 transition-all duration-300 group w-full text-left", currentScreen === 'support' ? "text-cyan-400" : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5")}
            >
              <HelpCircle className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              Support
            </button>
            <button 
              onClick={onLogout}
              className="text-zinc-500 hover:text-zinc-200 px-0 py-3 flex items-center gap-4 hover:bg-white/5 transition-all duration-300 group w-full text-left"
            >
              <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-0 md:ml-64 h-full relative overflow-y-auto overflow-x-hidden pt-[72px]">
        {children}
      </main>
    </div>
  );
}
