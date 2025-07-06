export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  pointsConversionRate: number; // points per rupee
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  pointsUsed: number;
  pointsDiscount: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentInfo: PaymentInfo;
  estimatedDelivery: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}

export interface PointsRedemption {
  pointsToUse: number;
  discountAmount: number;
  remainingPoints: number;
}