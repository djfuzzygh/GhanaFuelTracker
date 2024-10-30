import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { SubscriptionManager } from '../database/database';


const SubscriptionScreen = ({ userId }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    const status = await SubscriptionManager.checkSubscriptionStatus(userId);
    setStatus(status);
  };

  const handleSubscribe = async () => {
    if (!phoneNumber.match(/^233[0-9]{9}$/)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid MTN Ghana number starting with 233');
      return;
    }
    // Payment logic here
  };

  return (
    <View>
      <Text>Subscription Status: {status?.isActive ? 'Active' : 'Inactive'}</Text>
      <TextInput value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number" />
      <TouchableOpacity onPress={handleSubscribe}>
        <Text>Subscribe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // styles
});

export default SubscriptionScreen;