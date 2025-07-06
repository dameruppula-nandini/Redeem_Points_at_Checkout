import React from 'react';
import { ShoppingCart, Gift, User } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  userPoints: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, userPoints, onCartClick }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">ShopMart</h1>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-purple-50 px-3 py-2 rounded-lg">
              <Gift className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">
                {userPoints.toLocaleString()} Points
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">John Doe</span>
            </div>
            
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;