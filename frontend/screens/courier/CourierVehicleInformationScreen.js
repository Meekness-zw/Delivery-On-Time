import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { pickImageWithOptions } from '../../utils/imagePicker';

export default function CourierVehicleInformationScreen({ navigation }) {
  const [vehicleType, setVehicleType] = useState('Car');
  const [brand, setBrand] = useState('Nissan');
  const [model, setModel] = useState('Skyline R34');
  const [year, setYear] = useState('2016');
  const [color, setColor] = useState('Black');
  const [licensePlate, setLicensePlate] = useState('ABC 1234');
  const [deliveryBag, setDeliveryBag] = useState('Available');
  const [vehiclePhoto, setVehiclePhoto] = useState(null);

  const handlePickVehiclePhoto = async () => {
    const image = await pickImageWithOptions({
      aspect: [3, 2],
      quality: 0.8,
    });
    if (image) {
      setVehiclePhoto(image);
    }
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
        <Text style={styles.headerTitle}>Vehicle Information</Text>
        <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
          <Feather name="info" size={22} color="#999999" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Vehicle Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryImageContainer}>
            <Image
              source={{ uri: vehiclePhoto?.uri || 'https://via.placeholder.com/120' }}
              style={styles.summaryImage}
            />
          </View>
          <View style={styles.summaryInfo}>
            <Text style={styles.summaryTitle}>Nissan Skyline GTR34</Text>
            <Text style={styles.summarySubtitle}>Grey • ABC 1234</Text>
          </View>
        </View>

        {/* Vehicle Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vehicle Details</Text>
          <View style={styles.formCard}>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Vehicle Type</Text>
                <TouchableOpacity style={styles.selectInput} activeOpacity={0.7}>
                  <Text style={styles.selectInputText}>{vehicleType}</Text>
                  <Feather name="chevron-down" size={20} color="#999999" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, styles.inputGroupHalf]}>
                <Text style={styles.label}>Brand</Text>
                <TextInput
                  style={styles.input}
                  value={brand}
                  onChangeText={setBrand}
                  placeholder="Nissan"
                />
              </View>
              <View style={[styles.inputGroup, styles.inputGroupHalf]}>
                <Text style={styles.label}>Model</Text>
                <TextInput
                  style={styles.input}
                  value={model}
                  onChangeText={setModel}
                  placeholder="Skyline R34"
                />
              </View>
            </View>
            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, styles.inputGroupHalf]}>
                <Text style={styles.label}>Year</Text>
                <TextInput
                  style={styles.input}
                  value={year}
                  onChangeText={setYear}
                  placeholder="2016"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.inputGroup, styles.inputGroupHalf]}>
                <Text style={styles.label}>Color</Text>
                <TextInput
                  style={styles.input}
                  value={color}
                  onChangeText={setColor}
                  placeholder="Black"
                />
              </View>
            </View>
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Licence Plate</Text>
                <TextInput
                  style={styles.input}
                  value={licensePlate}
                  onChangeText={setLicensePlate}
                  placeholder="ABC 1234"
                  autoCapitalize="characters"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Delivery Equipment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Equipment</Text>
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Delivery Bag</Text>
              <TouchableOpacity style={styles.selectInput} activeOpacity={0.7}>
                <Text style={styles.selectInputText}>{deliveryBag}</Text>
                <Feather name="chevron-down" size={20} color="#999999" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Vehicle Photo</Text>
              <TouchableOpacity
                style={styles.photoUploadArea}
                onPress={handlePickVehiclePhoto}
                activeOpacity={0.7}
              >
                {vehiclePhoto ? (
                  <Image
                    source={{ uri: vehiclePhoto.uri }}
                    style={styles.uploadedPhoto}
                    resizeMode="cover"
                  />
                ) : (
                  <>
                    <Feather name="camera" size={32} color="#999999" />
                    <Text style={styles.uploadText}>Vehicle Picture</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
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
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  summaryImageContainer: {
    marginRight: 16,
  },
  summaryImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
  },
  summaryInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
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
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputGroupHalf: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
  },
  selectInput: {
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectInputText: {
    fontSize: 16,
    color: '#000000',
  },
  photoUploadArea: {
    height: 150,
    backgroundColor: '#FAFAFA',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadedPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  uploadText: {
    fontSize: 14,
    color: '#999999',
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  saveButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#4F7942',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
