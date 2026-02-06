import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function CourierWalletScreen({ navigation }) {
  const transactions = [
    {
      type: 'withdrawal',
      description: 'Withdrawal',
      date: 'Today, 6:00 AM',
      amount: -9.00,
      color: '#DC2626',
      icon: 'arrow-up-right',
    },
    {
      type: 'delivery',
      description: 'Pharmacy Delivery',
      date: 'Today, 6:00 AM • 8.1 km',
      amount: 9.00,
      color: '#4F7942',
      icon: 'arrow-down-left',
    },
    {
      type: 'delivery',
      description: 'Pharmacy Delivery',
      date: 'Today, 6:00 AM • 8.1 km',
      amount: 9.00,
      color: '#4F7942',
      icon: 'arrow-down-left',
    },
    {
      type: 'delivery',
      description: 'Pharmacy Delivery',
      date: 'Today, 6:00 AM • 8.1 km',
      amount: 9.00,
      color: '#4F7942',
      icon: 'arrow-down-left',
    },
    {
      type: 'withdrawal',
      description: 'Withdrawal',
      date: 'Today, 6:00 AM',
      amount: -9.00,
      color: '#DC2626',
      icon: 'arrow-up-right',
    },
  ];

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
        <Text style={styles.headerTitle}>Wallet</Text>
        <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
          <Feather name="info" size={22} color="#999999" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Available Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>$24.80</Text>
          <View style={styles.balanceButtons}>
            <TouchableOpacity style={styles.topUpButton} activeOpacity={0.7}>
              <Text style={styles.topUpButtonText}>Top Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.withdrawButton} activeOpacity={0.7}>
              <Text style={styles.withdrawButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payout Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payout Method</Text>
          <View style={styles.payoutCard}>
            <View style={styles.payoutIconContainer}>
              <View style={styles.payoutIcon}>
                <Text style={styles.payoutIconText}>N</Text>
                <Text style={styles.payoutIconLabel}>NEDBANK</Text>
              </View>
            </View>
            <View style={styles.payoutInfo}>
              <Text style={styles.payoutType}>Bank Account</Text>
              <Text style={styles.payoutDetails}>Visa ****2451</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.changeButton}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <View style={styles.transactionsCard}>
            {transactions.map((transaction, index) => (
              <View
                key={index}
                style={[
                  styles.transactionItem,
                  index < transactions.length - 1 && styles.transactionItemBorder,
                ]}
              >
                <View style={styles.transactionIconContainer}>
                  <View
                    style={[
                      styles.transactionIcon,
                      { backgroundColor: transaction.color },
                    ]}
                  >
                    <Feather name={transaction.icon} size={16} color="#FFFFFF" />
                  </View>
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionDescription}>
                    {transaction.description}
                  </Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    { color: transaction.color },
                  ]}
                >
                  {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </Text>
              </View>
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
  balanceCard: {
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
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
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  topUpButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  withdrawButton: {
    flex: 1,
    backgroundColor: '#4F7942',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  withdrawButtonText: {
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
  payoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
  },
  payoutIconContainer: {
    marginRight: 12,
  },
  payoutIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F7942',
    justifyContent: 'center',
    alignItems: 'center',
  },
  payoutIconText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  payoutIconLabel: {
    fontSize: 8,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  payoutInfo: {
    flex: 1,
  },
  payoutType: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  payoutDetails: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  changeButton: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4F7942',
  },
  transactionsCard: {
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    overflow: 'hidden',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 1,
  },
  transactionItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  transactionIconContainer: {
    marginRight: 12,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '400',
  },
});
