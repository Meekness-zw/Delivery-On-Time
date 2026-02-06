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

export default function PreparingOrderModal({ visible, order, onClose, onMarkReady }) {
  const [timeRemaining, setTimeRemaining] = useState(12 * 60 + 40); // 12:40 in seconds
  const [isExpanded, setIsExpanded] = useState(false);
  const modalHeight = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setIsExpanded(false);
      translateY.setValue(0);
    }
    
    // Countdown timer
    let timer;
    if (visible) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [visible]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMarkReady = () => {
    if (onMarkReady) {
      onMarkReady(order);
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

  // Use prepTimeRemaining from order if available, otherwise use default
  useEffect(() => {
    if (visible && order?.prepTimeRemaining) {
      setTimeRemaining(order.prepTimeRemaining * 60);
    } else if (visible) {
      setTimeRemaining(12 * 60 + 40);
    }
  }, [visible, order]);

  if (!order) return null;

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
                <Text style={styles.orderNumber}>Order {order.orderNumber || '#2045'}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>Preparing</Text>
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
              {/* Timer Circle */}
              <View style={styles.timerSection}>
                <View style={styles.timerCircle}>
                  <Feather name="clock" size={48} color="#4F7942" />
                </View>
                <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
                <Text style={styles.timerLabel}>Remaining</Text>
              </View>

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
              <View style={styles.instructionsCard}>
                <Text style={styles.instructionsText}>
                  Special Instructions: {order.specialInstructions || 'Extra sauce, no onions'}
                </Text>
              </View>
            </ScrollView>

            {/* Action Button */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.markReadyButton}
                onPress={handleMarkReady}
                activeOpacity={0.8}
              >
                <Text style={styles.markReadyButtonText}>Mark As Ready</Text>
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
    backgroundColor: '#FFF4E6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FF8C00',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  timerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  timerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  timerText: {
    fontSize: 32,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  timerLabel: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
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
  actionButtons: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  markReadyButton: {
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markReadyButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
