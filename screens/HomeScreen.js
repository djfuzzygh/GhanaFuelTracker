// src/screens/HomeScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import { AuthContext } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [subscriptionDays, setSubscriptionDays] = useState(23);
  const [nearbyStations, setNearbyStations] = useState([
    { id: 1, name: 'Shell Station', distance: '0.5 km', price: '12.5 GHS' },
    { id: 2, name: 'Total Station', distance: '1.2 km', price: '12.3 GHS' },
    { id: 3, name: 'Goil Station', distance: '2.0 km', price: '12.8 GHS' },
  ]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Subscription Status Card */}
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <Text style={styles.cardTitle}>Premium Plan</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{subscriptionDays} days left</Text>
            </View>
          </View>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(subscriptionDays / 30) * 100}%` }]} />
          </View>
        </View>

        {/* Expense Overview */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Monthly Overview</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Spent</Text>
              <Text style={styles.statValue}>2,450 GHS</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Avg. Cost</Text>
              <Text style={styles.statValue}>245 GHS</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Refills</Text>
              <Text style={styles.statValue}>10</Text>
            </View>
          </View>
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May"],
              datasets: [{ data: [250, 320, 280, 400, 450] }]
            }}
            width={screenWidth - 64}
            height={180}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`,
              labelColor: () => '#666666',
              style: { borderRadius: 16 },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#4a90e2"
              }
            }}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Nearby Stations */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nearby Stations</Text>
          {nearbyStations.map((station) => (
            <TouchableOpacity 
              key={station.id}
              style={styles.stationItem}
            >
              <View style={styles.stationInfo}>
                <Icon name="map-marker" size={20} color="#4a90e2" style={styles.icon} />
                <View>
                  <Text style={styles.stationName}>{station.name}</Text>
                  <Text style={styles.stationDistance}>{station.distance}</Text>
                </View>
              </View>
              <Text style={styles.stationPrice}>{station.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => navigation.navigate('AddExpense')}
          >
            <Text style={styles.primaryButtonText}>Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => navigation.navigate('FuelCards')}
          >
            <Text style={styles.secondaryButtonText}>Fuel Cards</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  content: {
    padding: 16,
    paddingTop: 8,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#e6f0ff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#4a90e2',
    fontWeight: '600',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#4a90e2',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    color: '#666666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  stationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  stationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  stationName: {
    fontWeight: '600',
    color: '#1a1a1a',
  },
  stationDistance: {
    color: '#666666',
  },
  stationPrice: {
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4a90e2',
    marginRight: 8,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e1e4e8',
    marginLeft: 8,
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#4a90e2',
    fontWeight: 'bold',
  },
});

export default HomeScreen;