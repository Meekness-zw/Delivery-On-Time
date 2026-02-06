import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import OrderDetailModal from './OrderDetailModal';
import PreparingOrderModal from './PreparingOrderModal';
import ReadyOrderModal from './ReadyOrderModal';

export default function MerchantHomeScreen({ navigation }) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('incoming');
  const [activeNavTab, setActiveNavTab] = useState('Home');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showPreparingModal, setShowPreparingModal] = useState(false);
  const [showReadyModal, setShowReadyModal] = useState(false);

  const incomingOrders = [
    {
      id: 1,
      orderNumber: '#1021',
      items: ['Chicken wrap', 'fries'],
      itemCount: 3,
      total: 12.50,
      timeAgo: '2 mins ago',
    },
    {
      id: 2,
      orderNumber: '#1022',
      items: ['Pizza', 'drinks'],
      itemCount: 3,
      total: 8.50,
      timeAgo: '1 mins ago',
    },
    {
      id: 3,
      orderNumber: '#1023',
      items: ['Fries'],
      itemCount: 1,
      total: 4.50,
      timeAgo: '0 mins ago',
    },
  ];

  const preparingOrders = [
    {
      id: 4,
      orderNumber: '#2041',
      items: ['Burger Combo'],
      itemCount: 2,
      total: 15.00,
      prepTimeRemaining: 12,
    },
    {
      id: 5,
      orderNumber: '#1018',
      items: ['Chicken wrap', 'fries'],
      itemCount: 2,
      total: 12.50,
      prepTimeRemaining: 6,
    },
  ];

  const readyOrders = [
    {
      id: 6,
      orderNumber: '#1015',
      items: ['Grocery Pack'],
      itemCount: 4,
      total: 45.20,
      riderStatus: 'Rider in transit',
    },
  ];

  const getOrdersForTab = () => {
    switch (activeTab) {
      case 'incoming':
        return incomingOrders;
      case 'preparing':
        return preparingOrders;
      case 'ready':
        return readyOrders;
      default:
        return incomingOrders;
    }
  };

  const getTabCount = (tab) => {
    switch (tab) {
      case 'incoming':
        return incomingOrders.length;
      case 'preparing':
        return preparingOrders.length;
      case 'ready':
        return readyOrders.length;
      default:
        return 0;
    }
  };

  const handleOrderPress = (order) => {
    if (activeTab === 'incoming') {
      setSelectedOrder(order);
      setShowOrderModal(true);
    } else if (activeTab === 'preparing') {
      setSelectedOrder(order);
      setShowPreparingModal(true);
    } else if (activeTab === 'ready') {
      setSelectedOrder(order);
      setShowReadyModal(true);
    }
  };

  const handleAccept = (order) => {
    // Handle accept order logic
    console.log('Accept order:', order);
    // Move order from incoming to preparing
    setShowOrderModal(false);
    setSelectedOrder(null);
  };

  const handleReject = (order) => {
    // Handle reject order logic
    console.log('Reject order:', order);
    setShowOrderModal(false);
    setSelectedOrder(null);
  };

  const handleMarkReady = (order) => {
    // Handle mark as ready logic
    console.log('Mark as ready:', order);
    // Move order from preparing to ready
    setShowPreparingModal(false);
    setSelectedOrder(null);
  };

  const handleConfirmPickup = (order) => {
    // Handle confirm pickup logic
    console.log('Confirm pickup:', order);
    setShowReadyModal(false);
    setSelectedOrder(null);
  };

  const formatItems = (items) => {
    if (items.length === 0) return '';
    return items.join(', ') + (items.length > 2 ? '...' : '');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Store Header Card */}
        <View style={styles.storeHeaderCard}>
          <View style={styles.storeInfo}>
            <View style={styles.storeLogo}>
              <Image
                source={require('../../assets/Logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <Text style={styles.storeLogoText}>Mik Mart</Text>
            </View>
            <View style={styles.storeToggleContainer}>
              <Text style={styles.openText}>Open</Text>
              <TouchableOpacity
                style={[styles.toggle, isOpen && styles.toggleActive]}
                onPress={() => setIsOpen(!isOpen)}
                activeOpacity={0.7}
              >
                <View style={[styles.toggleCircle, isOpen && styles.toggleCircleActive]} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>3</Text>
            <Text style={styles.summaryLabel}>Today's Orders</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>$45.20</Text>
            <Text style={styles.summaryLabel}>Today's Earnings</Text>
          </View>
        </View>

        {/* Order Status Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'incoming' && styles.tabActive]}
            onPress={() => setActiveTab('incoming')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'incoming' && styles.tabTextActive,
              ]}
            >
              Incoming ({getTabCount('incoming')})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'preparing' && styles.tabActive]}
            onPress={() => setActiveTab('preparing')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'preparing' && styles.tabTextActive,
              ]}
            >
              Preparing ({getTabCount('preparing')})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'ready' && styles.tabActive]}
            onPress={() => setActiveTab('ready')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'ready' && styles.tabTextActive,
              ]}
            >
              Ready ({getTabCount('ready')})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Orders List */}
        <View style={styles.ordersContainer}>
          {getOrdersForTab().map((order) => (
            <TouchableOpacity
              key={order.id}
              style={styles.orderCard}
              onPress={() => handleOrderPress(order)}
              activeOpacity={0.7}
            >
              <View style={styles.orderHeader}>
                <Text style={styles.orderNumber}>Order {order.orderNumber}</Text>
                {activeTab === 'incoming' && order.timeAgo && (
                  <Text style={styles.orderTime}>{order.timeAgo}</Text>
                )}
                {activeTab === 'ready' && (
                  <Text style={styles.orderStatus}>Ready</Text>
                )}
              </View>
              
              <Text style={styles.orderDetails}>
                {order.itemCount} item{order.itemCount !== 1 ? 's' : ''} • {formatItems(order.items)}
              </Text>
              
              {activeTab === 'preparing' && order.prepTimeRemaining && (
                <Text style={styles.prepTime}>
                  Prep time remaining: {order.prepTimeRemaining} min
                </Text>
              )}
              
              {activeTab === 'ready' && order.riderStatus && (
                <Text style={styles.riderStatus}>{order.riderStatus}</Text>
              )}
              
              {activeTab === 'incoming' && (
                <Text style={styles.orderPrice}>${order.total.toFixed(2)}</Text>
              )}
              
              <View style={styles.orderActions}>
                {activeTab === 'incoming' && (
                  <>
                    <TouchableOpacity
                      style={styles.rejectButton}
                      onPress={() => handleReject(order.id)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.rejectButtonText}>Reject</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.acceptButton}
                      onPress={() => handleAccept(order.id)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.acceptButtonText}>Accept</Text>
                    </TouchableOpacity>
                  </>
                )}
                {activeTab === 'preparing' && (
                  <TouchableOpacity
                    style={styles.markReadyButton}
                    onPress={() => handleMarkAsReady(order.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.markReadyButtonText}>Mark As ready</Text>
                  </TouchableOpacity>
                )}
                {activeTab === 'ready' && (
                  <TouchableOpacity
                    style={styles.confirmPickupButton}
                    onPress={() => handleConfirmPickup(order.id)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.confirmPickupButtonText}>Confirm Pickup</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, activeNavTab === 'Home' && styles.navItemActive]}
          onPress={() => setActiveNavTab('Home')}
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
          onPress={() => {
            setActiveNavTab('More');
            navigation.navigate('MerchantMore');
          }}
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

      {/* Order Detail Modal */}
      <OrderDetailModal
        visible={showOrderModal}
        order={selectedOrder}
        onClose={() => {
          setShowOrderModal(false);
          setSelectedOrder(null);
        }}
        onAccept={handleAccept}
        onReject={handleReject}
      />

      {/* Preparing Order Modal */}
      <PreparingOrderModal
        visible={showPreparingModal}
        order={selectedOrder}
        onClose={() => {
          setShowPreparingModal(false);
          setSelectedOrder(null);
        }}
        onMarkReady={handleMarkReady}
      />

      {/* Ready Order Modal */}
      <ReadyOrderModal
        visible={showReadyModal}
        order={selectedOrder}
        navigation={navigation}
        onClose={() => {
          setShowReadyModal(false);
          setSelectedOrder(null);
        }}
        onConfirmPickup={handleConfirmPickup}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 100,
  },
  storeHeaderCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storeLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  storeLogoText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
  },
  storeToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  openText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#CCCCCC',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleActive: {
    backgroundColor: '#4F7942',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  toggleCircleActive: {
    transform: [{ translateX: 20 }],
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 12,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#4F7942',
    borderWidth: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  tabTextActive: {
    color: '#4F7942',
    fontWeight: '400',
  },
  ordersContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  orderTime: {
    fontSize: 12,
    fontWeight: '400',
    color: '#999999',
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
  },
  orderDetails: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 8,
  },
  prepTime: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 8,
  },
  riderStatus: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 8,
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 16,
  },
  orderActions: {
    flexDirection: 'row',
    gap: 12,
  },
  rejectButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#4F7942',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  markReadyButton: {
    flex: 1,
    backgroundColor: '#4F7942',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markReadyButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  confirmPickupButton: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmPickupButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
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
});
