import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
  Animated,
  Image,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ReadyOrderModal({ visible, order, onClose, onConfirmPickup, navigation }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [courierOffers, setCourierOffers] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const modalHeight = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const spinValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setIsExpanded(false);
      modalHeight.setValue(0);
      setShowLoading(true);
      setCourierOffers([]);
      
      // Simulate courier offers coming in after 3 seconds
      const offerTimer = setTimeout(() => {
        // Simulate courier offers
        const offers = [
          {
            id: 1,
            name: 'John Doe',
            rating: 4.8,
            completedDeliveries: 234,
            estimatedTime: '15 mins',
            vehicle: 'Motorcycle',
            image: require('../../assets/courier.jpg'),
          },
          {
            id: 2,
            name: 'Mike Smith',
            rating: 4.9,
            completedDeliveries: 456,
            estimatedTime: '12 mins',
            vehicle: 'Bicycle',
            image: require('../../assets/courier.jpg'),
          },
          {
            id: 3,
            name: 'David Lee',
            rating: 4.7,
            completedDeliveries: 189,
            estimatedTime: '18 mins',
            vehicle: 'Motorcycle',
            image: require('../../assets/courier.jpg'),
          },
        ];
        setCourierOffers(offers);
        setShowLoading(false);
      }, 3000);

      return () => clearTimeout(offerTimer);
    }
  }, [visible]);

  // Loading spinner animation
  useEffect(() => {
    if (visible) {
      const spin = Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      );
      spin.start();
      return () => spin.stop();
    }
  }, [visible]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        if (offsetY > 50 && !isExpanded) {
          setIsExpanded(true);
          Animated.spring(modalHeight, {
            toValue: 1,
            useNativeDriver: false,
            tension: 50,
            friction: 7,
          }).start();
        } else if (offsetY <= 50 && isExpanded) {
          setIsExpanded(false);
          Animated.spring(modalHeight, {
            toValue: 0,
            useNativeDriver: false,
            tension: 50,
            friction: 7,
          }).start();
        }
      },
    }
  );

  const handleConfirmPickup = () => {
    if (onConfirmPickup) {
      onConfirmPickup(order);
    }
    onClose();
  };

  const handleAcceptCourier = (courier) => {
    // Close the modal
    onClose();
    
    // Call onConfirmPickup with courier info
    if (onConfirmPickup) {
      onConfirmPickup({ ...order, selectedCourier: courier });
    }
    
    // Navigate to courier accepted page
    if (navigation) {
      navigation.navigate('CourierAccepted', { 
        courier, 
        order
      });
    }
  };

  if (!order) return null;

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Format items for display
  const displayItems = order.items || [];
  const customerName = order.customerName || "Uncle Joe";

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.modalContent,
            {
              height: modalHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [SCREEN_HEIGHT * 0.9, SCREEN_HEIGHT],
              }),
            },
          ]}
          pointerEvents="box-none"
        >
          <View pointerEvents="auto" style={styles.modalInner}>
            {/* Drag Handle */}
            <View style={styles.dragHandle} />

            {/* Order Header */}
            <View style={styles.orderHeaderCard}>
              <View style={styles.orderHeaderContent}>
                <Text style={styles.orderNumber}>Order {order.orderNumber || '#1015'}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Ready</Text>
                </View>
              </View>
            </View>

            <ScrollView
              ref={scrollViewRef}
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {/* Loading Spinner or Courier Offers */}
              {showLoading ? (
                <View style={styles.loadingSection}>
                  <View style={styles.spinnerContainer}>
                    <Animated.View
                      style={[
                        styles.spinnerOuter,
                        {
                          transform: [{ rotate: spin }],
                        },
                      ]}
                    >
                      <View style={styles.spinnerCircle} />
                    </Animated.View>
                    <View style={styles.riderImageContainer}>
                      <Image
                        source={require('../../assets/courier.jpg')}
                        style={styles.riderImage}
                        resizeMode="cover"
                        onError={() => {
                          // Fallback handled by using courier.jpg directly
                        }}
                      />
                    </View>
                  </View>
                  <Text style={styles.loadingText}>Waiting for rider...</Text>
                </View>
              ) : (
                <View style={styles.courierOffersSection}>
                  <Text style={styles.courierOffersTitle}>Available Riders</Text>
                  {courierOffers.map((courier) => (
                    <TouchableOpacity
                      key={courier.id}
                      style={styles.courierCard}
                      onPress={() => handleAcceptCourier(courier)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.courierCardContent}>
                        <Image
                          source={courier.image}
                          style={styles.courierCardImage}
                          resizeMode="cover"
                        />
                        <View style={styles.courierCardInfo}>
                          <Text style={styles.courierCardName}>{courier.name}</Text>
                          <View style={styles.courierCardDetails}>
                            <View style={styles.courierCardRating}>
                              <Feather name="star" size={14} color="#FFA500" />
                              <Text style={styles.courierCardRatingText}>{courier.rating}</Text>
                            </View>
                            <Text style={styles.courierCardDeliveries}>
                              {courier.completedDeliveries} deliveries
                            </Text>
                          </View>
                          <Text style={styles.courierCardVehicle}>{courier.vehicle}</Text>
                        </View>
                        <View style={styles.courierCardRight}>
                          <Text style={styles.courierCardTime}>{courier.estimatedTime}</Text>
                          <TouchableOpacity
                            style={styles.acceptCourierButton}
                            onPress={() => handleAcceptCourier(courier)}
                            activeOpacity={0.8}
                          >
                            <Text style={styles.acceptCourierButtonText}>Accept</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Customer Order */}
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>{customerName}'s Order</Text>
                <View style={styles.orderItemsList}>
                  {displayItems.length > 0 ? (
                    displayItems.map((item, index) => (
                      <View key={index} style={styles.orderItem}>
                        <Text style={styles.orderItemText}>{item}</Text>
                      </View>
                    ))
                  ) : (
                    <>
                      <View style={styles.orderItem}>
                        <Text style={styles.orderItemText}>Grocery Pack</Text>
                      </View>
                    </>
                  )}
                </View>
              </View>

              {/* Special Instructions */}
              <View style={styles.instructionsCard}>
                <Text style={styles.instructionsText}>
                  Special Instructions: {order.specialInstructions || 'Extra sauce, no onions'}
                </Text>
              </View>

              {/* Pricing Summary */}
              <View style={styles.sectionCard}>
                <View style={styles.pricingRow}>
                  <Text style={styles.pricingLabel}>Subtotal:</Text>
                  <Text style={styles.pricingValue}>${order.subtotal?.toFixed(2) || order.total?.toFixed(2) || '45.20'}</Text>
                </View>
                <View style={styles.pricingRow}>
                  <Text style={styles.pricingLabel}>Delivery Fee:</Text>
                  <Text style={styles.pricingValue}>${order.deliveryFee?.toFixed(2) || '2.50'}</Text>
                </View>
                <View style={[styles.pricingRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Total:</Text>
                  <Text style={styles.totalValue}>${order.total?.toFixed(2) || '45.20'}</Text>
                </View>
              </View>
            </ScrollView>

            {/* Action Button */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.confirmPickupButton}
                onPress={handleConfirmPickup}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmPickupButtonText}>Confirm Pickup</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    overflow: 'hidden',
  },
  modalInner: {
    flex: 1,
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#CCCCCC',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  orderHeaderCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 24,
  },
  orderHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  statusBadge: {
    backgroundColor: '#F0FDF4',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#4F7942',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4F7942',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  loadingSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    paddingVertical: 20,
  },
  spinnerContainer: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  spinnerOuter: {
    position: 'absolute',
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#4F7942',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
  riderImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  riderImage: {
    width: '100%',
    height: '100%',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
  },
  courierOffersSection: {
    marginBottom: 32,
  },
  courierOffersTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 16,
  },
  courierCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courierCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courierCardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  courierCardInfo: {
    flex: 1,
  },
  courierCardName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  courierCardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 12,
  },
  courierCardRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  courierCardRatingText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
  },
  courierCardDeliveries: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
  },
  courierCardVehicle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
  },
  courierCardRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  courierCardTime: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4F7942',
  },
  acceptCourierButton: {
    backgroundColor: '#4F7942',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  acceptCourierButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  sectionCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 16,
  },
  orderItemsList: {
    gap: 12,
  },
  orderItem: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  orderItemText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  instructionsCard: {
    backgroundColor: '#FFF4E6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  instructionsText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#8B4513',
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  pricingLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
  },
  pricingValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  confirmPickupButton: {
    backgroundColor: '#000000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmPickupButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
