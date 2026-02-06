import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function CourierNotificationsScreen({ navigation }) {
  const notifications = {
    today: [
      {
        icon: 'package',
        iconBg: '#F0F9F4',
        iconText: 'C.O.A',
        iconTextWithDots: true,
        title: 'New Delivery Request',
        description: 'Pickup at Sam\'s Grocery. Drop off 3.4 km away.',
        time: '2 mins ago',
      },
      {
        icon: 'credit-card',
        iconBg: '#F0F9F4',
        iconText: 'N',
        iconLabel: 'NEDBANK',
        title: 'Payment Received',
        description: '$5.40 added to your wallet',
        time: '18 mins ago',
      },
    ],
    yesterday: [
      {
        icon: 'user',
        iconBg: '#F0F9F4',
        hasCheckmark: false,
        title: 'Delivery Complete',
        description: 'You successfully completed Order #2341.',
        time: 'Yesterday 16:42',
      },
      {
        icon: 'user',
        iconBg: '#F0F9F4',
        hasCheckmark: true,
        checkmarkColor: '#3B82F6',
        title: 'Document Approved',
        description: 'Your driver\'s license has been approved',
        time: 'Yesterday 09:10',
      },
    ],
    earlier: [
      {
        icon: 'user',
        iconBg: '#F0F9F4',
        hasCheckmark: true,
        checkmarkColor: '#3B82F6',
        title: 'Welcome',
        description: 'Thanks for joining. You\'re ready to start delivering',
        time: '3 days ago',
      },
    ],
  };

  const renderNotificationIcon = (notification) => {
    if (notification.iconText) {
      return (
        <View style={[styles.notificationIconContainer, { backgroundColor: notification.iconBg }]}>
          {notification.iconTextWithDots ? (
            <View style={styles.iconTextWithDots}>
              <Text style={styles.notificationIconText}>C</Text>
              <View style={styles.dotsContainer}>
                <View style={styles.dot} />
                <View style={styles.dot} />
              </View>
              <Text style={styles.notificationIconText}>A</Text>
            </View>
          ) : (
            <>
              <Text style={styles.notificationIconText}>{notification.iconText}</Text>
              {notification.iconLabel && (
                <Text style={styles.notificationIconLabel}>{notification.iconLabel}</Text>
              )}
            </>
          )}
        </View>
      );
    }
    return (
      <View style={[styles.notificationIconContainer, { backgroundColor: notification.iconBg || '#F0F9F4' }]}>
        <Feather name={notification.icon} size={20} color="#4F7942" />
        {notification.hasCheckmark && (
          <View style={[styles.checkmarkBadge, { backgroundColor: notification.checkmarkColor || '#3B82F6' }]}>
            <Feather name="check" size={10} color="#FFFFFF" />
          </View>
        )}
      </View>
    );
  };

  const renderSection = (title, items) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((notification, index) => (
        <TouchableOpacity
          key={index}
          style={styles.notificationCard}
          activeOpacity={0.7}
        >
          {renderNotificationIcon(notification)}
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationDescription}>{notification.description}</Text>
            <Text style={styles.notificationTime}>{notification.time}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
          <Feather name="info" size={22} color="#999999" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderSection('Today', notifications.today)}
        {renderSection('Yesterday', notifications.yesterday)}
        {renderSection('Earlier', notifications.earlier)}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  infoButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  notificationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationIconText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4F7942',
  },
  notificationIconLabel: {
    fontSize: 8,
    fontWeight: '400',
    color: '#4F7942',
    marginTop: 2,
  },
  iconTextWithDots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 2,
    gap: 2,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#4F7942',
  },
  checkmarkBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    fontWeight: '400',
    color: '#999999',
  },
});
