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

export default function CourierDriverLicenseScreen({ navigation }) {
  const { updateUser } = useAuth();
  const [frontLicense, setFrontLicense] = useState(null);
  const [backLicense, setBackLicense] = useState(null);
  const [selfieWithLicense, setSelfieWithLicense] = useState(null);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const handlePickFrontLicense = async () => {
    const image = await pickImageWithOptions({
      aspect: [3, 2],
      quality: 0.8,
    });
    if (image) {
      setFrontLicense(image);
    }
  };

  const handlePickBackLicense = async () => {
    const image = await pickImageWithOptions({
      aspect: [3, 2],
      quality: 0.8,
    });
    if (image) {
      setBackLicense(image);
    }
  };

  const handlePickSelfie = async () => {
    const image = await pickImageWithOptions({
      aspect: [3, 4],
      quality: 0.8,
    });
    if (image) {
      setSelfieWithLicense(image);
    }
  };

  const handleSubmit = () => {
    // Allow navigation for testing purposes - validation removed
    
    // Update user with driver's license information
    updateUser({
      driverLicense: {
        front: frontLicense,
        back: backLicense,
        selfie: selfieWithLicense,
        licenseNumber,
        expiryDate,
      },
    });

    navigation.navigate('CourierPayoutMethod');
  };

  const progressPercentage = 75;

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
        <Text style={styles.headerTitle}>Add your driver's license</Text>
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
                segment <= 3 && styles.progressSegmentFilled,
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
          <Text style={styles.title}>Add your driver's license</Text>
          <Text style={styles.subtitle}>
            We need a valid driver's license to verify that you're legally allowed to drive.
          </Text>
        </View>

        {/* License Upload Section */}
        <View style={styles.uploadContainer}>
          {/* Front of License */}
          <View style={styles.uploadSection}>
            <TouchableOpacity
              style={[styles.uploadArea, frontLicense && styles.uploadAreaFilled]}
              onPress={handlePickFrontLicense}
              activeOpacity={0.7}
            >
              {frontLicense ? (
                <>
                  <Image
                    source={{ uri: frontLicense.uri }}
                    style={styles.uploadedImage}
                    resizeMode="cover"
                  />
                  <View style={styles.imageOverlay}>
                    <Feather name="camera" size={20} color="#FFFFFF" />
                  </View>
                </>
              ) : (
                <>
                  <Feather name="camera" size={32} color="#999999" />
                  <Text style={styles.uploadText}>Front of driver's license</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Back of License */}
          <View style={styles.uploadSection}>
            <TouchableOpacity
              style={[styles.uploadArea, backLicense && styles.uploadAreaFilled]}
              onPress={handlePickBackLicense}
              activeOpacity={0.7}
            >
              {backLicense ? (
                <>
                  <Image
                    source={{ uri: backLicense.uri }}
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
                  <Text style={styles.uploadText}>Back of driver's license</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Selfie with License */}
          <View style={styles.uploadSection}>
            <TouchableOpacity
              style={[styles.uploadArea, selfieWithLicense && styles.uploadAreaFilled]}
              onPress={handlePickSelfie}
              activeOpacity={0.7}
            >
              {selfieWithLicense ? (
                <>
                  <Image
                    source={{ uri: selfieWithLicense.uri }}
                    style={styles.uploadedImage}
                    resizeMode="cover"
                  />
                  <View style={styles.imageOverlay}>
                    <Feather name="user" size={20} color="#FFFFFF" />
                  </View>
                </>
              ) : (
                <>
                  <Feather name="file-text" size={32} color="#999999" />
                  <Text style={styles.uploadText}>Selfie while holding driver's license</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>License Number</Text>
            <TextInput
              style={styles.input}
              placeholder="AB1234567"
              placeholderTextColor="#999999"
              value={licenseNumber}
              onChangeText={setLicenseNumber}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Expiry Date</Text>
            <View style={styles.dateInputContainer}>
              <TextInput
                style={styles.dateInput}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#999999"
                value={expiryDate}
                onChangeText={setExpiryDate}
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.calendarIcon} activeOpacity={0.7}>
                <Feather name="calendar" size={20} color="#999999" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Submit for Review</Text>
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
    color: '#666666',
  },
  uploadContainer: {
    marginBottom: 24,
    gap: 16,
  },
  uploadSection: {
    marginBottom: 0,
  },
  uploadArea: {
    width: '100%',
    height: 120,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  uploadAreaFilled: {
    borderStyle: 'solid',
    borderColor: '#4F7942',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    position: 'absolute',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
  },
  formSection: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  dateInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
  },
  calendarIcon: {
    position: 'absolute',
    right: 16,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  submitButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#4F7942',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
