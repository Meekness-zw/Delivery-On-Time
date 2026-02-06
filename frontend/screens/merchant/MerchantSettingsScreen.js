import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Switch,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function MerchantSettingsScreen({ navigation }) {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'RoleSelection' }],
    });
  };
  
  // Order Preferences
  const [newOrderSound, setNewOrderSound] = useState(true);
  const [vibrationAlerts, setVibrationAlerts] = useState(true);
  const [autoAcceptOrders, setAutoAcceptOrders] = useState(true);
  const [defaultPrepTime, setDefaultPrepTime] = useState('15 mins');
  const [showPrepTimeModal, setShowPrepTimeModal] = useState(false);
  const [tempPrepTime, setTempPrepTime] = useState('15');

  // Notifications
  const [riderArrived, setRiderArrived] = useState(true);
  const [customerMessages, setCustomerMessages] = useState(true);
  const [promotions, setPromotions] = useState(true);

  const prepTimeOptions = ['5', '10', '15', '20', '25', '30', '45', '60'];

  const handleSavePrepTime = () => {
    setDefaultPrepTime(`${tempPrepTime} mins`);
    setShowPrepTimeModal(false);
  };

  const handleCloseStore = () => {
    Alert.alert(
      'Close Store Permanently',
      'Are you sure you want to close your store permanently? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Close Store',
          style: 'destructive',
          onPress: () => {
            // Handle close store
            console.log('Store closed permanently');
          },
        },
      ]
    );
  };

  const renderSettingItem = (title, rightElement, isLast = false) => (
    <View style={[styles.settingItem, isLast && styles.settingItemLast]}>
      <Text style={styles.settingTitle}>{title}</Text>
      {rightElement}
    </View>
  );

  const renderSection = (title, children) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.settingsCard}>{children}</View>
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
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Preferences */}
        {renderSection(
          'Order Preferences',
          <>
            {renderSettingItem(
              'New Order Sound',
              <Switch
                value={newOrderSound}
                onValueChange={setNewOrderSound}
                trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E5E5E5"
              />
            )}
            {renderSettingItem(
              'Vibration Alerts',
              <Switch
                value={vibrationAlerts}
                onValueChange={setVibrationAlerts}
                trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E5E5E5"
              />
            )}
            {renderSettingItem(
              'Auto Accept Orders',
              <Switch
                value={autoAcceptOrders}
                onValueChange={setAutoAcceptOrders}
                trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E5E5E5"
              />
            )}
            {renderSettingItem(
              'Default Prep Time',
              <TouchableOpacity
                style={styles.prepTimeButton}
                onPress={() => {
                  setTempPrepTime(defaultPrepTime.replace(' mins', ''));
                  setShowPrepTimeModal(true);
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.prepTimeButtonText}>{defaultPrepTime}</Text>
              </TouchableOpacity>,
              true
            )}
          </>
        )}

        {/* Device & Printer */}
        {renderSection(
          'Device & Printer',
          <>
            {renderSettingItem(
              'Connected Printer',
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  // Handle add printer
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.actionButtonText}>Add Printer</Text>
              </TouchableOpacity>
            )}
            {renderSettingItem(
              'Test Print',
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => {
                  // Handle test print
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.actionButtonText}>Print</Text>
              </TouchableOpacity>,
              true
            )}
          </>
        )}

        {/* Payments */}
        {renderSection(
          'Payments',
          <>
            {renderSettingItem(
              'Manage Payout Methods',
              <Feather name="chevron-right" size={20} color="#CCCCCC" />,
              true
            )}
          </>
        )}

        {/* Notifications */}
        {renderSection(
          'Notifications',
          <>
            {renderSettingItem(
              'Rider Arrived',
              <Switch
                value={riderArrived}
                onValueChange={setRiderArrived}
                trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E5E5E5"
              />
            )}
            {renderSettingItem(
              'Customer Messages',
              <Switch
                value={customerMessages}
                onValueChange={setCustomerMessages}
                trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E5E5E5"
              />
            )}
            {renderSettingItem(
              'Promotions',
              <Switch
                value={promotions}
                onValueChange={setPromotions}
                trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E5E5E5"
              />,
              true
            )}
          </>
        )}

        {/* Account */}
        {renderSection(
          'Account',
          <>
            {renderSettingItem(
              'Change Phone',
              <Feather name="chevron-right" size={20} color="#CCCCCC" />
            )}
            {renderSettingItem(
              'Change Email',
              <Feather name="chevron-right" size={20} color="#CCCCCC" />,
              true
            )}
          </>
        )}

        {/* Legal */}
        {renderSection(
          'Legal',
          <>
            {renderSettingItem(
              'Terms of Service',
              <Feather name="chevron-right" size={20} color="#CCCCCC" />
            )}
            {renderSettingItem(
              'Privacy Policy',
              <Feather name="chevron-right" size={20} color="#CCCCCC" />,
              true
            )}
          </>
        )}

        {/* Account Actions */}
        <View style={styles.section}>
          <View style={styles.settingsCard}>
            <TouchableOpacity
              style={styles.accountActionItem}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Text style={styles.accountActionText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.accountActionItem, styles.accountActionItemLast]}
              onPress={handleCloseStore}
              activeOpacity={0.7}
            >
              <Text style={styles.accountActionText}>Close Store Permanently</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Prep Time Modal */}
      <Modal
        visible={showPrepTimeModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPrepTimeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Default Prep Time</Text>
              <TouchableOpacity onPress={() => setShowPrepTimeModal(false)}>
                <Feather name="x" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.prepTimeList}>
              {prepTimeOptions.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.prepTimeOption,
                    tempPrepTime === time && styles.prepTimeOptionSelected,
                  ]}
                  onPress={() => setTempPrepTime(time)}
                >
                  <Text
                    style={[
                      styles.prepTimeOptionText,
                      tempPrepTime === time && styles.prepTimeOptionTextSelected,
                    ]}
                  >
                    {time} mins
                  </Text>
                  {tempPrepTime === time && (
                    <Feather name="check" size={20} color="#4F7942" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setShowPrepTimeModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={handleSavePrepTime}
              >
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 20,
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
    fontSize: 28,
    fontWeight: '400',
    color: '#000000',
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
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
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  prepTimeButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  prepTimeButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  actionButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  accountActionItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  accountActionItemLast: {
    borderBottomWidth: 0,
  },
  accountActionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FF4444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  prepTimeList: {
    maxHeight: 400,
  },
  prepTimeOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  prepTimeOptionSelected: {
    backgroundColor: '#F0FDF4',
  },
  prepTimeOptionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  prepTimeOptionTextSelected: {
    fontWeight: '400',
    color: '#4F7942',
  },
  modalFooter: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
  },
  modalSaveButton: {
    flex: 1,
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSaveText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
