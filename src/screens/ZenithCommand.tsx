import { QrCode, Car, Utensils, AlertTriangle, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { subscribeToOrders, subscribeToAlerts, Order, Alert } from '../lib/db';

export default function ZenithCommand({ user }: { user?: any }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    if (user) {
      const unsubOrders = subscribeToOrders(user.uid, (data) => setOrders(data));
      return () => unsubOrders();
    }
  }, [user]);

  useEffect(() => {
    const unsubAlerts = subscribeToAlerts((data) => setAlerts(data));
    return () => unsubAlerts();
  }, []);

  const activeOrder = orders.length > 0 ? orders[0] : null;

  return (
    <div className="flex flex-col gap-6 p-6 md:p-10 min-h-screen relative z-10 w-full max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-2 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-headline font-black tracking-tight text-on-surface mb-1 uppercase">ZENITH COMMAND</h2>
          <p className="text-on-surface-variant font-mono text-sm">
            SYS.STATUS: <span className="text-primary font-bold ml-1 tracking-widest uppercase text-xs shadow-[0_0_10px_rgba(0,240,255,0.2)]">Optimal</span>
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[10px] font-mono tracking-widest text-on-surface-variant uppercase mb-1">LOCAL TIME [UTC-4]</p>
          <p className="text-2xl font-mono font-bold text-primary tracking-tight">19:42:08</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-auto xl:h-[420px]">
        {/* Holographic VIP Ticket */}
        <div className="col-span-1 xl:col-span-8 bg-surface-container rounded-2xl relative overflow-hidden group border border-outline-variant/30 flex flex-col justify-between h-full hover:border-primary/30 transition-colors duration-500">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-700"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          <div className="absolute left-0 top-0 w-full h-[1px] bg-primary/40 shadow-[0_0_15px_rgba(0,240,255,0.8)] animate-pulse hidden group-hover:block transition-all z-20"></div>
          
          <div className="relative z-10 flex flex-col h-full p-8">
            <div className="flex justify-between items-start mb-auto">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 mb-6 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(255,223,0,0.8)] animate-pulse"></span>
                  <span className="text-secondary text-[10px] font-mono tracking-widest uppercase font-bold">VIP ACCESS SECURED</span>
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-headline font-black tracking-tighter text-white leading-[1.1] mb-3 drop-shadow-lg">
                  CHAMPIONS<br/>LEAGUE <span className="text-primary drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]">FINAL</span>
                </h3>
                <div className="flex items-center gap-4 text-on-surface-variant font-mono text-sm bg-black/40 px-4 py-2 rounded-lg border border-white/5 backdrop-blur-md inline-flex">
                  <span>SEC 7-G</span>
                  <span className="w-1 h-1 bg-outline rounded-full"></span>
                  <span>STE 42</span>
                  <span className="w-1 h-1 bg-outline rounded-full"></span>
                  <span>FULL HOSP.</span>
                </div>
              </div>
              <div className="w-20 h-20 border border-primary/30 rounded-xl p-2 bg-black/50 backdrop-blur-md hidden sm:flex items-center justify-center flex-col gap-1 group-hover:border-primary/60 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all">
                <QrCode className="w-8 h-8 text-primary" />
                <span className="text-[8px] font-mono text-primary/70 tracking-widest">SCAN</span>
              </div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-end mt-8 border-t border-white/10 pt-6">
              <div className="flex gap-10 mb-6 sm:mb-0">
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-on-surface-variant uppercase mb-1">DATE [SYS]</p>
                  <p className="font-headline font-black text-2xl text-white">MAY 28</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-on-surface-variant uppercase mb-1">GATE [LOC]</p>
                  <p className="font-headline font-black text-2xl text-white">A-14</p>
                </div>
              </div>
              <button className="px-8 py-3 bg-primary/10 border border-primary/50 text-primary font-bold tracking-widest text-xs rounded-xl hover:bg-primary hover:text-black transition-all duration-300 backdrop-blur-md font-mono uppercase shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                Initialize Ticket
              </button>
            </div>
          </div>
        </div>

        {/* Tactical Radar */}
        <div className="col-span-1 xl:col-span-4 bg-surface-container rounded-2xl relative overflow-hidden border border-outline-variant/30 flex flex-col h-full">
            <div className="p-6 pb-0 relative z-10 flex justify-between items-center mb-4">
                <h3 className="text-xs font-mono font-bold text-on-surface-variant tracking-widest uppercase flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-sm"></span> Tactical Radar
                </h3>
                <div className="text-[10px] font-mono text-primary/70 border border-primary/20 px-2 py-0.5 rounded bg-primary/5">LIVE</div>
            </div>
            
            {/* Radar Display built with CSS */}
            <div className="flex-1 relative border-y border-outline-variant/20 bg-black overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
              <div className="w-64 h-64 rounded-full border border-primary/20 flex items-center justify-center relative">
                <div className="w-40 h-40 rounded-full border border-primary/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-primary/40 flex items-center justify-center bg-primary/5">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_15px_rgba(0,240,255,1)]"></div>
                  </div>
                </div>
                {/* Sweep line */}
                <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-primary/30 to-transparent origin-top-left rounded-br-full opacity-50 block" style={{ animation: "spin 4s linear infinite" }}></div>
                
                {/* Markers */}
                <div className="absolute top-12 right-16 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(255,223,0,0.8)] before:content-[''] before:absolute before:-inset-2 before:border before:border-secondary/50 before:rounded-full before:animate-ping"></div>
                <div className="absolute bottom-16 left-12 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(255,223,0,0.8)]"></div>
                <div className="absolute top-32 left-8 w-1.5 h-1.5 rounded-full bg-error shadow-[0_0_10px_rgba(255,0,0,0.8)]"></div>
                
                {/* Crosshairs */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                  <div className="w-full h-[1px] bg-primary/50"></div>
                  <div className="h-full w-[1px] bg-primary/50 absolute"></div>
                </div>
              </div>
              <div className="absolute top-2 left-2 text-[8px] font-mono text-primary/40">X: 42.11 Y: -18.99</div>
              <div className="absolute bottom-2 right-2 text-[8px] font-mono text-primary/40">Z-LEVEL: 04</div>
            </div>

            <div className="p-4 relative z-10 bg-surface-container-highest/50 flex justify-between text-[10px] font-mono text-on-surface-variant uppercase tracking-widest items-center">
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-secondary rounded-full"></span> 2 VIP CONT.</span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-error rounded-full"></span> 1 UNKN.</span>
            </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Parking */}
        <div className="bg-surface-container rounded-2xl relative overflow-hidden border border-outline-variant/30 p-6 hover:border-primary/20 transition-all duration-300 group flex flex-col justify-between min-h-[160px]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-surface-variant border border-outline-variant/50 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
              <Car className="text-on-surface w-5 h-5 group-hover:text-primary transition-colors" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-primary bg-primary/10 px-2 py-1 rounded uppercase font-bold border border-primary/20">STATUS: OK</span>
          </div>
          <div className="relative z-10 mt-auto">
            <p className="text-[10px] font-mono tracking-widest text-on-surface-variant uppercase mb-1">ZONE B PARKING</p>
            <h4 className="text-2xl font-headline font-black text-white mb-1 tracking-tight">RESERVED</h4>
            <div className="flex justify-between items-end">
              <p className="text-on-surface-variant font-mono text-xs">SPOT 402</p>
              <p className="text-primary font-mono text-xs font-bold">ETA 14M</p>
            </div>
          </div>
        </div>

        {/* Canteen */}
        <div className="bg-surface-container rounded-2xl relative overflow-hidden border border-outline-variant/30 p-6 hover:border-secondary/20 transition-all duration-300 group flex flex-col justify-between min-h-[160px]">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-secondary/5 to-transparent rounded-bl-full pointer-events-none"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-surface-variant border border-outline-variant/50 flex items-center justify-center group-hover:bg-secondary/10 group-hover:border-secondary/30 transition-colors">
              <Utensils className="text-secondary w-5 h-5" />
            </div>
            {activeOrder && activeOrder.status !== 'delivered' && (
                <div className="flex gap-1 bg-black/40 px-2 py-1.5 rounded border border-white/5">
                  <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(255,223,0,0.8)] ${activeOrder.status === 'pending' || activeOrder.status === 'preparing' ? 'bg-secondary animate-pulse' : 'bg-outline-variant'}`}></div>
                  <div className={`w-1.5 h-1.5 rounded-full ${activeOrder.status === 'ready' ? 'bg-secondary animate-pulse shadow-[0_0_8px_rgba(255,223,0,0.8)]' : 'bg-outline-variant'}`}></div>
                  <div className={`w-1.5 h-1.5 rounded-full bg-outline-variant`}></div>
                </div>
            )}
          </div>
          <div className="relative z-10 mt-auto">
            <p className="text-[10px] font-mono tracking-widest text-on-surface-variant uppercase mb-1">DIGITAL CANTEEN</p>
            {activeOrder ? (
               <>
                 <h4 className="text-2xl font-headline font-black text-secondary mb-1 tracking-tight uppercase">{activeOrder.status}</h4>
                 <div className="flex justify-between items-end">
                   <p className="text-on-surface-variant font-mono text-xs">Total: ${activeOrder.total.toFixed(2)}</p>
                   <p className="text-secondary/70 font-mono text-[10px] uppercase">{activeOrder.items?.length || 0} ITEMS</p>
                 </div>
               </>
            ) : (
               <>
                 <h4 className="text-2xl font-headline font-black text-zinc-500 mb-1 tracking-tight">NO ORDERS</h4>
                 <div className="flex justify-between items-end">
                   <p className="text-on-surface-variant font-mono text-xs">-</p>
                   <p className="text-zinc-600 font-mono text-[10px] uppercase">Awaiting order</p>
                 </div>
               </>
            )}
          </div>
        </div>

        {/* Alerts */}
        <div className={`bg-surface-container rounded-2xl relative overflow-hidden border p-6 transition-all duration-300 group flex flex-col justify-between min-h-[160px] ${alerts.length > 0 ? 'border-error/50 hover:border-error' : 'border-outline-variant/30 hover:border-primary/20'}`}>
          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl rounded-bl-full pointer-events-none ${alerts.length > 0 ? 'from-error/10' : 'from-primary/5'}`}></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${alerts.length > 0 ? 'bg-error/10 border-error/30 animate-pulse' : 'bg-surface-variant border-outline-variant/50 group-hover:bg-primary/10 group-hover:border-primary/30'}`}>
              <AlertTriangle className={`${alerts.length > 0 ? 'text-error animate-ping' : 'text-zinc-500 group-hover:text-primary'} w-5 h-5`} />
            </div>
            {alerts.length > 0 ? (
                <span className="text-[10px] font-mono tracking-widest text-error bg-error/10 px-2 py-1 rounded uppercase font-bold border border-error/20">{alerts.length} NEW ALERT{alerts.length > 1 ? 'S' : ''}</span>
            ) : (
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 bg-white/5 px-2 py-1 rounded uppercase font-bold border border-white/10">0 ALERTS</span>
            )}
          </div>
          <div className="relative z-10 mt-auto flex flex-col gap-1">
            <p className="text-[10px] font-mono tracking-widest text-on-surface-variant uppercase">SYS.MSG</p>
            <div className="flex justify-between items-center">
              {alerts.length > 0 ? (
                  <>
                    <h4 className="text-lg font-headline font-black text-white leading-tight truncate mr-2">{alerts[0].title}</h4>
                    <button className="text-error font-mono text-[10px] font-bold uppercase hover:text-white transition-colors bg-error/10 px-3 py-1.5 rounded border border-error/20 flex items-center shrink-0">VIEW <ChevronRight className="w-3 h-3 ml-1" /></button>
                  </>
              ) : (
                  <h4 className="text-lg font-headline font-black text-zinc-500 leading-tight">All clear</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
