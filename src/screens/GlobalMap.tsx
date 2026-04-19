import { Search, Filter, MapPin, CloudRain, Users, Car, Utensils, Bell, Eye, Calendar, X } from 'lucide-react';
import { useState } from 'react';

const stadiumsData = [
  {
    id: 'wembley',
    name: 'Wembley Stadium',
    location: 'London, UK',
    weather: '14°C',
    statusText: 'ACTIVE • LIVE EVENT',
    event: 'Live Event',
    statusColor: 'green' as const,
    top: '22.5%',
    left: '48%',
    capacity: '82,450',
    maxCapacity: '90,000',
    capacityPercent: '92%',
    parking: '98%',
    foodCourts: '24',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg9h1NXvOQIhdnBp_BeB6caDHIV8G2kBiyAWLC3o36XanM0aV4xgAN_iP6iUdTbe6RWam-ZhUaOONuIoDOe6Nji3UIh042_vDbhgYNVq6XBAe2XAXasP6FR5Hoj4aFKWo2CZJkXmQEn_rvANqxpqIO4HLsxAS2EQiDG-5hxmkBKeMjSYcCf6ObmKP4zIRMPUXRSqlbU-NHWzQxqNzWY8IrsijSC5xdGEAOnMtTXzz4HleaNlEBwYWJyyjy7yyDckQX9aY7g4KjtOo'
  },
  {
    id: 'metlife',
    name: 'MetLife Stadium',
    location: 'New York, USA',
    weather: '22°C',
    statusText: 'SYSTEM STANDBY',
    event: 'System Standby',
    statusColor: 'yellow' as const,
    top: '30%',
    left: '26%',
    capacity: '12,000',
    maxCapacity: '82,500',
    capacityPercent: '15%',
    parking: '15%',
    foodCourts: '4',
    image: 'https://images.unsplash.com/photo-1574624644861-12b20f128e02?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'national',
    name: 'National Stadium',
    location: 'Tokyo, Japan',
    weather: '18°C',
    statusText: 'CRITICAL ALERT',
    event: 'Critical Alert',
    statusColor: 'red' as const,
    top: '30%',
    left: '86%',
    capacity: '65,000',
    maxCapacity: '68,000',
    capacityPercent: '95%',
    parking: '100%',
    foodCourts: '12',
    image: 'https://images.unsplash.com/photo-1540747913346-19e32fc3e6ed?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'modi',
    name: 'Narendra Modi Stadium',
    location: 'Ahmedabad, India',
    weather: '32°C',
    statusText: 'MATCH LIVE',
    event: 'Cricket Match Live',
    statusColor: 'cyan' as const,
    top: '42.5%',
    left: '70%',
    capacity: '115,000',
    maxCapacity: '132,000',
    capacityPercent: '87%',
    parking: '85%',
    foodCourts: '45',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'mcg',
    name: 'Melbourne Cricket Ground',
    location: 'Melbourne, AU',
    weather: '20°C',
    statusText: 'ACTIVE',
    event: 'Pre-show Setup',
    statusColor: 'green' as const,
    top: '80%',
    left: '89%',
    capacity: '50,000',
    maxCapacity: '100,024',
    capacityPercent: '50%',
    parking: '40%',
    foodCourts: '20',
    image: 'https://images.unsplash.com/photo-1505250469679-20330d52d1cb?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'maracana',
    name: 'Maracanã Stadium',
    location: 'Rio de Janeiro, BR',
    weather: '28°C',
    statusText: 'STANDBY',
    event: 'Routine Maintenance',
    statusColor: 'yellow' as const,
    top: '68%',
    left: '34%',
    capacity: '0',
    maxCapacity: '78,838',
    capacityPercent: '0%',
    parking: '5%',
    foodCourts: '0',
    image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&q=80&w=1200'
  }
];

