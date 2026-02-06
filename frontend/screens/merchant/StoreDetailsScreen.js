import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { pickImageWithOptions } from '../../utils/imagePicker';

export default function StoreDetailsScreen({ navigation, route }) {
  const [storeName, setStoreName] = useState(route.params?.storeName || 'Fresh Mart');
  const [businessCategory, setBusinessCategory] = useState('Grocery');
  const [storeAddress, setStoreAddress] = useState(route.params?.address || 'Auto detection from map');
  const [phoneNumber, setPhoneNumber] = useState(route.params?.phoneNumber || '+263 771 234 567');
  const [openingTime, setOpeningTime] = useState('08:00');
  const [closingTime, setClosingTime] = useState('20:00');
  const [storeLogo, setStoreLogo] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showOpeningTimeModal, setShowOpeningTimeModal] = useState(false);
  const [showClosingTimeModal, setShowClosingTimeModal] = useState(false);

  const categories = [
    'Restaurant / Food',
    'Grocery / Retail',
    'Pharmacy',
    'Hardware Store',
    'Other',
  ];

  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeOptions.push(timeString);
    }
  }

  const handleUploadLogo = async () => {
    const image = await pickImageWithOptions({
      aspect: [1, 1], // Square for logo
      quality: 0.8,
    });
    if (image) {
      setStoreLogo(image);
    }
  };

  const handleContinue = () => {
    // Navigate to add products screen
    navigation.navigate('AddProducts', {
      ...route.params,
      storeDetails: {
        storeName,
        businessCategory,
        storeAddress,
        phoneNumber,
        operatingHours: `Opens ${openingTime}, Closes @ ${closingTime}`,
        storeLogo,
      },
    });
  };

  const renderTimePicker = (currentTime, setTime, isVisible, onClose) => {
    return (
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Time</Text>
              <TouchableOpacity onPress={onClose}>
                <Feather name="x" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.timePickerList}>
              {timeOptions.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeOption,
                    currentTime === time && styles.timeOptionSelected,
                  ]}
                  onPress={() => {
                    setTime(time);
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      styles.timeOptionText,
                      currentTime === time && styles.timeOptionTextSelected,
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

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
        <Text style={styles.title}>Tell Us About Your Store</Text>
        <Text style={styles.subtitle}>This is what customers will see.</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Store Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Store Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Fresh Mart"
            placeholderTextColor="#999999"
            value={storeName}
            onChangeText={setStoreName}
            autoCapitalize="words"
          />
        </View>

        {/* Business Category */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Business Category</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowCategoryModal(true)}
            activeOpacity={0.7}
          >
            <Text style={[styles.inputText, !businessCategory && styles.placeholderText]}>
              {businessCategory || 'Select category'}
            </Text>
            <Feather name="chevron-down" size={20} color="#999999" />
          </TouchableOpacity>
        </View>

        {/* Store Address */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Store Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Auto detection from map"
            placeholderTextColor="#999999"
            value={storeAddress}
            onChangeText={setStoreAddress}
            editable={false}
          />
        </View>

        {/* Store Phone Number */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Store Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+263 771 234 567"
            placeholderTextColor="#999999"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        {/* Operating Hours */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Operating Hours</Text>
          <View style={styles.hoursContainer}>
            <TouchableOpacity
              style={styles.timeInput}
              onPress={() => setShowOpeningTimeModal(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.timeText}>Opens {openingTime}</Text>
            </TouchableOpacity>
            <Text style={styles.hoursSeparator}>,</Text>
            <TouchableOpacity
              style={styles.timeInput}
              onPress={() => setShowClosingTimeModal(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.timeText}>Closes @ {closingTime}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Store Logo Upload */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Store logo</Text>
          <TouchableOpacity
            style={[styles.logoUploadArea, storeLogo && styles.logoUploadAreaFilled]}
            onPress={handleUploadLogo}
            activeOpacity={0.7}
          >
            {storeLogo ? (
              <View style={styles.logoUploadedContent}>
                <Image
                  source={{ uri: storeLogo.uri }}
                  style={styles.logoPreview}
                  resizeMode="cover"
                />
                <View style={styles.logoOverlay}>
                  <Feather name="camera" size={20} color="#FFFFFF" />
                </View>
              </View>
            ) : (
              <>
                <View style={styles.plusIconContainer}>
                  <Feather name="plus" size={24} color="#999999" />
                </View>
                <Text style={styles.logoUploadPlaceholder}>Upload store logo</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
        activeOpacity={0.8}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      {/* Category Modal */}
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
                <Feather name="x" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.categoryList}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryOption,
                    businessCategory === category && styles.categoryOptionSelected,
                  ]}
                  onPress={() => {
                    setBusinessCategory(category);
                    setShowCategoryModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.categoryOptionText,
                      businessCategory === category && styles.categoryOptionTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                  {businessCategory === category && (
                    <Feather name="check" size={20} color="#4F7942" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Time Pickers */}
      {renderTimePicker(openingTime, setOpeningTime, showOpeningTimeModal, () =>
        setShowOpeningTimeModal(false)
      )}
      {renderTimePicker(closingTime, setClosingTime, showClosingTimeModal, () =>
        setShowClosingTimeModal(false)
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#FAFAFA',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  placeholderText: {
    color: '#999999',
  },
  hoursContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flex: 1,
  },
  timeText: {
    fontSize: 16,
    color: '#000000',
  },
  hoursSeparator: {
    fontSize: 16,
    color: '#000000',
  },
  logoUploadArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
  },
  logoUploadAreaFilled: {
    borderColor: '#4F7942',
    borderStyle: 'solid',
  },
  plusIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logoUploadPlaceholder: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
  },
  logoUploadedContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  logoPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  logoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  logoUploadedText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4F7942',
    marginTop: 8,
  },
  continueButton: {
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
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
    paddingTop: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
  },
  categoryList: {
    maxHeight: 400,
  },
  categoryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryOptionSelected: {
    backgroundColor: '#F0FDF4',
  },
  categoryOptionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  categoryOptionTextSelected: {
    fontWeight: '400',
    color: '#4F7942',
  },
  timePickerList: {
    maxHeight: 400,
  },
  timeOption: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  timeOptionSelected: {
    backgroundColor: '#F0FDF4',
  },
  timeOptionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  timeOptionTextSelected: {
    fontWeight: '400',
    color: '#4F7942',
  },
});
