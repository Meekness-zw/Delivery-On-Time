import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function CustomerHomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Restaurants', 'Groceries', 'Pharmacy', 'Hardware'];

  // Helper function to map store type to category
  const getStoreCategory = (type) => {
    if (type.includes('Restaurant') || type.includes('Coffee')) {
      return 'Restaurants';
    }
    if (type.includes('Grocery')) {
      return 'Groceries';
    }
    if (type.includes('Pharmacy')) {
      return 'Pharmacy';
    }
    if (type.includes('Hardware')) {
      return 'Hardware';
    }
    return 'All';
  };

  const promoDeals = [
    {
      id: 1,
      storeName: 'Pizza Inn',
      description: 'Get 2 for the price of 1 every tuesday',
      tag: '2X LARGE PIZZAS FROM $11',
      deliveryTime: '15-30mins',
      distance: '1.2 km',
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=500&fit=crop',
      logoUrl: 'https://logos-world.net/wp-content/uploads/2021/02/Pizza-Hut-Logo.png',
      category: 'Restaurants',
    },
    {
      id: 2,
      storeName: 'KFC',
      description: 'Family bucket special - Save 20%',
      tag: 'FAMILY BUCKET $25',
      deliveryTime: '15-30mins',
      distance: '1.2 km',
      imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=500&fit=crop',
      logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png',
      category: 'Restaurants',
    },
    {
      id: 3,
      storeName: 'Chicken Inn',
      description: 'Buy any meal and get a free drink',
      tag: 'FREE DRINK WITH MEAL',
      deliveryTime: '20-30mins',
      distance: '1.2 km',
      imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=500&fit=crop',
      logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png',
      category: 'Restaurants',
    },
  ];

  const nearbyStores = [
    {
      id: 1,
      name: 'KFC',
      type: 'Fast Food Restaurant',
      rating: 4.8,
      deliveryTime: '15-30mins',
      distance: '1.2 km',
      imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop',
      logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png',
    },
    {
      id: 2,
      name: 'Pic n Pay',
      type: 'Grocery Store',
      rating: 5.0,
      deliveryTime: '20-30mins',
      distance: '1.2 km',
      imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=300&fit=crop',
      logoUrl: 'https://logos-world.net/wp-content/uploads/2021/03/Pick-n-Pay-Logo.png',
    },
    {
      id: 3,
      name: 'Kairos Pharmacy',
      type: 'Pharmacy',
      rating: 4.6,
      deliveryTime: '15-25mins',
      distance: '1.2 km',
      imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=300&fit=crop',
      logoUrl: 'https://logos-world.net/wp-content/uploads/2020/11/CVS-Logo.png',
    },
    {
      id: 4,
      name: 'Coffees Of Africa',
      type: 'Coffee Store',
      rating: 4.8,
      deliveryTime: '20-30mins',
      distance: '1.4 km',
      imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4c7c8e?w=400&h=300&fit=crop',
      logoUrl: 'https://logos-world.net/wp-content/uploads/2020/11/Starbucks-Logo.png',
    },
    {
      id: 5,
      name: 'Steers',
      type: 'Fast Food Restaurant',
      rating: 4.8,
      deliveryTime: '20-30mins',
      distance: '1.2 km',
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
      logoUrl: 'https://logos-world.net/wp-content/uploads/2020/11/Steers-Logo.png',
    },
    {
      id: 6,
      name: 'Chicken Inn',
      type: 'Fast Food Restaurant',
      rating: 4.8,
      deliveryTime: '20-30mins',
      distance: '1.2 km',
      imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop',
      logoUrl: 'https://logos-world.net/wp-content/uploads/2020/04/KFC-Logo.png',
    },
    {
      id: 7,
      name: 'Pizza Inn',
      type: 'Fast Food Restaurant',
      rating: 4.8,
      deliveryTime: '20-30mins',
      distance: '1.2 km',
      imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
      logoUrl: 'https://logos-world.net/wp-content/uploads/2021/02/Pizza-Hut-Logo.png',
    },
    {
      id: 8,
      name: 'Builders Warehouse',
      type: 'Hardware Store',
      rating: 4.7,
      deliveryTime: '30-45mins',
      distance: '2.1 km',
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
      logoUrl: 'https://logos-world.net/wp-content/uploads/2020/11/Home-Depot-Logo.png',
    },
    {
      id: 9,
      name: 'Hardware City',
      type: 'Hardware Store',
      rating: 4.5,
      deliveryTime: '25-40mins',
      distance: '1.8 km',
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop',
      logoUrl: 'https://logos-world.net/wp-content/uploads/2020/11/Lowes-Logo.png',
    },
  ];

  // Filter stores and deals based on active category and search query
  const filteredPromoDeals = useMemo(() => {
    let filtered = promoDeals;

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(deal => deal.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(deal => 
        deal.storeName.toLowerCase().includes(query) ||
        deal.description.toLowerCase().includes(query) ||
        deal.tag.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  const filteredNearbyStores = useMemo(() => {
    let filtered = nearbyStores;

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(store => getStoreCategory(store.type) === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(store => 
        store.name.toLowerCase().includes(query) ||
        store.type.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.locationContainer}>
            <Feather name="map-pin" size={20} color="#4F7942" />
            <Text style={styles.locationText}>Deliver to</Text>
            <Text style={styles.addressText}>Current Location</Text>
            <Feather name="chevron-down" size={16} color="#666666" />
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="bell" size={22} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="shopping-cart" size={22} color="#000000" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#999999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for restaurants or items"
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
              activeOpacity={0.7}
            >
              <Feather name="x" size={18} color="#999999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        nestedScrollEnabled={true}
        scrollEventThrottle={16}
      >
          {/* Categories Section */}
          <View style={styles.section}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.categoriesScroll}
              nestedScrollEnabled={true}
              scrollEventThrottle={16}
            >
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    activeCategory === category && styles.categoryChipActive
                  ]}
                  onPress={() => setActiveCategory(category)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.categoryText,
                    activeCategory === category && styles.categoryTextActive
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Promo Hot Deals Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Feather name="zap" size={20} color="#4F7942" />
                <Text style={styles.sectionTitle}>Promo Hot Deals</Text>
              </View>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.promoCarousel}
              contentContainerStyle={styles.promoCarouselContent}
              nestedScrollEnabled={true}
              scrollEventThrottle={16}
            >
              {filteredPromoDeals.map((deal) => (
                <View key={deal.id} style={styles.promoCard}>
                  <View style={styles.promoImageContainer}>
                    <Image
                      source={{ uri: deal.imageUrl }}
                      style={styles.promoImage}
                      resizeMode="cover"
                    />
                    <View style={[
                      styles.promoTag,
                      (deal.tag.includes('FROM') || deal.tag.includes('FREE') || deal.tag.length > 20) && styles.promoTagLarge
                    ]}>
                      {deal.tag.includes('FROM') ? (
                        <>
                          <Text style={styles.promoTagLine1}>{deal.tag.split('PIZZAS')[0].trim()}</Text>
                          <Text style={styles.promoTagLine2}>PIZZAS</Text>
                          <Text style={styles.promoTagLine3}>FROM</Text>
                          <Text style={styles.promoTagPrice}>{deal.tag.match(/\$[\d.]+/)?.[0] || ''}</Text>
                        </>
                      ) : deal.tag.includes('FREE') ? (
                        <>
                          <Text style={styles.promoTagLine1}>FREE</Text>
                          <Text style={styles.promoTagLine2}>DRINK</Text>
                          <Text style={styles.promoTagLine3}>WITH MEAL</Text>
                        </>
                      ) : (
                        <Text style={styles.promoTagLine1}>{deal.tag}</Text>
                      )}
                    </View>
                    <View style={styles.promoDetailsCard}>
                      <View style={styles.promoCardContent}>
                        <View style={styles.promoLogo}>
                          <Image
                            source={{ uri: deal.logoUrl }}
                            style={styles.promoLogoImage}
                            resizeMode="contain"
                          />
                        </View>
                        <View style={styles.promoTextContainer}>
                          <Text style={styles.promoStoreName}>{deal.storeName}</Text>
                          <Text style={styles.promoDescription}>{deal.description}</Text>
                          <View style={styles.promoDeliveryInfo}>
                            <View style={styles.promoDeliveryItem}>
                              <Feather name="clock" size={14} color="#666666" />
                              <Text style={styles.promoDeliveryTime}>{deal.deliveryTime}</Text>
                            </View>
                            <View style={styles.promoDeliveryItem}>
                              <Feather name="map-pin" size={14} color="#666666" />
                              <Text style={styles.promoDeliveryDistance}>{deal.distance}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Nearby Stores Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Nearby Stores</Text>
              <Text style={styles.storeCount}>{filteredNearbyStores.length} stores</Text>
            </View>
            <View style={styles.storesList}>
              {filteredNearbyStores.map((store) => (
                <TouchableOpacity 
                  key={store.id} 
                  style={styles.storeCard} 
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('RestaurantMenu', { store })}
                >
                  <View style={styles.storeImageContainer}>
                    <Image
                      source={{ uri: store.imageUrl }}
                      style={styles.storeImage}
                      resizeMode="cover"
                    />
                    <View style={styles.storeImageOverlay}>
                      <View style={styles.openTag}>
                        <Text style={styles.openTagText}>Open</Text>
                      </View>
                      <TouchableOpacity style={styles.favoriteButton}>
                        <Feather name="heart" size={18} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.storeInfo}>
                    <View style={styles.storeHeader}>
                      <View style={styles.storeHeaderLeft}>
                        {store.logoUrl && (
                          <Image
                            source={{ uri: store.logoUrl }}
                            style={styles.storeLogoSmall}
                            resizeMode="cover"
                          />
                        )}
                        <View style={styles.storeTitleContainer}>
                          <Text style={styles.storeName}>{store.name}</Text>
                          <Text style={styles.storeType}>{store.type}</Text>
                        </View>
                      </View>
                      <View style={styles.storeRating}>
                        <Feather name="star" size={14} color="#4F7942" />
                        <Text style={styles.ratingText}>{store.rating}</Text>
                      </View>
                    </View>
                    <View style={styles.storeDeliveryInfo}>
                      <View style={styles.deliveryItem}>
                        <Feather name="clock" size={14} color="#666666" />
                        <Text style={styles.deliveryTime}>{store.deliveryTime}</Text>
                      </View>
                      <View style={styles.deliveryItem}>
                        <Feather name="map-pin" size={14} color="#666666" />
                        <Text style={styles.deliveryDistance}>{store.distance}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

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
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 12,
    color: '#666666',
  },
  addressText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    padding: 0,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  storeCount: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  categoriesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginRight: 12,
  },
  categoryChipActive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#4F7942",
    borderWidth: 2,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  categoryTextActive: {
    color: "#4F7942",
    fontWeight: "400",
  },
  promoCarousel: {
    marginHorizontal: -20,
  },
  promoCarouselContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  promoCard: {
    width: 320,
    marginRight: 16,
  },
  promoImageContainer: {
    position: "relative",
    width: "100%",
    height: 280,
    borderRadius: 12,
    overflow: "hidden",
  },
  promoImage: {
    width: "100%",
    height: "100%",
  },
  promoTag: {
    position: 'absolute',
    left: 12,
    top: 12,
    backgroundColor: '#4F7942',
    borderRadius: 80,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    zIndex: 2,
  },
  promoTagLarge: {
    width: 100,
    height: 100,
    borderRadius: 100,
    padding: 10,
  },
  promoTagLine1: {
    fontSize: 10,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  promoTagLine2: {
    fontSize: 10,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  promoTagLine3: {
    fontSize: 8,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 2,
  },
  promoTagPrice: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 2,
  },
  promoDetailsCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 16,
  },
  promoCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  promoLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  },
  promoLogoImage: {
    width: 50,
    height: 50,
  },
  promoTextContainer: {
    flex: 1,
  },
  promoStoreName: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  promoDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  promoDeliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  promoDeliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  promoDeliveryTime: {
    fontSize: 14,
    color: '#666666',
  },
  promoDeliveryDistance: {
    fontSize: 14,
    color: '#666666',
  },
  storesList: {
    gap: 16,
  },
  storeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  storeImageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  storeImage: {
    width: '100%',
    height: '100%',
  },
  storeImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 12,
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  storeHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  storeLogoSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
  },
  storeTitleContainer: {
    flex: 1,
  },
  storeRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  openTag: {
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  openTagText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  storeInfo: {
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  storeName: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  storeType: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 0,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4F7942',
  },
  storeDeliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 8,
    marginLeft: 60,
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveryTime: {
    fontSize: 14,
    color: '#666666',
  },
  deliveryDistance: {
    fontSize: 14,
    color: '#666666',
  },
  bottomSpacing: {
    height: 100,
  },
});
