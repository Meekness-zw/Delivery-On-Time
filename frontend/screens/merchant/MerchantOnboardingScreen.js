import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

export default function MerchantOnboardingScreen({ navigation }) {
  const handleSetUpStore = () => {
    // Navigate to business type selection screen
    navigation.navigate('BusinessType');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.titleMain}>Sell On</Text>
        <Text style={styles.titleGreen}>Delivery On Time</Text>
      </View>

      {/* Content Card */}
      <View style={styles.contentCard}>
        <View style={styles.benefitItem}>
          <View style={styles.bulletPoint} />
          <Text style={styles.benefitText}>Accept customer orders</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.benefitItem}>
          <View style={styles.bulletPoint} />
          <Text style={styles.benefitText}>Manage your products</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.benefitItem}>
          <View style={styles.bulletPoint} />
          <Text style={styles.benefitText}>Get paid directly to your account</Text>
        </View>
      </View>

      {/* Call-to-Action Button */}
      <TouchableOpacity
        style={styles.setupButton}
        onPress={handleSetUpStore}
        activeOpacity={0.8}
      >
        <Text style={styles.setupButtonText}>Set Up Your Store</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  titleMain: {
    fontSize: 32,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  titleGreen: {
    fontSize: 32,
    fontWeight: '400',
    color: '#4F7942',
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 'auto',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000000',
    marginRight: 16,
  },
  benefitText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginLeft: 22,
  },
  setupButton: {
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  setupButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
