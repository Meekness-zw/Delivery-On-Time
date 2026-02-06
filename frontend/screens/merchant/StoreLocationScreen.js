import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCAJpw1dBhF4PDdapBHi_sVpDli4aPsUH8';

export default function StoreLocationScreen({ navigation, route }) {
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: -17.8252,
    longitude: 31.0335,
  });
  const [address, setAddress] = useState('2122 Herbert Chitepo Avenue\nCBD Harare, Zimbabwe');
  const webViewRef = useRef(null);
  const mapInitialized = useRef(false);

  useEffect(() => {
    // Get user's current location if available
    // For now, using default Harare location
  }, []);

  const handleConfirmLocation = () => {
    // Navigate to upload documents screen
    navigation.navigate('UploadBusinessDocuments', {
      ...route.params,
      storeLocation: selectedLocation,
      address: address,
    });
  };

  const handleMyLocation = () => {
    if (webViewRef.current && mapInitialized.current) {
      const script = `
        if (typeof moveToMyLocation === 'function') {
          moveToMyLocation();
        }
        true;
      `;
      webViewRef.current.injectJavaScript(script);
    }
  };

  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'address') {
        setAddress(data.address);
        setSelectedLocation({
          latitude: data.lat,
          longitude: data.lng,
        });
      } else if (data.type === 'mapReady') {
        mapInitialized.current = true;
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { width: 100%; height: 100%; overflow: hidden; }
        #map { width: 100%; height: 100vh; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <script>
        let map;
        let userMarker;
        
        function initMap() {
          const defaultCenter = [${selectedLocation.latitude}, ${selectedLocation.longitude}];
          
          map = L.map('map', {
            center: defaultCenter,
            zoom: 17,
            zoomControl: false,
            attributionControl: false
          });
          
          // Use CartoDB Positron style - clean and modern
          L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
          }).addTo(map);
          
          // Custom green marker icon - faint green circle with darker inner circle and centered black cursor
          const greenIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="width: 40px; height: 40px; border-radius: 20px; background-color: rgba(79, 121, 66, 0.3); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3); position: relative;"><div style="width: 24px; height: 24px; border-radius: 12px; background-color: rgba(79, 121, 66, 0.6); display: flex; align-items: center; justify-content: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="#000000"/></svg></div></div>',
            iconSize: [40, 40],
            iconAnchor: [20, 20]
          });
          
          // Center marker (draggable)
          userMarker = L.marker(defaultCenter, {
            icon: greenIcon,
            draggable: true
          }).addTo(map);
          
          // Get initial address using Nominatim (OpenStreetMap geocoding)
          fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\${defaultCenter[0]}&lon=\${defaultCenter[1]}&zoom=18&addressdetails=1\`)
            .then(response => response.json())
            .then(data => {
              if (data && data.display_name) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'address',
                  address: data.display_name,
                  lat: defaultCenter[0],
                  lng: defaultCenter[1]
                }));
              }
            })
            .catch(error => console.error('Geocoding error:', error));
          
          // Update address when marker is dragged
          userMarker.on('dragend', function(e) {
            const position = userMarker.getLatLng();
            const lat = position.lat;
            const lng = position.lng;
            
            fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\${lat}&lon=\${lng}&zoom=18&addressdetails=1\`)
              .then(response => response.json())
              .then(data => {
                if (data && data.display_name) {
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'address',
                    address: data.display_name,
                    lat: lat,
                    lng: lng
                  }));
                }
              })
              .catch(error => console.error('Geocoding error:', error));
          });
          
          // Update address when map center changes (user pans map)
          map.on('moveend', function() {
            const center = map.getCenter();
            userMarker.setLatLng(center);
            
            fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\${center.lat}&lon=\${center.lng}&zoom=18&addressdetails=1\`)
              .then(response => response.json())
              .then(data => {
                if (data && data.display_name) {
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'address',
                    address: data.display_name,
                    lat: center.lat,
                    lng: center.lng
                  }));
                }
              })
              .catch(error => console.error('Geocoding error:', error));
          });
          
          // Notify React Native that map is ready
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'mapReady'
          }));
        }
        
        function moveToMyLocation() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const newLat = position.coords.latitude;
                const newLng = position.coords.longitude;
                const newCenter = [newLat, newLng];
                
                map.setView(newCenter, 17);
                userMarker.setLatLng(newCenter);
                
                fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\${newLat}&lon=\${newLng}&zoom=18&addressdetails=1\`)
                  .then(response => response.json())
                  .then(data => {
                    if (data && data.display_name) {
                      window.ReactNativeWebView.postMessage(JSON.stringify({
                        type: 'address',
                        address: data.display_name,
                        lat: newLat,
                        lng: newLng
                      }));
                    }
                  })
                  .catch(error => console.error('Geocoding error:', error));
              },
              (error) => {
                console.error('Error getting location:', error);
              }
            );
          }
        }
        
        // Initialize map when page loads
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initMap);
        } else {
          initMap();
        }
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      {/* Map Container */}
      <View style={styles.mapContainer}>
        <WebView
          ref={webViewRef}
          source={{ html: mapHTML }}
          style={styles.map}
          onMessage={handleWebViewMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
        
        {/* Compass/Location Button */}
        <TouchableOpacity
          style={styles.locationButton}
          onPress={handleMyLocation}
          activeOpacity={0.7}
        >
          <Feather name="navigation" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Top Card */}
      <View style={styles.topCard}>
        <View style={styles.topCardContent}>
          <Feather name="map-pin" size={24} color="#000000" />
          <View style={styles.topCardText}>
            <Text style={styles.topCardTitle}>Set Your Store Location</Text>
            <Text style={styles.topCardSubtitle}>Riders will pick orders from here</Text>
          </View>
        </View>
      </View>

      {/* Bottom Card */}
      <View style={styles.bottomCard}>
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Address :</Text>
          <Text style={styles.addressText}>{address}</Text>
        </View>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmLocation}
          activeOpacity={0.8}
        >
          <Text style={styles.confirmButtonText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  locationButton: {
    position: 'absolute',
    bottom: 200,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  topCard: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  topCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topCardText: {
    marginLeft: 12,
    flex: 1,
  },
  topCardTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  topCardSubtitle: {
    fontSize: 12,
    color: '#666666',
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addressLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginRight: 8,
  },
  addressText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    flex: 1,
    lineHeight: 22,
  },
  confirmButton: {
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
