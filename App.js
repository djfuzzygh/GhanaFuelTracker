import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';
import { PaymentProvider } from './context/PaymentContext';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import ExpenseForm from './components/ExpenseForm';
import FuelCardManager from './components/FuelCardManager';
import SubscriptionScreen from './components/SubscriptionScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createNativeStackNavigator();

function AppContent() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4a90e2',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Fuel Tracker' }} />
        <Stack.Screen name="AddExpense" component={ExpenseForm} options={{ title: 'Add Expense' }} />
        <Stack.Screen name="FuelCards" component={FuelCardManager} options={{ title: 'Fuel Cards' }} />
        <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ title: 'Subscription' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PaymentProvider>
        <AppContent />
      </PaymentProvider>
    </AuthProvider>
  );
}