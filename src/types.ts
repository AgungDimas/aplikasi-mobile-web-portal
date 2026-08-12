export type ViewMode = 'mobile' | 'web';

export type PhoneSkin = 'iphone-titanium' | 'midnight-dark' | 'rose-gold' | 'silver-steel';

export type ActiveTab = 'home' | 'ppob' | 'shop' | 'cashier' | 'ai-chat' | 'wallet' | 'tasks' | 'settings';

export interface Product {
  id: string;
  name: string;
  category: 'Elektronik' | 'Aksesoris' | 'Fashion' | 'Makanan' | 'Digital';
  price: number;
  originalPrice?: number;
  rating: number;
  salesCount: number;
  stock: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Transaction {
  id: string;
  type: 'PPOB' | 'TOKO' | 'KASIR' | 'TOPUP';
  title: string;
  amount: number;
  status: 'SELESAI' | 'PENDING' | 'BATAL';
  date: string;
  paymentMethod: string;
  receiptNumber: string;
  details?: string;
}

export interface PpobItem {
  id: string;
  category: 'pulsa' | 'data' | 'pln' | 'pdam';
  provider: string;
  title: string;
  price: number;
  nominal: string;
  description: string;
}

export interface AiMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface TaskItem {
  id: string;
  title: string;
  category: 'Bisnis' | 'Pribadi' | 'Belanja' | 'Keuangan';
  dueDate: string;
  completed: boolean;
  priority: 'tinggi' | 'sedang' | 'rendah';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'promo';
}
