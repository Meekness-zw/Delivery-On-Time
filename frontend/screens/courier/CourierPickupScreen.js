import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Feather } from '@expo/vector-icons';

export default function CourierPickupScreen({ route, navigation }) {
  const order = route.params?.order || {
    pickupLocation: {
      name: 'Sam Levy Village',
      address: 'Sam Levy Village, Borrowdale',
      latitude: -17.8252,
      longitude: 31.0335,
    },
    deliveryLocation: {
      address: '70 Milton Park Baines Avenue, Harare, Zimbabwe',
      latitude: -17.8300,
      longitude: 31.0400,
    },
    items: [
      { name: 'Cheese Burger', quantity: 1 },
      { name: 'Large Fries', quantity: 2 },
      { name: 'Minute Maid', quantity: 2 },
    ],
    pickupNotes: 'Please double check the drinks before leaving',
    distance: '2.4 km',
    estimatedTime: '8 min',
  };

  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
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
          
          // Destination marker - green house icon
          const destinationIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="width: 40px; height: 40px; border-radius: 20px; background-color: #4F7942; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="#FFFFFF"/></svg></div>',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
          });
          
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
                const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]);
                
                const routeLine = L.polyline(coordinates, {
                  color: '#4F7942',
                  weight: 5,
                  opacity: 0.8
                }).addTo(map);
                
                const group = new L.featureGroup([destinationMarker, routeLine]);
                map.fitBounds(group.getBounds().pad(0.2));
              } else {
                const routeCoordinates = [
                  [pickupLat, pickupLng],
                  [destLat, destLng]
                ];
                const routeLine = L.polyline(routeCoordinates, {
                  color: '#4F7942',
                  weight: 5,
                  opacity: 0.8
                }).addTo(map);
                
                const group = new L.featureGroup([destinationMarker]);
                map.fitBounds(group.getBounds().pad(0.2));
              }
            })
            .catch(error => {
              console.error('Routing error:', error);
              const routeCoordinates = [
                [pickupLat, pickupLng],
                [destLat, destLng]
              ];
              const routeLine = L.polyline(routeCoordinates, {
                color: '#4F7942',
                weight: 5,
                opacity: 0.8
              }).addTo(map);
              
              const group = new L.featureGroup([destinationMarker]);
              map.fitBounds(group.getBounds().pad(0.2));
            });
        </script>
      </body>
    </html>
  `;

  const allItemsChecked = order.items && order.items.length > 0 
    ? order.items.every((_, index) => checkedItems[index])
    : false;

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
          {/* Items to Pick Up */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Items to pick up</Text>
            {(order.items || []).map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.itemRow}
                onPress={() => toggleItem(index)}
                activeOpacity={0.7}
              >
                <View style={styles.checkboxContainer}>
                  <View
                    style={[
                      styles.checkbox,
                      checkedItems[index] && styles.checkboxChecked,
                    ]}
                  >
                    {checkedItems[index] && (
                      <Feather name="check" size={16} color="#FFFFFF" />
                    )}
                  </View>
                </View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>
                  x{item.quantity} {item.quantity === 1 ? 'item' : 'items'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Pickup Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pickup notes</Text>
            <View style={styles.notesContainer}>
              <Text style={styles.notesText}>{order.pickupNotes}</Text>
            </View>
          </View>

          {/* Scan QR Code */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Scan QR Code</Text>
            <View style={styles.qrScannerArea}>
              <View style={[styles.qrCorner, styles.qrCornerTopLeft]} />
              <View style={[styles.qrCorner, styles.qrCornerTopRight]} />
              <View style={[styles.qrCorner, styles.qrCornerBottomLeft]} />
              <View style={[styles.qrCorner, styles.qrCornerBottomRight]} />
            </View>
          </View>

          {/* Picked Up Order Button */}
          <TouchableOpacity
            style={[
              styles.pickedUpButton,
              !allItemsChecked && styles.pickedUpButtonDisabled,
            ]}
            onPress={() => {
              if (allItemsChecked) {
                // TODO: Handle picked up order
                navigation.goBack();
              }
            }}
            activeOpacity={0.8}
            disabled={!allItemsChecked}
          >
            <Text style={styles.pickedUpButtonText}>Picked Up Order</Text>
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
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4F7942',
    borderColor: '#4F7942',
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  itemQuantity: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  notesContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
  },
  notesText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 20,
  },
  qrScannerArea: {
    width: '100%',
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  qrCorner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#4F7942',
    borderWidth: 3,
  },
  qrCornerTopLeft: {
    top: -2,
    left: -2,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
  },
  qrCornerTopRight: {
    top: -2,
    right: -2,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 12,
  },
  qrCornerBottomLeft: {
    bottom: -2,
    left: -2,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
  },
  qrCornerBottomRight: {
    bottom: -2,
    right: -2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12,
  },
  pickedUpButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4F7942',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  pickedUpButtonDisabled: {
    backgroundColor: '#E5E5E5',
  },
  pickedUpButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
