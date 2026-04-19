import { useState, useEffect } from 'react';
import { ShieldAlert, Crosshair, Radio, AlertOctagon } from 'lucide-react';

export default function GlobalAlert() {
  const [alert, setAlert] = useState<{ id: string, title: string, details: string, location: string, time: string } | null>(null);
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    // Simulate real-time event detection after exactly 3.5 seconds
    const timer = setTimeout(() => {
      setAlert({
        id: 'SEC-9082-CRN',
        title: 'UNAUTHORIZED PERIMETER BREACH',
        details: 'Multiple unidentified thermal signatures detected bypassing security checkpoints. Automated turnstiles breached by group of 4 individuals. Immediate intervention required.',
        location: 'SOUTH GATE // SECTOR 7',
        time: new Date().toLocaleTimeString('en-US', { hour12: false })
      });
    }, 3500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleResolve = () => {
    setIsResolved(true);
    setTimeout(() => {
      setAlert(null);
      setIsResolved(false);
    }, 1500); // Wait for resolution animation
  };

  if (!alert) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl shadow-[inset_0_0_200px_rgba(239,68,68,0.15)] transition-opacity duration-300">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px)] bg-[size:100%_4px] z-0"></div>
      
      {/* Heavy Red Overlay Pulse */}
      <div className="absolute inset-0 bg-red-950/20 animate-pulse pointer-events-none"></div>

      <div className={`relative z-10 max-w-2xl w-full border-2 border-red-500 bg-red-950/40 p-1 shadow-[0_0_80px_rgba(239,68,68,0.4)] overflow-hidden transition-all duration-500 ${isResolved ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        
        {/* Animated edge bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500 shadow-[0_0_15px_#ef4444]"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-red-500/50"></div>
        
        <div className="bg-black/90 p-8 md:p-10 relative flex flex-col gap-6 backdrop-blur-2xl">
           
           <div className="flex items-center gap-5 border-b border-red-500/30 pb-5">
              <div className="bg-red-500/20 p-4 rounded border border-red-500/50 relative flex items-center justify-center">
                 <AlertOctagon className="w-10 h-10 text-red-500 animate-ping absolute opacity-40 duration-700" />
                 <AlertOctagon className="w-10 h-10 text-red-500 relative z-10" />
              </div>
              <div className="flex flex-col">
                 <h2 className="text-3xl md:text-4xl font-black text-red-500 tracking-tighter uppercase drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] leading-none text-glow">CRITICAL ALERT</h2>
                 <p className="text-zinc-400 font-mono text-xs tracking-widest uppercase mt-2">REF_ID: {alert.id} <span className="mx-2 text-red-500/40">|</span> TS: {alert.time}</p>
              </div>
           </div>

           <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                 <span className="text-red-500/70 font-mono text-[10px] uppercase tracking-widest font-bold">Event Log</span>
                 <p className="text-white text-xl font-['Inter'] font-semibold leading-relaxed tracking-tight">{alert.title}</p>
                 <p className="text-zinc-300 text-sm font-['Inter'] leading-relaxed mt-1">{alert.details}</p>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/20 p-5 rounded relative overflow-hidden flex justify-between items-center group">
                 <div className="absolute left-0 top-0 w-1 h-full bg-red-500"></div>
                 <div className="flex flex-col pl-2">
                    <span className="text-red-500/70 font-mono text-[10px] uppercase tracking-widest font-bold mb-1">Target Location Matrix</span>
                    <span className="text-red-400 font-mono text-xl font-bold">{alert.location}</span>
                 </div>
                 <Crosshair className="text-red-500 w-10 h-10 animate-[spin_4s_linear_infinite] drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              </div>
           </div>

           <div className="flex flex-col gap-3 mt-4 pt-5 border-t border-red-500/30">
              <span className="text-red-500 font-mono text-[10px] uppercase tracking-widest font-black animate-pulse flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> REQUIRED ACTIONS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-1">
                 <button 
                  onClick={handleResolve}
                  className="bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-500/30 text-white py-4 px-6 font-mono font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] rounded-sm outline-none">
                    <ShieldAlert className="w-5 h-5" /> Deploy Strike Team
                 </button>
                 <button 
                  onClick={handleResolve}
                  className="bg-transparent hover:bg-white/5 border-2 border-red-500/30 hover:border-red-500/80 focus:ring-4 focus:ring-red-500/20 text-red-400 py-4 px-6 font-mono font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-3 rounded-sm outline-none">
                    <Radio className="w-5 h-5" /> Trigger Lockdown
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
