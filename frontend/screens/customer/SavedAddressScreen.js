import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function SavedAddressScreen({ navigation }) {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      label: 'Home',
      address: '12 Samora Machel Ave, Harare',
      isDefault: false,
    },
    {
      id: 2,
      label: 'Work',
      address: '42 Borrowdale Rd, Harare',
      isDefault: false,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [label, setLabel] = useState('');
  const [address, setAddress] = useState('');

  const handleSetDefault = (id) => {
    setAddresses(addrs =>
      addrs.map(addr => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const handleDelete = (id) => {
    setAddresses(addrs => addrs.filter(addr => addr.id !== id));
  };

  const handleSave = () => {
    if (label.trim() && address.trim()) {
      const newAddress = {
        id: addresses.length + 1,
        label: label.trim(),
        address: address.trim(),
        isDefault: false,
      };
      setAddresses([...addresses, newAddress]);
      setLabel('');
      setAddress('');
      setShowAddModal(false);
    }
  };

  const handleCancel = () => {
    setLabel('');
    setAddress('');
    setShowAddModal(false);
  };

  const renderAddress = (address) => (
    <View key={address.id} style={styles.addressCard}>
      <Text style={styles.addressTitle}>{address.label}</Text>
      <Text style={styles.addressText}>{address.address}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.setDefaultButton}
          onPress={() => handleSetDefault(address.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.setDefaultText}>Set as default</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(address.id)}
          activeOpacity={0.7}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
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
        <Text style={styles.headerTitle}>Saved Addresses</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {addresses.map(renderAddress)}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => setShowAddModal(true)}
      >
        <Feather name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Add Address Modal */}
      <Modal
        visible={showAddModal}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={handleCancel}
          />
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Address</Text>
            
            <View style={styles.modalInputGroup}>
              <TextInput
                style={styles.modalInput}
                placeholder="Label (Home, Work)"
                placeholderTextColor="#999999"
                value={label}
                onChangeText={setLabel}
              />
            </View>

            <View style={styles.modalInputGroup}>
              <View style={styles.searchInputContainer}>
                <Feather name="search" size={20} color="#999999" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search for an address"
                  placeholderTextColor="#999999"
                  value={address}
                  onChangeText={setAddress}
                />
              </View>
            </View>

            <View style={styles.modalButtonRow}>
              <TouchableOpacity
                style={styles.modalSaveButton}
                onPress={handleSave}
                activeOpacity={0.7}
              >
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={handleCancel}
                activeOpacity={0.7}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
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
    paddingTop: 80,
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
    paddingBottom: 100,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  setDefaultButton: {
    flex: 1,
    backgroundColor: '#06C167',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  setDefaultText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  deleteText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#06C167',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 24,
  },
  modalInputGroup: {
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingVertical: 14,
  },
  modalButtonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalSaveButton: {
    flex: 1,
    backgroundColor: '#06C167',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSaveText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  modalCancelText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
  },
});
