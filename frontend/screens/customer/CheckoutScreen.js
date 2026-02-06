import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function CheckoutScreen({ route, navigation }) {
  const { cartItems = [], initialAddress = '2122 Brooklyn Road Ashdawn park\nHarare, Zimbabwe' } =
    route.params || {};

  const [selectedPayment, setSelectedPayment] = useState('cash');
  const [deliveryNote, setDeliveryNote] = useState('');

  const groupedByStore = useMemo(() => {
    const map = new Map();
    cartItems.forEach((item) => {
      const storeName = item.product.storeName || item.product.store || 'This store';
      const current = map.get(storeName) || 0;
      map.set(storeName, current + 1);
    });
    return Array.from(map.entries()).map(([name, count]) => ({
      name,
      count,
    }));
  }, [cartItems]);

  const itemCount = cartItems.length;
  const cartTotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

  const handlePlaceOrder = () => {
    const firstStoreName =
      groupedByStore[0]?.name || (cartItems[0]?.product.storeName || 'Store');
    navigation.navigate('OrderConfirmed', {
      storeName: firstStoreName,
      totalPaid: cartTotal,
      deliveryAddress: initialAddress,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={22} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.headerIconButton} />
      </View>
      <Text style={styles.headerSubtitle}>
        Review your details and confirm your order
      </Text>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.card}>
            <View style={styles.addressRow}>
              <View style={styles.addressIconWrapper}>
                <Feather name="map-pin" size={18} color="#4F7942" />
              </View>
              <View style={styles.addressTextWrapper}>
                <Text style={styles.addressLabel}>Current Location</Text>
                <Text style={styles.addressValue}>{initialAddress}</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.changeLink}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.card}>
            {groupedByStore.length === 0 ? (
              <Text style={styles.emptySummaryText}>No items in cart</Text>
            ) : (
              <>
                {groupedByStore.map((entry, index) => (
                  <View
                    key={entry.name + index}
                    style={[
                      styles.summaryRow,
                      index < groupedByStore.length - 1 && styles.summaryRowBorder,
                    ]}
                  >
                    <Text style={styles.summaryStoreName}>{entry.name}</Text>
                    <Text style={styles.summaryStoreItems}>
                      {entry.count} item{entry.count > 1 ? 's' : ''}
                    </Text>
                  </View>
                ))}

                {/* Line items */}
                <View style={styles.summaryItemsSeparator} />
                {cartItems.map((item, index) => (
                  <View
                    key={item.product.id + (item.isWeightBased ? '-kg' : '') + index}
                    style={styles.summaryItemRow}
                  >
                    <View style={styles.summaryItemLeft}>
                      <Text style={styles.summaryItemName}>{item.product.name}</Text>
                      <Text style={styles.summaryItemMeta}>
                        {item.isWeightBased
                          ? `${item.quantity.toFixed(2)} kg`
                          : `${item.quantity}x`}{' '}
                        • ${item.lineTotal.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                ))}

                <View style={styles.summaryFooterRow}>
                  <Text style={styles.summaryTotalLabel}>Total</Text>
                  <Text style={styles.summaryTotalValue}>
                    ${cartTotal.toFixed(2)}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.card}>
            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPayment === 'wallet' && styles.paymentOptionSelected,
              ]}
              onPress={() => setSelectedPayment('wallet')}
              activeOpacity={0.7}
            >
              <View style={styles.paymentLeft}>
                <Feather
                  name="dollar-sign"
                  size={18}
                  color={selectedPayment === 'wallet' ? '#4F7942' : '#9CA3AF'}
                />
                <View style={styles.paymentTextWrapper}>
                  <Text style={styles.paymentLabel}>Wallet Balance</Text>
                  <Text style={styles.paymentSubLabel}>$24.80</Text>
                </View>
              </View>
              <View
                style={[
                  styles.radioOuter,
                  selectedPayment === 'wallet' && styles.radioOuterSelected,
                ]}
              >
                {selectedPayment === 'wallet' && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                selectedPayment === 'cash' && styles.paymentOptionSelected,
              ]}
              onPress={() => setSelectedPayment('cash')}
              activeOpacity={0.7}
            >
              <View style={styles.paymentLeft}>
                <Feather
                  name="dollar-sign"
                  size={18}
                  color={selectedPayment === 'cash' ? '#4F7942' : '#9CA3AF'}
                />
                <View style={styles.paymentTextWrapper}>
                  <Text style={styles.paymentLabel}>Cash Payment</Text>
                  <Text style={styles.paymentSubLabel}>${cartTotal.toFixed(2)}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.radioOuter,
                  selectedPayment === 'cash' && styles.radioOuterSelected,
                ]}
              >
                {selectedPayment === 'cash' && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Instructions */}
        <View style={styles.section}>
          <View style={styles.instructionsHeader}>
            <Text style={styles.sectionTitle}>Delivery Instructions</Text>
            <Text style={styles.optionalLabel}>(Optional)</Text>
          </View>
          <View style={styles.card}>
            <TextInput
              style={styles.instructionsInput}
              placeholder="Add a note for the rider or merchant..."
              placeholderTextColor="#9CA3AF"
              multiline
              value={deliveryNote}
              onChangeText={setDeliveryNote}
            />
          </View>
        </View>

        {/* Bottom spacer for button */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.placeOrderContainer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          activeOpacity={0.8}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60, // lowered further so title stays clear of the notch
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  headerIconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#6B7280',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ECFDF3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addressTextWrapper: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  addressValue: {
    fontSize: 13,
    color: '#6B7280',
  },
  changeLink: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4F7942',
  },
  emptySummaryText: {
    fontSize: 13,
    color: '#6B7280',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  summaryStoreName: {
    fontSize: 14,
    color: '#111827',
  },
  summaryStoreItems: {
    fontSize: 13,
    color: '#6B7280',
  },
  summaryItemsSeparator: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginTop: 8,
    marginBottom: 4,
  },
  summaryItemRow: {
    paddingVertical: 6,
  },
  summaryItemLeft: {
    flexDirection: 'column',
  },
  summaryItemName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#111827',
  },
  summaryItemMeta: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  summaryFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  summaryTotalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#111827',
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },
  paymentOptionSelected: {
    borderColor: '#4F7942',
    backgroundColor: '#ECFDF3',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentTextWrapper: {
    marginLeft: 10,
  },
  paymentLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
  },
  paymentSubLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#4F7942',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4F7942',
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionalLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
  },
  instructionsInput: {
    minHeight: 80,
    fontSize: 13,
    color: '#111827',
  },
  placeOrderContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#F9FAFB',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  placeOrderButton: {
    backgroundColor: '#4F7942',
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: 'center',
  },
  placeOrderText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});

