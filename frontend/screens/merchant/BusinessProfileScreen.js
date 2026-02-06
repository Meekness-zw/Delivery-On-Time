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
  Switch,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { pickImageWithOptions } from '../../utils/imagePicker';

export default function BusinessProfileScreen({ navigation }) {
  const [isOpen, setIsOpen] = useState(true);

  // Business Overview State
  const [businessName, setBusinessName] = useState('Chicken Spot');
  const [logo, setLogo] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  
  // Business Info State
  const [storeName, setStoreName] = useState('Mik Donuts');
  const [businessType, setBusinessType] = useState('Fast Food Restaurant');
  
  // Location State
  const [location, setLocation] = useState('2122 Herbert Chitepo Avenue\nCBD, Harare');
  
  // Operating Hours State
  const [operatingHours, setOperatingHours] = useState([
    { day: 'Monday', hours: '08:00-20:00' },
    { day: 'Tuesday', hours: '08:00-20:00' },
    { day: 'Wednesday', hours: '08:00-20:00' },
    { day: 'Thursday', hours: '08:00-20:00' },
    { day: 'Friday', hours: '08:00-20:00' },
    { day: 'Saturday', hours: '08:00-20:00' },
    { day: 'Sunday', hours: '08:00-20:00' },
  ]);
  
  // Contact Details State
  const [phoneNumber, setPhoneNumber] = useState('+263 24 274679');
  const [email, setEmail] = useState('mikmarkon@donuts');
  
  // Business Information State
  const [registeredName, setRegisteredName] = useState('Mik Donuts Pvt Ltd');
  const [registrationNumber, setRegistrationNumber] = useState('REG-205939');
  
  // Modal States
  const [showOverviewModal, setShowOverviewModal] = useState(false);
  const [showBusinessInfoModal, setShowBusinessInfoModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showHoursModal, setShowHoursModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBusinessInfoModal2, setShowBusinessInfoModal2] = useState(false);
  
  // Temporary edit states
  const [tempBusinessName, setTempBusinessName] = useState(businessName);
  const [tempStoreName, setTempStoreName] = useState(storeName);
  const [tempBusinessType, setTempBusinessType] = useState(businessType);
  const [tempLocation, setTempLocation] = useState(location);
  const [tempHours, setTempHours] = useState(operatingHours);
  const [tempPhoneNumber, setTempPhoneNumber] = useState(phoneNumber);
  const [tempEmail, setTempEmail] = useState(email);
  const [tempRegisteredName, setTempRegisteredName] = useState(registeredName);
  const [tempRegistrationNumber, setTempRegistrationNumber] = useState(registrationNumber);

  const handlePickLogo = async () => {
    const image = await pickImageWithOptions({
      aspect: [1, 1], // Square for logo
      quality: 0.8,
    });
    if (image) {
      setLogo(image);
    }
  };

  const handlePickImage = async (imageIndex) => {
    const image = await pickImageWithOptions({
      aspect: [16, 9], // Wide aspect for store images
      quality: 0.8,
    });
    if (image) {
      switch (imageIndex) {
        case 1:
          setImage1(image);
          break;
        case 2:
          setImage2(image);
          break;
        case 3:
          setImage3(image);
          break;
        default:
          break;
      }
    }
  };

  const handleSaveChanges = () => {
    // Save all changes
    console.log('Saving all changes:', {
      isOpen,
      businessName,
      storeName,
      businessType,
      location,
      operatingHours,
      phoneNumber,
      email,
      registeredName,
      registrationNumber,
      logo,
      images: [image1, image2, image3],
    });
    
    Alert.alert(
      'Success',
      'Your business profile has been updated successfully.',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const handleEditOverview = () => {
    setTempBusinessName(businessName);
    setShowOverviewModal(true);
  };

  const handleSaveOverview = () => {
    setBusinessName(tempBusinessName);
    setShowOverviewModal(false);
  };

  const handleEditBusinessInfo = () => {
    setTempStoreName(storeName);
    setTempBusinessType(businessType);
    setShowBusinessInfoModal(true);
  };

  const handleSaveBusinessInfo = () => {
    setStoreName(tempStoreName);
    setBusinessType(tempBusinessType);
    setShowBusinessInfoModal(false);
  };

  const handleEditLocation = () => {
    setTempLocation(location);
    setShowLocationModal(true);
  };

  const handleSaveLocation = () => {
    setLocation(tempLocation);
    setShowLocationModal(false);
  };

  const handleEditHours = () => {
    setTempHours([...operatingHours]);
    setShowHoursModal(true);
  };

  const handleSaveHours = () => {
    setOperatingHours([...tempHours]);
    setShowHoursModal(false);
  };

  const handleEditContact = () => {
    setTempPhoneNumber(phoneNumber);
    setTempEmail(email);
    setShowContactModal(true);
  };

  const handleSaveContact = () => {
    setPhoneNumber(tempPhoneNumber);
    setEmail(tempEmail);
    setShowContactModal(false);
  };

  const handleEditBusinessInfo2 = () => {
    setTempRegisteredName(registeredName);
    setTempRegistrationNumber(registrationNumber);
    setShowBusinessInfoModal2(true);
  };

  const handleSaveBusinessInfo2 = () => {
    setRegisteredName(tempRegisteredName);
    setRegistrationNumber(tempRegistrationNumber);
    setShowBusinessInfoModal2(false);
  };

  const updateHour = (index, hours) => {
    const updated = [...tempHours];
    updated[index] = { ...updated[index], hours };
    setTempHours(updated);
  };

  const renderInfoCard = (title, items, onEdit) => (
    <View style={styles.infoCard}>
      {items.map((item, index) => (
        <View
          key={index}
          style={[
            styles.infoRow,
            index < items.length - 1 && styles.infoRowBorder,
          ]}
        >
          <Text style={styles.infoLabel}>{item.label}</Text>
          <Text style={styles.infoValue}>{item.value}</Text>
        </View>
      ))}
      <TouchableOpacity
        style={styles.editButton}
        onPress={onEdit}
        activeOpacity={0.7}
      >
        <Feather name="edit-2" size={16} color="#4F7942" />
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEditModal = (visible, onClose, onSave, title, children) => (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <Feather name="x" size={24} color="#000000" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalBody}>
            {children}
          </ScrollView>
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalSaveButton}
              onPress={onSave}
              activeOpacity={0.7}
            >
              <Text style={styles.modalSaveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
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
        <Text style={styles.headerTitle}>Business Profile</Text>
        <View style={styles.toggleContainer}>
          <Switch
            value={isOpen}
            onValueChange={setIsOpen}
            trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#E5E5E5"
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Business Overview Section */}
        <View style={styles.overviewSection}>
          <View style={styles.overviewHeader}>
            <View style={styles.logoAndName}>
              <TouchableOpacity
                style={styles.logoContainer}
                onPress={handlePickLogo}
                activeOpacity={0.7}
              >
                {logo ? (
                  <Image
                    source={{ uri: logo.uri }}
                    style={styles.logo}
                    resizeMode="cover"
                  />
                ) : (
                <Image
                  source={require('../../assets/Logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
                )}
                <View style={styles.logoOverlay}>
                  <Feather name="camera" size={20} color="#FFFFFF" />
              </View>
              </TouchableOpacity>
              <View style={styles.nameContainer}>
                <Text style={styles.businessName}>{businessName}</Text>
                <Text style={[styles.status, isOpen && styles.statusOpen]}>
                  {isOpen ? 'Open' : 'Closed'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.overviewEditButton}
              activeOpacity={0.7}
              onPress={handleEditOverview}
            >
              <Feather name="edit-2" size={16} color="#4F7942" />
              <Text style={styles.overviewEditText}>Edit</Text>
            </TouchableOpacity>
          </View>
          
          {/* Image Placeholders */}
          <View style={styles.imagePlaceholders}>
            <TouchableOpacity
              style={styles.imagePlaceholder}
              activeOpacity={0.7}
              onPress={() => handlePickImage(1)}
            >
              {image1 ? (
                <>
                  <Image
                    source={{ uri: image1.uri }}
                    style={styles.placeholderImage}
                    resizeMode="cover"
                  />
                  <View style={styles.imageOverlay}>
                    <Feather name="camera" size={20} color="#FFFFFF" />
                  </View>
                </>
              ) : (
                <Feather name="camera" size={24} color="#CCCCCC" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imagePlaceholder}
              activeOpacity={0.7}
              onPress={() => handlePickImage(2)}
            >
              {image2 ? (
                <>
                  <Image
                    source={{ uri: image2.uri }}
                    style={styles.placeholderImage}
                    resizeMode="cover"
                  />
                  <View style={styles.imageOverlay}>
                    <Feather name="camera" size={20} color="#FFFFFF" />
                  </View>
                </>
              ) : (
                <Feather name="camera" size={24} color="#CCCCCC" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imagePlaceholder}
              activeOpacity={0.7}
              onPress={() => handlePickImage(3)}
            >
              {image3 ? (
                <>
                  <Image
                    source={{ uri: image3.uri }}
                    style={styles.placeholderImage}
                    resizeMode="cover"
                  />
                  <View style={styles.imageOverlay}>
                    <Feather name="camera" size={20} color="#FFFFFF" />
                  </View>
                </>
              ) : (
                <Feather name="camera" size={24} color="#CCCCCC" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Business Info Section */}
        {renderInfoCard(
          'Business Info',
          [
            { label: 'Store Name', value: storeName },
            { label: 'Business Type', value: businessType },
          ],
          handleEditBusinessInfo
        )}

        {/* Location Section */}
        {renderInfoCard(
          'Location',
          [
            {
              label: 'Location',
              value: location,
            },
          ],
          handleEditLocation
        )}

        {/* Operating Hours Section */}
        <View style={styles.infoCard}>
          {operatingHours.map((item, index) => (
            <View
              key={index}
              style={[
                styles.infoRow,
                index < operatingHours.length - 1 && styles.infoRowBorder,
              ]}
            >
              <Text style={styles.infoLabel}>{item.day}</Text>
              <Text style={styles.infoValue}>{item.hours}</Text>
            </View>
          ))}
          <TouchableOpacity
            style={styles.editButton}
            activeOpacity={0.7}
            onPress={handleEditHours}
          >
            <Feather name="edit-2" size={16} color="#4F7942" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Contact Details Section */}
        {renderInfoCard(
          'Contact Details',
          [
            { label: 'Phone Number', value: phoneNumber },
            { label: 'Email', value: email },
          ],
          handleEditContact
        )}

        {/* Business Information Section */}
        {renderInfoCard(
          'Business Information',
          [
            { label: 'Registered Name', value: registeredName },
            { label: 'Registration Number', value: registrationNumber },
          ],
          handleEditBusinessInfo2
        )}

        {/* Save Changes Button */}
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.8}
          onPress={handleSaveChanges}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Overview Modal */}
      {renderEditModal(
        showOverviewModal,
        () => setShowOverviewModal(false),
        handleSaveOverview,
        'Edit Business Overview',
        <View style={styles.inputGroup}>
          <Text style={styles.modalLabel}>Business Name</Text>
          <TextInput
            style={styles.modalInput}
            value={tempBusinessName}
            onChangeText={setTempBusinessName}
            placeholder="Enter business name"
            placeholderTextColor="#999999"
          />
        </View>
      )}

      {/* Edit Business Info Modal */}
      {renderEditModal(
        showBusinessInfoModal,
        () => setShowBusinessInfoModal(false),
        handleSaveBusinessInfo,
        'Edit Business Info',
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.modalLabel}>Store Name</Text>
            <TextInput
              style={styles.modalInput}
              value={tempStoreName}
              onChangeText={setTempStoreName}
              placeholder="Enter store name"
              placeholderTextColor="#999999"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.modalLabel}>Business Type</Text>
            <TextInput
              style={styles.modalInput}
              value={tempBusinessType}
              onChangeText={setTempBusinessType}
              placeholder="Enter business type"
              placeholderTextColor="#999999"
            />
          </View>
        </>
      )}

      {/* Edit Location Modal */}
      {renderEditModal(
        showLocationModal,
        () => setShowLocationModal(false),
        handleSaveLocation,
        'Edit Location',
        <View style={styles.inputGroup}>
          <Text style={styles.modalLabel}>Location</Text>
          <TextInput
            style={[styles.modalInput, styles.modalTextArea]}
            value={tempLocation}
            onChangeText={setTempLocation}
            placeholder="Enter location"
            placeholderTextColor="#999999"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
      )}

      {/* Edit Operating Hours Modal */}
      {renderEditModal(
        showHoursModal,
        () => setShowHoursModal(false),
        handleSaveHours,
        'Edit Operating Hours',
        <>
          {tempHours.map((item, index) => (
            <View key={index} style={styles.inputGroup}>
              <Text style={styles.modalLabel}>{item.day}</Text>
              <TextInput
                style={styles.modalInput}
                value={item.hours}
                onChangeText={(text) => updateHour(index, text)}
                placeholder="e.g., 08:00-20:00"
                placeholderTextColor="#999999"
              />
            </View>
          ))}
        </>
      )}

      {/* Edit Contact Details Modal */}
      {renderEditModal(
        showContactModal,
        () => setShowContactModal(false),
        handleSaveContact,
        'Edit Contact Details',
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.modalLabel}>Phone Number</Text>
            <TextInput
              style={styles.modalInput}
              value={tempPhoneNumber}
              onChangeText={setTempPhoneNumber}
              placeholder="Enter phone number"
              placeholderTextColor="#999999"
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.modalLabel}>Email</Text>
            <TextInput
              style={styles.modalInput}
              value={tempEmail}
              onChangeText={setTempEmail}
              placeholder="Enter email"
              placeholderTextColor="#999999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
        </>
      )}

      {/* Edit Business Information Modal */}
      {renderEditModal(
        showBusinessInfoModal2,
        () => setShowBusinessInfoModal2(false),
        handleSaveBusinessInfo2,
        'Edit Business Information',
        <>
          <View style={styles.inputGroup}>
            <Text style={styles.modalLabel}>Registered Name</Text>
            <TextInput
              style={styles.modalInput}
              value={tempRegisteredName}
              onChangeText={setTempRegisteredName}
              placeholder="Enter registered name"
              placeholderTextColor="#999999"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.modalLabel}>Registration Number</Text>
            <TextInput
              style={styles.modalInput}
              value={tempRegistrationNumber}
              onChangeText={setTempRegistrationNumber}
              placeholder="Enter registration number"
              placeholderTextColor="#999999"
            />
          </View>
        </>
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
  toggleContainer: {
    position: 'absolute',
    right: 20,
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
  overviewSection: {
    marginBottom: 24,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  logoAndName: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  logo: {
    width: 60,
    height: 60,
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
  },
  imagePlaceholder: {
    flex: 1,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    flex: 1,
  },
  businessName: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: '400',
  },
  statusOpen: {
    color: '#4F7942',
  },
  overviewEditButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  overviewEditText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4F7942',
  },
  imagePlaceholders: {
    flexDirection: 'row',
    gap: 12,
  },
  infoCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    position: 'relative',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    flex: 1,
    textAlign: 'right',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 4,
    marginTop: 8,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4F7942',
  },
  saveButton: {
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
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
  modalBody: {
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: 400,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
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
  inputGroup: {
    marginBottom: 20,
  },
  modalLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 8,
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
  modalTextArea: {
    minHeight: 80,
    paddingTop: 14,
  },
});
