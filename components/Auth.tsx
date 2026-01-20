
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');

  const handleSendCode = () => {
    if (phone.length < 10) return alert('올바른 전화번호를 입력하세요.');
    setStep(2);
    // Real-world: Integration with SMS API (Aligo, Twilio, etc.) would happen here
  };

  const handleVerify = () => {
    // For simulation/demo purposes, we use '1234'
    if (code !== '1234') return alert('인증번호가 틀렸습니다. 테스트용 번호인 1234를 입력해주세요.');
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || '고객',
      phone: phone,
      tier: 'Bronze',
      isAdmin: phone === '01012345678' // Demo admin number
    };
    onLogin(newUser);
  };

  return (
    <div className="max-w-md mx-auto pt-16 px-6 animate-fadeIn">
      <div className="text-center mb-12 space-y-3">
        <h1 className="font-luxury text-4xl font-bold tracking-widest text-stone-800">RHEA</h1>
        <div className="h-px w-12 bg-amber-700 mx-auto"></div>
        <p className="text-stone-500 text-sm font-medium">프리미엄 헤어 살롱, 레아에 오신 것을 환영합니다.</p>
      </div>

      <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-stone-200 border border-stone-100 space-y-8">
        {step === 1 ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 px-1">NAME</label>
                <input 
                  type="text" 
                  placeholder="성함을 입력하세요"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-amber-700/10 focus:border-amber-700/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2 px-1">PHONE NUMBER</label>
                <input 
                  type="tel" 
                  placeholder="01012345678"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full p-4 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-amber-700/10 focus:border-amber-700/30 transition-all font-mono"
                />
              </div>
            </div>
            
            <button 
              onClick={handleSendCode}
              disabled={!phone || !name}
              className={`w-full py-5 rounded-2xl font-bold transition-all shadow-lg ${(!phone || !name) ? 'bg-stone-200 text-stone-400' : 'bg-stone-900 text-white hover:bg-black active:scale-95'}`}
            >
              인증번호 받기
            </button>
            
            <p className="text-[10px] text-center text-stone-400 leading-relaxed">
              가입 시 레아헤어의 이용약관 및 개인정보 처리방침에<br/>동의하는 것으로 간주됩니다.
            </p>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-stone-600">인증번호가 전송되었습니다.</p>
              <p className="text-[11px] text-amber-700 font-bold bg-amber-50 py-1 px-3 rounded-full inline-block">테스트 번호: 1234</p>
            </div>

            <div className="space-y-4">
              <input 
                type="text" 
                maxLength={4}
                placeholder="0 0 0 0"
                value={code}
                onChange={e => setCode(e.target.value)}
                className="w-full p-5 bg-stone-50 border border-stone-100 rounded-2xl outline-none focus:ring-2 focus:ring-amber-700/10 text-center text-3xl font-bold tracking-[0.5em] text-stone-800"
              />
              
              <button 
                onClick={handleVerify}
                className="w-full py-5 bg-amber-700 text-white rounded-2xl font-bold hover:bg-amber-800 transition-all shadow-lg active:scale-95"
              >
                시작하기
              </button>
            </div>
            
            <button 
              onClick={() => setStep(1)} 
              className="w-full text-stone-400 text-xs font-medium hover:text-stone-600 transition-colors"
            >
              번호가 틀리신가요? 뒤로가기
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-12 text-center text-stone-300">
        <i className="fa-solid fa-shield-halved text-2xl"></i>
        <p className="text-[9px] mt-2 tracking-widest uppercase font-bold">Secure Professional Service</p>
      </div>
    </div>
  );
};
