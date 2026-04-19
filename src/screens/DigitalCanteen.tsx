import { MapPin, Search, ChevronRight, ShoppingCart, Plus, Minus, CreditCard, Apple } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createOrder, subscribeToOrders, Order } from '../lib/db';

// Using consistent high-quality food images
const foodItems = [
  { id: 1, name: 'Premium Wagyu Burger', price: 24.00, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800', isLarge: true },
  { id: 2, name: 'Truffle Fries', price: 8.50, img: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&q=80&w=800', isLarge: false },
  { id: 3, name: 'Stadium Draft IPA', price: 12.00, img: 'https://images.unsplash.com/photo-1614316047711-2d7c07da29b4?auto=format&fit=crop&q=80&w=800', isLarge: false },
  { id: 4, name: 'Artisan Pizza Slice', price: 9.00, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800', isLarge: false },
  { id: 5, name: 'Loaded Nachos', price: 14.00, img: 'https://images.unsplash.com/photo-1513442542281-bfd850ec43b1?auto=format&fit=crop&q=80&w=800', isLarge: true },
  { id: 6, name: 'Spicy Chicken Wings', price: 16.00, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800', isLarge: false },
];

export default function DigitalCanteen({ user }: { user?: any }) {
  const [cart, setCart] = useState<{id: number, quantity: number}[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToOrders(user.uid, (data) => {
      setOrders(data);
    });
    return () => unsubscribe();
  }, [user]);

  const updateQuantity = (id: number, delta: number) => {
    setCart(current => {
      const existing = current.find(item => item.id === id);
      if (existing) {
        const newQuantity = existing.quantity + delta;
        if (newQuantity <= 0) {
          return current.filter(item => item.id !== id);
        }
        return current.map(item => item.id === id ? { ...item, quantity: newQuantity } : item);
      }
      if (delta > 0) return [...current, { id, quantity: 1 }];
      return current;
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, cartItem) => {
      const item = foodItems.find(f => f.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
  };

  const handleCheckout = async () => {
    if (!user || cart.length === 0) return;
    setIsProcessing(true);
    try {
      const total = getCartTotal() + 2.50; // Add fixed delivery fee
      await createOrder({
        userId: user.uid,
        items: cart.map(cartItem => {
          const item = foodItems.find(f => f.id === cartItem.id);
          return {
            itemId: item?.id,
            name: item?.name,
            price: item?.price,
            quantity: cartItem.quantity
          };
        }),
        total: total,
        status: 'pending'
      });
      setCart([]); // Clear cart
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Order error", error);
      alert("Error placing order.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex w-full h-[calc(100vh-72px)] bg-background overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] animate-float-delayed"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-6 md:p-10 lg:pr-6 overflow-y-auto z-10 no-scrollbar relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
                <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-white mb-2 uppercase drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]">
                    Digital <span className="text-primary">Canteen</span>
                </h1>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 bg-surface-container-high border border-outline-variant/30 px-3 py-1 rounded-full text-xs font-bold text-on-surface-variant tracking-wider uppercase">
                        <MapPin className="w-3.5 h-3.5 text-primary" /> Sector 2, Concourse
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Select & Checkout</span>
                </div>
            </div>

            <div className="flex items-center bg-surface-container-lowest/80 border border-white/10 rounded-full px-5 py-3 w-full md:w-auto md:min-w-[300px] shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                <Search className="text-outline w-5 h-5 mr-3" />
                <input 
                    type="text" 
                    placeholder="Search menu..." 
                    className="bg-transparent border-none text-sm text-white focus:ring-0 placeholder-zinc-600 outline-none w-full font-['Inter']"
                />
            </div>
        </div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar mb-8 pb-2">
            <button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-primary text-black font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(0,210,255,0.5)] transition-all">Featured</button>
            <button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container-high border border-white/5 text-zinc-400 font-bold text-xs uppercase tracking-widest hover:text-white transition-all">Hot Food</button>
            <button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container-high border border-white/5 text-zinc-400 font-bold text-xs uppercase tracking-widest hover:text-white transition-all">Snacks</button>
            <button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container-high border border-white/5 text-zinc-400 font-bold text-xs uppercase tracking-widest hover:text-white transition-all">Beverages</button>
            <button className="whitespace-nowrap px-6 py-2.5 rounded-full bg-surface-container-high border border-white/5 text-zinc-400 font-bold text-xs uppercase tracking-widest hover:text-white transition-all">Alcohol</button>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[240px]">
          {foodItems.map((item) => (
            <div 
              key={item.id} 
              className={`group relative rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-primary/50 transition-all duration-300 ${item.isLarge ? 'md:col-span-2 xl:col-span-2' : 'col-span-1'} shadow-xl hover:shadow-[0_0_30px_rgba(0,210,255,0.15)] flex flex-col`}
            >
                {/* Background Image Image */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-900">
                    <img 
                      src={item.img} 
                      alt={item.name} 
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105 mix-blend-luminosity group-hover:mix-blend-normal"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                    {/* Add to cart button (Top Right) */}
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 z-20 shadow-lg"
                    >
                        <Plus className="w-5 h-5" />
                    </button>

                    <div className="flex justify-between items-end gap-4 mt-auto">
                        <div>
                            <h3 className="text-xl md:text-2xl font-black font-headline text-white tracking-tight drop-shadow-md group-hover:text-primary transition-colors">{item.name}</h3>
                            <p className="text-sm font-mono text-zinc-400 mt-1 uppercase tracking-widest">In Stock</p>
                        </div>
                        <div className="text-2xl font-black font-mono text-white bg-black/60 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md">
                            ${item.price.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar: Checkout Panel */}
      <div className="hidden lg:flex w-[400px] flex-col bg-surface-container-lowest border-l border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-20 relative">
          <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
          
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-surface-container-highest/20">
              <h2 className="text-xl font-black font-headline tracking-tight text-white flex gap-3 items-center uppercase">
                  <ShoppingCart className="w-6 h-6 text-primary" /> Active Order
              </h2>
              <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-widest">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)} ITEMS
              </span>
          </div>

          <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 no-scrollbar">
              {cart.map(cartItem => {
                  const item = foodItems.find(f => f.id === cartItem.id);
                  if (!item) return null;
                  return (
                      <div key={cartItem.id} className="flex gap-4 items-center glass-panel p-4 rounded-2xl border border-white/5 relative overflow-hidden group">
                          <div className="w-16 h-16 rounded-xl bg-zinc-800 overflow-hidden flex-shrink-0 border border-white/10">
                              <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-80" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                              <p className="text-xs font-mono text-primary mt-1">${item.price.toFixed(2)}</p>
                          </div>
                          
                          <div className="flex items-center gap-2 bg-black/40 rounded-lg p-1 border border-white/10">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                              >
                                  <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-6 text-center text-sm font-mono font-bold text-white">{cartItem.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-6 h-6 rounded flex items-center justify-center text-primary hover:text-black hover:bg-primary transition-colors"
                              >
                                  <Plus className="w-4 h-4" />
                              </button>
                          </div>
                      </div>
                  );
              })}

              {cart.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-4 opacity-50">
                      <ShoppingCart className="w-12 h-12" />
                      <p className="font-mono text-sm uppercase tracking-widest">Order is empty</p>
                  </div>
              )}
          </div>

          <div className="p-8 border-t border-white/5 bg-surface-container-highest/20 backdrop-blur-xl">
              <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-zinc-400 text-sm font-medium">
                      <span>Subtotal</span>
                      <span className="font-mono">${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 text-sm font-medium">
                      <span>Live Delivery Fee</span>
                      <span className="font-mono">$2.50</span>
                  </div>
                  <div className="flex justify-between text-white text-lg font-black pt-3 border-t border-white/10">
                      <span>Total</span>
                      <span className="font-mono text-primary">${(getCartTotal() + (cart.length > 0 ? 2.50 : 0)).toFixed(2)}</span>
                  </div>
              </div>

              <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleCheckout}
                    disabled={cart.length === 0 || isProcessing}
                    className="w-full py-4 rounded-xl font-black font-headline tracking-widest text-on-primary-fixed bg-gradient-to-r from-primary to-primary-container shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:shadow-[0_0_30px_rgba(0,210,255,0.5)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase disabled:opacity-50 disabled:cursor-not-allowed">
                      {isProcessing ? 'Processing...' : 'Confirm & Pay'}
                      <ChevronRight className="w-5 h-5" />
                  </button>
                  <div className="flex gap-3">
                      <button className="flex-1 py-3 bg-surface-container border border-white/10 rounded-xl flex items-center justify-center text-zinc-300 hover:text-white hover:border-white/30 transition-all">
                          <Apple className="w-5 h-5" />
                      </button>
                      <button className="flex-1 py-3 bg-surface-container border border-white/10 rounded-xl flex items-center justify-center text-zinc-300 hover:text-white hover:border-white/30 transition-all">
                          <CreditCard className="w-5 h-5" />
                      </button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
