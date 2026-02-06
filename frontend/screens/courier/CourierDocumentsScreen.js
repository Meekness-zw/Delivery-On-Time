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

export default function CourierDocumentsScreen({ navigation }) {
  const documents = [
    {
      icon: 'credit-card',
      title: 'ID/Driver\'s license',
      subtitle: 'Government issued',
      status: 'approved',
    },
    {
      icon: 'truck',
      title: 'Vehicle Registration',
      subtitle: 'Car/Bike paper',
      status: 'pending',
    },
    {
      icon: 'shield',
      title: 'Insurance',
      subtitle: 'Active coverage',
      status: 'upload',
    },
    {
      icon: 'user',
      title: 'Profile Photo',
      subtitle: 'Clear face image',
      status: 'approved',
    },
  ];

  const getStatusBadge = (status) => {
    if (status === 'approved') {
      return (
        <View style={styles.statusBadgeApproved}>
          <Text style={styles.statusBadgeTextApproved}>Approved</Text>
        </View>
      );
    } else if (status === 'pending') {
      return (
        <View style={styles.statusBadgePending}>
          <Text style={styles.statusBadgeTextPending}>Pending</Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.uploadText}>Upload</Text>
        </TouchableOpacity>
      );
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
        <Text style={styles.headerTitle}>Documents</Text>
        <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
          <Feather name="info" size={22} color="#999999" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Alert Banner */}
        <View style={styles.alertBanner}>
          <Text style={styles.alertText}>
            Some documents are pending. Please complete verification to receive delivery requests.
          </Text>
        </View>

        {/* Required Documents */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Required Documents</Text>
          <View style={styles.documentsCard}>
            {documents.map((doc, index) => (
              <View
                key={index}
                style={[
                  styles.documentItem,
                  index < documents.length - 1 && styles.documentItemBorder,
                ]}
              >
                <View style={styles.documentIconContainer}>
                  <Feather name={doc.icon} size={24} color="#4F7942" />
                </View>
                <View style={styles.documentInfo}>
                  <Text style={styles.documentTitle}>{doc.title}</Text>
                  <Text style={styles.documentSubtitle}>{doc.subtitle}</Text>
                </View>
                {getStatusBadge(doc.status)}
              </View>
            ))}
          </View>
        </View>

        {/* Footer Text */}
        <Text style={styles.footerText}>
          Verification usually takes up 24 hours after submission.
        </Text>
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
  alertBanner: {
    backgroundColor: '#FFF4E6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  alertText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#B45309',
    lineHeight: 20,
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
  documentsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  documentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  documentItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  documentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F9F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  documentSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  statusBadgeApproved: {
    backgroundColor: '#F0F9F4',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusBadgeTextApproved: {
    fontSize: 12,
    fontWeight: '400',
    color: '#4F7942',
  },
  statusBadgePending: {
    backgroundColor: '#FFF4E6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusBadgeTextPending: {
    fontSize: 12,
    fontWeight: '400',
    color: '#F97316',
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#3B82F6',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
  },
});
