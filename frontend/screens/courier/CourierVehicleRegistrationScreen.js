import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { pickImageWithOptions } from '../../utils/imagePicker';
import { useAuth } from '../../context/AuthContext';

export default function CourierVehicleRegistrationScreen({ navigation }) {
  const { updateUser } = useAuth();
  const [vehiclePicture, setVehiclePicture] = useState(null);
  const [registrationCertificate, setRegistrationCertificate] = useState(null);
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [productionYear, setProductionYear] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');

  const handlePickVehiclePicture = async () => {
    const image = await pickImageWithOptions({
      aspect: [3, 2],
      quality: 0.8,
    });
    if (image) {
      setVehiclePicture(image);
    }
  };

  const handlePickRegistrationCertificate = async () => {
    const image = await pickImageWithOptions({
      aspect: [3, 2],
      quality: 0.8,
    });
    if (image) {
      setRegistrationCertificate(image);
    }
  };

  const handleVerify = () => {
    // Allow navigation for testing purposes - validation removed
    
    // Update user with vehicle information
    updateUser({
      hasVehicle: true,
      needsVehicleRegistration: false,
      vehicle: {
        brand: vehicleBrand.trim(),
        model: vehicleModel.trim(),
        year: productionYear.trim(),
        color: vehicleColor.trim(),
        picture: vehiclePicture,
        registrationCertificate: registrationCertificate,
      },
    });

    // Navigate to driver's license registration
    navigation.navigate('CourierDriverLicense');
  };

  const progressPercentage = 50;

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
        <Text style={styles.headerTitle}>Add your vehicle details.</Text>
        <TouchableOpacity style={styles.helpButton} activeOpacity={0.7}>
          <Feather name="help-circle" size={22} color="#999999" />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          {[1, 2, 3, 4].map((segment) => (
            <View
              key={segment}
                  style={[
                styles.progressSegment,
                segment <= 2 && styles.progressSegmentFilled,
              ]}
            />
          ))}
        </View>
        <Text style={styles.progressText}>{progressPercentage}%</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Intro Text */}
        <View style={styles.introSection}>
          <Text style={styles.title}>Add your vehicle details.</Text>
          <Text style={styles.subtitle}>
            We'll use these details to confirm your vehicle and show it to the merchants before every delivery
                </Text>
        </View>

        {/* Vehicle Picture Upload */}
        <View style={styles.uploadSection}>
          <TouchableOpacity
            style={[styles.uploadArea, vehiclePicture && styles.uploadAreaFilled]}
            onPress={handlePickVehiclePicture}
            activeOpacity={0.7}
          >
            {vehiclePicture ? (
              <>
                <Image
                  source={{ uri: vehiclePicture.uri }}
                  style={styles.uploadedImage}
                  resizeMode="cover"
                />
                <View style={styles.imageOverlay}>
                  <Feather name="camera" size={20} color="#FFFFFF" />
                </View>
              </>
            ) : (
              <>
                <View style={styles.uploadIconContainer}>
                  <Feather name="camera" size={32} color="#999999" />
                  <View style={styles.plusIcon}>
                    <Feather name="plus" size={16} color="#FFFFFF" />
                  </View>
                </View>
                <Text style={styles.uploadText}>Vehicle Picture</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Registration Certificate Upload */}
        <View style={styles.uploadSection}>
          <TouchableOpacity
            style={[styles.uploadArea, registrationCertificate && styles.uploadAreaFilled]}
            onPress={handlePickRegistrationCertificate}
            activeOpacity={0.7}
          >
            {registrationCertificate ? (
              <>
                <Image
                  source={{ uri: registrationCertificate.uri }}
                  style={styles.uploadedImage}
                  resizeMode="cover"
                />
                <View style={styles.imageOverlay}>
                  <Feather name="file-text" size={20} color="#FFFFFF" />
                </View>
              </>
            ) : (
              <>
                <Feather name="file-text" size={32} color="#999999" />
                <Text style={styles.uploadText}>Vehicle Registration Certificate</Text>
              </>
            )}
              </TouchableOpacity>
        </View>

        {/* Vehicle Details Form */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vehicle Brand</Text>
            <TextInput
              style={styles.input}
              placeholder="Toyota"
              placeholderTextColor="#999999"
              value={vehicleBrand}
              onChangeText={setVehicleBrand}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vehicle Model</Text>
            <TextInput
              style={styles.input}
              placeholder="Corolla"
              placeholderTextColor="#999999"
              value={vehicleModel}
              onChangeText={setVehicleModel}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Production Year</Text>
            <TextInput
              style={styles.input}
              placeholder="2012"
              placeholderTextColor="#999999"
              value={productionYear}
              onChangeText={setProductionYear}
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Vehicle Color</Text>
            <TextInput
              style={styles.input}
              placeholder="White"
              placeholderTextColor="#999999"
              value={vehicleColor}
              onChangeText={setVehicleColor}
              autoCapitalize="words"
            />
          </View>
        </View>
      </ScrollView>

      {/* Verify Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerify}
          activeOpacity={0.8}
        >
          <Text style={styles.verifyButtonText}>Verify</Text>
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
  helpButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  progressBarBackground: {
    flex: 1,
    flexDirection: 'row',
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginRight: 12,
    gap: 4,
    padding: 2,
  },
  progressSegment: {
    flex: 1,
    height: '100%',
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
  },
  progressSegmentFilled: {
    backgroundColor: '#4F7942',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
    minWidth: 40,
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  introSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 20,
  },
  uploadSection: {
    marginBottom: 20,
  },
  uploadArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    position: 'relative',
  },
  uploadAreaFilled: {
    borderColor: '#4F7942',
    borderStyle: 'solid',
    padding: 0,
    overflow: 'hidden',
  },
  uploadIconContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  plusIcon: {
    position: 'absolute',
    bottom: -4,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4F7942',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    minHeight: 120,
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
  formSection: {
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    paddingTop: 16,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  verifyButton: {
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
