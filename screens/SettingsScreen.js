import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles';

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Settings</Text>
      
      <View style={styles.settingsItem}>
        <Text style={styles.settingsLabel}>Name</Text>
        <Text style={styles.settingsValue}>{user?.name}</Text>
      </View>

      <View style={styles.settingsItem}>
        <Text style={styles.settingsLabel}>Email</Text>
        <Text style={styles.settingsValue}>{user?.email}</Text>
      </View>

      <TouchableOpacity 
        style={styles.settingsButton}
        onPress={() => navigation.navigate('FuelCards')}
      >
        <Text style={styles.settingsButtonText}>Manage Fuel Cards</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.settingsButton}
        onPress={() => navigation.navigate('Subscription')}
      >
        <Text style={styles.settingsButtonText}>Manage Subscription</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.settingsButton, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}