import React, { useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmation from './components/OrderConfirmation';
import { mockProducts, mockUser } from './data/mockData';
import { CartItem, Product, Order } from './types';

type AppState = 'shopping' | 'checkout' | 'confirmation';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appState, setAppState] = useState<AppState>('shopping');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userPoints, setUserPoints] = useState(mockUser.points);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setAppState('checkout');
  };

  const handleOrderComplete = (order: Order) => {
    setCurrentOrder(order);
    setCartItems([]);
    setUserPoints(prev => prev - order.pointsUsed);
    setAppState('confirmation');
  };

  const handleContinueShopping = () => {
    setCurrentOrder(null);
    setAppState('shopping');
  };

  const handleBackToCart = () => {
    setAppState('shopping');
    setIsCartOpen(true);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (appState === 'checkout') {
    return (
      <CheckoutPage
        cartItems={cartItems}
        userPoints={userPoints}
        onBack={handleBackToCart}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  if (appState === 'confirmation' && currentOrder) {
    return (
      <OrderConfirmation
        order={currentOrder}
        onContinueShopping={handleContinueShopping}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItemCount}
        userPoints={userPoints}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Products</h2>
          <p className="text-gray-600">Discover our latest collection with amazing deals</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>
      
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;