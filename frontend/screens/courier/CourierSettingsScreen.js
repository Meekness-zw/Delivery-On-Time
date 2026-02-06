import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function CourierSettingsScreen({ navigation }) {
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [sound, setSound] = useState(false);
  const [vibration, setVibration] = useState(false);
  const [autoOpenMaps, setAutoOpenMaps] = useState(false);

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
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
          <Feather name="info" size={22} color="#999999" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Language</Text>
              <View style={styles.settingValue}>
                <Text style={styles.settingValueText}>English</Text>
                <Feather name="chevron-right" size={20} color="#999999" />
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingsCard}>
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
              <Text style={styles.settingLabel}>Sound</Text>
              <Switch
                value={sound}
                onValueChange={setSound}
                trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
                thumbColor="#FFFFFF"
              />
            </View>
            <View style={styles.separator} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Vibration</Text>
              <Switch
                value={vibration}
                onValueChange={setVibration}
                trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Navigation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Navigation</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Preferred Map App</Text>
              <View style={styles.settingValue}>
                <Text style={styles.settingValueText}>Default</Text>
                <Feather name="chevron-right" size={20} color="#999999" />
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Auto-Open Maps</Text>
              <Switch
                value={autoOpenMaps}
                onValueChange={setAutoOpenMaps}
                trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
                thumbColor="#FFFFFF"
              />
            </View>
          </View>
        </View>

        {/* Support & Legal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & Legal</Text>
          <View style={styles.settingsCard}>
            <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
              <Text style={styles.settingLabel}>Help Center</Text>
              <Feather name="chevron-right" size={20} color="#999999" />
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
              <Text style={styles.settingLabel}>Terms & Privacy</Text>
              <Feather name="chevron-right" size={20} color="#999999" />
            </TouchableOpacity>
          </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
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
  settingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingValueText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginLeft: 16,
  },
});
