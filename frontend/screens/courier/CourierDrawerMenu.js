import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

export default function CourierDrawerMenu({ visible, onClose, navigation }) {
  const { user, logout } = useAuth();
  const slideAnim = React.useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 350,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 300,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleLogout = () => {
    logout();
    onClose();
    navigation.reset({
      index: 0,
      routes: [{ name: 'RoleSelection' }],
    });
  };

  const menuItems = [
    {
      icon: 'credit-card',
      label: 'Wallet',
      screen: 'CourierWallet',
    },
    {
      icon: 'bar-chart-2',
      label: 'Performance',
      screen: 'CourierPerformance',
    },
    {
      icon: 'file-text',
      label: 'Documents',
      screen: 'CourierDocuments',
    },
    {
      icon: 'truck',
      label: 'Vehicle Information',
      screen: 'CourierVehicleInformation',
    },
    {
      icon: 'bell',
      label: 'Notifications',
      screen: 'CourierNotifications',
    },
    {
      icon: 'settings',
      label: 'Settings',
      screen: 'CourierSettings',
    },
    {
      icon: 'info',
      label: 'Help & Support',
      screen: 'CourierHelpSupport',
    },
    {
      icon: 'lock',
      label: 'Legal',
      screen: 'CourierHelpSupport', // Navigate to help & support for now
    },
  ];

  const rating = user?.rating || '4.0';
  const isOnline = true; // You can get this from state

  // Keep component mounted for smooth animations

  return (
    <>
      {/* Backdrop */}
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: fadeAnim,
          },
        ]}
        pointerEvents={visible ? 'auto' : 'none'}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />
      </Animated.View>

      {/* Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
        pointerEvents={visible ? 'auto' : 'none'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Section */}
          <TouchableOpacity
            style={styles.profileSection}
            activeOpacity={0.7}
            onPress={() => {
              onClose();
              navigation.navigate('CourierAccountDetails');
            }}
          >
            <Image
              source={{ uri: user?.profilePhoto || 'https://via.placeholder.com/80' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {user?.name || 'Natalia Mia'}
              </Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Feather
                    key={star}
                    name="star"
                    size={14}
                    color={star <= Math.floor(parseFloat(rating)) ? '#4F7942' : '#E5E5E5'}
                    style={styles.star}
                  />
                ))}
                <Text style={styles.ratingText}>{rating}</Text>
              </View>
              <Text style={styles.statusText}>
                {isOnline ? 'Online' : 'Offline'}
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#999999" />
          </TouchableOpacity>

          {/* Menu Items */}
          <View style={styles.menuCard}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate(menuItems[0].screen);
              }}
              activeOpacity={0.7}
            >
              <Feather name={menuItems[0].icon} size={20} color="#000000" />
              <Text style={styles.menuItemText}>{menuItems[0].label}</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate(menuItems[1].screen);
              }}
              activeOpacity={0.7}
            >
              <Feather name={menuItems[1].icon} size={20} color="#000000" />
              <Text style={styles.menuItemText}>{menuItems[1].label}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuCard}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate(menuItems[2].screen);
              }}
              activeOpacity={0.7}
            >
              <Feather name={menuItems[2].icon} size={20} color="#000000" />
              <Text style={styles.menuItemText}>{menuItems[2].label}</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate(menuItems[3].screen);
              }}
              activeOpacity={0.7}
            >
              <Feather name={menuItems[3].icon} size={20} color="#000000" />
              <Text style={styles.menuItemText}>{menuItems[3].label}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuCard}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate(menuItems[4].screen);
              }}
              activeOpacity={0.7}
            >
              <Feather name={menuItems[4].icon} size={20} color="#000000" />
              <Text style={styles.menuItemText}>{menuItems[4].label}</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate(menuItems[5].screen);
              }}
              activeOpacity={0.7}
            >
              <Feather name={menuItems[5].icon} size={20} color="#000000" />
              <Text style={styles.menuItemText}>{menuItems[5].label}</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate(menuItems[6].screen);
              }}
              activeOpacity={0.7}
            >
              <Feather name={menuItems[6].icon} size={20} color="#000000" />
              <Text style={styles.menuItemText}>{menuItems[6].label}</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate(menuItems[7].screen);
              }}
              activeOpacity={0.7}
            >
              <Feather name={menuItems[7].icon} size={20} color="#000000" />
              <Text style={styles.menuItemText}>{menuItems[7].label}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}
          >
            <Feather name="log-out" size={20} color="#DC2626" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 998,
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#FAFAFA',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 24,
    backgroundColor: '#FAFAFA',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E5E5',
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  star: {
    marginRight: 2,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4F7942',
    marginLeft: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginLeft: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginLeft: 48,
  },
  logoutContainer: {
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    paddingTop: 12,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5E5',
    borderRadius: 12,
    paddingVertical: 14,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#DC2626',
    marginLeft: 8,
  },
});
