import React from 'react';
import { CheckCircle, Download, Printer, Package, CreditCard, MapPin, Calendar, Star } from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationProps {
  order: Order;
  onContinueShopping: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ order, onContinueShopping }) => {
  const handlePrint = () => {
    window.print();
  };
  
  const handleDownload = () => {
    // Simulate PDF download
    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(
      `Order Receipt\n\nOrder ID: ${order.id}\nDate: ${new Date(order.date).toLocaleDateString('en-IN')}\nTotal: ₹${order.total.toLocaleString('en-IN')}`
    );
    element.download = `receipt-${order.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>
        
        {/* Order Details Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
              <p className="text-gray-600">Order #{order.id}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Printer className="h-4 w-4" />
                <span>Print</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="font-semibold">{new Date(order.date).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Estimated Delivery</p>
                <p className="font-semibold">{order.estimatedDelivery}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="font-semibold">**** {order.paymentInfo.cardNumber.slice(-4)}</p>
              </div>
            </div>
          </div>
          
          {/* Items Ordered */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Items Ordered</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.product.name}</h4>
                    <p className="text-gray-600 text-sm">{item.product.description}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{item.product.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">₹{item.product.price.toLocaleString('en-IN')} each</p>
                    <p className="font-semibold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Shipping Address
              </h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-600">
                  {order.shippingAddress.street}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                  {order.shippingAddress.country}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                Billing Address
              </h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">{order.paymentInfo.cardholderName}</p>
                <p className="text-sm text-gray-600">
                  {order.billingAddress.street}<br />
                  {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}<br />
                  {order.billingAddress.country}
                </p>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{order.tax.toLocaleString('en-IN')}</span>
              </div>
              {order.pointsDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Points Discount ({order.pointsUsed.toLocaleString()} points)</span>
                  <span>-₹{order.pointsDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold text-xl">
                <span>Total Paid</span>
                <span>₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
          
          {order.pointsUsed > 0 && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-green-700 font-medium">
                  Congratulations! You saved ₹{order.pointsDiscount} using {order.pointsUsed.toLocaleString()} points
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Continue Shopping */}
        <div className="text-center">
          <button
            onClick={onContinueShopping}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;