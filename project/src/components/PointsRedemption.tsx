import React, { useState, useEffect } from 'react';
import { Gift, Info } from 'lucide-react';
import { PointsRedemption as PointsRedemptionType } from '../types';

interface PointsRedemptionProps {
  availablePoints: number;
  subtotal: number;
  conversionRate: number;
  onPointsChange: (redemption: PointsRedemptionType | null) => void;
}

const PointsRedemption: React.FC<PointsRedemptionProps> = ({
  availablePoints,
  subtotal,
  conversionRate,
  onPointsChange
}) => {
  const [usePoints, setUsePoints] = useState(false);
  const [pointsToUse, setPointsToUse] = useState(0);
  
  const maxPointsUsable = Math.min(availablePoints, subtotal * conversionRate);
  const maxDiscount = Math.floor(maxPointsUsable / conversionRate);
  
  useEffect(() => {
    if (usePoints && pointsToUse > 0) {
      const discountAmount = Math.floor(pointsToUse / conversionRate);
      const actualPointsUsed = discountAmount * conversionRate;
      
      onPointsChange({
        pointsToUse: actualPointsUsed,
        discountAmount,
        remainingPoints: availablePoints - actualPointsUsed
      });
    } else {
      onPointsChange(null);
    }
  }, [usePoints, pointsToUse, conversionRate, availablePoints, onPointsChange]);
  
  const handlePointsSliderChange = (value: number) => {
    setPointsToUse(value);
  };
  
  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-xl border border-purple-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Gift className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold text-gray-800">Redeem Points</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Available:</span>
          <span className="font-bold text-purple-600">{availablePoints.toLocaleString()} points</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3 mb-4">
        <input
          type="checkbox"
          id="usePoints"
          checked={usePoints}
          onChange={(e) => setUsePoints(e.target.checked)}
          className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
        />
        <label htmlFor="usePoints" className="text-sm font-medium text-gray-700">
          Use my points to get discount
        </label>
      </div>
      
      {usePoints && (
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-lg border">
            <div className="flex items-center space-x-2 mb-2">
              <Info className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600">
                {conversionRate} points = ₹1 | Max discount: ₹{maxDiscount}
              </span>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Points to use: {pointsToUse.toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max={maxPointsUsable}
                step={conversionRate}
                value={pointsToUse}
                onChange={(e) => handlePointsSliderChange(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>{maxPointsUsable.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          {pointsToUse > 0 && (
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700">
                  Discount Applied:
                </span>
                <span className="font-bold text-green-700">
                  -₹{Math.floor(pointsToUse / conversionRate)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-green-600 mt-1">
                <span>Points used: {pointsToUse.toLocaleString()}</span>
                <span>Remaining: {(availablePoints - pointsToUse).toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      )}
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #7c3aed;
          border-radius: 50%;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #7c3aed;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default PointsRedemption;