import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function UploadBusinessDocumentsScreen({ navigation, route }) {
  const [nationalId, setNationalId] = useState(null);
  const [businessCertificate, setBusinessCertificate] = useState(null);
  const [proofOfAddress, setProofOfAddress] = useState(null);

  const handleUpload = (type) => {
    // TODO: Implement file picker functionality
    // For now, this is a placeholder
    // You can use expo-image-picker or expo-document-picker here
    console.log(`Upload ${type}`);
    
    // Placeholder: Simulate file selection
    // In production, use: import * as DocumentPicker from 'expo-document-picker';
    // const result = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
    
    // For demo purposes, setting a placeholder
    const placeholder = { uri: 'placeholder', name: 'document.pdf' };
    
    switch (type) {
      case 'nationalId':
        setNationalId(placeholder);
        break;
      case 'businessCertificate':
        setBusinessCertificate(placeholder);
        break;
      case 'proofOfAddress':
        setProofOfAddress(placeholder);
        break;
    }
  };

  const handleContinue = () => {
    // Navigate to store details screen
    navigation.navigate('StoreDetails', {
      ...route.params,
      documents: {
        nationalId,
        businessCertificate,
        proofOfAddress,
      },
    });
  };

  const renderUploadArea = (type, title, placeholderText, isOptional = false) => {
    const isUploaded = 
      (type === 'nationalId' && nationalId) ||
      (type === 'businessCertificate' && businessCertificate) ||
      (type === 'proofOfAddress' && proofOfAddress);

    return (
      <View style={styles.documentSection}>
        <Text style={styles.documentTitle}>
          {title}
          {isOptional && <Text style={styles.optionalText}> (Optional)</Text>}
        </Text>
        <TouchableOpacity
          style={[styles.uploadArea, isUploaded && styles.uploadAreaFilled]}
          onPress={() => handleUpload(type)}
          activeOpacity={0.7}
        >
          {isUploaded ? (
            <View style={styles.uploadedContent}>
              <Feather name="check-circle" size={24} color="#4F7942" />
              <Text style={styles.uploadedText}>Document uploaded</Text>
            </View>
          ) : (
            <>
              <Feather name="file-text" size={32} color="#999999" />
              <Text style={styles.uploadPlaceholder}>{placeholderText}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
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
        <Text style={styles.title}>Upload Business Documents</Text>
        <Text style={styles.subtitle}>This helps us verify your store.</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Owner ID / National ID */}
        {renderUploadArea(
          'nationalId',
          'Owner ID / National ID',
          'National ID',
          false
        )}

        {/* Business Registration Certificate */}
        {renderUploadArea(
          'businessCertificate',
          'Business Registration Certificate',
          'Certificate (Optional)',
          true
        )}

        {/* Proof of Address */}
        {renderUploadArea(
          'proofOfAddress',
          'Proof of Address',
          'Utility Bill',
          false
        )}
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
        activeOpacity={0.8}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
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
  documentSection: {
    marginBottom: 24,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 12,
  },
  optionalText: {
    color: '#666666',
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
  },
  uploadAreaFilled: {
    borderColor: '#4F7942',
    borderStyle: 'solid',
  },
  uploadedContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4F7942',
    marginTop: 8,
  },
  uploadPlaceholder: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
    marginTop: 12,
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
});
