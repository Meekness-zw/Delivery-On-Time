import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function MerchantOrderHistoryScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('Today');
  const [activeNavTab, setActiveNavTab] = useState('Orders');
  
  const [orders] = useState([
    {
      id: 1,
      orderNumber: '2045',
      time: '12:45 pm',
      itemCount: 3,
      status: 'Completed',
      total: 12.50,
    },
    {
      id: 2,
      orderNumber: '2042',
      time: '12:45 pm',
      itemCount: 1,
      status: 'Cancelled',
      total: 12.50,
    },
    {
      id: 3,
      orderNumber: '2033',
      time: '12:45 pm',
      itemCount: 5,
      status: 'Failed',
      total: 12.50,
    },
    {
      id: 4,
      orderNumber: '2030',
      time: '12:45 pm',
      itemCount: 2,
      status: 'Completed',
      total: 12.50,
    },
  ]);

  const filters = ['Today', 'This Week', 'This Month', 'Custom Range'];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return {
          backgroundColor: '#F0FDF4',
          color: '#4F7942',
        };
      case 'Cancelled':
        return {
          backgroundColor: '#F3F4F6',
          color: '#6B7280',
        };
      case 'Failed':
        return {
          backgroundColor: '#FEF2F2',
          color: '#EF4444',
        };
      default:
        return {
          backgroundColor: '#F3F4F6',
          color: '#6B7280',
        };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order History</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Filter Buttons */}
        <View style={styles.section}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersScroll}
            contentContainerStyle={styles.filtersContainer}
            nestedScrollEnabled={true}
            scrollEventThrottle={16}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  activeFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setActiveFilter(filter)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    activeFilter === filter && styles.filterButtonTextActive,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Order List */}
        <View style={styles.ordersContainer}>
          {orders.map((order) => {
            const statusStyle = getStatusStyle(order.status);
            return (
              <TouchableOpacity
                key={order.id}
                style={styles.orderCard}
                activeOpacity={0.7}
                onPress={() => {
                  // Navigate to order details if needed
                }}
              >
                <View style={styles.orderCardContent}>
                  <View style={styles.orderInfo}>
                    <Text style={styles.orderNumber}>Order #{order.orderNumber}</Text>
                    <Text style={styles.orderDetails}>
                      {order.time} • {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                    </Text>
                  </View>
                  <View style={styles.orderRight}>
                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
                      <Text style={[styles.statusText, { color: statusStyle.color }]}>
                        {order.status}
                      </Text>
                    </View>
                    <Text style={styles.orderPrice}>${order.total.toFixed(2)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, activeNavTab === 'Home' && styles.navItemActive]}
          onPress={() => {
            setActiveNavTab('Home');
            navigation.navigate('MerchantHome');
          }}
          activeOpacity={0.7}
        >
          <Feather
            name="home"
            size={22}
            color={activeNavTab === 'Home' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeNavTab === 'Home' && styles.navLabelActive]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeNavTab === 'Orders' && styles.navItemActive]}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <Feather
            name="shopping-bag"
            size={22}
            color={activeNavTab === 'Orders' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeNavTab === 'Orders' && styles.navLabelActive]}>
            Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeNavTab === 'Wallet' && styles.navItemActive]}
          onPress={() => {
            setActiveNavTab('Wallet');
            navigation.navigate('MerchantWallet');
          }}
          activeOpacity={0.7}
        >
          <Feather
            name="credit-card"
            size={22}
            color={activeNavTab === 'Wallet' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeNavTab === 'Wallet' && styles.navLabelActive]}>
            Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeNavTab === 'More' && styles.navItemActive]}
          onPress={() => setActiveNavTab('More')}
          activeOpacity={0.7}
        >
          <Feather
            name="settings"
            size={22}
            color={activeNavTab === 'More' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeNavTab === 'More' && styles.navLabelActive]}>
            More
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
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '400',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  section: {
    marginBottom: 20,
  },
  filtersScroll: {
    marginHorizontal: -20,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 12,
  },
  filterButtonActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#4F7942',
    borderWidth: 2,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  filterButtonTextActive: {
    color: '#4F7942',
    fontWeight: '400',
  },
  ordersContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  orderDetails: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  orderRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '400',
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
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
