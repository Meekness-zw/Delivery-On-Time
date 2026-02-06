import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { pickImageWithOptions } from '../../utils/imagePicker';

export default function CourierAccountDetailsScreen({ navigation }) {
  const { user } = useAuth();
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || null);
  const [biometricLogin, setBiometricLogin] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsUpdates, setSmsUpdates] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(false);

  const handleChangePhoto = async () => {
    const image = await pickImageWithOptions({
      aspect: [1, 1],
      quality: 0.8,
    });
    if (image) {
      setProfilePhoto(image.uri);
      // TODO: Upload image to backend and update user profile
    }
  };

  const handleDeactivate = () => {
    Alert.alert('Deactivate Account', 'Are you sure you want to deactivate your account?');
  };

  const handleDelete = () => {
    Alert.alert('Delete Account', 'Are you sure you want to delete your account? This action cannot be undone.');
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
        <Text style={styles.headerTitle}>Account Details</Text>
        <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
          <Feather name="info" size={22} color="#999999" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={handleChangePhoto}
            activeOpacity={0.8}
          >
            <Image
              source={{ uri: profilePhoto || user?.profilePhoto || 'https://via.placeholder.com/100' }}
              style={styles.profileImage}
            />
            <View style={styles.editPhotoOverlay}>
              <Feather name="camera" size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
          <Text style={styles.profileName}>{user?.name || 'Natalia Mia'}</Text>
          <Text style={styles.memberSince}>Member since 2025</Text>
        </View>

        {/* Profile Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoValue}>{user?.name || 'Natalia Mia'}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>+263 771 234 567</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>----------</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date of Birth</Text>
              <Text style={styles.infoValue}>--/--/----</Text>
            </View>
          </View>
        </View>

        {/* Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.infoCard}>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Biometric login</Text>
              <Switch
                value={biometricLogin}
                onValueChange={setBiometricLogin}
                trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Account Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Status</Text>
          <View style={styles.infoCard}>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Status</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>Active</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Communication Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Communication Preferences</Text>
          <View style={styles.infoCard}>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Switch
                value={pushNotifications}
                onValueChange={setPushNotifications}
                trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
                thumbColor="#FFFFFF"
              />
            </View>
            <View style={styles.separator} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>SMS Updates</Text>
              <Switch
                value={smsUpdates}
                onValueChange={setSmsUpdates}
                trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
                thumbColor="#FFFFFF"
              />
            </View>
            <View style={styles.separator} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Email Updates</Text>
              <Switch
                value={emailUpdates}
                onValueChange={setEmailUpdates}
                trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Actions</Text>
          <TouchableOpacity
            style={[styles.actionCard, styles.deactivateButton]}
            onPress={handleDeactivate}
            activeOpacity={0.7}
          >
            <Feather name="user-x" size={20} color="#B45309" />
            <Text style={styles.deactivateButtonText}>Deactivate Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionCard, styles.deleteButton]}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Feather name="trash-2" size={20} color="#DC2626" />
            <Text style={styles.deleteButtonText}>Delete Account</Text>
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
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5E5E5',
  },
  editPhotoOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4F7942',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  memberSince: {
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
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginLeft: 16,
  },
  statusBadge: {
    backgroundColor: '#F0F9F4',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#4F7942',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  deactivateButton: {
    backgroundColor: '#FFF4E6',
  },
  deactivateButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#B45309',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#DC2626',
  },
});
