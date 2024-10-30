import React from 'react';
import { View, Text } from 'react-native';

export const SubscriptionCard = ({ daysLeft, planType }) => {
  return (
    
      
        {planType}
        
          {daysLeft} days left
        
      
      
        <View 
          className="h-2 bg-blue-500 rounded-full"
          style={{ width: `${(daysLeft / 30) * 100}%` }}
        />
      
    
  );
};