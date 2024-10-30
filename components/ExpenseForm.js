import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FUEL_TYPES, MAJOR_STATIONS } from '../constants/Constants';
import { saveExpense } from '../database/database';

const ExpenseForm = ({ currentLocation, onSave }) => {
  const [amount, setAmount] = useState('');
  const [liters, setLiters] = useState('');
  const [fuelType, setFuelType] = useState(FUEL_TYPES.PETROL);
  const [station, setStation] = useState(MAJOR_STATIONS.GOIL);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert('Validation Error', 'Please enter a valid amount');
      return false;
    }
    if (!liters || isNaN(parseFloat(liters))) {
      Alert.alert('Validation Error', 'Please enter a valid number of liters');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;
      
      setIsSubmitting(true);
      const expense = {
        amount: parseFloat(amount),
        liters: parseFloat(liters),
        fuelType,
        station,
        timestamp: Date.now(),
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
      };

      await saveExpense(expense);
      onSave?.(expense);
      resetForm();
      Alert.alert('Success', 'Expense saved successfully');
    } catch (error) {
      console.error('Error saving expense:', error);
      Alert.alert(
        'Error',
        'Failed to save expense. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setAmount('');
    setLiters('');
    setFuelType(FUEL_TYPES.PETROL);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Add Fuel Expense</Text>
          
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="Amount"
            keyboardType="decimal-pad"
            editable={!isSubmitting}
          />
          
          <TextInput
            style={styles.input}
            value={liters}
            onChangeText={setLiters}
            placeholder="Liters"
            keyboardType="decimal-pad"
            editable={!isSubmitting}
          />
          
          <Picker
            style={styles.picker}
            selectedValue={fuelType}
            onValueChange={setFuelType}
            enabled={!isSubmitting}
          >
            {Object.values(FUEL_TYPES).map(type => (
              <Picker.Item key={type} label={type} value={type} />
            ))}
          </Picker>
          
          <Picker
            style={styles.picker}
            selectedValue={station}
            onValueChange={setStation}
            enabled={!isSubmitting}
          >
            {Object.values(MAJOR_STATIONS).map(name => (
              <Picker.Item key={name} label={name} value={name} />
            ))}
          </Picker>
          
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Saving...' : 'Save Expense'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  submitButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExpenseForm;