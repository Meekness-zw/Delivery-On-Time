import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
  Modal,
  TextInput,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function CourierPayoutMethodScreen({ navigation }) {
  const { updateUser } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // Mobile money fields
  const [mobileNetwork, setMobileNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('+263771234567');
  const [accountName, setAccountName] = useState('');
  
  // Bank account fields
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankAccountName, setBankAccountName] = useState('');

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setShowModal(true);
  };

  const handleSavePayout = () => {
    if (!selectedMethod) return;
    
    let payoutData = {
      method: selectedMethod,
    };

    if (selectedMethod === 'mobile_money') {
      payoutData = {
        ...payoutData,
        mobileNetwork,
        phoneNumber,
        accountName,
      };
    } else if (selectedMethod === 'bank_account') {
      payoutData = {
        ...payoutData,
        bankName,
        accountNumber,
        accountName: bankAccountName,
      };
    }
    
    // Update user with payout method
    updateUser({
      payoutMethod: payoutData,
    });

    setShowModal(false);
    navigation.navigate('CourierAccountVerification');
  };

  const handleSave = () => {
    if (!selectedMethod) return;
    setShowModal(true);
  };

  const progressPercentage = 100;

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
        <Text style={styles.headerTitle}>Get paid</Text>
        <TouchableOpacity style={styles.helpButton} activeOpacity={0.7}>
          <Feather name="help-circle" size={22} color="#999999" />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          {[1, 2, 3, 4].map((segment) => (
            <View
              key={segment}
              style={[
                styles.progressSegment,
                segment <= 4 && styles.progressSegmentFilled,
              ]}
            />
          ))}
        </View>
        <Text style={styles.progressText}>{progressPercentage}%</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Text */}
        <View style={styles.introSection}>
          <Text style={styles.title}>Get paid</Text>
          <Text style={styles.subtitle}>
            Add where you would like us to send your delivery earnings
          </Text>
        </View>

        {/* Payout Options */}
        <View style={styles.optionsContainer}>
          {/* Mobile Money Option */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedMethod === 'mobile_money' && styles.optionCardSelected,
            ]}
            onPress={() => handleSelectMethod('mobile_money')}
            activeOpacity={0.7}
          >
            <View style={styles.optionIconContainer}>
              <View style={styles.optionIcon}>
                <Feather name="smartphone" size={24} color="#4F7942" />
              </View>
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Mobile money</Text>
              <Text style={styles.optionDescription}>Fast payouts to your phone</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <View
                style={[
                  styles.radioButton,
                  selectedMethod === 'mobile_money' && styles.radioButtonSelected,
                ]}
              >
                {selectedMethod === 'mobile_money' && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </View>
          </TouchableOpacity>

          {/* Bank Account Option */}
          <TouchableOpacity
            style={[
              styles.optionCard,
              selectedMethod === 'bank_account' && styles.optionCardSelected,
            ]}
            onPress={() => handleSelectMethod('bank_account')}
            activeOpacity={0.7}
          >
            <View style={styles.optionIconContainer}>
              <View style={styles.optionIcon}>
                <Feather name="credit-card" size={24} color="#4F7942" />
              </View>
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Bank account</Text>
              <Text style={styles.optionDescription}>Direct transfer to your bank</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <View
                style={[
                  styles.radioButton,
                  selectedMethod === 'bank_account' && styles.radioButtonSelected,
                ]}
              >
                {selectedMethod === 'bank_account' && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            !selectedMethod && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          activeOpacity={0.8}
          disabled={!selectedMethod}
        >
          <Text style={styles.saveButtonText}>Save payout method</Text>
        </TouchableOpacity>
      </View>

      {/* Payout Details Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {selectedMethod === 'mobile_money' ? 'Mobile Network' : 'Bank Account'}
            </Text>

            {selectedMethod === 'mobile_money' ? (
              <>
                {/* Mobile Network */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Mobile Network</Text>
                  <TouchableOpacity style={styles.selectInput} activeOpacity={0.7}>
                    <Text style={mobileNetwork ? styles.selectInputText : styles.selectInputPlaceholder}>
                      {mobileNetwork || 'Select Network'}
                    </Text>
                    <Feather name="chevron-down" size={20} color="#999999" />
                  </TouchableOpacity>
                </View>

                {/* Phone Number */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="+263771234567"
                    placeholderTextColor="#999999"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                  />
                </View>

                {/* Account Name */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Account Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#999999"
                    value={accountName}
                    onChangeText={setAccountName}
                    autoCapitalize="words"
                  />
                </View>
              </>
            ) : (
              <>
                {/* Bank Name */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Bank Name</Text>
                  <TouchableOpacity style={styles.selectInput} activeOpacity={0.7}>
                    <Text style={bankName ? styles.selectInputText : styles.selectInputPlaceholder}>
                      {bankName || 'Select Bank'}
                    </Text>
                    <Feather name="chevron-down" size={20} color="#999999" />
                  </TouchableOpacity>
                </View>

                {/* Account Number */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Account Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Account Number"
                    placeholderTextColor="#999999"
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                    keyboardType="numeric"
                  />
                </View>

                {/* Account Name */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Account Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#999999"
                    value={bankAccountName}
                    onChangeText={setBankAccountName}
                    autoCapitalize="words"
                  />
                </View>
              </>
            )}

            {/* Save Button */}
            <TouchableOpacity
              style={styles.modalSaveButton}
              onPress={handleSavePayout}
              activeOpacity={0.8}
            >
              <Text style={styles.modalSaveButtonText}>Save Payout Method</Text>
            </TouchableOpacity>

            {/* Disclaimer */}
            <Text style={styles.disclaimerText}>
              Your earnings will be sent to this account
            </Text>
          </View>
        </View>
      </Modal>
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
  helpButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  progressBarBackground: {
    flex: 1,
    flexDirection: 'row',
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginRight: 12,
    gap: 4,
    padding: 2,
  },
  progressSegment: {
    flex: 1,
    height: '100%',
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
  },
  progressSegmentFilled: {
    backgroundColor: '#4F7942',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
    minWidth: 40,
    textAlign: 'right',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  introSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  optionCardSelected: {
    borderColor: '#4F7942',
    borderWidth: 2,
  },
  optionIconContainer: {
    marginRight: 16,
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F9F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666666',
  },
  radioButtonContainer: {
    marginLeft: 12,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#4F7942',
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4F7942',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  saveButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#666666',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#E5E5E5',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#000000',
  },
  selectInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectInputText: {
    fontSize: 16,
    color: '#000000',
  },
  selectInputPlaceholder: {
    fontSize: 16,
    color: '#999999',
  },
  modalSaveButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#4F7942',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  modalSaveButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
});
