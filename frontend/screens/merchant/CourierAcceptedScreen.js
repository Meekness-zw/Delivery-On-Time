import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function CourierAcceptedScreen({ route, navigation }) {
  const { courier, order } = route.params || {};
  
  const courierName = courier?.name || 'Harry Wilson';
  const courierVehicle = courier?.vehicle || 'Bike Courier';
  const courierImage = courier?.image || require('../../assets/courier.jpg');
  const orderNumber = order?.orderNumber || '#2045';
  
  // Format order items with quantities
  const formatOrderItems = () => {
    if (order?.items && Array.isArray(order.items)) {
      // If items is an array of strings, assume quantity 1 for each
      return order.items.map((item, index) => ({
        name: typeof item === 'string' ? item : item.name || item,
        quantity: item.quantity || order.itemQuantities?.[index] || 1,
      }));
    }
    // Default items
    return [
      { name: 'Minute Maid Delight', quantity: 1 },
      { name: 'Large Fries', quantity: 1 },
      { name: 'Chicken Wrap', quantity: 2 },
    ];
  };
  
  const orderItems = formatOrderItems();

  const handleConfirmPickup = () => {
    // Handle confirm pickup logic here
    // You can navigate back or update order status
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Status Card */}
        <View style={styles.orderStatusCard}>
          <Text style={styles.orderNumber}>Order {orderNumber}</Text>
          <View style={styles.readyBadge}>
            <Text style={styles.readyBadgeText}>Ready for Pickup</Text>
          </View>
        </View>

        {/* Courier Information Card */}
        <View style={styles.courierCard}>
          <Image
            source={courierImage}
            style={styles.courierImage}
            resizeMode="cover"
          />
          <View style={styles.courierInfo}>
            <Text style={styles.courierName}>{courierName}</Text>
            <Text style={styles.courierDetails}>
              {courierVehicle} • Arriving in 5 minutes
            </Text>
          </View>
        </View>

        {/* Order Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.orderSummaryCard}>
            {orderItems.map((item, index) => (
              <View 
                key={index} 
                style={[
                  styles.orderItem,
                  index === orderItems.length - 1 && styles.orderItemLast
                ]}
              >
                <Text style={styles.orderItemText}>
                  {item.quantity}x {item.name}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Pickup QR Code Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup QR Code</Text>
          <View style={styles.qrCodeCard}>
            <View style={styles.qrCodeContainer}>
              <View style={styles.qrCode}>
                {/* QR Code Pattern */}
                <View style={styles.qrCodeGrid}>
                  {/* Top Left Square */}
                  <View style={[styles.qrSquare, styles.qrSquareTopLeft]} />
                  {/* Top Right Square */}
                  <View style={[styles.qrSquare, styles.qrSquareTopRight]} />
                  {/* Bottom Left Square */}
                  <View style={[styles.qrSquare, styles.qrSquareBottomLeft]} />
                  {/* Bottom Right Square with pattern */}
                  <View style={[styles.qrSquare, styles.qrSquareBottomRight]}>
                    <View style={styles.qrInnerPattern} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Pickup Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmPickup}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmButtonText}>Confirm Pickup</Text>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  orderStatusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  readyBadge: {
    backgroundColor: '#4F7942',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  readyBadgeText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  courierCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  courierImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  courierInfo: {
    flex: 1,
  },
  courierName: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  courierDetails: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 12,
  },
  orderSummaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  orderItem: {
    paddingBottom: 12,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  orderItemLast: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  orderItemText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  qrCodeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCodeContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCode: {
    width: 200,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  qrCodeGrid: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  qrSquare: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#4F7942',
    borderWidth: 4,
    borderColor: '#4F7942',
  },
  qrSquareTopLeft: {
    top: 15,
    left: 15,
    borderRadius: 4,
  },
  qrSquareTopRight: {
    top: 15,
    right: 15,
    borderRadius: 4,
  },
  qrSquareBottomLeft: {
    bottom: 15,
    left: 15,
    borderRadius: 4,
  },
  qrSquareBottomRight: {
    bottom: 15,
    right: 15,
    borderRadius: 4,
  },
  qrInnerPattern: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    borderWidth: 3,
    borderColor: '#4F7942',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 16,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  confirmButton: {
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
