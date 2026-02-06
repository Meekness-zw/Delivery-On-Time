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
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function OrderDetailModal({ visible, order, onClose, onAccept, onReject }) {
  const [timeRemaining, setTimeRemaining] = useState(45);
  const [selectedPrepTime, setSelectedPrepTime] = useState('10 Mins');
  const [isExpanded, setIsExpanded] = useState(false);
  const modalHeight = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  const prepTimeOptions = ['10 Mins', '20 Mins', '30 Mins', 'Custom'];

  useEffect(() => {
    if (visible) {
      setTimeRemaining(45);
    }
    // Countdown timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [visible]);

  const handleAccept = () => {
    if (onAccept) {
      onAccept(order);
    }
    onClose();
  };

  const handleReject = () => {
    if (onReject) {
      onReject(order);
    }
    onClose();
  };

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

  useEffect(() => {
    if (visible) {
      setIsExpanded(false);
      modalHeight.setValue(0);
    }
  }, [visible]);

  if (!order) return null;

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

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {/* Order Header */}
              <View style={styles.orderHeaderCard}>
                <View style={styles.orderHeaderContent}>
                  <Text style={styles.orderNumber}>Order {order.orderNumber || '#2045'}</Text>
                  <View style={styles.timerContainer}>
                    <View style={styles.timerCircle}>
                      <Text style={styles.timerText}>{timeRemaining}s</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Customer Info */}
              <View style={styles.customerCard}>
                <View style={styles.customerInfo}>
                  <View style={styles.customerAvatar}>
                    <Feather name="user" size={32} color="#FFFFFF" />
                  </View>
                  <View style={styles.customerDetails}>
                    <Text style={styles.customerName}>{order.customerName || 'Uncle Joe'}</Text>
                    <Text style={styles.customerDistance}>2.4 km away</Text>
                  </View>
                </View>
              </View>

              {/* Customer Order */}
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Customer Order</Text>
                <View style={styles.orderItemsList}>
                  {order.items?.map((item, index) => (
                    <View key={index} style={styles.orderItem}>
                      <Text style={styles.orderItemText}>{item}</Text>
                    </View>
                  )) || (
                    <>
                      <View style={styles.orderItem}>
                        <Text style={styles.orderItemText}>Minute Maid Delight</Text>
                      </View>
                      <View style={styles.orderItem}>
                        <Text style={styles.orderItemText}>Large Fries</Text>
                      </View>
                      <View style={styles.orderItem}>
                        <Text style={styles.orderItemText}>Chicken Wrap</Text>
                      </View>
                    </>
                  )}
                </View>
              </View>

              {/* Special Instructions */}
              {(order.specialInstructions || true) && (
                <View style={styles.instructionsCard}>
                  <Text style={styles.instructionsText}>
                    Special Instructions: {order.specialInstructions || 'Extra sauce, no onions'}
                  </Text>
                </View>
              )}

              {/* Pricing Summary */}
              <View style={styles.sectionCard}>
                <View style={styles.pricingRow}>
                  <Text style={styles.pricingLabel}>Subtotal:</Text>
                  <Text style={styles.pricingValue}>${order.subtotal?.toFixed(2) || '10.00'}</Text>
                </View>
                <View style={styles.pricingRow}>
                  <Text style={styles.pricingLabel}>Delivery Fee:</Text>
                  <Text style={styles.pricingValue}>${order.deliveryFee?.toFixed(2) || '2.50'}</Text>
                </View>
                <View style={[styles.pricingRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Total:</Text>
                  <Text style={styles.totalValue}>${order.total?.toFixed(2) || '12.50'}</Text>
                </View>
              </View>

              {/* Select Prep Time */}
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Select prep time</Text>
                <View style={styles.prepTimeContainer}>
                  {prepTimeOptions.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.prepTimeButton,
                        selectedPrepTime === time && styles.prepTimeButtonActive,
                      ]}
                      onPress={() => setSelectedPrepTime(time)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.prepTimeText,
                          selectedPrepTime === time && styles.prepTimeTextActive,
                        ]}
                      >
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.rejectButton}
                onPress={handleReject}
                activeOpacity={0.7}
              >
                <Text style={styles.rejectButtonText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={handleAccept}
                activeOpacity={0.8}
              >
                <Text style={styles.acceptButtonText}>Accept</Text>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  orderHeaderCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#4F7942',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4F7942',
  },
  customerCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  customerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  customerDistance: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
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
  prepTimeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  prepTimeButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prepTimeButtonActive: {
    backgroundColor: '#4F7942',
    borderColor: '#4F7942',
  },
  prepTimeText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  prepTimeTextActive: {
    color: '#FFFFFF',
    fontWeight: '400',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    gap: 12,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
