import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function CustomerProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'RoleSelection' }],
    });
  };

  const accountsPaymentsItems = [
    { id: 1, title: 'Payment Methods', onPress: () => navigation.navigate('PaymentMethods') },
    { id: 2, title: 'Wallet', onPress: () => navigation.navigate('Wallet') },
    { id: 3, title: 'Saved Address', onPress: () => navigation.navigate('SavedAddress') },
  ];

  const ordersActivityItems = [
    { id: 1, title: 'Order History', onPress: () => navigation.navigate('OrderHistory') },
    { id: 2, title: 'Favorites', onPress: () => navigation.navigate('Favorites') },
    { id: 3, title: 'Receipts', onPress: () => navigation.navigate('Receipts') },
  ];

  const supportItems = [
    { id: 1, title: 'Help & Support', onPress: () => navigation.navigate('HelpSupport') },
    { id: 2, title: 'About', onPress: () => navigation.navigate('About') },
  ];

  const renderMenuItem = (item, isLast = false) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.menuItem, isLast && styles.menuItemLast]}
      activeOpacity={0.7}
      onPress={item.onPress}
    >
      <Text style={styles.menuItemText}>{item.title}</Text>
      <Feather name="chevron-right" size={20} color="#CCCCCC" />
    </TouchableOpacity>
  );

  const renderSection = (title, items) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.menuCard}>
        {items.map((item, index) => renderMenuItem(item, index === items.length - 1))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        scrollEventThrottle={16}
      >
          {/* Header Title */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Feather name="user" size={50} color="#FFFFFF" />
              </View>
            </View>
            <Text style={styles.userName}>{user?.name || 'John Doe'}</Text>
            <Text style={styles.userEmail}>{user?.email || user?.phone || 'johndoe@gmail.com'}</Text>
            <TouchableOpacity 
              style={styles.editProfileButton} 
              activeOpacity={0.7}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Feather name="edit-2" size={16} color="#FFFFFF" />
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Accounts & Payments Section */}
          {renderSection('Accounts & Payments', accountsPaymentsItems)}

          {/* Orders & Activity Section */}
          {renderSection('Orders & Activity', ordersActivityItems)}

          {/* Support Section */}
          {renderSection('Support', supportItems)}

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Feather name="log-out" size={20} color="#FF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '400',
    color: '#000000',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 6,
  },
  userEmail: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F7942',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    gap: 8,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  sectionContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 12,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5E5',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FF4444',
  },
});
