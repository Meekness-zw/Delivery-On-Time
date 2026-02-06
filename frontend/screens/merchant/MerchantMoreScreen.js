import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function MerchantMoreScreen({ navigation }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'RoleSelection' }],
    });
  };
  const [activeNavTab, setActiveNavTab] = useState('More');
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  const menuItems = [
    {
      id: 1,
      section: 'Manage Store',
      items: [
        {
          id: 1,
          icon: 'menu',
          title: 'Menu Management',
          subtitle: 'Products, prices, availability',
          onPress: () => {
            navigation.navigate('MenuManagement');
          },
        },
        {
          id: 2,
          icon: 'settings',
          title: 'Settings',
          subtitle: 'Orders, notifications, devices',
          onPress: () => {
            navigation.navigate('MerchantSettings');
          },
        },
      ],
    },
    {
      id: 2,
      section: 'Support',
      items: [
        {
          id: 3,
          icon: 'help-circle',
          title: 'Help & Support',
          subtitle: "Chat, call, FAQ's",
          onPress: () => {
            navigation.navigate('MerchantHelpSupport');
          },
        },
      ],
    },
    {
      id: 3,
      section: 'Account Actions',
      items: [],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Store Information Section */}
        <TouchableOpacity
          style={styles.storeInfoCard}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate('BusinessProfile');
          }}
        >
          <View style={styles.storeLogoContainer}>
            <Image
              source={require('../../assets/Logo.png')}
              style={styles.storeLogo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.storeInfo}>
            <Text style={styles.storeName}>Chicken Spot</Text>
            <Text style={[styles.storeStatus, isStoreOpen && styles.storeStatusOpen]}>
              {isStoreOpen ? 'Open' : 'Closed'}
            </Text>
          </View>
          <Feather name="chevron-right" size={24} color="#CCCCCC" />
        </TouchableOpacity>

        {/* Menu Sections */}
        {menuItems.map((section) => (
          <View key={section.id} style={styles.section}>
            {section.items.length > 0 && (
            <Text style={styles.sectionTitle}>{section.section}</Text>
            )}
            {section.id === 3 ? (
              // Logout button styled like customer side
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
                activeOpacity={0.7}
              >
                <Feather name="log-out" size={20} color="#FF4444" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            ) : (
            <View style={styles.menuCard}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    index < section.items.length - 1 && styles.menuItemBorder,
                  ]}
                  activeOpacity={0.7}
                  onPress={item.onPress}
                >
                  <View
                    style={[
                      styles.menuIconContainer,
                      item.isDestructive && styles.menuIconContainerDestructive,
                    ]}
                  >
                    <Feather
                      name={item.icon}
                      size={20}
                      color={item.isDestructive ? '#EF4444' : '#000000'}
                    />
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text
                      style={[
                        styles.menuItemTitle,
                        item.isDestructive && styles.menuItemTitleDestructive,
                      ]}
                    >
                      {item.title}
                    </Text>
                    {item.subtitle && (
                      <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                    )}
                  </View>
                  <Feather name="chevron-right" size={20} color="#CCCCCC" />
                </TouchableOpacity>
              ))}
            </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, activeNavTab === 'Home' && styles.navItemActive]}
          onPress={() => {
            setActiveNavTab('Home');
            navigation.navigate('MerchantHome');
          }}
          activeOpacity={0.7}
        >
          <Feather
            name="home"
            size={22}
            color={activeNavTab === 'Home' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeNavTab === 'Home' && styles.navLabelActive]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeNavTab === 'Orders' && styles.navItemActive]}
          onPress={() => {
            setActiveNavTab('Orders');
            navigation.navigate('MerchantOrderHistory');
          }}
          activeOpacity={0.7}
        >
          <Feather
            name="shopping-bag"
            size={22}
            color={activeNavTab === 'Orders' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeNavTab === 'Orders' && styles.navLabelActive]}>
            Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeNavTab === 'Wallet' && styles.navItemActive]}
          onPress={() => {
            setActiveNavTab('Wallet');
            navigation.navigate('MerchantWallet');
          }}
          activeOpacity={0.7}
        >
          <Feather
            name="credit-card"
            size={22}
            color={activeNavTab === 'Wallet' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeNavTab === 'Wallet' && styles.navLabelActive]}>
            Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeNavTab === 'More' && styles.navItemActive]}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <Feather
            name="settings"
            size={22}
            color={activeNavTab === 'More' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeNavTab === 'More' && styles.navLabelActive]}>
            More
          </Text>
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
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '400',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  storeInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  storeLogoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  storeLogo: {
    width: 60,
    height: 60,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  storeStatus: {
    fontSize: 14,
    fontWeight: '400',
  },
  storeStatusOpen: {
    color: '#4F7942',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuIconContainerDestructive: {
    backgroundColor: '#FEF2F2',
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  menuItemTitleDestructive: {
    color: '#EF4444',
  },
  menuItemSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    zIndex: 1000,
    overflow: 'visible',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    minWidth: 60,
  },
  navItemActive: {
    backgroundColor: '#F0FDF4',
  },
  navLabel: {
    fontSize: 11,
    color: '#666666',
    marginTop: 4,
    fontWeight: '400',
  },
  navLabelActive: {
    color: '#4F7942',
    fontWeight: '400',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5E5',
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
