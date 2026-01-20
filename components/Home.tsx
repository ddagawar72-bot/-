
import React from 'react';
import { ViewType } from '../types';
import { HAIR_NEWS } from '../constants';

interface HomeProps {
  onNavigate: (view: ViewType) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 animate-fadeIn pb-10">
      <section className="relative h-64 md:h-96 rounded-2xl overflow-hidden group shadow-xl">
        <img 
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200" 
          alt="Luxury Salon" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8 text-white">
          <h2 className="font-luxury text-4xl md:text-6xl font-bold mb-2">Rhea <span className="font-light italic text-amber-200">Signature</span></h2>
          <p className="max-w-md text-stone-200 text-sm md:text-base mb-6">레아헤어샵에서 당신만의 고유한 아름다움을 완성하세요.</p>
          <button 
            onClick={() => onNavigate('booking')}
            className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-full font-medium transition-all w-fit shadow-lg active:scale-95"
          >
            지금 예약하기
          </button>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <div 
          onClick={() => onNavigate('booking')}
          className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mb-3">
            <i className="fa-solid fa-calendar-days text-stone-600"></i>
          </div>
          <h3 className="text-sm font-bold">실시간 예약</h3>
        </div>

        <div 
          onClick={() => onNavigate('color')}
          className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center"
        >
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-3">
            <i className="fa-solid fa-wand-magic-sparkles text-amber-700"></i>
          </div>
          <h3 className="text-sm font-bold">AI 컬러진단</h3>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="font-bold text-xl flex items-center gap-2">
            <span className="w-1.5 h-6 bg-amber-700 rounded-full"></span>
            오늘의 헤어뉴스
          </h3>
          <span className="text-xs text-stone-400">전체보기</span>
        </div>
        
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
          {HAIR_NEWS.map(news => (
            <div key={news.id} className="min-w-[280px] bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm">
              <img src={news.imageUrl} alt={news.title} className="w-full h-40 object-cover" />
              <div className="p-4 space-y-2">
                <span className="text-[10px] text-amber-700 font-bold">{news.date}</span>
                <h4 className="font-bold text-sm leading-tight">{news.title}</h4>
                <p className="text-xs text-stone-500 line-clamp-2">{news.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
