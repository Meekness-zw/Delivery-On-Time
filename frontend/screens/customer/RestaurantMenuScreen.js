import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { storeMenus } from '../../data/storeMenus';
import ProductDetailModal from '../../components/ProductDetailModal';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function RestaurantMenuScreen({ route, navigation }) {
  const { store } = route.params || {};
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  // Get store-specific menu data
  const storeMenuData = useMemo(() => {
    if (!store?.id) {
      // Default to KFC if no store provided
      return storeMenus[1];
    }
    return storeMenus[store.id] || storeMenus[1];
  }, [store?.id]);

  const categories = storeMenuData.categories || ['Popular'];
  
  // Set default category if current one doesn't exist
  React.useEffect(() => {
    if (!categories.includes(activeCategory)) {
      setActiveCategory(categories[0] || 'Popular');
    }
  }, [categories, activeCategory]);

  // Filter menu items based on category and search query
  const filteredItems = useMemo(() => {
    let items = storeMenuData.menuItems || [];
    
    // Filter by category
    if (activeCategory === 'Popular') {
      items = items.filter(item => item.category === 'Popular');
    } else {
      items = items.filter(item => item.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }
    
    return items;
  }, [storeMenuData.menuItems, activeCategory, searchQuery]);

  // Get background image based on store type
  const getBackgroundImage = () => {
    const storeType = store?.type?.toLowerCase() || '';
    if (storeType.includes('pizza')) {
      return 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=400&fit=crop';
    } else if (storeType.includes('coffee')) {
      return 'https://images.unsplash.com/photo-1501339847302-ac426a4c7c8e?w=800&h=400&fit=crop';
    } else if (storeType.includes('grocery') || storeType.includes('pharmacy')) {
      return 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=400&fit=crop';
    } else {
      return 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&h=400&fit=crop';
    }
  };

  const backgroundImage = getBackgroundImage();

  const cartItemCount = cartItems.length;
  const cartTotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

  const handleAddToCart = (cartEntry) => {
    setCartItems((prev) => {
      const index = prev.findIndex(
        (ci) =>
          ci.product.id === cartEntry.product.id &&
          ci.isWeightBased === cartEntry.isWeightBased,
      );
      if (index === -1) {
        return [...prev, cartEntry];
      }
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        quantity: updated[index].quantity + cartEntry.quantity,
        lineTotal: updated[index].lineTotal + cartEntry.lineTotal,
      };
      return updated;
    });
  };

  const handleRemoveFromCart = (productId, isWeightBased) => {
    setCartItems((prev) =>
      prev.filter(
        (ci) =>
          !(
            ci.product.id === productId && ci.isWeightBased === isWeightBased
          ),
      ),
    );
  };

  const handleCheckout = () => {
    setCartVisible(false);
    navigation.navigate('Checkout', {
      cartItems,
    });
  };

  return (
    <View style={styles.container}>
      {/* Top Background Section */}
      <View style={styles.topBackground}>
        <Image
          source={{ uri: backgroundImage }}
          style={styles.backgroundFoodImage}
          resizeMode="cover"
        />
        
        {/* Top Bar Icons */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.topBarButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Feather name="arrow-left" size={20} color="#000000" />
          </TouchableOpacity>
          <View style={styles.topBarRight}>
            <TouchableOpacity style={styles.topBarButton} activeOpacity={0.7}>
              <Feather name="heart" size={20} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topBarButton} activeOpacity={0.7}>
              <Feather name="share-2" size={20} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topBarButton} activeOpacity={0.7}>
              <Feather name="more-vertical" size={20} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* White Content Panel */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        nestedScrollEnabled={true}
        scrollEventThrottle={16}
      >
        {/* Restaurant Info Section */}
        <View style={styles.restaurantInfo}>
          <View style={styles.restaurantHeader}>
            <Image
              source={{ uri: store?.logoUrl || 'https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png' }}
              style={styles.restaurantLogo}
              resizeMode="contain"
            />
            <View style={styles.restaurantDetails}>
              <Text style={styles.restaurantName}>{store?.name || 'KFC'}</Text>
              <Text style={styles.restaurantType}>{store?.type || 'Fast Food Restaurant'}</Text>
              <View style={styles.restaurantMeta}>
                <View style={styles.metaItem}>
                  <Feather name="clock" size={14} color="#666666" />
                  <Text style={styles.metaText}>{store?.deliveryTime || '15-30mins'}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Feather name="map-pin" size={14} color="#666666" />
                  <Text style={styles.metaText}>{store?.distance || '1.2 km'}</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* Restaurant Description */}
          <View style={styles.descriptionContainer}>
            <Feather name="info" size={16} color="#666666" />
            <Text style={styles.descriptionText}>
              {storeMenuData.description || 'Fast-prepared meals and classic sides. Great for quick meals or sharing, with reliable portions and delivery-friendly packaging.'}
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#999999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search in menu"
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Category Tabs */}
        {categories.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categoriesScrollContent}
            nestedScrollEnabled={true}
            scrollEventThrottle={16}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryTab,
                  activeCategory === category && styles.categoryTabActive
                ]}
                onPress={() => setActiveCategory(category)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.categoryTabText,
                  activeCategory === category && styles.categoryTabTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Menu Items Section */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Explore Menu</Text>
          {filteredItems.length > 0 ? (
            <View style={styles.menuItemsList}>
              {filteredItems.map((item) => (
                <TouchableOpacity key={item.id} style={styles.menuItemCard} activeOpacity={0.8}>
                  <View style={styles.menuItemImageContainer}>
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.menuItemImage}
                      resizeMode="cover"
                    />
                    {item.spicy && (
                      <View style={styles.spicyLabel}>
                        <Text style={styles.spicyLabelText}>SPICY</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.menuItemInfo}>
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    <Text style={styles.menuItemDescription}>{item.description}</Text>
                    <View style={styles.menuItemFooter}>
                      <Text style={styles.menuItemPrice}>{item.price}</Text>
                      <TouchableOpacity
                        style={styles.addButton}
                        activeOpacity={0.7}
                        onPress={() => {
                          setSelectedProduct(item);
                          setModalVisible(true);
                        }}
                      >
                        <Feather name="plus" size={18} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Feather name="search" size={48} color="#CCCCCC" />
              <Text style={styles.emptyStateText}>No items found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try adjusting your search or category filter
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Product Detail Modal */}
      <ProductDetailModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        store={store}
        relatedItems={storeMenuData.menuItems || []}
        onAddToCart={handleAddToCart}
      />

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <View style={styles.floatingCartContainer} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.floatingCartButton}
            activeOpacity={0.8}
            onPress={() => setCartVisible(true)}
          >
            <Feather name="shopping-cart" size={20} color="#FFFFFF" />
            <View style={styles.floatingCartTextContainer}>
              <Text style={styles.floatingCartTitle}>Check cart</Text>
              <Text style={styles.floatingCartSubtitle}>
                {cartItemCount} item{cartItemCount > 1 ? 's' : ''} • $
                {cartTotal.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Cart Modal */}
      <Modal
        visible={cartVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setCartVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setCartVisible(false)}>
          <View style={styles.cartOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.cartModal}>
                <View style={styles.cartHeader}>
                  <Text style={styles.cartTitle}>Your Cart</Text>
                  <TouchableOpacity
                    onPress={() => setCartVisible(false)}
                    style={styles.cartCloseButton}
                  >
                    <Feather name="x" size={20} color="#000000" />
                  </TouchableOpacity>
                </View>
                {cartItems.length === 0 ? (
                  <View style={styles.cartEmptyState}>
                    <Feather name="shopping-cart" size={36} color="#CCCCCC" />
                    <Text style={styles.cartEmptyText}>Your cart is empty</Text>
                  </View>
                ) : (
                  <>
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={styles.cartItemsContainer}
                    >
                      {cartItems.map((item) => (
                        <View
                          key={item.product.id + (item.isWeightBased ? '-kg' : '')}
                          style={styles.cartItemRow}
                        >
                          <Image
                            source={{ uri: item.product.imageUrl }}
                            style={styles.cartItemImage}
                            resizeMode="cover"
                          />
                          <View style={styles.cartItemInfo}>
                            <Text style={styles.cartItemName}>
                              {item.product.name}
                            </Text>
                            <Text style={styles.cartItemMeta}>
                              {item.isWeightBased
                                ? `${item.quantity.toFixed(2)} kg`
                                : `${item.quantity}x`}{' '}
                              • ${item.lineTotal.toFixed(2)}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              handleRemoveFromCart(
                                item.product.id,
                                item.isWeightBased,
                              )
                            }
                            style={styles.cartItemRemoveButton}
                            activeOpacity={0.7}
                          >
                            <Feather name="trash-2" size={18} color="#CC0000" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </ScrollView>
                    <View style={styles.cartFooter}>
                      <View>
                        <Text style={styles.cartTotalLabel}>Total</Text>
                        <Text style={styles.cartTotalValue}>
                          ${cartTotal.toFixed(2)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.checkoutButton}
                        activeOpacity={0.8}
                        onPress={handleCheckout}
                      >
                        <Text style={styles.checkoutButtonText}>Checkout</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  topBackground: {
    height: 220,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundFoodImage: {
    width: '100%',
    height: '100%',
  },
  topBar: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  topBarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  topBarRight: {
    flexDirection: 'row',
    gap: 12,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  restaurantInfo: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    marginTop: 0, // lowered so logo and name sit further below the banner for all stores
  },
  restaurantHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  restaurantLogo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    backgroundColor: '#F5F5F5',
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  restaurantType: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  restaurantMeta: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#666666',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  descriptionText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
  },
  categoriesScroll: {
    marginTop: 20,
  },
  categoriesScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  categoryTabActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#4F7942',
    borderWidth: 2,
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  categoryTabTextActive: {
    color: '#4F7942',
    fontWeight: '400',
  },
  menuSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 16,
  },
  menuItemsList: {
    gap: 16,
  },
  menuItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    flexDirection: 'row',
    padding: 12,
  },
  menuItemImageContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  menuItemImage: {
    width: '100%',
    height: '100%',
  },
  spicyLabel: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#FF4444',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    zIndex: 1,
  },
  spicyLabelText: {
    fontSize: 9,
    fontWeight: '400',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  menuItemInfo: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'space-between',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
    marginBottom: 8,
    flex: 1,
  },
  menuItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4F7942',
  },
  floatingCartContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  floatingCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F7942',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  floatingCartTextContainer: {
    marginLeft: 12,
  },
  floatingCartTitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  floatingCartSubtitle: {
    fontSize: 12,
    color: '#E5E5E5',
  },
  cartOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  cartModal: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: SCREEN_HEIGHT * 0.6,
    paddingBottom: 16,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
  },
  cartCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartEmptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  cartEmptyText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666666',
  },
  cartItemsContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 12,
  },
  cartItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartItemImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 2,
  },
  cartItemMeta: {
    fontSize: 12,
    color: '#666666',
  },
  cartItemRemoveButton: {
    padding: 8,
  },
  cartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  cartTotalLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  cartTotalValue: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4F7942',
  },
  checkoutButton: {
    backgroundColor: '#4F7942',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 999,
  },
  checkoutButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4F7942',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
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
});
