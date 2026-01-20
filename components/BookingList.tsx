
import React, { useState } from 'react';
import { Reservation, User, UserTier } from '../types';
import { TIER_CONFIG } from '../constants';

interface BookingListProps {
  reservations: Reservation[];
  onCancel: (id: string) => void;
  onUpdate: (reservation: Reservation) => void;
  isAdmin?: boolean;
  allUsers?: User[];
  onUpdateTier?: (userId: string, tier: UserTier) => void;
}

export const BookingList: React.FC<BookingListProps> = ({ 
  reservations, onCancel, onUpdate, isAdmin, allUsers, onUpdateTier 
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDate, setEditDate] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'bookings' | 'users'>('bookings');

  const tiers: UserTier[] = ['Bronze', 'Silver', 'Gold', 'Platinum'];

  return (
    <div className="space-y-6 animate-fadeIn">
      {isAdmin && (
        <div className="flex bg-white rounded-2xl p-1 shadow-sm mb-6 border border-stone-100">
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'bookings' ? 'bg-amber-700 text-white' : 'text-stone-400'}`}
          >
            예약 관리
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'users' ? 'bg-amber-700 text-white' : 'text-stone-400'}`}
          >
            회원 등급 관리
          </button>
        </div>
      )}

      {activeTab === 'bookings' ? (
        <>
          <header className="space-y-1">
            <h2 className="text-2xl font-bold">{isAdmin ? '전체 예약 현황' : '내 예약 내역'}</h2>
            <p className="text-sm text-stone-500">
              {isAdmin ? '관리자 모드: 모든 예약을 수정/취소할 수 있습니다.' : '고객님의 예약 내역을 확인하고 날짜를 수정할 수 있습니다.'}
            </p>
          </header>

          {reservations.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-3xl p-12 text-center space-y-4">
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto">
                <i className="fa-solid fa-calendar-xmark text-3xl text-stone-200"></i>
              </div>
              <p className="text-stone-400 font-medium">진행 중인 예약이 없습니다.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map(res => (
                <div key={res.id} className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-amber-200">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                      <i className="fa-solid fa-scissors text-amber-700"></i>
                    </div>
                    <div>
                      <h3 className="font-bold">{res.service}</h3>
                      <p className="text-sm text-stone-500">{res.stylist} | {res.customerName}님</p>
                      
                      {editingId === res.id ? (
                        <div className="mt-2 flex items-center gap-2">
                          <input 
                            type="date" 
                            value={editDate}
                            onChange={(e) => setEditDate(e.target.value)}
                            className="text-xs p-1 border rounded bg-stone-50"
                          />
                          <button onClick={() => { onUpdate({...res, date: editDate}); setEditingId(null); }} className="text-[10px] bg-amber-700 text-white px-2 py-1 rounded">저장</button>
                          <button onClick={() => setEditingId(null)} className="text-[10px] bg-stone-200 px-2 py-1 rounded">취소</button>
                        </div>
                      ) : (
                        <div className="flex gap-2 mt-2">
                          <span className="text-[10px] font-bold px-2 py-1 bg-stone-100 rounded-md">{res.date}</span>
                          <span className="text-[10px] font-bold px-2 py-1 bg-stone-100 rounded-md">{res.time}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase">
                      {res.status}
                    </div>
                    {(isAdmin || true) && (
                       <button onClick={() => { setEditingId(res.id); setEditDate(res.date); }} className="p-2 text-stone-400 hover:text-amber-700">
                         <i className="fa-solid fa-calendar-day"></i>
                       </button>
                    )}
                    <button onClick={() => onCancel(res.id)} className="p-2 text-stone-400 hover:text-red-500">
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-6">
          <header>
            <h2 className="text-2xl font-bold">회원 등급 관리</h2>
            <p className="text-sm text-stone-500">고객별 등급을 수동으로 조정할 수 있습니다.</p>
          </header>

          <div className="bg-white rounded-3xl border border-stone-100 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-100">
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-stone-400 text-xs">고객명</th>
                  <th className="px-6 py-4 text-left font-bold text-stone-400 text-xs">연락처</th>
                  <th className="px-6 py-4 text-left font-bold text-stone-400 text-xs">현재 등급</th>
                  <th className="px-6 py-4 text-right font-bold text-stone-400 text-xs">등급 변경</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {allUsers?.map(u => (
                  <tr key={u.id}>
                    <td className="px-6 py-4 font-bold">{u.name}</td>
                    <td className="px-6 py-4 text-stone-500">{u.phone}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${TIER_CONFIG[u.tier].bg} ${TIER_CONFIG[u.tier].color}`}>
                        {TIER_CONFIG[u.tier].label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        value={u.tier} 
                        onChange={(e) => onUpdateTier?.(u.id, e.target.value as UserTier)}
                        className="text-xs bg-stone-50 border border-stone-200 rounded-lg p-1 outline-none focus:ring-1 focus:ring-amber-500"
                      >
                        {tiers.map(t => <option key={t} value={t}>{TIER_CONFIG[t].label}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
