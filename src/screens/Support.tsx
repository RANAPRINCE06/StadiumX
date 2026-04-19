import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Support() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<null | 'sending' | 'success' | 'error'>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate database/email delivery
    setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        setTimeout(() => setStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="flex-1 w-full h-full p-6 md:p-12 overflow-y-auto bg-background text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Left Column - Form */}
        <div className="flex-1 glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-transparent"></div>
             <h1 className="text-4xl font-black font-headline uppercase tracking-tighter mb-2">Command Support</h1>
             <p className="text-sm font-mono text-zinc-400 mb-8 uppercase tracking-widest">Open a direct channel with engineering</p>
             
             <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="flex flex-col gap-2">
                         <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Operator Name</label>
                         <input 
                           type="text" 
                           required 
                           value={formData.name}
                           onChange={e => setFormData({...formData, name: e.target.value})}
                           className="bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-400 font-mono transition-colors" 
                         />
                     </div>
                     <div className="flex flex-col gap-2">
                         <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Clearance Email</label>
                         <input 
                           type="email" 
                           required 
                           value={formData.email}
                           onChange={e => setFormData({...formData, email: e.target.value})}
                           className="bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-400 font-mono transition-colors" 
                         />
                     </div>
                 </div>
                 
                 <div className="flex flex-col gap-2">
                     <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Directive Subject</label>
                     <input 
                       type="text" 
                       required 
                       value={formData.subject}
                       onChange={e => setFormData({...formData, subject: e.target.value})}
                       className="bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-400 font-mono transition-colors" 
                     />
                 </div>

                 <div className="flex flex-col gap-2">
                     <label className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Transmission Log</label>
                     <textarea 
                       required 
                       rows={6}
                       value={formData.message}
                       onChange={e => setFormData({...formData, message: e.target.value})}
                       className="bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-cyan-400 font-mono transition-colors resize-none" 
                     />
                 </div>

                 <button 
                  disabled={status === 'sending'}
                  type="submit" 
                  className="bg-cyan-500 text-black font-black uppercase tracking-widest text-sm py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(0,210,255,0.3)] disabled:opacity-50"
                >
                     {status === 'sending' ? 'Transmitting...' : status === 'success' ? 'Transmission Sent' : 'Deploy Message'}
                     <Send className="w-4 h-4" />
                 </button>
                 
                 {status === 'success' && (
                     <div className="text-center font-mono text-cyan-400 text-sm animate-pulse">
                         Support ticket registered successfully.
                     </div>
                 )}
             </form>
        </div>

        {/* Right Column - Info */}
        <div className="w-full md:w-96 flex flex-col gap-6">
            <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col gap-8">
                <div>
                    <h3 className="text-white font-black font-headline uppercase tracking-tighter text-xl mb-4">Command Center</h3>
                    <div className="flex flex-col gap-4 text-sm font-mono text-zinc-400">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 text-cyan-400">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <span>
                                STADIUMX HQ<br/>
                                100 Zenith Way, Cyber City<br/>
                                Sector 7G
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 text-cyan-400">
                                <Phone className="w-4 h-4" />
                            </div>
                            <span>+1 (800) ZENITH-X</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 text-cyan-400">
                                <Mail className="w-4 h-4" />
                            </div>
                            <span>command@StadiumX.com</span>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-white/10 pt-8">
                    <h3 className="text-white font-black font-headline uppercase tracking-tighter text-lg mb-4">System Status</h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-zinc-500">Core Engine</span>
                            <span className="text-cyan-400 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span> ONLINE</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-zinc-500">Telemetry Sync</span>
                            <span className="text-cyan-400 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span> ONLINE</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-mono">
                            <span className="text-zinc-500">Support Routing</span>
                            <span className="text-cyan-400 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span> ONLINE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
