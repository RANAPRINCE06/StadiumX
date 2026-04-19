import { Users, Activity, BarChart2, ShieldAlert } from 'lucide-react';

export default function NavigationRoute() {
  return (
    <div className="w-full h-[calc(100vh-72px)] relative bg-surface-container-lowest overflow-hidden">
      {/* 3D Stadium Background */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
          <div className="relative w-full max-w-5xl aspect-[16/9] flex items-center justify-center opacity-70">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwn0J6k_o3A31NR7YG5F67YzSDZzk6jswV7M2hPMuF8wmk9Pbn775STm8qXMMrozrI1mUO1ZxhQCmjFK3TmQbwHwlusuUSM6Pam8-C1zrdomqf0mXP9OmT2UiJZT3WO-HKyTXwvr8WF8socqOcEG0a-qsqTK7uMt5YHrho8U073c8L8Rx3vNKL3hOn6IXkhmfzW_N4rulhnYneddH1txEgZhE8LkF04S4dBFOu2a_Iz-saN0m8AxBUBipqQhoLCq3Em3cr1kEq2mQ" 
              alt="3D Stadium Cutaway" 
              className="w-full h-full object-cover mix-blend-screen scale-[1.05]" 
              style={{ filter: "hue-rotate(20deg) brightness(80%) contrast(120%)" }}
            />
            {/* Vector Flow Overlay - Simulating Crowd Movement overlay exactly over image */}
            <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center mix-blend-screen overflow-hidden">
                <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1000 562">
                    <defs>
                        <linearGradient id="flow-cyan" x1="0%" x2="100%" y1="0%" y2="0%">
                            <stop offset="0%" stopColor="transparent"></stop>
                            <stop offset="50%" stopColor="rgba(0,210,255,1)"></stop>
                            <stop offset="100%" stopColor="transparent"></stop>
                        </linearGradient>
                        <linearGradient id="flow-red" x1="0%" x2="100%" y1="0%" y2="0%">
                            <stop offset="0%" stopColor="transparent"></stop>
                            <stop offset="50%" stopColor="rgba(239,68,68,1)"></stop>
                            <stop offset="100%" stopColor="transparent"></stop>
                        </linearGradient>
                    </defs>

                    {/* Path 1: Nominal North ingress (wrapping around center) */}
                    <path d="M 100 500 Q 150 200 400 150 T 800 200" fill="none" stroke="rgba(0,210,255,0.1)" strokeWidth="15" strokeLinecap="round"></path>
                    <path className="animate-dash-flow" strokeDasharray="10 30" style={{ animationDuration: '3s' }} d="M 100 500 Q 150 200 400 150 T 800 200" fill="none" stroke="url(#flow-cyan)" strokeWidth="4" strokeLinecap="round"></path>

                    {/* Path 2: Nominal South ingress (wrapping around center) */}
                    <path d="M 900 350 Q 850 500 500 500 T 150 350" fill="none" stroke="rgba(0,210,255,0.1)" strokeWidth="10" strokeLinecap="round"></path>
                    <path className="animate-dash-flow" strokeDasharray="8 20" style={{ animationDuration: '4s' }} d="M 900 350 Q 850 500 500 500 T 150 350" fill="none" stroke="url(#flow-cyan)" strokeWidth="3" strokeLinecap="round"></path>
                    
                    {/* Path 3: Warning Cross-flow */}
                    <path d="M 200 150 Q 500 80 800 150" fill="none" stroke="rgba(250,204,21,0.1)" strokeWidth="8" strokeLinecap="round"></path>
                    <path className="animate-dash-flow" strokeDasharray="15 40" style={{ animationDuration: '2s' }} d="M 200 150 Q 500 80 800 150" fill="none" stroke="rgba(250,204,21,0.8)" strokeWidth="2" strokeLinecap="round"></path>

                    {/* Path 4: Bottleneck (Red) */}
                    <path d="M 750 500 L 650 450 L 600 350" fill="none" stroke="rgba(239,68,68,0.2)" strokeWidth="20" strokeLinecap="round"></path>
                    <path className="animate-dash-flow" strokeDasharray="5 10" style={{ animationDuration: '6s' }} d="M 750 500 L 650 450 L 600 350" fill="none" stroke="url(#flow-red)" strokeWidth="6" strokeLinecap="round"></path>

                    {/* Nodes (placed around edges) */}
                    <circle className="animate-pulse drop-shadow-[0_0_10px_#00d2ff]" cx="800" cy="200" fill="#00d2ff" r="6"></circle>
                    <circle className="animate-ping" cx="600" cy="350" fill="#ef4444" r="8"></circle>
                    <circle cx="600" cy="350" fill="#ef4444" r="4"></circle>
                </svg>
            </div>
          </div>
          
          {/* Gradient blends over everything */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A] opacity-100 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#0A0A0A] via-transparent to-[#0A0A0A] opacity-90 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,210,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,210,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col p-6 md:p-12 justify-between pointer-events-none">
          <div className="flex flex-col md:flex-row justify-between items-start w-full gap-6">
              <div className="pointer-events-auto">
                  <h1 className="font-headline font-black text-4xl md:text-5xl text-white tracking-tighter drop-shadow-xl uppercase text-glow">
                      CROWD <span className="text-primary">DYNAMICS</span>
                  </h1>
                  <div className="flex items-center gap-3 mt-3">
                      <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00d2ff]"></span>
                          Live Vector Mapping
                      </span>
                      <span className="text-zinc-500 text-[10px] font-mono font-bold uppercase tracking-widest">
                          TICK RATE: 64Hz
                      </span>
                  </div>
              </div>

              <div className="pointer-events-auto flex gap-4">
                  <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex flex-col min-w-[140px]">
                      <span className="text-zinc-500 text-[9px] font-mono font-bold tracking-widest uppercase mb-1">Total Throughput</span>
                      <div className="font-headline font-black text-3xl text-white tracking-tighter flex items-end gap-1">
                          14.2<span className="text-cyan-400 text-sm font-bold mb-1">K/m</span>
                      </div>
                  </div>
                  <div className="bg-red-950/40 backdrop-blur-xl border border-red-500/30 rounded-xl p-4 flex flex-col min-w-[140px]">
                      <span className="text-red-400/80 text-[9px] font-mono font-bold tracking-widest uppercase mb-1 flex items-center gap-1.5"><ShieldAlert className="w-3 h-3"/> Active Chokes</span>
                      <div className="font-headline font-black text-3xl text-red-500 tracking-tighter flex items-end gap-1">
                          02<span className="text-red-500/60 text-sm font-bold mb-1">ZONES</span>
                      </div>
                  </div>
              </div>
          </div>

          <div className="pointer-events-auto flex flex-col lg:flex-row gap-6 mt-auto">
              <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl w-full lg:w-[480px] flex flex-col gap-6 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-primary to-transparent opacity-80"></div>
                  
                  <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 text-cyan-400">
                          <Users className="w-6 h-6" />
                      </div>
                      <div>
                          <div className="text-white font-black text-xl tracking-tighter uppercase">Global Density Matrix</div>
                          <div className="text-zinc-500 text-[10px] font-mono font-bold tracking-widest uppercase flex items-center gap-1 mt-0.5">
                            Real-time volume aggregation
                          </div>
                      </div>
                  </div>

                  <div className="flex flex-col gap-4 relative z-10 pt-2 border-t border-white/5">
                      <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest">
                             <span className="text-zinc-400">CONCOURSE A // NORTH</span>
                             <span className="text-cyan-400">NOMINAL</span>
                          </div>
                          <div className="w-full bg-zinc-900 rounded-full h-1 overflow-hidden">
                             <div className="bg-cyan-500 h-full w-[45%]"></div>
                          </div>
                      </div>
                      <div className="flex flex-col gap-2">
                          <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest">
                             <span className="text-zinc-400">LEVEL 2 // EAST STAIRS</span>
                             <span className="text-yellow-400">ELEVATED</span>
                          </div>
                          <div className="w-full bg-zinc-900 rounded-full h-1 overflow-hidden">
                             <div className="bg-yellow-500 h-full w-[78%]"></div>
                          </div>
                      </div>
                      <div className="flex flex-col gap-2 relative">
                          <div className="absolute inset-0 bg-red-500/10 animate-pulse -mx-2 px-2 rounded -my-1 py-1"></div>
                          <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest relative z-10">
                             <span className="text-white">SOUTH GATE // EXIT 4</span>
                             <span className="text-red-400 font-black">BOTTLENECK</span>
                          </div>
                          <div className="w-full bg-zinc-900 rounded-full h-1 overflow-hidden relative z-10 box-shadow-[0_0_10px_#ef4444]">
                             <div className="bg-red-500 h-full w-[98%]"></div>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="flex gap-4 items-end ml-auto">
                  <button onClick={() => alert("Historical Analytics matrix loading...")} className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-white/10 hover:border-cyan-500/50 transition-all w-28 h-28 group">
                      <BarChart2 className="text-zinc-500 group-hover:text-cyan-400 w-8 h-8 transition-colors duration-300" />
                      <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-zinc-400 group-hover:text-white">Historical</span>
                  </button>
                  <button onClick={() => alert("Predictive Algorithm mapping underway...")} className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-white/10 hover:border-cyan-500/50 transition-all w-28 h-28 group">
                      <Activity className="text-zinc-500 group-hover:text-cyan-400 w-8 h-8 transition-colors duration-300" />
                      <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-zinc-400 group-hover:text-white">Predictive</span>
                  </button>
                  <button onClick={() => alert("Recalibrating Crowd flow parameters...")} className="bg-cyan-500/10 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-cyan-500/20 transition-all w-28 h-28 border border-cyan-500/50 shadow-[0_0_25px_rgba(0,210,255,0.2)]">
                      <Users className="text-cyan-400 w-8 h-8 drop-shadow-md" />
                      <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-cyan-400">Recalibrate</span>
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
}
