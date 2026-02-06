import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

export default function RoleSelectionScreen({ onSelectRole }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleContinue = () => {
    if (selectedRole) {
      onSelectRole?.(selectedRole);
    }
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container} 
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.mainTitle}>How will you use the app?</Text>
        <Text style={styles.subtitle}>You can switch roles later</Text>
      </View>

      <View style={styles.bottomSection}>
      <View style={styles.cardsContainer}>
        {/* Customer Card - Full Width */}
        <TouchableOpacity
          style={[
            styles.card,
            styles.cardFullWidth,
            styles.customerCard,
            selectedRole === 'customer' && styles.cardSelected,
          ]}
          activeOpacity={0.85}
          onPress={() => setSelectedRole('customer')}
        >
          <View style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Text style={styles.customerCardTitle}>Customer</Text>
              <Text style={styles.customerCardDescription}>
                Order items and get them delivered
              </Text>
            </View>
            <View style={styles.customerImageContainer}>
              <Image
                source={require('../assets/customer.jpg')}
                style={styles.cardImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* Merchant and Courier Cards - Side by Side */}
        <View style={styles.bottomCardsRow}>
          {/* Merchant Card */}
          <TouchableOpacity
            style={[
              styles.card,
              styles.cardHalfWidth,
              selectedRole === 'merchant' && styles.cardSelected,
            ]}
            activeOpacity={0.85}
            onPress={() => setSelectedRole('merchant')}
          >
            <View style={styles.bottomCardContent}>
              <View style={styles.bottomImageContainer}>
                <Image
                  source={require('../assets/merchant.jpg')}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.bottomTextContainer}>
                <Text style={styles.cardTitle}>Merchant</Text>
                <Text style={styles.cardDescription}>
                  Sell and manage orders
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Courier Card */}
          <TouchableOpacity
            style={[
              styles.card,
              styles.cardHalfWidth,
              selectedRole === 'courier' && styles.cardSelected,
            ]}
            activeOpacity={0.85}
            onPress={() => setSelectedRole('courier')}
          >
            <View style={styles.bottomCardContent}>
              <View style={styles.bottomImageContainer}>
                <Image
                  source={require('../assets/courier.jpg')}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.bottomTextContainer}>
                <Text style={styles.cardTitle}>Courier</Text>
                <Text style={styles.cardDescription}>
                  Deliver orders and earn money
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedRole && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!selectedRole}
          activeOpacity={0.85}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        <Text style={styles.footerText}>
          Your choice sets up your experience
        </Text>
      </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 30,
    justifyContent: 'space-between',
  },
  headerContainer: {
    alignItems: 'center',
  },
  bottomSection: {
    marginTop: 'auto',
    width: '100%',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  cardsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    minHeight: 120,
  },
  cardFullWidth: {
    width: '100%',
  },
  customerCard: {
    padding: 24,
    minHeight: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2.5,
  },
  cardHalfWidth: {
    flex: 1,
  },
  cardSelected: {
    borderColor: '#4F7942',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  bottomCardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 12,
  },
  bottomTextContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  imageContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customerImageContainer: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomImageContainer: {
    width: '100%',
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 6,
    textAlign: 'center',
  },
  customerCardTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
    textAlign: 'center',
  },
  customerCardDescription: {
    fontSize: 15,
    color: '#666666',
    lineHeight: 20,
  },
  bottomCardsRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  footerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  continueButton: {
    backgroundColor: '#4F7942',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 48,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  continueButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
  },
});
