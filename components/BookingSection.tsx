
import React, { useState } from 'react';
import { BookingFormState, Reservation } from '../types';
import { STYLISTS, SERVICES, AVAILABLE_TIMES } from '../constants';

interface BookingSectionProps {
  onComplete: (reservation: Reservation) => void;
  userId: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ onComplete, userId }) => {
  const [form, setForm] = useState<BookingFormState>({
    customerName: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: AVAILABLE_TIMES[0],
    service: SERVICES[0],
    stylist: STYLISTS[0]
  });

  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Added userId to satisfy the Reservation type requirements
    const newReservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      userId: userId,
      ...form,
      status: 'pending'
    };
    onComplete(newReservation);
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="bg-stone-900 px-8 py-6 text-white">
        <h2 className="font-luxury text-2xl font-bold">예약하기</h2>
        <p className="text-stone-400 text-xs mt-1">상담부터 시술까지 정성을 다하겠습니다.</p>
        
        <div className="flex gap-2 mt-6">
          {[1, 2, 3].map(s => (
            <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-amber-500' : 'bg-stone-700'}`}></div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">디자이너</label>
              <div className="bg-stone-50 border border-amber-200 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-900">{STYLISTS[0]}</span>
                  <p className="text-[10px] text-stone-500">레아헤어샵의 대표 원장님입니다.</p>
                </div>
                <i className="fa-solid fa-crown text-amber-500"></i>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">시술 종류</label>
              <select 
                value={form.service}
                onChange={(e) => setForm({...form, service: e.target.value})}
                className="w-full p-4 rounded-xl border-2 border-stone-100 bg-stone-50 outline-none focus:border-amber-700 transition-all"
              >
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">예약 날짜</label>
              <input 
                type="date" 
                value={form.date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setForm({...form, date: e.target.value})}
                className="w-full p-4 rounded-xl border-2 border-stone-100 bg-stone-50 outline-none focus:border-amber-700 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">예약 시간</label>
              <div className="grid grid-cols-3 gap-2">
                {AVAILABLE_TIMES.map(time => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setForm({ ...form, time })}
                    className={`p-3 rounded-lg text-sm transition-all ${form.time === time ? 'bg-amber-700 text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">예약자 성함</label>
              <input 
                type="text" 
                required
                placeholder="홍길동"
                value={form.customerName}
                onChange={(e) => setForm({...form, customerName: e.target.value})}
                className="w-full p-4 rounded-xl border-2 border-stone-100 bg-stone-50 outline-none focus:border-amber-700 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">연락처</label>
              <input 
                type="tel" 
                required
                placeholder="010-0000-0000"
                value={form.phone}
                onChange={(e) => setForm({...form, phone: e.target.value})}
                className="w-full p-4 rounded-xl border-2 border-stone-100 bg-stone-50 outline-none focus:border-amber-700 transition-all"
              />
            </div>
            <div className="bg-amber-50 p-4 rounded-xl space-y-1">
              <p className="text-xs text-amber-700 font-bold uppercase">예약 확인서</p>
              <p className="text-sm font-medium">{form.stylist} | {form.service}</p>
              <p className="text-sm text-stone-600">{form.date} {form.time}</p>
            </div>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          {step > 1 && (
            <button 
              type="button" 
              onClick={prevStep}
              className="flex-1 py-4 px-6 rounded-xl border border-stone-200 font-medium hover:bg-stone-50 transition-all"
            >
              이전
            </button>
          )}
          {step < 3 ? (
            <button 
              type="button" 
              onClick={nextStep}
              className="flex-[2] py-4 px-6 rounded-xl bg-stone-900 text-white font-medium hover:bg-black transition-all"
            >
              다음 단계
            </button>
          ) : (
            <button 
              type="submit" 
              className="flex-[2] py-4 px-6 rounded-xl bg-amber-700 text-white font-medium hover:bg-amber-800 transition-all"
            >
              예약 완료하기
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
