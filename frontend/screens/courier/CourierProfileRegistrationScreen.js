import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { pickImageWithOptions } from '../../utils/imagePicker';

export default function CourierProfileRegistrationScreen({ navigation }) {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [nationalId, setNationalId] = useState(null);
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [city, setCity] = useState('Harare');

  const handlePickProfilePhoto = async () => {
    const image = await pickImageWithOptions({
      aspect: [3, 4],
      quality: 0.8,
    });
    if (image) {
      setProfilePhoto(image);
    }
  };

  const handlePickNationalId = async () => {
    const image = await pickImageWithOptions({
      aspect: [3, 2],
      quality: 0.8,
    });
    if (image) {
      setNationalId(image);
    }
  };

  const handleVerify = () => {
    // Allow navigation for testing purposes - validation removed
    navigation.navigate('CourierVehicleRegistration');
  };

  const progressPercentage = 25;

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
        <Text style={styles.headerTitle}>Tell us about yourself</Text>
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
                segment <= 1 && styles.progressSegmentFilled,
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
          <Text style={styles.title}>Tell us about yourself</Text>
          <Text style={styles.subtitle}>
            We just need a few details to complete your driver profile.
          </Text>
        </View>

        {/* Photo Upload */}
        <View style={styles.photoCard}>
          <TouchableOpacity
            style={styles.photoUploadArea}
            activeOpacity={0.7}
            onPress={handlePickProfilePhoto}
          >
            {profilePhoto ? (
              <View style={styles.photoUploadedContent}>
                <Text style={styles.photoUploadedText}>Photo added</Text>
              </View>
            ) : (
              <>
                <View style={styles.photoIconContainer}>
                  <Feather name="camera" size={28} color="#999999" />
                </View>
                <Text style={styles.photoUploadText}>
                  Tap to take or upload a clear{'\n'}front-facing photo
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.idUploadArea}
            activeOpacity={0.7}
            onPress={handlePickNationalId}
          >
            <Feather name="file-text" size={20} color="#999999" />
            <Text style={styles.idUploadText}>
              {nationalId ? 'National ID added' : 'National ID'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number or email"
              placeholderTextColor="#999999"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Date of Birth & ID Number */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfInputGroup]}>
              <Text style={styles.label}>Date of Birth</Text>
              <TouchableOpacity style={styles.input} activeOpacity={0.7}>
                <Text style={styles.placeholderText}>
                  {dateOfBirth || 'DD/MM/YYYY'}
                </Text>
                <Feather name="calendar" size={18} color="#999999" />
              </TouchableOpacity>
            </View>
            <View style={[styles.inputGroup, styles.halfInputGroup]}>
              <Text style={styles.label}>ID Number</Text>
              <TextInput
                style={styles.input}
                placeholder="63-1234567 V 75"
                placeholderTextColor="#999999"
                value={idNumber}
                onChangeText={setIdNumber}
              />
            </View>
          </View>

          {/* City */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>City of Residence</Text>
            <TouchableOpacity style={styles.input} activeOpacity={0.7}>
              <Text style={styles.placeholderText}>{city}</Text>
              <Feather name="chevron-down" size={18} color="#999999" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Verify Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.verifyButton}
          onPress={handleVerify}
          activeOpacity={0.85}
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
    paddingBottom: 40,
  },
  introSection: {
    marginBottom: 20,
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
  photoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 24,
  },
  photoUploadArea: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  photoIconContainer: {
    marginBottom: 8,
  },
  photoUploadText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  photoUploadedContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoUploadedText: {
    fontSize: 14,
    color: '#4F7942',
  },
  idUploadArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#FAFAFA',
  },
  idUploadText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  formSection: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 6,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfInputGroup: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    paddingTop: 8,
    backgroundColor: '#FAFAFA',
  },
  verifyButton: {
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});

