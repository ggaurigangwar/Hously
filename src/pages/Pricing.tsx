import React from 'react';

export function Pricing() {
  return (
    <div className="w-full max-w-4xl px-4 py-32 mx-auto text-center flex-1 relative z-10 overflow-hidden">
      <div className="orb-1" />
      <h1 className="text-6xl font-extrabold tracking-tighter text-[#022c22] mb-6 drop-shadow-sm">Studio Access</h1>
      <p className="text-[#064e3b]/70 font-medium mb-16 max-w-2xl mx-auto text-lg">Hously is currently free during our beta period. You cover your own usage via Puter.js serverless compute.</p>
      
      <div className="aether-card p-12 max-w-lg mx-auto shadow-[0_30px_60px_rgba(4,120,87,0.08)] relative z-10 transform hover:-translate-y-2 transition-transform duration-500">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#10b981] to-[#34d399] rounded-t-2xl"></div>
        <h2 className="text-sm font-bold text-[#10b981] mb-6 uppercase tracking-[0.2em] bg-[#10b981]/10 w-max mx-auto px-4 py-1.5 rounded-full">Beta License</h2>
        
        <div className="text-7xl font-extrabold tracking-tighter text-[#022c22] mb-10">$0<span className="text-lg text-[#064e3b]/50 font-semibold tracking-normal">/mo</span></div>
        
        <ul className="space-y-5 text-left text-[15px] font-semibold text-[#064e3b]/80 border-t border-[#e2e8e4] pt-8">
          <li className="flex items-center gap-4"><span className="w-2 h-2 bg-[#10b981] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span> Unlimited 2D to 3D Generation</li>
          <li className="flex items-center gap-4"><span className="w-2 h-2 bg-[#10b981] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span> Global Community Gallery</li>
          <li className="flex items-center gap-4"><span className="w-2 h-2 bg-[#10b981] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span> Full Resolution AI Export</li>
        </ul>

        <button className="tactile-button w-full mt-10 !py-5">
           Claim Beta License
        </button>
      </div>
    </div>
  );
}
