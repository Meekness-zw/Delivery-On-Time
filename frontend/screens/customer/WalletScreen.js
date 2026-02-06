import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function WalletScreen({ navigation }) {
  const paymentMethods = [
    { id: 1, name: 'Visa ****2451' },
  ];

  const transactions = [
    {
      id: 1,
      type: 'outgoing',
      title: 'Order payment',
      subtitle: 'Chicken Inn',
      amount: '-$9.00',
    },
    {
      id: 2,
      type: 'incoming',
      title: 'Wallet top-up',
      subtitle: 'Visa card',
      amount: '$20.00',
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Feather name="arrow-left" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Wallet</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Available Balance Section */}
          <View style={styles.balanceCard}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>$24.80</Text>
            <View style={styles.balanceButtons}>
              <TouchableOpacity style={styles.topUpButton} activeOpacity={0.7}>
                <Text style={styles.topUpText}>Top Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.withdrawButton} activeOpacity={0.7}>
                <Text style={styles.withdrawText}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Payment Methods Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            <View style={styles.paymentMethodsCard}>
              {paymentMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={styles.paymentMethodItem}
                  activeOpacity={0.7}
                >
                  <Text style={styles.paymentMethodText}>{method.name}</Text>
                  <Feather name="chevron-right" size={20} color="#CCCCCC" />
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.addPaymentMethodItem}
                activeOpacity={0.7}
              >
                <Text style={styles.addPaymentMethodText}>Add new payment method</Text>
                <Feather name="chevron-right" size={20} color="#CCCCCC" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Recent Transactions Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <View style={styles.transactionsCard}>
              {transactions.map((transaction, index) => (
                <View
                  key={transaction.id}
                  style={[
                    styles.transactionItem,
                    index < transactions.length - 1 && styles.transactionItemBorder,
                  ]}
                >
                  <View
                    style={[
                      styles.transactionIcon,
                      transaction.type === 'outgoing'
                        ? styles.transactionIconOutgoing
                        : styles.transactionIconIncoming,
                    ]}
                  >
                    <Feather
                      name={transaction.type === 'outgoing' ? 'arrow-right' : 'arrow-down'}
                      size={16}
                      color={transaction.type === 'outgoing' ? '#FF4444' : '#4F7942'}
                    />
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTitle}>{transaction.title}</Text>
                    <Text style={styles.transactionSubtitle}>{transaction.subtitle}</Text>
                  </View>
                  <Text
                    style={[
                      styles.transactionAmount,
                      transaction.type === 'outgoing' && styles.transactionAmountOutgoing,
                    ]}
                  >
                    {transaction.amount}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
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
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  balanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 20,
  },
  balanceButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  topUpButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  topUpText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  withdrawButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#4F7942',
    alignItems: 'center',
  },
  withdrawText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
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
  paymentMethodsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  addPaymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  addPaymentMethodText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  transactionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  transactionItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
  },
  transactionIconOutgoing: {
    borderColor: '#FF4444',
    backgroundColor: '#FFF5F5',
  },
  transactionIconIncoming: {
    borderColor: '#4F7942',
    backgroundColor: '#F0FDF4',
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  transactionSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  transactionAmountOutgoing: {
    color: '#000000',
  },
});
