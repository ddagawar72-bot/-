
import React, { useState, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { MILBON_COLORS } from '../constants';
import { MilbonColor } from '../types';

export const ColorSimulator: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<MilbonColor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setPreviewImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const runSimulation = async () => {
    if (!selectedImage || !selectedColor) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await geminiService.simulateHairColor(
        selectedImage, 
        selectedColor.name, 
        selectedColor.code
      );
      if (result) {
        setPreviewImage(result);
      } else {
        setError("이미지를 처리하는 데 실패했습니다.");
      }
    } catch (err) {
      setError("AI 시뮬레이션 중 오류가 발생했습니다. 나중에 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn space-y-8">
      <header className="text-center space-y-2">
        <h2 className="font-luxury text-3xl font-bold">MILBON Color Studio</h2>
        <p className="text-stone-500 max-w-lg mx-auto">당신의 사진에 밀본 프리미엄 컬러를 입혀보세요. <br/>AI가 가장 잘 어울리는 톤을 보여드립니다.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Side: Photo Input/Preview */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] bg-stone-100 rounded-3xl overflow-hidden border-2 border-dashed border-stone-200 flex items-center justify-center">
            {previewImage ? (
              <img src={previewImage} alt="Simulated Hair" className="w-full h-full object-cover animate-fadeIn" />
            ) : selectedImage ? (
              <img src={selectedImage} alt="Original" className="w-full h-full object-cover animate-fadeIn" />
            ) : (
              <div className="text-center p-8 space-y-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <i className="fa-solid fa-camera text-3xl text-stone-300"></i>
                </div>
                <p className="text-stone-400 font-medium">정면 사진을 업로드하세요.</p>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-stone-900 text-white px-6 py-2 rounded-full text-sm font-medium"
                >
                  파일 선택
                </button>
              </div>
            )}
            
            {loading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white p-8">
                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-center font-medium">밀본 컬러 디자인 중...</p>
                <p className="text-xs text-stone-300 mt-2">AI가 자연스러운 색상을 구현하고 있습니다.</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-3 px-4 bg-white border border-stone-200 rounded-xl text-sm font-medium hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-upload"></i> 사진 변경
            </button>
            {previewImage && (
              <button 
                onClick={() => {setPreviewImage(null);}}
                className="flex-1 py-3 px-4 bg-white border border-stone-200 rounded-xl text-sm font-medium hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-rotate-left"></i> 원본 보기
              </button>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Right Side: Color Selection */}
        <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="font-bold text-lg">MILBON ORDEVE Selection</h3>
            <p className="text-sm text-stone-500">원하는 색상군을 선택하세요.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {MILBON_COLORS.map(color => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color)}
                className={`group p-3 rounded-2xl border-2 transition-all text-left flex flex-col gap-2 ${selectedColor?.id === color.id ? 'border-amber-700 bg-amber-50' : 'border-stone-50 hover:border-stone-200 bg-stone-50'}`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-black/5 shadow-inner" style={{ backgroundColor: color.hex }}></div>
                  <span className="text-[10px] font-bold text-stone-400">{color.code}</span>
                </div>
                <div>
                  <p className="text-xs font-bold truncate">{color.name}</p>
                  <p className="text-[9px] text-stone-400 line-clamp-1">{color.description}</p>
                </div>
              </button>
            ))}
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-xs rounded-xl flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          <button
            disabled={!selectedImage || !selectedColor || loading}
            onClick={runSimulation}
            className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${!selectedImage || !selectedColor || loading ? 'bg-stone-200 text-stone-400 cursor-not-allowed' : 'bg-amber-700 text-white hover:bg-amber-800 active:scale-95'}`}
          >
            <i className="fa-solid fa-sparkles"></i>
            컬러 프리뷰 생성하기
          </button>

          <div className="bg-stone-50 p-4 rounded-xl">
             <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">Selected Color Info</h4>
             {selectedColor ? (
               <div className="animate-fadeIn">
                 <p className="text-sm font-bold">{selectedColor.name} <span className="text-amber-700">({selectedColor.code})</span></p>
                 <p className="text-xs text-stone-500 mt-1 leading-relaxed">{selectedColor.description}</p>
                 <p className="text-[10px] text-amber-800 bg-amber-100 w-fit px-2 py-0.5 rounded mt-2">{selectedColor.series} Series</p>
               </div>
             ) : (
               <p className="text-xs text-stone-400 italic">시뮬레이션할 컬러를 위에서 선택해주세요.</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};
