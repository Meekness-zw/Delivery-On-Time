import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function OrderConfirmedScreen({ route, navigation }) {
  const {
    storeName = 'Chicken Inn',
    totalPaid = 0,
    deliveryAddress = '2122 Brooklyn Road Ashdawn park\nHarare, Zimbabwe',
    orderNumber = '3180',
  } = route.params || {};

  return (
    <View style={styles.container}>
      {/* Back header (optional) */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={() => navigation.navigate('CustomerMain')}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Checkmark */}
      <View style={styles.iconWrapper}>
        <View style={styles.checkCircle}>
          <Feather name="check" size={40} color="#FFFFFF" />
        </View>
      </View>

      {/* Main text */}
      <Text style={styles.title}>Order Confirmed</Text>
      <Text style={styles.subtitle}>
        We&apos;ve received your order and are sending it to the merchant.
      </Text>
      <Text style={styles.substatus}>Finding a rider...</Text>

      {/* Order summary card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryRowTop}>
          <View>
            <Text style={styles.summaryStoreName}>{storeName}</Text>
            <Text style={styles.summaryLabel}>Delivery Address</Text>
          </View>
          <View style={styles.summaryRight}>
            <Text style={styles.summaryOrderNumber}>Order # {orderNumber}</Text>
            <Text style={styles.summaryAddress} numberOfLines={2}>
              {deliveryAddress}
            </Text>
          </View>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryRowBottom}>
          <Text style={styles.summaryTotalLabel}>Total Paid</Text>
          <Text style={styles.summaryTotalValue}>${totalPaid.toFixed(2)}</Text>
        </View>
      </View>

      {/* Track order button */}
      <View style={styles.trackButtonContainer}>
        <TouchableOpacity
          style={styles.trackButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('LiveTracking', {
            storeName,
            orderNumber,
            deliveryAddress,
            totalPaid,
          })}
        >
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        You&apos;ll be able to track your order shortly
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headerRow: {
    width: '100%',
    alignItems: 'flex-start',
  },
  headerBackButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    marginTop: 40,
    marginBottom: 24,
  },
  checkCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4F7942',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '400',
    color: '#111827',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
  substatus: {
    fontSize: 14,
    color: '#111827',
    textAlign: 'center',
    marginTop: 16,
  },
  summaryCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  summaryRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  summaryStoreName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#111827',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  summaryRight: {
    maxWidth: '50%',
    alignItems: 'flex-end',
  },
  summaryOrderNumber: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  summaryAddress: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 12,
  },
  summaryRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTotalLabel: {
    fontSize: 13,
    color: '#6B7280',
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#111827',
  },
  trackButtonContainer: {
    marginTop: 32,
    width: '100%',
  },
  trackButton: {
    backgroundColor: '#4F7942',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 12,
  },
});

