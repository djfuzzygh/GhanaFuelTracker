import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState({
    active: false,
    planType: 'Free',
    expiryDate: null,
    features: []
  });

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      const saved = await AsyncStorage.getItem('subscription');
      if (saved) {
        setSubscription(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
    }
  };

  const updateSubscription = async (newSubscription) => {
    try {
      await AsyncStorage.setItem('subscription', JSON.stringify(newSubscription));
      setSubscription(newSubscription);
    } catch (error) {
      console.error('Error saving subscription:', error);
    }
  };

  return (
    
      {children}
    
  );
};

export const useSubscription = () => useContext(SubscriptionContext);
