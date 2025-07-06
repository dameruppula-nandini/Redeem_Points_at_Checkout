import { Product, User } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 2999,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    description: 'Premium wireless headphones with noise cancellation',
    rating: 4.5,
    reviews: 128
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 4499,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    description: 'Track your fitness goals with advanced health monitoring',
    rating: 4.3,
    reviews: 95
  },
  {
    id: '3',
    name: 'Leather Laptop Bag',
    price: 1899,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Accessories',
    description: 'Premium leather laptop bag with multiple compartments',
    rating: 4.7,
    reviews: 64
  },
  {
    id: '4',
    name: 'Wireless Smartphone',
    price: 15999,
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    description: 'Latest smartphone with advanced camera and performance',
    rating: 4.6,
    reviews: 203
  },
  {
    id: '5',
    name: 'Designer Sunglasses',
    price: 1299,
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Accessories',
    description: 'Stylish sunglasses with UV protection',
    rating: 4.2,
    reviews: 87
  },
  {
    id: '6',
    name: 'Mechanical Keyboard',
    price: 3499,
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    description: 'RGB mechanical keyboard for gaming and productivity',
    rating: 4.8,
    reviews: 156
  }
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+91 98765 43210',
  points: 2500,
  pointsConversionRate: 10 // 10 points = 1 rupee
};