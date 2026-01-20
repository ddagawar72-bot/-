
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { BookingSection } from './components/BookingSection';
import { ColorSimulator } from './components/ColorSimulator';
import { BookingList } from './components/BookingList';
import { Auth } from './components/Auth';
import { ViewType, Reservation, User, UserTier } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('home');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [kakaoNotify, setKakaoNotify] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // Local storage effects
  useEffect(() => {
    const savedRes = localStorage.getItem('rhea_reservations');
    const savedUser = localStorage.getItem('rhea_user');
    const savedAllUsers = localStorage.getItem('rhea_all_users');
    
    if (savedRes) setReservations(JSON.parse(savedRes));
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedAllUsers) setAllUsers(JSON.parse(savedAllUsers));
  }, []);

  useEffect(() => {
    localStorage.setItem('rhea_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    if (user) localStorage.setItem('rhea_user', JSON.stringify(user));
    else localStorage.removeItem('rhea_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('rhea_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setAllUsers(prev => {
      if (prev.find(u => u.phone === newUser.phone)) return prev;
      return [...prev, newUser];
    });
    setActiveView('home');
  };

  const handleBookingComplete = (newRes: Reservation) => {
    setReservations([newRes, ...reservations]);
    setActiveView('my-bookings');
    
    // Simulate Admin Notification
    if (user?.isAdmin) {
      alert('[관리자 알림] 새 예약이 접수되었습니다: ' + newRes.customerName);
    }

    // Simulate KakaoTalk Alert
    setKakaoNotify(`알림톡: ${newRes.customerName}님, ${newRes.date} ${newRes.time} 예약이 완료되었습니다.`);
    setTimeout(() => setKakaoNotify(null), 5000);
  };

  const handleUpdateTier = (userId: string, newTier: UserTier) => {
    setAllUsers(prev => prev.map(u => u.id === userId ? { ...u, tier: newTier } : u));
    if (user?.id === userId) setUser({ ...user, tier: newTier });
  };

  const renderContent = () => {
    if (!user) return <Auth onLogin={handleLogin} />;

    switch (activeView) {
      case 'home':
        return <Home onNavigate={setActiveView} />;
      case 'booking':
        // Providing the required userId prop to BookingSection
        return <BookingSection onComplete={handleBookingComplete} userId={user.id} />;
      case 'color':
        return <ColorSimulator />;
      case 'my-bookings':
        return (
          <BookingList 
            reservations={reservations.filter(r => r.userId === user.id || user.isAdmin)} 
            onCancel={(id) => setReservations(prev => prev.filter(r => r.id !== id))}
            onUpdate={(res) => setReservations(prev => prev.map(r => r.id === res.id ? res : r))}
            isAdmin={user.isAdmin}
            allUsers={allUsers}
            onUpdateTier={handleUpdateTier}
          />
        );
      default:
        return <Home onNavigate={setActiveView} />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      <div className="pb-12">
        {renderContent()}
      </div>

      {/* Kakao Notify Simulation */}
      {kakaoNotify && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-yellow-400 text-stone-900 p-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 animate-slideDown">
          <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center shrink-0">
            <i className="fa-solid fa-comment text-yellow-400"></i>
          </div>
          <p className="text-xs font-bold leading-tight">{kakaoNotify}</p>
        </div>
      )}
    </Layout>
  );
};

export default App;