const colorMap = {
  green: {
    bg: 'bg-green-400',
    fadeBg: 'bg-green-500/20',
    border: 'border-green-500/50',
    text: 'text-green-400',
    shadow: 'shadow-[0_0_20px_rgba(74,222,128,1)]'
  },
  yellow: {
    bg: 'bg-yellow-400',
    fadeBg: 'bg-yellow-500/20',
    border: 'border-yellow-500/50',
    text: 'text-yellow-400',
    shadow: 'shadow-[0_0_20px_rgba(250,204,21,1)]'
  },
  red: {
    bg: 'bg-red-500',
    fadeBg: 'bg-red-500/20',
    border: 'border-red-500/50',
    text: 'text-red-500',
    shadow: 'shadow-[0_0_20px_rgba(239,68,68,1)]'
  },
  cyan: {
    bg: 'bg-cyan-400',
    fadeBg: 'bg-cyan-500/20',
    border: 'border-cyan-500/50',
    text: 'text-cyan-400',
    shadow: 'shadow-[0_0_20px_rgba(34,211,238,1)]'
  }
};

export default function GlobalMap() {
  const [activeVenueId, setActiveVenueId] = useState<string | null>('wembley');
  const [showSidebar, setShowSidebar] = useState(false);

  const activeVenue = stadiumsData.find(s => s.id === activeVenueId) || stadiumsData[0];

  return (
    <div className="flex-1 relative h-full flex flex-col pt-16 md:pt-0 overflow-hidden bg-[#0A0E11]">
      {/* Top Search Bar (Floating over map) */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-40 w-11/12 md:w-[600px]">
         <div className="glass-panel border border-outline-variant/25 rounded-full flex items-center px-6 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] bg-surface-container-highest/60">
            <Search className="text-primary w-5 h-5 mr-4" />
            <input 
              type="text" 
              placeholder="SEARCH GLOBAL VENUES..." 
              className="bg-transparent border-none outline-none text-on-surface w-full font-['Inter'] text-sm tracking-widest placeholder:text-zinc-500 focus:ring-0" 
            />
            <div className="h-6 w-px bg-white/10 mx-4"></div>
            <button className="text-zinc-400 hover:text-primary transition-colors flex items-center justify-center">
              <Filter className="w-5 h-5" />
            </button>
         </div>
      </div>

      {/* HUD Reticle elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/10 rounded-full pointer-events-none z-10"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/20 rounded-full border-dashed pointer-events-none z-10 animate-[spin_60s_linear_infinite]"></div>

      {/* 3D Map Canvas Placeholder */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a242c_0%,#0a0e11_100%)]"></div>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(165, 231, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(165, 231, 255, 0.05) 1px, transparent 1px)", backgroundSize: "50px 50px" }}></div>
          
          {/* Real World Map Container */}
          <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
              {/* Radar rings moving passively behind the map */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[1200px] aspect-square rounded-full border border-primary/20 bg-[radial-gradient(circle_at_center,rgba(0,210,255,0.05)_0%,transparent_70%)] animate-[spin_120s_linear_infinite] pointer-events-none opacity-40">
                 <div className="absolute inset-8 rounded-full border border-primary/10"></div>
                 <div className="absolute inset-24 rounded-full border border-primary/10"></div>
                 <div className="absolute top-1/2 left-0 w-full h-px bg-primary/20"></div>
                 <div className="absolute left-1/2 top-0 h-full w-px bg-primary/20"></div>
              </div>

              {/* Aspect-locked container for accurate geolocation on map image */}
              <div className="relative w-full max-w-[1400px] h-full flex items-center justify-center p-4">
                  <div className="relative w-full aspect-[275/140]">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
                      alt="Real World Map" 
                      className="w-full h-full object-fill opacity-50 mix-blend-screen pointer-events-none relative z-10" 
                      style={{ filter: "invert(1) sepia(100%) hue-rotate(180deg) saturate(300%) brightness(70%) drop-shadow(0 0 10px rgba(0,210,255,0.3))" }}
                    />

                    {stadiumsData.map((stadium) => {
                      const colors = colorMap[stadium.statusColor];
                      const isActiveNode = showSidebar && activeVenueId === stadium.id;
                      
                      return (
                        <div 
                          key={stadium.id}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-30 pointer-events-auto" 
                          style={{ top: stadium.top, left: stadium.left }}
                          onClick={() => {
                            setActiveVenueId(stadium.id);
                            setShowSidebar(true);
                          }}
                        >
                            <div className="relative flex items-center justify-center">
                                <div className={`absolute w-12 h-12 rounded-full animate-ping ${colors.fadeBg}`}></div>
                                <div className={`absolute w-6 h-6 rounded-full border animate-pulse ${colors.border}`}></div>
                                <div className={`w-3 h-3 rounded-full border border-surface-container-lowest z-10 relative group-hover:scale-125 transition-transform ${colors.bg} ${colors.shadow}`}></div>
                                
                                {/* Selection Line */}
                                {isActiveNode && (
                                  <div className={`absolute opacity-60 h-px w-32 top-1/2 left-4 origin-left rotate-[-15deg] hidden md:block ${colors.bg} ${colors.shadow}`}></div>
                                )}
                                
                                <div className="absolute top-5 whitespace-nowrap bg-surface-container-highest/90 backdrop-blur-xl border border-outline-variant/25 px-4 py-2 rounded-lg text-[10px] sm:text-xs font-bold tracking-widest text-white shadow-[0_0_20px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 pointer-events-none mt-2 z-50">
                                    {stadium.name}
                                    <div className={`text-[9px] mt-1 flex items-center gap-1.5 ${colors.text}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${colors.bg}`}></span>
                                        {stadium.statusText}
                                    </div>
                                </div>
                            </div>
                        </div>
                      );
                    })}
                  </div>
              </div>
          </div>
      </div>

      {/* Venue Details Sidebar (Right side overlay) */}
      {showSidebar && (
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-[460px] bg-surface-container-lowest/80 backdrop-blur-3xl border-l border-white/10 shadow-[-30px_0_60px_rgba(0,0,0,0.6)] z-30 flex flex-col transition-transform duration-500 translate-x-0">
          <div className="relative h-72 w-full flex-shrink-0 group">
              <img 
                src={activeVenue.image} 
                alt={activeVenue.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/60 to-transparent"></div>
              
              <button onClick={() => setShowSidebar(false)} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20 shadow-lg z-50">
                  <X className="w-5 h-5" />
              </button>
              
              <div className={`absolute top-6 left-6 flex items-center gap-2 border backdrop-blur-xl px-4 py-2 rounded-full shadow-lg ${colorMap[activeVenue.statusColor].fadeBg} ${colorMap[activeVenue.statusColor].border}`}>
                  <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${colorMap[activeVenue.statusColor].bg} ${colorMap[activeVenue.statusColor].shadow}`}></div>
                  <span className={`text-[10px] font-bold tracking-widest uppercase ${colorMap[activeVenue.statusColor].text}`}>{activeVenue.event || 'System Status'}</span>
              </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar px-8 pb-8 -mt-20 relative z-10">
              <div className="mb-8">
                  <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-3 text-glow">{activeVenue.name}</h2>
                  <div className="flex items-center gap-4 text-sm font-semibold text-zinc-300 uppercase tracking-widest bg-white/5 w-fit px-4 py-2 rounded-lg border border-white/10 backdrop-blur-md">
                      <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {activeVenue.location}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-500"></span>
                      <span className="text-primary flex items-center gap-1.5"><CloudRain className="w-4 h-4" /> {activeVenue.weather}</span>
                  </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                  <button className="bg-gradient-to-br from-primary to-primary-container rounded-xl py-3.5 flex items-center justify-center gap-2 text-on-primary font-bold text-xs tracking-widest uppercase hover:brightness-110 shadow-[0_0_20px_rgba(0,210,255,0.3)] transition-all">
                      <Eye className="w-4 h-4" /> Enter 3D
                  </button>
                  <button className="bg-surface-container-high/60 backdrop-blur-lg hover:bg-surface-container-highest transition-colors border border-outline-variant/25 rounded-xl py-3.5 flex items-center justify-center gap-2 text-white font-bold text-xs tracking-widest uppercase shadow-lg">
                      <Calendar className="w-4 h-4" /> Schedule
                  </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                  {/* Capacity */}
                  <div className="col-span-2 glass-panel rounded-2xl p-6 shadow-xl relative overflow-hidden group border border-outline-variant/25">
                      <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700">
                          <Users className="w-24 h-24 text-primary" />
                      </div>
                      <p className="text-xs font-bold text-zinc-400 tracking-widest uppercase mb-2">Current Capacity</p>
                      <div className="flex items-end gap-3">
                          <span className="text-5xl font-black text-white tracking-tighter drop-shadow-lg">{activeVenue.capacity}</span>
                          <span className="text-sm font-bold text-primary mb-2">/ {activeVenue.maxCapacity}</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-highest rounded-full mt-5 overflow-hidden border border-white/5">
                          <div className="h-full bg-gradient-to-r from-primary to-primary-container relative" style={{ width: activeVenue.capacityPercent }}>
                              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                          </div>
                      </div>
                  </div>

                  {/* Parking */}
                  <div className="glass-panel rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-secondary/30 transition-colors border border-outline-variant/25">
                      <div className="flex justify-between items-start mb-4">
                          <p className="text-xs font-bold text-zinc-400 tracking-widest uppercase leading-tight">Parking<br/>Status</p>
                          <Car className="text-secondary w-8 h-8 bg-secondary/10 p-1.5 rounded-lg" />
                      </div>
                      <div>
                          <span className="text-3xl font-black text-secondary tracking-tighter text-glow">{activeVenue.parking}</span>
                          <p className="text-xs text-zinc-400 mt-1 font-semibold uppercase tracking-wider">Near Limit</p>
                      </div>
                  </div>

                  {/* Food Court */}
                  <div className="glass-panel rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-primary/30 transition-colors border border-outline-variant/25">
                      <div className="flex justify-between items-start mb-4">
                          <p className="text-xs font-bold text-zinc-400 tracking-widest uppercase leading-tight">Food<br/>Courts</p>
                          <Utensils className="text-primary w-8 h-8 bg-primary/10 p-1.5 rounded-lg" />
                      </div>
                      <div>
                          <span className="text-3xl font-black text-white tracking-tighter drop-shadow-lg">{activeVenue.foodCourts}</span>
                          <p className="text-xs text-primary mt-1 font-semibold uppercase tracking-wider">Active Now</p>
                      </div>
                  </div>
              </div>

              {/* Alerts */}
              <div className="glass-panel p-6 rounded-2xl border border-outline-variant/25">
                  <h3 className="text-xs font-bold text-white tracking-widest uppercase mb-5 flex items-center gap-2">
                      <Bell className="text-primary w-5 h-5" /> Live Comm Feed
                  </h3>
                  <div className="flex flex-col gap-4">
                      <div className="bg-surface-container-low/40 border border-white/5 p-4 rounded-xl flex gap-4 items-start hover:bg-white/5 transition-colors">
                          <div className="w-2.5 h-2.5 rounded-full bg-secondary mt-1 flex-shrink-0 shadow-[0_0_10px_rgba(255,249,239,0.8)]"></div>
                          <div>
                              <p className="text-sm text-white font-semibold leading-snug">VIP Section Alpha restricted access enabled.</p>
                              <p className="text-[10px] text-zinc-400 mt-1.5 uppercase tracking-wider font-semibold">2 mins ago • Security Protocol</p>
                          </div>
                      </div>
                      <div className="bg-surface-container-low/40 border border-white/5 p-4 rounded-xl flex gap-4 items-start hover:bg-white/5 transition-colors">
                          <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1 flex-shrink-0 shadow-[0_0_10px_rgba(165,231,255,0.8)]"></div>
                          <div>
                              <p className="text-sm text-white font-semibold leading-snug">South Gate traffic flow nominal.</p>
                              <p className="text-[10px] text-zinc-400 mt-1.5 uppercase tracking-wider font-semibold">15 mins ago • Crowd Dynamics</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}
