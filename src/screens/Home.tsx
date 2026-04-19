import { ArrowRight, Search, Bell, Settings, TrendingUp, ShieldAlert } from 'lucide-react';

export default function Home({ setCurrentScreen }: { setCurrentScreen: (screen: string) => void }) {
  return (
    <div className="flex-1 relative z-10 w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-background pt-16">
      
      {/* Top Navigation Overlay */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-10 py-5 bg-black/40 backdrop-blur-2xl border-b border-white/5">
        <div className="flex items-center gap-10">
          <div className="text-3xl font-black tracking-tighter text-white drop-shadow-[0_0_12px_rgba(0,255,255,0.7)] flex items-center gap-2 cursor-pointer" onClick={() => setCurrentScreen('home')}>
             <ShieldAlert className="w-8 h-8 text-cyan-400" />
             STADIUMX
          </div>
          <div className="hidden md:flex gap-8">
            <button onClick={() => setCurrentScreen('map')} className="text-xs tracking-[0.15em] font-bold uppercase text-cyan-400 border-b border-cyan-400 pb-2 transition-all duration-300">Venues</button>
            <button onClick={() => setCurrentScreen('live')} className="text-xs tracking-[0.15em] font-bold uppercase text-zinc-500 hover:text-white transition-all duration-300 pb-2">Live Feed</button>
            <button onClick={() => setCurrentScreen('canteen')} className="text-xs tracking-[0.15em] font-bold uppercase text-zinc-500 hover:text-white transition-all duration-300 pb-2">Analytics</button>
            <button onClick={() => setCurrentScreen('zenith')} className="text-xs tracking-[0.15em] font-bold uppercase text-zinc-500 hover:text-white transition-all duration-300 pb-2">VIP Access</button>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center bg-white/5 rounded-full px-5 py-2.5 border border-white/10 hover:border-white/20 transition-colors">
            <Search className="text-zinc-400 w-4 h-4 mr-3" />
            <input type="text" placeholder="Search Global Venues..." onKeyDown={(e) => { if(e.key === 'Enter') setCurrentScreen('map'); }} className="bg-transparent border-none text-sm text-white focus:ring-0 placeholder-zinc-600 w-56 outline-none" />
          </div>
          <button className="text-zinc-500 hover:text-white transition-colors" onClick={() => setCurrentScreen('live')}>
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-zinc-500 hover:text-white transition-colors" onClick={() => setCurrentScreen('support')}>
            <Settings className="w-5 h-5" />
          </button>
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH0is4MksPlgTnvsZWEWeW6bPF6PXhI_Aw9Jdugh7ttmvsYHegBcGtaBVWPF9zZsjeTwLTWLLyGKdescLlc-w3EmaACQF9cJsOMFEoZGLULsaOrGve6Hfh-6N3PMua_O2Aj8Wo0AtBWhDiPz-Ga5CWJuePPkx_RImhNoxd3F6_j001xrGGzdlOTLQ73jFQp1eP8q9AwLZdjjdjjsqQQfHcaFvHC3865xVSDEcPm-wIWM_OjfoahkB4ku34SyKfIrNoXVpax3FDY0w" alt="Admin" className="relative w-9 h-9 rounded-full border border-white/10 object-cover" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent h-[1px]"></div>
      </nav>

      {/* Animated World Map Background */}
      <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-screen">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJvM0kIfiCGXXkL1Eagwhzpa-AEUvTqLx0MLMIVHgbQHlVStNviJjBtc85KmRq-Xty94tzFUxYmGxPRu9MUzc1xCv0e05XhWG7ArZEBLDANuvysdgU_JJ9NV4GG6NjzoCb3kp-VTHHH-r4WBvyrGl0cXXe19ZxGU8qppSKSN7s0hQchIFYwR7f5OsirtjY0yiMjvdUCzuVwGPGsM3-t-_OZVc3HnjG_SpBbQOWDP1fpfP_yM8iKdoIcFqWcg0qT4ER0avtGaUwWvQ" alt="World Map Background" className="w-full h-full object-cover" />
      </div>

      {/* 3D Stadium Placeholder with Enhanced Lighting */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[1000px] h-[1000px] rounded-full bg-cyan-400/5 blur-[200px] animate-pulse"></div>
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF1wNgc_vzLgIfLkBvlIZnxWtjunggChVU530nbDHX3oQmlHKOABUPjldUyNdLZF9wZHjODrkN6RO_5zCp7pna5q27Ef2SPg2ejkA28JiZ2MpuZBiNiIalwVvFcDNbOspLBofWZAtIMl4O3HJO_Uz8LiVo6wI35ymf4HViJ97w7gJi9neI2KaUiuUD1rKp7TLz7MdhtM6oTf1bFa2FFKBtiuyPvGMqURZcdffyE2zmAWg8I2a6tOS401OqCdu8tkpEjBbSCoQqw9E" alt="3D Stadium Rendering" className="absolute z-10 w-[900px] object-contain opacity-60 mix-blend-lighten transform -translate-y-8 drop-shadow-[0_0_50px_rgba(0,255,255,0.2)]" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center h-full pt-16 pb-12">
        <div className="w-full md:w-1/2 flex flex-col items-start gap-10">
          <div className="space-y-6">
            <p className="text-xs tracking-[0.3em] uppercase text-cyan-400 font-bold flex items-center gap-4">
               <span className="w-12 h-[1px] bg-cyan-400 shadow-[0_0_8px_#00ffff]"></span>
               The Zenith Engine
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight text-white leading-[0.9] text-glow">
              DIGITAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">COLOSSEUM</span>
            </h1>
            <p className="text-lg font-light text-zinc-400 max-w-lg mt-6 leading-relaxed">
              Command billion-dollar venues with unparalleled precision. Real-time telemetry, crowd dynamics, and VIP presence in one kinetic interface.
            </p>
          </div>
          <div className="flex gap-6 mt-6">
            <button 
              onClick={() => setCurrentScreen('map')}
              className="bg-gradient-to-br from-cyan-400 to-blue-500 text-black font-black py-4 px-10 rounded-full flex items-center gap-3 uppercase tracking-[0.1em] text-sm hover:brightness-125 transition-all shadow-[0_0_25px_rgba(0,255,255,0.3)]"
            >
              Explore Venues
              <ArrowRight className="w-5 h-5 text-sm font-bold" />
            </button>
            <button 
              onClick={() => setCurrentScreen('live')}
              className="glass-panel text-white font-bold py-4 px-10 rounded-full flex items-center gap-3 uppercase tracking-[0.1em] text-sm hover:bg-white/10 transition-all duration-300"
            >
              Live Events
            </button>
          </div>
        </div>

        {/* Right: Floating Real-time Stats */}
        <div className="w-full md:w-[40%] flex flex-col gap-8 mt-16 md:mt-0 relative">
          <div className="glass-panel rounded-3xl p-8 transform md:translate-x-16 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 cursor-pointer border-t border-l border-white/10 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-transparent opacity-80 shadow-[0_0_10px_#00ffff]"></div>
              <div className="flex justify-between items-start mb-6">
                  <span className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-semibold">Live Attendees</span>
                  <div className="relative flex items-center justify-center w-3 h-3">
                      <div className="absolute w-full h-full bg-red-500 rounded-full animate-ping opacity-75"></div>
                      <div className="relative w-2 h-2 bg-red-500 rounded-full"></div>
                  </div>
              </div>
              <div className="flex items-baseline gap-4">
                  <h3 className="text-6xl font-black tracking-tighter text-white">142,890</h3>
                  <span className="text-cyan-400 text-sm font-bold flex items-center tracking-wider">
                      <TrendingUp className="w-4 h-4 mr-1" /> 12%
                  </span>
              </div>
          </div>

          <div className="glass-panel rounded-3xl p-8 transform md:-translate-x-8 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500 cursor-pointer border-t border-l border-white/10 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 to-transparent opacity-80 shadow-[0_0_10px_#3b82f6]"></div>
              <div className="flex justify-between items-start mb-6">
                  <span className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-semibold">Active Venues</span>
                  <span className="material-symbols-outlined text-blue-500 text-lg">stadium</span>
              </div>
              <div className="flex items-baseline gap-4">
                  <h3 className="text-5xl font-black tracking-tighter text-white">24</h3>
                  <span className="text-zinc-500 text-sm font-bold tracking-wider uppercase">Global Network</span>
              </div>
          </div>
        </div>
      </div>

    </div>
  );
}
