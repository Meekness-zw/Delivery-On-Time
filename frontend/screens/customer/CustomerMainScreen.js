import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import CustomerHomeScreen from './CustomerHomeScreen';
import CustomerSearchScreen from './CustomerSearchScreen';
import CustomerOrdersScreen from './CustomerOrdersScreen';
import CustomerProfileScreen from './CustomerProfileScreen';

export default function CustomerMainScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Home');

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return <CustomerHomeScreen navigation={navigation} />;
      case 'Search':
        return <CustomerSearchScreen navigation={navigation} />;
      case 'Orders':
        return <CustomerOrdersScreen navigation={navigation} />;
      case 'Profile':
        return <CustomerProfileScreen navigation={navigation} />;
      default:
        return <CustomerHomeScreen navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>
      
      {/* Shared Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, activeTab === 'Home' && styles.navItemActive]}
          onPress={() => setActiveTab('Home')}
          activeOpacity={0.7}
        >
          <Feather
            name="home"
            size={22}
            color={activeTab === 'Home' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeTab === 'Home' && styles.navLabelActive]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'Search' && styles.navItemActive]}
          onPress={() => setActiveTab('Search')}
          activeOpacity={0.7}
        >
          <Feather
            name="search"
            size={22}
            color={activeTab === 'Search' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeTab === 'Search' && styles.navLabelActive]}>
            Search
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'Orders' && styles.navItemActive]}
          onPress={() => setActiveTab('Orders')}
          activeOpacity={0.7}
        >
          <Feather
            name="shopping-bag"
            size={22}
            color={activeTab === 'Orders' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeTab === 'Orders' && styles.navLabelActive]}>
            Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, activeTab === 'Profile' && styles.navItemActive]}
          onPress={() => setActiveTab('Profile')}
          activeOpacity={0.7}
        >
          <Feather
            name="user"
            size={22}
            color={activeTab === 'Profile' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeTab === 'Profile' && styles.navLabelActive]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  screenContainer: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#666666',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    zIndex: 1000,
    overflow: 'visible',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    minWidth: 60,
  },
  navItemActive: {
    backgroundColor: '#F0FDF4',
  },
  navLabel: {
    fontSize: 11,
    color: '#666666',
    marginTop: 4,
    fontWeight: '400',
  },
  navLabelActive: {
    color: '#4F7942',
    fontWeight: '400',
  },
});
