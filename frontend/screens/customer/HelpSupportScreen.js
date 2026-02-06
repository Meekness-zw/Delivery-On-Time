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

export default function HelpSupportScreen({ navigation }) {
  const supportOptions = [
    {
      id: 1,
      title: 'FAQs',
      icon: 'help-circle',
      onPress: () => {},
    },
    {
      id: 2,
      title: 'Contact Support',
      icon: 'message-circle',
      onPress: () => {},
    },
    {
      id: 3,
      title: 'Report an Issue',
      icon: 'alert-circle',
      onPress: () => {},
    },
    {
      id: 4,
      title: 'Call Support',
      icon: 'phone',
      onPress: () => Linking.openURL('tel:+1234567890'),
    },
    {
      id: 5,
      title: 'Email Support',
      icon: 'mail',
      onPress: () => Linking.openURL('mailto:support@dotdelivery.com'),
    },
  ];

  const renderOption = (option) => (
    <TouchableOpacity
      key={option.id}
      style={styles.optionCard}
      activeOpacity={0.7}
      onPress={option.onPress}
    >
      <View style={styles.optionIcon}>
        <Feather name={option.icon} size={24} color="#4F7942" />
      </View>
      <Text style={styles.optionText}>{option.title}</Text>
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
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.helpSection}>
            <Text style={styles.sectionTitle}>How can we help you?</Text>
            <Text style={styles.sectionSubtitle}>
              Choose an option below to get assistance
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            {supportOptions.map(renderOption)}
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
  helpSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '400',
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: '#111827',
  },
});
