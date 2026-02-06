import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Feather } from '@expo/vector-icons';

export default function CourierActiveOrderScreen({ route, navigation }) {
  const order = route.params?.order || {
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
    deliveryLocation: {
      address: '70 Milton Park Baines Avenue, Harare, Zimbabwe',
      latitude: -17.8300,
      longitude: 31.0400,
    },
    distance: '2.4 km',
    estimatedTime: '8 min',
  };

  const mapHtml = `
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
            center: [${order.pickupLocation.latitude}, ${order.pickupLocation.longitude}],
            zoom: 15,
            zoomControl: false,
            attributionControl: false
          });
          
          // Use CartoDB Positron style
          L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
          }).addTo(map);
          
          // Pickup marker - faint green circle with darker inner circle and centered black cursor
          const pickupIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="width: 40px; height: 40px; border-radius: 20px; background-color: rgba(79, 121, 66, 0.3); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3); position: relative;"><div style="width: 24px; height: 24px; border-radius: 12px; background-color: rgba(79, 121, 66, 0.6); display: flex; align-items: center; justify-content: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="#000000"/></svg></div></div>',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
          });
          
          // Destination marker - green house icon
          const destinationIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="width: 40px; height: 40px; border-radius: 20px; background-color: #4F7942; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="#FFFFFF"/></svg></div>',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
          });
          
          const pickupMarker = L.marker([${order.pickupLocation.latitude}, ${order.pickupLocation.longitude}], { 
            icon: pickupIcon
          }).addTo(map);
          
          const destinationMarker = L.marker([${order.deliveryLocation.latitude}, ${order.deliveryLocation.longitude}], { 
            icon: destinationIcon
          }).addTo(map);
          
          // Get route using OSRM routing service (uses actual roads)
          const pickupLat = ${order.pickupLocation.latitude};
          const pickupLng = ${order.pickupLocation.longitude};
          const destLat = ${order.deliveryLocation.latitude};
          const destLng = ${order.deliveryLocation.longitude};
          
          fetch(\`https://router.project-osrm.org/route/v1/driving/\${pickupLng},\${pickupLat};\${destLng},\${destLat}?overview=full&geometries=geojson\`)
            .then(response => response.json())
            .then(data => {
              if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
                const route = data.routes[0];
                const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]); // Convert [lng, lat] to [lat, lng]
                
                // Draw route along actual roads
                const routeLine = L.polyline(coordinates, {
                  color: '#4F7942',
                  weight: 5,
                  opacity: 0.8
                }).addTo(map);
                
                // Fit map to show route
                const group = new L.featureGroup([pickupMarker, destinationMarker, routeLine]);
                map.fitBounds(group.getBounds().pad(0.2));
              } else {
                // Fallback to straight line if routing fails
                const routeCoordinates = [
                  [pickupLat, pickupLng],
                  [destLat, destLng]
                ];
                const routeLine = L.polyline(routeCoordinates, {
                  color: '#4F7942',
                  weight: 5,
                  opacity: 0.8
                }).addTo(map);
                
                const group = new L.featureGroup([pickupMarker, destinationMarker]);
                map.fitBounds(group.getBounds().pad(0.2));
              }
            })
            .catch(error => {
              console.error('Routing error:', error);
              // Fallback to straight line if routing fails
              const routeCoordinates = [
                [pickupLat, pickupLng],
                [destLat, destLng]
              ];
              const routeLine = L.polyline(routeCoordinates, {
                color: '#4F7942',
                weight: 5,
                opacity: 0.8
              }).addTo(map);
              
              const group = new L.featureGroup([pickupMarker, destinationMarker]);
              map.fitBounds(group.getBounds().pad(0.2));
            });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Map */}
      <WebView
        source={{ html: mapHtml }}
        style={styles.map}
        scrollEnabled={false}
        zoomEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={24} color="#000000" />
        </TouchableOpacity>
        
        <View style={styles.locationBar}>
          <Feather name="map-pin" size={16} color="#4F7942" />
          <Text style={styles.locationText}>{order.pickupLocation.name}</Text>
        </View>
        
        <View style={styles.distanceTimeContainer}>
          <Text style={styles.distanceTimeText}>{order.distance}</Text>
          <Text style={styles.distanceTimeText}>{order.estimatedTime}</Text>
        </View>
      </View>

      {/* Floating Order Card */}
      <View style={styles.floatingCardWrapper}>
        <View style={styles.orderCard}>
          {/* Pickup Address */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Feather name="map-pin" size={20} color="#4F7942" />
              <Text style={styles.sectionLabel}>Pickup address</Text>
            </View>
            <Text style={styles.addressText}>{order.pickupLocation.address}</Text>
          </View>

          {/* Customer */}
          <View style={styles.section}>
            <View style={styles.customerRow}>
              <View style={styles.customerLeft}>
                <Image
                  source={{ uri: order.customer.profilePhoto }}
                  style={styles.customerImage}
                />
                <View style={styles.customerInfo}>
                  <Text style={styles.sectionLabel}>Customer</Text>
                  <Text style={styles.customerName}>{order.customer.name}</Text>
                </View>
              </View>
              <View style={styles.itemCountBadge}>
                <Text style={styles.itemCountText}>{order.customer.itemCount} items</Text>
              </View>
            </View>
          </View>

          {/* Arrived for Pickup Button */}
          <TouchableOpacity
            style={styles.arrivedButton}
            onPress={() => {
              navigation.navigate('CourierPickup', { order });
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.arrivedButtonText}>Arrived for Pickup</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  locationBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginLeft: 8,
  },
  distanceTimeContainer: {
    alignItems: 'flex-end',
  },
  distanceTimeText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 2,
  },
  floatingCardWrapper: {
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginLeft: 8,
  },
  addressText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginLeft: 28,
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  customerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E5E5',
    marginRight: 12,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginTop: 4,
  },
  itemCountBadge: {
    backgroundColor: '#F0F9F4',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  itemCountText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#4F7942',
  },
  arrivedButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#4F7942',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  arrivedButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
