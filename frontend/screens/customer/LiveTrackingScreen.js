import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

export default function LiveTrackingScreen({ route, navigation }) {
  const {
    storeName = 'KFC',
    orderNumber = '3190',
    deliveryAddress = '2122 Brooklyn Road Ashdawn park\nHarare, Zimbabwe',
    courierName = 'Meekness Tendwai',
    courierType = 'Bike Courier',
  } = route.params || {};

  // Mock coordinates - In production, these would come from your backend
  const restaurantLocation = {
    latitude: -17.8252,
    longitude: 31.0335,
  };

  const customerLocation = {
    latitude: -17.8300,
    longitude: 31.0400,
  };

  // DUMMY DATA: Courier location is simulated/mock data for now
  // TODO: Replace with real-time courier location from backend API
  const [courierLocation, setCourierLocation] = useState({
    latitude: -17.8265,
    longitude: 31.0350,
  });

  const [orderStatus, setOrderStatus] = useState('Preparing Order');
  const [estimatedTime, setEstimatedTime] = useState('25-35 mins');
  const webViewRef = useRef(null);
  const mapInitialized = useRef(false);

  // DUMMY DATA: Simulate courier movement (in production, this would come from real-time updates)
  // This is just mock data for testing - replace with actual courier location API calls
  useEffect(() => {
    const interval = setInterval(() => {
      setCourierLocation((prev) => {
        const newLocation = {
          latitude: prev.latitude + (Math.random() - 0.5) * 0.001,
          longitude: prev.longitude + (Math.random() - 0.5) * 0.001,
        };
        return newLocation;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Route coordinates for polyline (for map HTML)
  const routeCoordinates = [
    restaurantLocation,
    courierLocation,
    customerLocation,
  ];

  const getStatusColor = () => {
    switch (orderStatus) {
      case 'Preparing Order':
        return '#86EFAC';
      case 'Out for Delivery':
        return '#60A5FA';
      case 'Delivered':
        return '#4F7942';
      default:
        return '#86EFAC';
    }
  };

  const getActiveStep = () => {
    switch (orderStatus) {
      case 'Preparing Order':
        return 1;
      case 'Out for Delivery':
        return 2;
      case 'Delivered':
        return 3;
      default:
        return 1;
    }
  };

  const activeStep = getActiveStep();

  // Update WebView map when courier location changes
  useEffect(() => {
    if (!webViewRef.current || !mapInitialized.current) return;

    const script = `
      if (typeof updateCourierLocation === 'function') {
        updateCourierLocation(${courierLocation.latitude}, ${courierLocation.longitude});
      }
      true;
    `;
    webViewRef.current.injectJavaScript(script);
  }, [courierLocation]);

  // Stable HTML for Google Maps (memoized so WebView doesn't reload)
  const mapHTML = useMemo(
    () => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body { width: 100%; height: 100%; overflow: hidden; }
          #map { width: 100%; height: 100vh; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          let map;
          let restaurantMarker;
          let courierMarker;
          let customerMarker;
          let directionsService;
          let directionsRenderer;

          function initMap() {
            const center = { lat: -17.8276, lng: 31.0367 };

            map = new google.maps.Map(document.getElementById('map'), {
              zoom: 16,
              center,
              disableDefaultUI: true,
              zoomControl: false,
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
              gestureHandling: 'cooperative',
              styles: [
                {
                  featureType: 'all',
                  elementType: 'geometry',
                  stylers: [{ color: '#f5f5f5' }]
                },
                {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [{ color: '#c9c9c9' }]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry',
                  stylers: [{ color: '#ffffff' }]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry',
                  stylers: [{ color: '#dadada' }]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#616161' }]
                },
                {
                  featureType: 'road',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#9e9e9e' }]
                },
                {
                  featureType: 'landscape',
                  elementType: 'all',
                  stylers: [{ color: '#f5f5f5' }]
                },
                {
                  featureType: 'poi',
                  elementType: 'all',
                  stylers: [{ visibility: 'off' }]
                },
                {
                  featureType: 'poi',
                  elementType: 'labels.text',
                  stylers: [{ visibility: 'off' }]
                },
                {
                  featureType: 'transit',
                  elementType: 'all',
                  stylers: [{ visibility: 'off' }]
                },
                {
                  featureType: 'administrative',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#bdbdbd' }]
                },
                {
                  featureType: 'administrative.locality',
                  elementType: 'labels.text.fill',
                  stylers: [{ color: '#616161' }]
                }
              ]
            });

            // Shop (restaurant) marker - store icon
            restaurantMarker = new google.maps.Marker({
              position: { lat: ${restaurantLocation.latitude}, lng: ${restaurantLocation.longitude} },
              map,
              title: '${storeName}',
              icon: {
                url: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png',
                scaledSize: new google.maps.Size(40, 40),
              },
            });

            // Destination marker - home icon
            customerMarker = new google.maps.Marker({
              position: { lat: ${customerLocation.latitude}, lng: ${customerLocation.longitude} },
              map,
              title: 'Delivery Address',
              icon: {
                url: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/home-71.png',
                scaledSize: new google.maps.Size(40, 40),
              },
            });

            // Courier marker - faint green circle with darker inner circle and centered black cursor
            const courierIconSvg = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(
              '<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
              '<circle cx="20" cy="20" r="20" fill="rgba(79, 121, 66, 0.3)"/>' +
              '<circle cx="20" cy="20" r="12" fill="rgba(79, 121, 66, 0.6)"/>' +
              '<path d="M14 14 L20 14 L20 16 L16 16 L16 20 L14 14 Z" fill="#000000"/>' +
              '</svg>'
            );
            
            courierMarker = new google.maps.Marker({
              position: { lat: ${courierLocation.latitude}, lng: ${courierLocation.longitude} },
              map,
              title: '${courierName}',
              icon: {
                url: courierIconSvg,
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 20)
              }
            });

            // Directions (real road route between shop and destination)
            directionsService = new google.maps.DirectionsService();
            directionsRenderer = new google.maps.DirectionsRenderer({
              map,
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: '#4F7942',
                strokeWeight: 5,
              },
            });

            const origin = {
              lat: ${restaurantLocation.latitude},
              lng: ${restaurantLocation.longitude},
            };
            const destination = {
              lat: ${customerLocation.latitude},
              lng: ${customerLocation.longitude},
            };

            directionsService.route(
              {
                origin,
                destination,
                travelMode: google.maps.TravelMode.DRIVING,
              },
              (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                  directionsRenderer.setDirections(result);
                } else {
                  console.warn('Directions request failed due to ' + status);
                }
              }
            );

            window.mapInitialized = true;
          }

          function updateCourierLocation(lat, lng) {
            if (!courierMarker) return;

            courierMarker.setPosition({ lat, lng });
          }

          if (!window.googleMapsLoaded) {
            const script = document.createElement('script');
            script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCAJpw1dBhF4PDdapBHi_sVpDli4aPsUH8&callback=initMap';
            script.async = true;
            script.defer = true;
            script.onload = function () {
              window.googleMapsLoaded = true;
            };
            document.head.appendChild(script);
          }
        </script>
      </body>
    </html>
  `,
    []
  );

  const handleCompassPress = () => {
    // For WebView version we don't move the camera natively; could inject JS if needed
    console.log('Compass pressed');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      {/* Map Section */}
      <View style={styles.mapContainer}>
        {/* Floating Back Button */}
        <TouchableOpacity
          style={styles.floatingBackButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={20} color="#000000" />
        </TouchableOpacity>
        
        {/* Floating Live Tracking Capsule */}
        <View style={styles.liveTrackingCapsule}>
          <Text style={styles.liveTrackingText}>Live Tracking</Text>
        </View>
        
        <WebView
          ref={webViewRef}
          source={{ html: mapHTML }}
          style={styles.map}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          scalesPageToFit
          onLoadEnd={() => {
            setTimeout(() => {
              mapInitialized.current = true;
            }, 1000);
          }}
        />
        {/* Compass Button */}
        <TouchableOpacity 
          style={styles.compassButton} 
          activeOpacity={0.7}
          onPress={handleCompassPress}
        >
          <Feather name="navigation" size={20} color="#3B82F6" />
        </TouchableOpacity>

        {/* Floating Order Details Card */}
        <View style={styles.floatingCardWrapper}>
          <View style={styles.orderCard}>
          {/* Restaurant Info */}
          <View style={styles.orderHeader}>
            <View style={styles.orderHeaderLeft}>
              <View style={styles.storeIcon}>
                <Feather name="shopping-cart" size={20} color="#4F7942" />
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.storeName}>{storeName}</Text>
                <Text style={styles.orderNumber}>Order # {orderNumber}</Text>
                <Text style={styles.estimatedTime}>
                  Estimated delivery time{' '}
                  <Text style={styles.estimatedTimeValue}>{estimatedTime}</Text>
                </Text>
              </View>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{orderStatus}</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressSteps}>
              {/* Order Placed */}
              <View style={styles.stepContainer}>
                <View
                  style={[
                    styles.stepIcon,
                    activeStep >= 0 && styles.stepIconActive,
                  ]}
                >
                  <Feather
                    name="file-text"
                    size={16}
                    color={activeStep >= 0 ? '#FFFFFF' : '#9CA3AF'}
                  />
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    activeStep >= 0 && styles.stepLabelActive,
                  ]}
                >
                  Order Placed
                </Text>
              </View>

              {/* Connecting Line */}
              <View
                style={[
                  styles.connectingLine,
                  activeStep >= 1 && styles.connectingLineActive,
                ]}
              />

              {/* Preparing Order */}
              <View style={styles.stepContainer}>
                <View
                  style={[
                    styles.stepIcon,
                    activeStep >= 1 && styles.stepIconActive,
                  ]}
                >
                  <Feather
                    name="coffee"
                    size={16}
                    color={activeStep >= 1 ? '#FFFFFF' : '#9CA3AF'}
                  />
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    activeStep >= 1 && styles.stepLabelActive,
                  ]}
                >
                  Preparing
                </Text>
              </View>

              {/* Connecting Line */}
              <View
                style={[
                  styles.connectingLine,
                  activeStep >= 2 && styles.connectingLineActive,
                ]}
              />

              {/* Out for Delivery */}
              <View style={styles.stepContainer}>
                <View
                  style={[
                    styles.stepIcon,
                    activeStep >= 2 && styles.stepIconActive,
                  ]}
                >
                  <Feather
                    name="truck"
                    size={16}
                    color={activeStep >= 2 ? '#FFFFFF' : '#9CA3AF'}
                  />
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    activeStep >= 2 && styles.stepLabelActive,
                  ]}
                >
                  Out for Delivery
                </Text>
              </View>

              {/* Connecting Line */}
              <View
                style={[
                  styles.connectingLine,
                  activeStep >= 3 && styles.connectingLineActive,
                ]}
              />

              {/* Delivered */}
              <View style={styles.stepContainer}>
                <View
                  style={[
                    styles.stepIcon,
                    activeStep >= 3 && styles.stepIconActive,
                  ]}
                >
                  <Feather
                    name="check"
                    size={16}
                    color={activeStep >= 3 ? '#FFFFFF' : '#9CA3AF'}
                  />
                </View>
                <Text
                  style={[
                    styles.stepLabel,
                    activeStep >= 3 && styles.stepLabelActive,
                  ]}
                >
                  Delivered
                </Text>
              </View>
            </View>
          </View>

          {/* Courier Info */}
          <View style={styles.courierInfo}>
            <View style={styles.courierAvatar}>
              <Feather name="user" size={24} color="#6B7280" />
            </View>
            <View style={styles.courierDetails}>
              <Text style={styles.courierName}>{courierName}</Text>
              <Text style={styles.courierType}>{courierType}</Text>
            </View>
            <View style={styles.courierActions}>
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <Feather name="phone" size={20} color="#4F7942" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <Feather name="message-circle" size={20} color="#4F7942" />
              </TouchableOpacity>
            </View>
          </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  floatingBackButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  liveTrackingCapsule: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: '50%',
    transform: [{ translateX: -60 }],
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  liveTrackingText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#111827',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  compassButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingCardWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    paddingHorizontal: 16,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    minHeight: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  orderHeaderLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  storeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ECFDF3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#111827',
    marginBottom: 4,
  },
  orderNumber: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  estimatedTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  estimatedTimeValue: {
    fontSize: 12,
    fontWeight: '400',
    color: '#16A34A',
  },
  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#DCFCE7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#166534',
  },
  progressContainer: {
    marginTop: 8,
    marginBottom: 20,
  },
  progressSteps: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stepIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepIconActive: {
    backgroundColor: '#4F7942',
  },
  stepLabel: {
    fontSize: 10,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  stepLabelActive: {
    color: '#111827',
    fontWeight: '400',
  },
  connectingLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
    marginBottom: 16,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  connectingLineActive: {
    backgroundColor: '#4F7942',
    borderColor: '#4F7942',
  },
  courierInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 14,
  },
  courierAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  courierDetails: {
    flex: 1,
  },
  courierName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#111827',
    marginBottom: 4,
  },
  courierType: {
    fontSize: 12,
    color: '#6B7280',
  },
  courierActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurantMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#4F7942',
  },
  courierMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4F7942',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courierDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  customerMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#EF4444',
  },
});
