import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import CourierDrawerMenu from './CourierDrawerMenu';

export default function CourierHomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [isOnline, setIsOnline] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [incomingOrder, setIncomingOrder] = useState(null);
  
  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Default location (Harare, Zimbabwe)
  const mapLat = -17.8292;
  const mapLng = 31.0522;

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'RoleSelection' }],
    });
  };

  const toggleOnlineStatus = () => {
    // Animate status change
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 20,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();
    
    setIsOnline(!isOnline);
  };

  // Reset animations when status changes
  useEffect(() => {
    slideAnim.setValue(0);
    fadeAnim.setValue(1);
    scaleAnim.setValue(1);
  }, [isOnline]);

  // Simulate incoming orders when online
  useEffect(() => {
    if (isOnline) {
      // Simulate an incoming order after 2 seconds
      const timer = setTimeout(() => {
        setIncomingOrder({
          restaurant: {
            name: 'Pizza Inn',
            image: 'https://via.placeholder.com/80',
            address: '12 Samora Machel St, Harare Zimbabwe',
            distance: '2.3 KM',
          },
          courier: {
            name: 'Tapiwa Roy',
            profilePhoto: 'https://via.placeholder.com/50',
            orderId: 'CON1260',
            deliveryTime: 'Deliver Within 30min',
          },
          pickupLocation: {
            name: 'Sam Levy Village',
            address: 'Sam Levy Village, Borrowdale',
            latitude: -17.8252,
            longitude: 31.0335,
          },
          customer: {
            name: 'Erling Haaland',
            profilePhoto: 'https://via.placeholder.com/50',
            itemCount: 3,
          },
          items: [
            { name: 'Cheese Burger', quantity: 1 },
            { name: 'Large Fries', quantity: 2 },
            { name: 'Minute Maid', quantity: 2 },
          ],
          pickupNotes: 'Please double check the drinks before leaving',
          deliveryLocation: {
            address: '70 Milton Park Baines Avenue, Harare, Zimbabwe',
            latitude: -17.8300,
            longitude: 31.0400,
          },
          distance: '2.4 km',
          estimatedTime: '8 min',
        });
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setIncomingOrder(null);
    }
  }, [isOnline]);

  const handleAcceptOrder = () => {
    // Navigate to active order screen
    navigation.navigate('CourierActiveOrder', {
      order: incomingOrder,
    });
    setIncomingOrder(null);
  };

  const handleRejectOrder = () => {
    // TODO: Handle order rejection
    setIncomingOrder(null);
  };

  const accountBalance = user?.accountBalance || '$20.00';
  const rating = user?.rating || '3.8';

  // Google Maps embed HTML
  const mapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { width: 100%; height: 100%; overflow: hidden; }
          #map { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          function initMap() {
            const map = new google.maps.Map(document.getElementById('map'), {
              center: { lat: ${mapLat}, lng: ${mapLng} },
              zoom: 15,
              disableDefaultUI: true,
              zoomControl: false,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              styles: [
                {
                  featureType: "poi",
                  elementType: "labels",
                  stylers: [{ visibility: "off" }]
                }
              ]
            });
            
            const marker = new google.maps.Marker({
              position: { lat: ${mapLat}, lng: ${mapLng} },
              map: map,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#4F7942',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 3
              }
            });
          }
        </script>
        <script async defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDummyKey&callback=initMap">
        </script>
      </body>
    </html>
  `;

  // Styled map using CartoDB Positron (clean, modern style)
  const openStreetMapHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { width: 100%; height: 100%; overflow: hidden; }
          #map { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
          const map = L.map('map', {
            center: [${mapLat}, ${mapLng}],
            zoom: 15,
            zoomControl: false,
            attributionControl: false
          });
          
          // Use CartoDB Positron style - clean and modern
          L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
          }).addTo(map);
          
          // Custom location marker - faint green circle with darker inner circle and centered black cursor
          const greenIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="width: 40px; height: 40px; border-radius: 20px; background-color: rgba(79, 121, 66, 0.3); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3); position: relative;"><div style="width: 24px; height: 24px; border-radius: 12px; background-color: rgba(79, 121, 66, 0.6); display: flex; align-items: center; justify-content: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="#000000"/></svg></div></div>',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
          });
          
          L.marker([${mapLat}, ${mapLng}], { 
            icon: greenIcon,
            draggable: false
          }).addTo(map);
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Full Screen Web Map */}
      <WebView
        source={{ html: openStreetMapHtml }}
        style={styles.map}
        scrollEnabled={false}
        zoomEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

      {/* Compass Button */}
      <TouchableOpacity style={styles.compassButton} activeOpacity={0.7}>
        <Feather name="navigation" size={20} color="#000000" />
      </TouchableOpacity>
      
      {/* Floating Header */}
      <View style={styles.header}>
        {/* Hamburger Menu */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setDrawerVisible(true)}
          activeOpacity={0.7}
        >
          <View style={styles.menuIconContainer}>
            <Feather name="menu" size={20} color="#000000" />
          </View>
        </TouchableOpacity>

        {/* Account Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Account Balance</Text>
          <Text style={styles.balanceAmount}>{accountBalance}</Text>
        </View>

        {/* Profile Picture and Rating */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: user?.profilePhoto || 'https://via.placeholder.com/50' }}
              style={styles.profileImage}
            />
            {isOnline && <View style={styles.onlineIndicator} />}
          </View>
          <View style={styles.ratingContainer}>
            <Feather name="star" size={12} color="#4F7942" />
            <Text style={styles.ratingText}>{rating}</Text>
          </View>
        </View>
      </View>

      {/* Order Request Card */}
      {incomingOrder && (
        <View style={styles.orderCardWrapper}>
          <View style={styles.orderCard}>
            {/* Restaurant Information */}
            <View style={styles.orderSection}>
              <Image
                source={{ uri: incomingOrder.restaurant.image }}
                style={styles.restaurantImage}
              />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{incomingOrder.restaurant.name}</Text>
                <Text style={styles.restaurantAddress}>{incomingOrder.restaurant.address}</Text>
              </View>
              <View style={styles.distanceBadge}>
                <Text style={styles.distanceText}>{incomingOrder.restaurant.distance}</Text>
              </View>
            </View>

            <View style={styles.separator} />

            {/* Delivery Person Information */}
            <View style={styles.orderSection}>
              <Image
                source={{ uri: incomingOrder.courier.profilePhoto }}
                style={styles.courierImage}
              />
              <View style={styles.courierInfo}>
                <Text style={styles.courierName}>{incomingOrder.courier.name}</Text>
                <Text style={styles.orderId}>Order Id #{incomingOrder.courier.orderId}</Text>
              </View>
              <View style={styles.timeBadge}>
                <Text style={styles.timeText}>{incomingOrder.courier.deliveryTime}</Text>
              </View>
            </View>

            <View style={styles.separator} />

            {/* Delivery Location */}
            <View style={styles.deliveryLocationSection}>
              <Feather name="map-pin" size={20} color="#4F7942" />
              <View style={styles.deliveryLocationInfo}>
                <Text style={styles.deliveryLocationLabel}>Delivery Location</Text>
                <Text style={styles.deliveryLocationAddress}>
                  {typeof incomingOrder.deliveryLocation === 'string' 
                    ? incomingOrder.deliveryLocation 
                    : incomingOrder.deliveryLocation?.address || 'Address not available'}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.rejectButton}
                onPress={handleRejectOrder}
                activeOpacity={0.7}
              >
                <Text style={styles.rejectButtonText}>Reject</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={handleAcceptOrder}
                activeOpacity={0.7}
              >
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Floating Status Card - Animated */}
      {!incomingOrder && (
        <View style={styles.floatingCardWrapper}>
          <Animated.View
            style={[
              styles.statusCard,
              {
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim },
                ],
              },
            ]}
          >
            <View style={styles.statusCardContent}>
              <Animated.View
                style={{
                  opacity: fadeAnim,
                }}
              >
                <Text style={styles.statusTitle}>
                  {isOnline ? "You're Online" : "You're Offline"}
                </Text>
                <Text style={styles.statusDescription}>
                  {isOnline
                    ? "Stay nearby and keep the app open to receive requests."
                    : "Go online to start delivering orders and earning money."}
                </Text>
              </Animated.View>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  isOnline ? styles.statusButtonOffline : styles.statusButtonOnline,
                ]}
                onPress={toggleOnlineStatus}
                activeOpacity={0.8}
              >
                <Text style={styles.statusButtonText}>
                  {isOnline ? 'Go Offline' : 'Go Online'}
        </Text>
        </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}

      {/* Drawer Menu */}
      <CourierDrawerMenu
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 11,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 2,
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: '400',
    color: '#4F7942',
  },
  profileSection: {
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 2,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E5E5E5',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4F7942',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#4F7942',
  },
  compassButton: {
    position: 'absolute',
    bottom: 200,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  floatingCardWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    minHeight: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  statusCardContent: {
    width: '100%',
  },
  statusTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  statusDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 20,
    lineHeight: 20,
  },
  statusButton: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusButtonOnline: {
    backgroundColor: '#4F7942',
  },
  statusButtonOffline: {
    backgroundColor: '#DC2626',
  },
  statusButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  orderCardWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    minHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  orderSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
    marginRight: 12,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  restaurantAddress: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
  },
  distanceBadge: {
    backgroundColor: '#F0F9F4',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#4F7942',
  },
  courierImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E5E5',
    marginRight: 12,
  },
  courierInfo: {
    flex: 1,
  },
  courierName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  orderId: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
  },
  timeBadge: {
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '400',
    color: '#666666',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 16,
  },
  deliveryLocationSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  deliveryLocationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  deliveryLocationLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  deliveryLocationAddress: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  rejectButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rejectButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  acceptButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#4F7942',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
