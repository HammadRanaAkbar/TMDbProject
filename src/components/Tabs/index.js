import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Tabs = ({selected}) => {
  const [selectedTab, setSelectedTab] = useState('latest');

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
    selected(tabName);
  };

  return (
    <View style={styles.container1}>
    
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tabButton, selectedTab === 'latest' && styles.selectedTab]}
        onPress={() => handleTabPress('latest')}>
        <Text style={styles.tabText}>Latest</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, selectedTab === 'popular' && styles.selectedTab]}
        onPress={() => handleTabPress('popular')}>
        <Text style={styles.tabText}>Popular</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'transpa', // Background color of the tabs container

  },
  container: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', 
    height: 40, // Height of the tabs container
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#f0f0f0', // Default background color of the tabs
  },
  selectedTab: {
    backgroundColor: '#9bf2e8', // Background color of the selected tab
    borderRadius:10

  },
  tabText: {
    alignItems: 'center',
    textAlign:'center',
    width:"100%",
    fontSize: 16,
    color: '#333', // Text color of the tabs
  },
});

export default Tabs;
