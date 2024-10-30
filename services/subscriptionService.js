export const subscriptionService = {
    calculateDaysRemaining(expiryDate) {
      const now = new Date();
      const expiry = new Date(expiryDate);
      const diffTime = Math.abs(expiry - now);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
  
    async checkSubscriptionStatus() {
      try {
        const subscription = await AsyncStorage.getItem('subscription');
        if (!subscription) return false;
        
        const { expiryDate } = JSON.parse(subscription);
        return new Date(expiryDate) > new Date();
      } catch (error) {
        console.error('Error checking subscription:', error);
        return false;
      }
    }
  };