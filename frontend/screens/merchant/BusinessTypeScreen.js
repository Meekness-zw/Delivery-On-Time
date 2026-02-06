import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function BusinessTypeScreen({ navigation }) {
  const [selectedType, setSelectedType] = useState(null);

  const businessTypes = [
    {
      id: 'restaurant',
      label: 'Restaurant / Food',
      icon: 'coffee',
    },
    {
      id: 'grocery',
      label: 'Grocery / Retail',
      icon: 'shopping-cart',
    },
    {
      id: 'pharmacy',
      label: 'Pharmacy',
      icon: 'activity',
    },
    {
      id: 'hardware',
      label: 'Hardware Store',
      icon: 'settings',
    },
    {
      id: 'other',
      label: 'Other',
      icon: 'shopping-bag',
    },
  ];

  const handleContinue = () => {
    if (selectedType) {
      // Navigate to business information screen
      navigation.navigate('BusinessInformation', { businessType: selectedType });
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
        <Text style={styles.title}>Select your business type</Text>
        <Text style={styles.subtitle}>This helps us tailor your setup</Text>
      </View>

      {/* Business Type Options */}
      <View style={styles.optionsContainer}>
        {businessTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={[
              styles.optionCard,
              selectedType === type.id && styles.optionCardSelected,
            ]}
            onPress={() => setSelectedType(type.id)}
            activeOpacity={0.7}
          >
            <View style={styles.optionContent}>
              <View style={styles.iconContainer}>
                <Feather
                  name={type.icon}
                  size={24}
                  color={selectedType === type.id ? '#4F7942' : '#666666'}
                />
              </View>
              <Text
                style={[
                  styles.optionText,
                  selectedType === type.id && styles.optionTextSelected,
                ]}
              >
                {type.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          !selectedType && styles.continueButtonDisabled,
        ]}
        onPress={handleContinue}
        disabled={!selectedType}
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    marginBottom: 32,
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
  optionsContainer: {
    flex: 1,
    gap: 16,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    padding: 20,
  },
  optionCardSelected: {
    borderColor: '#4F7942',
    borderWidth: 2,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    flex: 1,
  },
  optionTextSelected: {
    fontWeight: '400',
    color: '#4F7942',
  },
  continueButton: {
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  continueButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
