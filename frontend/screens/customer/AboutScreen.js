import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Linking,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function AboutScreen({ navigation }) {
  const appInfo = {
    name: 'D.O.T - Delivery On Time',
    version: '1.0.0',
    description: 'Your trusted delivery partner for fast and reliable food delivery services.',
  };

  const aboutLinks = [
    {
      id: 1,
      title: 'Terms of Service',
      onPress: () => {},
    },
    {
      id: 2,
      title: 'Privacy Policy',
      onPress: () => {},
    },
    {
      id: 3,
      title: 'Website',
      onPress: () => Linking.openURL('https://dotdelivery.com'),
    },
  ];

  const renderLink = (link) => (
    <TouchableOpacity
      key={link.id}
      style={styles.linkCard}
      activeOpacity={0.7}
      onPress={link.onPress}
    >
      <Text style={styles.linkText}>{link.title}</Text>
      <Feather name="chevron-right" size={20} color="#CCCCCC" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* App Info */}
          <View style={styles.appInfoCard}>
            <View style={styles.appIcon}>
              <Text style={styles.appIconText}>DOT</Text>
            </View>
            <Text style={styles.appName}>{appInfo.name}</Text>
            <Text style={styles.appVersion}>Version {appInfo.version}</Text>
            <Text style={styles.appDescription}>{appInfo.description}</Text>
          </View>

          {/* Links */}
          <View style={styles.linksSection}>
            <Text style={styles.sectionTitle}>Legal</Text>
            <View style={styles.linksContainer}>
              {aboutLinks.map(renderLink)}
            </View>
          </View>

          {/* Copyright */}
          <Text style={styles.copyright}>
            © 2024 D.O.T Delivery. All rights reserved.
          </Text>
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
    paddingTop: 60,
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
    marginLeft: 12,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  appInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#4F7942',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appIconText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  appName: {
    fontSize: 22,
    fontWeight: '400',
    color: '#111827',
    marginBottom: 8,
  },
  appVersion: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  appDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  linksSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#111827',
    marginBottom: 12,
  },
  linksContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  linkText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#111827',
  },
  copyright: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 24,
  },
});
