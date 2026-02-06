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

export default function OrderHistoryScreen({ navigation }) {
  const [orders] = useState([
    {
      id: 1,
      orderNumber: '3190',
      restaurant: 'KFC',
      date: 'Dec 15, 2024',
      status: 'Delivered',
      total: 15.50,
    },
    {
      id: 2,
      orderNumber: '3189',
      restaurant: 'Pizza Inn',
      date: 'Dec 14, 2024',
      status: 'Delivered',
      total: 22.00,
    },
    {
      id: 3,
      orderNumber: '3188',
      restaurant: 'Chicken Inn',
      date: 'Dec 13, 2024',
      status: 'Cancelled',
      total: 12.50,
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '#4F7942';
      case 'Cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const renderOrder = (order) => (
    <TouchableOpacity
      key={order.id}
      style={styles.orderCard}
      activeOpacity={0.7}
      onPress={() => {}}
    >
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderNumber}>Order # {order.orderNumber}</Text>
          <Text style={styles.restaurantName}>{order.restaurant}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
            {order.status}
          </Text>
        </View>
      </View>
      <View style={styles.orderFooter}>
        <Text style={styles.orderDate}>{order.date}</Text>
        <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Feather name="arrow-left" size={20} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order History</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.content}>
          {orders.length > 0 ? (
            orders.map(renderOrder)
          ) : (
            <View style={styles.emptyState}>
              <Feather name="package" size={64} color="#CCCCCC" />
              <Text style={styles.emptyText}>No orders yet</Text>
              <Text style={styles.emptySubtext}>Your order history will appear here</Text>
            </View>
          )}
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '400',
    color: '#000000',
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '400',
    color: '#111827',
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#111827',
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
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  orderDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '400',
    color: '#111827',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
