
import { MilbonColor, HairNews, UserTier } from './types';

export const MILBON_COLORS: MilbonColor[] = [
  { id: '1', name: 'Pearl Grege', code: '8-pGG', hex: '#b7a8a0', description: 'Soft pearl-like gray beige', series: 'Ordeve' },
  { id: '2', name: 'Ash Blue', code: '9-sAS', hex: '#7a8ba8', description: 'Deep cool blue ash', series: 'Addicthy' },
  { id: '3', name: 'Mermaid Lavender', code: '7-mLA', hex: '#a894b1', description: 'Romantic lavender with silver tones', series: 'Ordeve' },
  { id: '4', name: 'Matt Lime', code: '8-mLM', hex: '#a6a88a', description: 'Cool matte finish with olive hints', series: 'Ordeve' },
  { id: '5', name: 'Rose Hip', code: '7-rHP', hex: '#b17a7a', description: 'Elegant deep rose pink', series: 'Ordeve' },
  { id: '6', name: 'Cinnamon Beige', code: '9-cnB', hex: '#c5ae91', description: 'Warm and natural beige', series: 'Ordeve' }
];

export const HAIR_NEWS: HairNews[] = [
  {
    id: 'n1',
    title: '2025 S/S 트렌드: 발레아쥬 컬러',
    summary: '올 봄, 가장 우아한 무드를 연출하는 발레아쥬 스타일이 다시 돌아왔습니다.',
    imageUrl: 'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&q=80&w=800',
    date: '2024.03.20'
  },
  {
    id: 'n2',
    title: '레아 원장님이 추천하는 두피 케어',
    summary: '환절기 건조해진 두피를 위한 3단계 솔루션을 확인해보세요.',
    imageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800',
    date: '2024.03.18'
  },
  {
    id: 'n3',
    title: 'New! 밀본 크리스탈 염색제 도입',
    summary: '머릿결 손상을 최소화하는 밀본의 최신 프리미엄 라인을 만나보세요.',
    imageUrl: 'https://images.unsplash.com/photo-1595475243692-3b246990cc22?auto=format&fit=crop&q=80&w=800',
    date: '2024.03.15'
  }
];

export const TIER_CONFIG: Record<UserTier, { label: string; color: string; bg: string }> = {
  Bronze: { label: '브론즈', color: 'text-orange-800', bg: 'bg-orange-100' },
  Silver: { label: '실버', color: 'text-stone-600', bg: 'bg-stone-100' },
  Gold: { label: '골드', color: 'text-amber-700', bg: 'bg-amber-100' },
  Platinum: { label: '플래티넘', color: 'text-indigo-800', bg: 'bg-indigo-100' }
};

export const STYLISTS = ['원장 레아'];
export const SERVICES = ['컷트', '전체 염색', '뿌리 염색', '디자인 펌', '매직 셋팅', '클리닉'];
export const AVAILABLE_TIMES = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
