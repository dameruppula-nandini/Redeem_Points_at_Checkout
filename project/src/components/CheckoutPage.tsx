import React, { useState } from 'react';
import { ArrowLeft, CreditCard, MapPin, User, Shield } from 'lucide-react';
import { CartItem, Address, PaymentInfo, PointsRedemption as PointsRedemptionType, Order } from '../types';
import PointsRedemption from './PointsRedemption';

interface CheckoutPageProps {
  cartItems: CartItem[];
  userPoints: number;
  onBack: () => void;
  onOrderComplete: (order: Order) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  userPoints,
  onBack,
  onOrderComplete
}) => {
  const [shippingAddress, setShippingAddress] = useState<Address>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });
  
  const [billingAddress, setBillingAddress] = useState<Address>({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  
  const [pointsRedemption, setPointsRedemption] = useState<PointsRedemptionType | null>(null);
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 2000 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const pointsDiscount = pointsRedemption?.discountAmount || 0;
  const total = subtotal + shipping + tax - pointsDiscount;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const order: Order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      items: cartItems,
      subtotal,
      shipping,
      tax,
      pointsUsed: pointsRedemption?.pointsToUse || 0,
      pointsDiscount,
      total,
      shippingAddress: sameAsBilling ? billingAddress : shippingAddress,
      billingAddress,
      paymentInfo,
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
      status: 'confirmed'
    };
    
    onOrderComplete(order);
  };
  
  const updateShippingAddress = (field: keyof Address, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };
  
  const updateBillingAddress = (field: keyof Address, value: string) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }));
  };
  
  const updatePaymentInfo = (field: keyof PaymentInfo, value: string) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Cart</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Shipping Address
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.street}
                      onChange={(e) => updateShippingAddress('street', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => updateShippingAddress('city', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.state}
                      onChange={(e) => updateShippingAddress('state', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.zipCode}
                      onChange={(e) => updateShippingAddress('zipCode', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      value={shippingAddress.country}
                      onChange={(e) => updateShippingAddress('country', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="India">India</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Billing Address */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Billing Address
                </h3>
                
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    id="sameAsBilling"
                    checked={sameAsBilling}
                    onChange={(e) => setSameAsBilling(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="sameAsBilling" className="text-sm font-medium text-gray-700">
                    Same as shipping address
                  </label>
                </div>
                
                {!sameAsBilling && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        required
                        value={billingAddress.street}
                        onChange={(e) => updateBillingAddress('street', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={billingAddress.city}
                        onChange={(e) => updateBillingAddress('city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={billingAddress.state}
                        onChange={(e) => updateBillingAddress('state', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        required
                        value={billingAddress.zipCode}
                        onChange={(e) => updateBillingAddress('zipCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <select
                        value={billingAddress.country}
                        onChange={(e) => updateBillingAddress('country', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="India">India</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Points Redemption */}
              <PointsRedemption
                availablePoints={userPoints}
                subtotal={subtotal}
                conversionRate={10}
                onPointsChange={setPointsRedemption}
              />
              
              {/* Payment Information */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                  Payment Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentInfo.cardholderName}
                      onChange={(e) => updatePaymentInfo('cardholderName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => updatePaymentInfo('cardNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => updatePaymentInfo('expiryDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => updatePaymentInfo('cvv', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    <span>Place Order - ₹{total.toLocaleString('en-IN')}</span>
                  </>
                )}
              </button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.product.name}</h4>
                    <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              {pointsDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Points Discount</span>
                  <span>-₹{pointsDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            {pointsRedemption && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 font-medium">
                  🎉 You're saving ₹{pointsDiscount} with {pointsRedemption.pointsToUse.toLocaleString()} points!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;