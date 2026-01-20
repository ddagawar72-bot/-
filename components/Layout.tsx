
import React from 'react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0 md:pt-16">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 border-b border-stone-200 py-4 px-6 flex justify-between items-center shadow-sm">
        <h1 
          className="font-luxury text-2xl font-bold tracking-tighter cursor-pointer"
          onClick={() => setActiveView('home')}
        >
          RHEA <span className="text-amber-700 font-light">HAIR SHOP</span>
        </h1>
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <button onClick={() => setActiveView('home')} className={activeView === 'home' ? 'text-amber-700' : 'hover:text-amber-600'}>홈</button>
          <button onClick={() => setActiveView('booking')} className={activeView === 'booking' ? 'text-amber-700' : 'hover:text-amber-600'}>예약하기</button>
          <button onClick={() => setActiveView('color')} className={activeView === 'color' ? 'text-amber-700' : 'hover:text-amber-600'}>컬러 시뮬레이션</button>
          <button onClick={() => setActiveView('my-bookings')} className={activeView === 'my-bookings' ? 'text-amber-700' : 'hover:text-amber-600'}>예약 확인</button>
        </nav>
      </header>

      <main className="flex-grow container mx-auto max-w-4xl px-4 py-8 mt-16 md:mt-0">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 md:hidden z-50 px-6 py-3 flex justify-between items-center shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button onClick={() => setActiveView('home')} className={`flex flex-col items-center gap-1 ${activeView === 'home' ? 'text-amber-700' : 'text-stone-400'}`}>
          <i className="fa-solid fa-house"></i>
          <span className="text-[10px]">홈</span>
        </button>
        <button onClick={() => setActiveView('booking')} className={`flex flex-col items-center gap-1 ${activeView === 'booking' ? 'text-amber-700' : 'text-stone-400'}`}>
          <i className="fa-solid fa-calendar-check"></i>
          <span className="text-[10px]">예약</span>
        </button>
        <button onClick={() => setActiveView('color')} className={`flex flex-col items-center gap-1 ${activeView === 'color' ? 'text-amber-700' : 'text-stone-400'}`}>
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          <span className="text-[10px]">AI컬러</span>
        </button>
        <button onClick={() => setActiveView('my-bookings')} className={`flex flex-col items-center gap-1 ${activeView === 'my-bookings' ? 'text-amber-700' : 'text-stone-400'}`}>
          <i className="fa-solid fa-user"></i>
          <span className="text-[10px]">내예약</span>
        </button>
      </nav>
    </div>
  );
};
