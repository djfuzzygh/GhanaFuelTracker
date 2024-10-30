import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export const StatsCard = ({ stats, chartData }) => {
  return (
    
      Monthly Overview
      
        
          Total Spent
          {stats.totalSpent} GHS
        
        
          Avg. Cost
          {stats.avgCost} GHS
        
        
          Refills
          {stats.refills}
        
      
      <LineChart
        data={chartData}
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
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    
  );
};