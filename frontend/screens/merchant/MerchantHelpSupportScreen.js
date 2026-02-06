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
  Linking,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function MerchantHelpSupportScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const quickActions = [
    {
      id: 1,
      title: 'Order Issues',
      icon: 'alert-triangle',
    },
    {
      id: 2,
      title: 'Payment Issues',
      icon: 'headphones',
    },
    {
      id: 3,
      title: 'Rider Issues',
      icon: 'dollar-sign',
    },
    {
      id: 4,
      title: 'Store Account',
      icon: 'user',
    },
  ];

  const popularTopics = [
    'How payouts work',
    'How to add products',
    'How to change hours',
    'What does Mark Ready mean',
    'How riders are assigned',
  ];

  const pastRequests = [
    {
      id: 1,
      ticketNumber: '#1235',
      status: 'Pending',
      statusColor: '#FFA500',
      statusBg: '#FFF4E5',
    },
    {
      id: 2,
      ticketNumber: '#1234',
      status: 'Resolved',
      statusColor: '#4F7942',
      statusBg: '#F0FDF4',
    },
  ];

  const handleCallSupport = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleChatSupport = () => {
    // Navigate to chat support
    console.log('Open chat support');
  };

  const handleSubmitRequest = () => {
    // Navigate to submit request screen
    console.log('Submit a request');
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
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Call & Chat Support Buttons */}
        <View style={styles.supportButtonsContainer}>
          <TouchableOpacity
            style={styles.supportButton}
            onPress={handleCallSupport}
            activeOpacity={0.8}
          >
            <Text style={styles.supportButtonText}>Call Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.supportButton}
            onPress={handleChatSupport}
            activeOpacity={0.8}
          >
            <Text style={styles.supportButtonText}>Chat Support</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#999999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help ...."
            placeholderTextColor="#999999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                activeOpacity={0.7}
                onPress={() => {
                  // Handle quick action
                  console.log(action.title);
                }}
              >
                <Feather name={action.icon} size={24} color="#666666" />
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Topics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Topics</Text>
          <View style={styles.topicsCard}>
            {popularTopics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.topicItem,
                  index < popularTopics.length - 1 && styles.topicItemBorder,
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  // Handle topic click
                  console.log(topic);
                }}
              >
                <Text style={styles.topicText}>{topic}</Text>
                <Feather name="chevron-right" size={20} color="#CCCCCC" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Submit a Request Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitRequest}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Submit a Request</Text>
        </TouchableOpacity>

        {/* Past Requests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Requests</Text>
          <View style={styles.requestsCard}>
            {pastRequests.map((request, index) => (
              <TouchableOpacity
                key={request.id}
                style={[
                  styles.requestItem,
                  index < pastRequests.length - 1 && styles.requestItemBorder,
                ]}
                activeOpacity={0.7}
                onPress={() => {
                  // View request details
                  console.log(request.ticketNumber);
                }}
              >
                <Text style={styles.requestTicketText}>Ticket {request.ticketNumber}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: request.statusBg },
                  ]}
                >
                  <Text style={[styles.statusText, { color: request.statusColor }]}>
                    {request.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
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
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  supportButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  supportButton: {
    flex: 1,
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  supportButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    padding: 0,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginTop: 8,
    textAlign: 'center',
  },
  topicsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  topicItemBorder: {
    borderBottomWidth: 1,
  },
  topicText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  requestsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  requestItemBorder: {
    borderBottomWidth: 1,
  },
  requestTicketText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '400',
  },
});
