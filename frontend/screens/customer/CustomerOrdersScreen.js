import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function CustomerOrdersScreen({ navigation }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Active'); // Active, Past

  // Sample orders data
  const activeOrders = [
    {
      id: 1,
      restaurant: 'Pizza Palace',
      items: '2x Margherita Pizza',
      status: 'Preparing',
      time: '15-20 min',
      total: '$24.99',
      image: null,
    },
    {
      id: 2,
      restaurant: 'Burger King',
      items: '1x Whopper, 1x Fries',
      status: 'On the way',
      time: '10-15 min',
      total: '$18.50',
      image: null,
    },
  ];

  const pastOrders = [
    {
      id: 3,
      restaurant: 'Sushi House',
      items: '3x Salmon Roll, 1x Miso Soup',
      status: 'Delivered',
      date: '2 days ago',
      total: '$32.00',
      image: null,
    },
    {
      id: 4,
      restaurant: 'Taco Bell',
      items: '2x Tacos, 1x Burrito',
      status: 'Delivered',
      date: '1 week ago',
      total: '$15.75',
      image: null,
    },
  ];

  const renderOrderCard = (order, isActive = false) => (
    <TouchableOpacity key={order.id} style={styles.orderCard} activeOpacity={0.7}>
      <View style={styles.orderContent}>
        <View style={styles.orderLeft}>
          <View style={styles.restaurantIcon}>
            <Feather name="coffee" size={24} color="#4F7942" />
          </View>
          <View style={styles.orderDetails}>
            <Text style={styles.restaurantName}>{order.restaurant}</Text>
            <Text style={styles.orderItems} numberOfLines={1}>{order.items}</Text>
            {isActive ? (
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, order.status === 'On the way' && styles.statusDotActive]} />
                <Text style={styles.statusText}>{order.status}</Text>
                <Text style={styles.timeText}> • {order.time}</Text>
              </View>
            ) : (
              <Text style={styles.dateText}>{order.date}</Text>
            )}
          </View>
        </View>
        <View style={styles.orderRight}>
          <Text style={styles.orderTotal}>{order.total}</Text>
          {isActive && order.status === 'On the way' && (
            <TouchableOpacity style={styles.trackButton}>
              <Feather name="map-pin" size={14} color="#4F7942" />
              <Text style={styles.trackButtonText}>Track</Text>
            </TouchableOpacity>
          )}
          {!isActive && (
            <TouchableOpacity style={styles.reorderButton}>
              <Text style={styles.reorderText}>Reorder</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Active' && styles.tabActive]}
          onPress={() => setActiveTab('Active')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'Active' && styles.tabTextActive]}>
            Active
          </Text>
          {activeTab === 'Active' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Past' && styles.tabActive]}
          onPress={() => setActiveTab('Past')}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'Past' && styles.tabTextActive]}>
            Past
          </Text>
          {activeTab === 'Past' && <View style={styles.tabIndicator} />}
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        scrollEventThrottle={16}
      >
          {activeTab === 'Active' ? (
            activeOrders.length > 0 ? (
              <View style={styles.ordersList}>
                {activeOrders.map((order) => renderOrderCard(order, true))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Feather name="package" size={48} color="#CCCCCC" />
                <Text style={styles.emptyStateText}>No active orders</Text>
                <Text style={styles.emptyStateSubtext}>
                  Your active orders will appear here
                </Text>
              </View>
            )
          ) : (
            pastOrders.length > 0 ? (
              <View style={styles.ordersList}>
                {pastOrders.map((order) => renderOrderCard(order, false))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Feather name="package" size={48} color="#CCCCCC" />
                <Text style={styles.emptyStateText}>No past orders</Text>
                <Text style={styles.emptyStateSubtext}>
                  Your order history will appear here
                </Text>
              </View>
            )
          )}

          {/* Bottom Spacing for Navigation Bar */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000000',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: 'transparent',
    position: 'relative',
  },
  tabActive: {
    backgroundColor: '#F0FDF4',
    borderColor: '#4F7942',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666666',
  },
  tabTextActive: {
    fontWeight: '400',
    color: '#4F7942',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -17,
    left: '50%',
    marginLeft: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4F7942',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  ordersList: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  orderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderLeft: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
  },
  restaurantIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  orderItems: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
  },
  statusDotActive: {
    backgroundColor: '#4F7942',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  timeText: {
    fontSize: 14,
    color: '#666666',
  },
  dateText: {
    fontSize: 14,
    color: '#666666',
  },
  orderRight: {
    alignItems: 'flex-end',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4F7942',
    marginBottom: 8,
  },
  trackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#4F7942',
    gap: 4,
    marginTop: 8,
  },
  trackButtonText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#4F7942',
  },
  reorderButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#4F7942',
    marginTop: 8,
  },
  reorderText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#4F7942',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 100,
  },
});
