import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ProductDetailModal({
  visible,
  onClose,
  product,
  store,
  relatedItems = [],
  onAddToCart,
}) {
  const [quantity, setQuantity] = useState(1);
  const [slideAnim] = useState(new Animated.Value(SCREEN_HEIGHT));
  const [weightInput, setWeightInput] = useState('1'); // for kg-based items

  useEffect(() => {
    if (visible) {
      // Reset values when modal opens
      setQuantity(1);
      setWeightInput('1');
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, product]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onClose();
      setQuantity(1);
      setWeightInput('1');
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;
    const isWeightBased = product.unit === 'kg';
    const basePrice =
      (product.pricePerKg ?? parseFloat(product.price.replace('$', ''))) || 0;
    const weight = parseFloat(weightInput) || 0;
    const total = isWeightBased ? basePrice * weight : basePrice * quantity;

    // TODO: Add to cart logic
    if (onAddToCart) {
      onAddToCart({
        product,
        isWeightBased,
        quantity: isWeightBased ? weight : quantity,
        unit: isWeightBased ? 'kg' : 'x',
        lineTotal: total,
      });
    }
    handleClose();
  };

  // Get related items (exclude current product) - must be called before conditional return
  const filteredRelatedItems = useMemo(() => {
    if (!product) return [];
    return relatedItems.filter(item => item.id !== product.id).slice(0, 5);
  }, [relatedItems, product?.id]);

  if (!product) return null;

  // Pricing helpers
  const isWeightBased = product.unit === 'kg';
  const basePrice =
    (product.pricePerKg ?? parseFloat(product.price.replace('$', ''))) || 0;
  const weight = parseFloat(weightInput) || 0;
  const quantityForTotal = isWeightBased ? weight : quantity;
  const totalPrice = basePrice * (quantityForTotal || 0);
  const priceLabel = isWeightBased
    ? `$${basePrice.toFixed(2)} / kg`
    : `$${basePrice.toFixed(2)}`;

  const handleWeightChange = (value) => {
    // Allow user to type partial decimals like "0", "0.", ".5"
    const normalized = value.replace(',', '.');
    // Only allow digits and a single decimal point
    const decimalRegex = /^(\d+(\.\d*)?|\.\d*)?$/;
    if (!decimalRegex.test(normalized)) {
      return;
    }
    setWeightInput(normalized);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              {/* Handle Bar */}
              <View style={styles.handleBar} />

              {/* Header Section */}
              <View style={styles.header}>
                <View style={styles.headerLeft}>
                  <Image
                    source={{ uri: store?.logoUrl || 'https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png' }}
                    style={styles.storeLogo}
                    resizeMode="contain"
                  />
                  <View style={styles.headerText}>
                    <Text style={styles.productTitle}>{product.name}</Text>
                    <Text style={styles.productDescription}>{product.description}</Text>
                  </View>
                </View>
                <View style={styles.availableTag}>
                  <Text style={styles.availableText}>Available</Text>
                </View>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {/* Information Card */}
                <View style={styles.infoCard}>
                  <View style={styles.infoItem}>
                    <Text style={styles.infoValue}>{priceLabel}</Text>
                    <Text style={styles.infoLabel}>
                      {isWeightBased ? 'Price per kg' : 'Price'}
                    </Text>
                  </View>
                  <View style={styles.infoDivider} />
                  <View style={styles.infoItem}>
                    <Text style={styles.infoValue}>{store?.distance || '1.2 km'}</Text>
                    <Text style={styles.infoLabel}>Distance</Text>
                  </View>
                  <View style={styles.infoDivider} />
                  <View style={styles.infoItem}>
                    <Text style={styles.infoValue}>{store?.deliveryTime || '30 mins'}</Text>
                    <Text style={styles.infoLabel}>Pickup time</Text>
                  </View>
                </View>

                {/* Quantity / Weight Selector */}
                <View style={styles.quantitySection}>
                  <Text style={styles.quantityLabel}>
                    {isWeightBased ? 'Quantity (kg)' : 'Quantity'}
                  </Text>
                  {isWeightBased ? (
                    <View style={styles.weightInputWrapper}>
                      <TextInput
                        style={styles.weightInput}
                        keyboardType="decimal-pad"
                        value={weightInput}
                        onChangeText={handleWeightChange}
                        placeholder="e.g. 0.5"
                        placeholderTextColor="#999999"
                      />
                      <Text style={styles.weightUnit}>kg</Text>
                    </View>
                  ) : (
                    <View style={styles.quantityControls}>
                      <TouchableOpacity
                        style={[
                          styles.quantityButton,
                          quantity === 1 && styles.quantityButtonDisabled,
                        ]}
                        onPress={decreaseQuantity}
                        disabled={quantity === 1}
                        activeOpacity={0.7}
                      >
                        <Feather
                          name="minus"
                          size={18}
                          color={quantity === 1 ? '#CCCCCC' : '#000000'}
                        />
                      </TouchableOpacity>
                      <View style={styles.quantityDisplay}>
                        <Text style={styles.quantityText}>{quantity}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={increaseQuantity}
                        activeOpacity={0.7}
                      >
                        <Feather name="plus" size={18} color="#4F7942" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* You might also like Section */}
                {filteredRelatedItems.length > 0 && (
                  <View style={styles.relatedSection}>
                    <Text style={styles.relatedSectionTitle}>You might also like</Text>
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.relatedItemsContainer}
                    >
                      {filteredRelatedItems.map((item) => (
                        <TouchableOpacity
                          key={item.id}
                          style={styles.relatedItemCard}
                          activeOpacity={0.8}
                        >
                          <View style={styles.relatedItemImageContainer}>
                            <Image
                              source={{ uri: item.imageUrl }}
                              style={styles.relatedItemImage}
                              resizeMode="cover"
                            />
                            <TouchableOpacity
                              style={styles.relatedItemAddButton}
                              activeOpacity={0.7}
                            >
                              <Feather name="plus" size={16} color="#FFFFFF" />
                            </TouchableOpacity>
                          </View>
                          <View style={styles.relatedItemInfo}>
                            <View style={styles.relatedItemHeader}>
                              <Text style={styles.relatedItemName} numberOfLines={1}>
                                {item.name}
                              </Text>
                              <Text style={styles.relatedItemPrice}>{item.price}</Text>
                            </View>
                            <Text style={styles.relatedItemDescription} numberOfLines={2}>
                              {item.description}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}

                {/* Add to Cart Button */}
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={handleAddToCart}
                  activeOpacity={0.8}
                >
                  <Text style={styles.addToCartText}>
                    Add to Cart • ${totalPrice.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.9,
    paddingBottom: 20,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#CCCCCC',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  headerLeft: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
  },
  storeLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  availableTag: {
    backgroundColor: '#4F7942',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  availableText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666666',
  },
  infoDivider: {
    width: 1,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 12,
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    marginBottom: 20,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  weightInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4F7942',
    paddingHorizontal: 14,
    paddingVertical: 8,
    minWidth: 140,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  weightInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    paddingVertical: 0,
    marginRight: 8,
  },
  weightUnit: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4F7942',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityDisplay: {
    minWidth: 40,
    height: 36,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  relatedSection: {
    marginBottom: 20,
  },
  relatedSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  relatedItemsContainer: {
    gap: 12,
    paddingRight: 20,
  },
  relatedItemCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  relatedItemImageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
  },
  relatedItemImage: {
    width: '100%',
    height: '100%',
  },
  relatedItemAddButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4F7942',
    justifyContent: 'center',
    alignItems: 'center',
  },
  relatedItemInfo: {
    padding: 12,
  },
  relatedItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  relatedItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    marginRight: 8,
  },
  relatedItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4F7942',
  },
  relatedItemDescription: {
    fontSize: 12,
    color: '#999999',
    lineHeight: 16,
  },
  addToCartButton: {
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
