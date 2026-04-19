import { Users, Hourglass, Star, RefreshCw, AlertTriangle, Video, Map, ArrowUpRight, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';
import { subscribeToAlerts, Alert } from '../lib/db';

export default function LiveDashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [liveVolume, setLiveVolume] = useState<number[]>([40, 70, 50, 90, 100, 60, 30, 80, 50, 40, 95, 60]);

  // Real-time alerts
  useEffect(() => {
    const unsubscribe = subscribeToAlerts((data) => {
      setAlerts(data);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Mock Telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVolume(current => {
        const newArr = [...current];
        newArr.shift();
        newArr.push(Math.floor(Math.random() * 80) + 20); // 20 to 100
        return newArr;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const activeAlert = alerts.length > 0 ? alerts[0] : null;

  return (
    <div className="flex-1 flex flex-col gap-6 max-w-[1600px] mx-auto w-full relative z-10 px-4 md:px-8 pb-12 pt-6">
      
      {/* Hero Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-panel rounded-lg p-5 relative overflow-hidden flex flex-col justify-between h-28 border-t-2 border-t-cyan-500 hover:bg-white/5 transition-all cursor-pointer group">
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></div>
          
          <div className="flex justify-between items-start z-10 w-full">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 group-hover:text-cyan-400 transition-colors">Live Attendance</span>
            <Users className="text-cyan-500/50 w-4 h-4 group-hover:text-cyan-400 transition-colors" />
          </div>
          <div className="flex items-baseline gap-2 z-10">
            <div className="text-4xl font-mono font-medium text-white tracking-tight text-glow">68,402</div>
            <div className="text-xs font-mono text-cyan-400 flex items-center gap-0.5"><ArrowUpRight className="w-3 h-3" /> 1.2%</div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>
        </div>

        <div className="glass-panel rounded-lg p-5 relative overflow-hidden flex flex-col justify-between h-28 border-t-2 border-t-zinc-700 hover:bg-white/5 transition-all cursor-pointer group">
          <div className="flex justify-between items-start z-10 w-full">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 group-hover:text-zinc-300 transition-colors">Avg Wait Time</span>
            <Hourglass className="text-zinc-500/50 w-4 h-4" />
          </div>
          <div className="text-4xl font-mono font-medium text-white tracking-tight z-10">04<span className="text-sm text-zinc-500 ml-1">MIN</span></div>
        </div>

        <div className="glass-panel rounded-lg p-5 relative overflow-hidden flex flex-col justify-between h-28 border-t-2 border-t-yellow-500 hover:bg-white/5 transition-all cursor-pointer group">
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-yellow-500"></div>

          <div className="flex justify-between items-start z-10 w-full">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-500/80 group-hover:text-yellow-400 transition-colors">VIP Density</span>
            <Star className="text-yellow-500/50 w-4 h-4" />
          </div>
          <div className="flex items-baseline gap-2 z-10">
            <div className="text-4xl font-mono font-medium text-white tracking-tight z-10">84<span className="text-xl text-yellow-500 ml-1">%</span></div>
            <div className="text-xs font-mono text-yellow-500">CAP</div>
          </div>
        </div>
        
        <div className="glass-panel rounded-lg p-5 relative overflow-hidden flex flex-col justify-between h-28 border-t-2 border-t-red-500 bg-red-500/5 hover:bg-red-500/10 transition-all cursor-pointer group">
           <div className="absolute inset-0 bg-red-500/10 animate-pulse"></div>
           <div className="flex justify-between items-start z-10 w-full">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">Threat Level</span>
            <Activity className="text-red-500/80 w-4 h-4 animate-bounce" />
          </div>
          <div className="text-4xl font-mono font-medium text-red-400 tracking-tight z-10 flex items-center gap-2">
            ELEVATED
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Center Map Area (Spans 3 cols now) */}
        <div className="lg:col-span-3 glass-panel rounded-lg relative overflow-hidden flex flex-col border border-white/10">
          <div className="p-4 flex justify-between items-center z-30 absolute top-0 left-0 w-full bg-gradient-to-b from-[#0A0A0A] to-transparent">
            <div className="flex gap-4 items-center">
              <h2 className="font-mono font-bold text-xs uppercase tracking-widest text-white flex items-center gap-2 bg-on-surface/50 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10">
                <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_8px_#00d2ff]"></span>
                THERMAL_OPTICS // SEC_ALL
              </h2>
              <div className="hidden md:flex gap-1 font-mono text-[9px] text-zinc-500">
                <span className="bg-black border border-white/10 px-2 flex items-center">FREQ: 5.8GHz</span>
                <span className="bg-black border border-white/10 px-2 flex items-center">LAT: 12ms</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-widest px-3 py-1.5 bg-black/80 rounded border border-white/10 flex items-center gap-2"><Map className="w-3 h-3"/> 2D Top</button>
              <button className="text-cyan-400 text-xs font-mono uppercase tracking-widest px-3 py-1.5 bg-cyan-500/10 rounded border border-cyan-500/50 shadow-[0_0_15px_rgba(0,210,255,0.2)] flex items-center gap-2"><Video className="w-3 h-3"/> 3D Live</button>
            </div>
          </div>

          <div className="flex-1 bg-black w-full h-full relative overflow-hidden border-t-0 flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,210,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,210,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(800px)_rotateX(60deg)_translateY(-100px)] origin-bottom opacity-40"></div>
            
            {/* Aspect container to keep overlays aligned with stadium image */}
            <div className="relative w-full max-w-3xl aspect-[16/9] z-10">
              <div className="absolute inset-0 w-full h-full flex items-center justify-center z-0" style={{ background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,1) 90%)" }}>
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBVn1ksw20_Yvw-Mas8ghyxBORF5z66r-EfdwFLJw3rJ2aCTwakzXKN39Wt2lK9zY_JUowADYwD95k95X-jFsJi-8esT1ZLf96zdApHmQneQpAhdMil-AeBDmQavnVNCxJCu4YUYFoxwimGAISFxLewTZHSM3D0I7wZrzB0OPDsy4xMLv5IxrHawZ02nWeBoXF1dt7o9rJLDROcarXOm2uAmau2t9pQzJeBoypnUxtqnaQHN9T8vyUrU6iTEgRItVqy3senFBHqwE" 
                  alt="High fidelity 3D stadium heatmap" 
                  className="w-full h-full object-cover mix-blend-screen opacity-60 rounded-full md:rounded-none" 
                  style={{ filter: "sepia(100%) hue-rotate(180deg) saturate(200%) brightness(90%) contrast(150%)" }}
                />
              </div>

              {/* Scanning Line */}
              <div className="absolute left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_30px_5px_rgba(0,210,255,0.6)] animate-scan-vertical z-40 opacity-70 flex justify-center pointer-events-none">
                  <div className="absolute top-0 w-64 h-32 bg-gradient-to-t from-cyan-400/20 to-transparent -translate-y-full"></div>
              </div>
              
              {/* Heat zones overlaid (moved to outer edges away from center pitch) */}
              <div className="absolute top-[15%] left-[20%] w-32 h-32 bg-red-500/50 rounded-full blur-[40px] mix-blend-screen animate-pulse z-20 pointer-events-none"></div>
              <div className="absolute top-[10%] left-[18%] w-20 h-20 bg-red-600/60 rounded-full blur-[30px] mix-blend-screen z-20 pointer-events-none"></div>
              <div className="absolute top-[75%] left-[75%] w-48 h-48 bg-cyan-500/30 rounded-full blur-[50px] mix-blend-screen z-20 pointer-events-none"></div>
              <div className="absolute top-[70%] left-[25%] w-24 h-24 bg-yellow-500/30 rounded-full blur-[30px] mix-blend-screen z-20 pointer-events-none"></div>
              
              {/* Data targets/nodes (moved to outer edges) */}
              <div className="absolute top-[18%] left-[22%] z-30 flex flex-col items-center pointer-events-none">
                <div className="relative flex items-center justify-center">
                   <div className="absolute w-8 h-8 border border-red-500/50 rounded-full animate-ping"></div>
                   <div className="w-2 h-2 bg-red-500 rounded-full shadow-[0_0_15px_rgba(255,70,70,1)]"></div>
                </div>
                <div className="mt-2 px-2 py-1 bg-black/80 border border-red-500/50 rounded flex flex-col items-center backdrop-blur-md">
                   <span className="text-[10px] font-mono text-white tracking-widest font-bold">SEC_203</span>
                   <span className="text-[9px] font-mono text-red-400">98% CAP / CRITICAL</span>
                </div>
              </div>

              <div className="absolute top-[80%] left-[78%] z-30 flex flex-col items-center pointer-events-none">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(0,210,255,1)] animate-pulse"></div>
                <div className="mt-1 px-2 py-0.5 bg-black/80 border border-cyan-500/50 rounded text-[9px] font-mono text-cyan-400 backdrop-blur-md">42% NOMINAL</div>
              </div>
            </div>

            {/* Simulated Live Stream PIP Overlays (Fixed top-right) */}
            <div className="absolute top-16 right-5 w-40 h-28 bg-black border border-white/20 rounded shadow-2xl z-40 overflow-hidden flex items-center justify-center group cursor-pointer hover:border-cyan-400 transition-colors hidden md:flex">
               <img src="https://images.unsplash.com/photo-1540039155732-684735035727?auto=format&fit=crop&w=400&q=80" alt="Cam 1" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity saturate-0 group-hover:saturate-100" />
               <div className="absolute inset-0 border border-white/5 pointer-events-none"></div>
               <div className="absolute top-2 left-2 bg-black/80 px-1.5 py-0.5 rounded flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                 <span className="text-[7px] font-mono text-white">CAM 01 // ENTRY B</span>
               </div>
               <div className="absolute bottom-2 right-2 flex gap-1">
                 <div className="w-1 h-3 bg-white/50"></div><div className="w-1 h-3 bg-white/50"></div>
               </div>
            </div>
          </div>

          <div className="absolute bottom-5 left-5 bg-black/60 border border-white/10 p-4 rounded flex flex-col gap-3 backdrop-blur-md z-30 min-w-[200px]">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500">Density Legend</span>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-[10px] font-mono w-full">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-sm shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div><span className="text-zinc-300">CRITICAL</span></div>
                 <span className="text-red-400">90%+</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono w-full">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-sm shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div><span className="text-zinc-300">WARNING</span></div>
                 <span className="text-yellow-400">70-89%</span>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono w-full">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 bg-cyan-500 rounded-sm shadow-[0_0_10px_rgba(0,210,255,0.5)]"></div><span className="text-zinc-300">NOMINAL</span></div>
                 <span className="text-cyan-400">&lt;70%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Widgets */}
        <div className="flex flex-col gap-6">
          {/* Scoreboard / Telemetry Widget */}
          <div className="glass-panel rounded-lg p-0 overflow-hidden relative border border-white/10 shadow-[0_0_30px_rgba(0,210,255,0.05)]">
            <div className="bg-[#0A0A0A] p-3 border-b border-white/5 mx-auto flex justify-between items-center">
              <h3 className="font-mono font-bold text-[10px] text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                <Activity className="w-3 h-3" />
                TELEMETRY
              </h3>
              <span className="font-mono text-[10px] text-zinc-500">PING: 14ms</span>
            </div>
            
            <div className="p-6 bg-gradient-to-b from-[#0e0e0e] to-[#131313] flex flex-col items-center">
              <div className="w-full flex justify-between text-[10px] font-mono text-zinc-500 mb-2">
                 <span>MAIN STAGE</span><span>AUDIO SYS: ON</span>
              </div>
              <div className="text-6xl font-headline font-black tracking-tighter text-white mb-2 drop-shadow-xl text-glow w-full text-center">
                128<span className="text-2xl text-cyan-500 ml-1">dB</span>
              </div>
              <div className="text-sm font-mono text-red-400 font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                 PEAK VOLUME WARN
              </div>
              
              {/* Graphic Equalizer / Bar Chart */}
              <div className="flex items-end gap-1.5 h-16 w-full justify-between opacity-80 mt-auto">
                 {liveVolume.map((val, i) => (
                   <div key={i} className="w-full bg-surface-container rounded-t-sm overflow-hidden flex flex-col justify-end" style={{ height: '100%' }}>
                     <div className={`w-full transition-all duration-300 ${val > 80 ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : val > 50 ? 'bg-cyan-400 shadow-[0_0_10px_#00d2ff]' : 'bg-cyan-800'}`} style={{ height: `${val}%` }}></div>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          {/* Queue Times */}
          <div className="glass-panel rounded-lg flex-1 flex flex-col overflow-hidden border border-white/10">
            <div className="p-4 border-b border-white/5 bg-[#0A0A0A] flex justify-between items-center">
              <h3 className="font-mono font-bold text-[10px] text-zinc-300 uppercase tracking-widest">
                FLOW_METRICS // GATES
              </h3>
              <RefreshCw className="text-cyan-500 w-3 h-3 hover:rotate-180 transition-transform duration-500 cursor-pointer" />
            </div>
            <div className="p-4 flex flex-col gap-2 overflow-y-auto no-scrollbar">
              <div className="flex justify-between items-center p-3 bg-surface-container-low/40 rounded border border-white/5 hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#00d2ff]"></div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-white uppercase tracking-wider">GT_NORTH</span>
                    <span className="font-mono text-[9px] text-zinc-500">THROUGHPUT: HIGH</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm text-cyan-400">02m 14s</div>
                  <div className="font-mono text-[9px] text-green-400 flex items-center gap-0.5 justify-end"><ArrowUpRight className="w-2 h-2 rotate-180" />12s</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-surface-container-low/40 rounded border border-white/5 hover:border-yellow-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_8px_#eab308]"></div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-white uppercase tracking-wider">GT_EAST</span>
                    <span className="font-mono text-[9px] text-zinc-500">THROUGHPUT: MED</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm text-yellow-400">08m 45s</div>
                  <div className="font-mono text-[9px] text-red-400 flex items-center gap-0.5 justify-end"><ArrowUpRight className="w-2 h-2" />45s</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-red-500/5 rounded border border-red-500/30 relative overflow-hidden group">
                <div className="absolute inset-0 bg-red-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]"></div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-red-400 uppercase tracking-wider">GT_SOUTH</span>
                    <span className="font-mono text-[9px] text-red-500/70 font-bold">BOTTLENECK DETECTED</span>
                  </div>
                </div>
                <div className="text-right relative z-10">
                  <div className="font-mono text-sm text-red-400 font-bold">15m 30s</div>
                  <div className="font-mono text-[9px] text-red-500 flex items-center gap-0.5 justify-end"><ArrowUpRight className="w-2 h-2" />2m 10s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section Down Bottom */}
      {activeAlert ? (
          <div className="glass-panel rounded-lg p-5 border border-red-500/40 bg-red-950/30 flex items-start sm:items-center gap-4 flex-col sm:flex-row relative overflow-hidden animate-in slide-in-from-bottom duration-500">
            <div className={`absolute left-0 top-0 w-1 h-full ${activeAlert.priority === 'critical' ? 'bg-red-500' : 'bg-yellow-500'}`}></div>
            <div className={`p-2.5 rounded border flex-shrink-0 animate-pulse ${activeAlert.priority === 'critical' ? 'bg-red-500/20 border-red-500/50' : 'bg-yellow-500/20 border-yellow-500/50'}`}>
              <AlertTriangle className={`${activeAlert.priority === 'critical' ? 'text-red-500' : 'text-yellow-500'} w-5 h-5`} />
            </div>
            <div className="flex-1 pt-0.5">
              <div className="flex justify-between items-center mb-1.5">
                <h4 className={`font-mono font-bold uppercase text-[11px] tracking-widest px-2 py-0.5 rounded inline-block ${activeAlert.priority === 'critical' ? 'text-red-400 bg-red-500/10' : 'text-yellow-400 bg-yellow-500/10'}`}>{activeAlert.title}</h4>
                <span className={`font-mono text-[10px] font-bold uppercase ${activeAlert.priority === 'critical' ? 'text-red-500/60' : 'text-yellow-500/60'}`}>{activeAlert.priority} PRIORITY</span>
              </div>
              <p className="font-body text-sm text-zinc-300">{activeAlert.message}</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="bg-transparent hover:bg-white/5 border border-white/10 text-zinc-300 px-4 py-2.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest transition-colors flex-1 sm:flex-none">ACKNOWLEDGE</button>
            </div>
          </div>
      ) : (
          <div className="glass-panel rounded-lg p-5 border border-cyan-500/20 bg-cyan-950/10 flex items-center justify-center gap-3">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#00d2ff]"></div>
              <span className="font-mono text-sm text-cyan-400/80 uppercase tracking-widest font-bold">ALL SYSTEMS NOMINAL. ZERO CRITICAL ALERTS.</span>
          </div>
      )}
    </div>
  );
}
