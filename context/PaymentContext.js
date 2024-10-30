import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';
import { AuthContext } from './AuthContext';

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [subscription, setSubscription] = useState(null);

  const processPayment = async (amount, provider, phoneNumber) => {
    try {
      // Validate phone number format based on provider
      const phoneValidation = {
        MTN: /^233(24|54|55|59)\d{7}$/,
        VODA: /^233(20|50)\d{7}$/,
        TIGO: /^233(27|57)\d{7}$/,
      };

      if (!phoneValidation[provider].test(phoneNumber)) {
        throw new Error('Invalid phone number for selected provider');
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful payment
      const paymentResult = {
        success: true,
        transactionId: 'mock-transaction-' + Date.now(),
        amount,
        provider,
        phoneNumber,
      };

      // Update subscription status
      setSubscription({
        active: true,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      });

      return paymentResult;
    } catch (error) {
      Alert.alert('Payment Error', error.message);
      throw error;
    }
  };

  const checkSubscription = async () => {
    return subscription;
  };

  return (
    <PaymentContext.Provider value={{ processPayment, checkSubscription, subscription }}>
      {children}
    </PaymentContext.Provider>
  );
};