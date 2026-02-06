import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function MerchantWalletScreen({ navigation }) {
  const [activeNavTab, setActiveNavTab] = useState('Wallet');

  const transactions = [
    {
      id: 1,
      type: 'withdrawal',
      title: 'Withdrawal',
      date: 'Today, 6:00 AM',
      amount: -400.00,
    },
    {
      id: 2,
      type: 'order',
      orderNumber: '2025',
      date: 'Yesterday, 8:40 PM',
      distance: '8.1 km',
      amount: 12.00,
    },
    {
      id: 3,
      type: 'order',
      orderNumber: '2024',
      date: 'Today, 6:00 AM',
      distance: '8.1 km',
      amount: 4.00,
    },
    {
      id: 4,
      type: 'order',
      orderNumber: '2023',
      date: 'Today, 6:00 AM',
      distance: '8.1 km',
      amount: 8.50,
    },
    {
      id: 5,
      type: 'withdrawal',
      title: 'Withdrawal',
      date: '25 Jan 2026, 6:00 AM',
      amount: -90.00,
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wallet & Earnings</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Summary Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>$24.80</Text>
          <Text style={styles.pendingBalance}>Pending Balance: $38.00</Text>
          <TouchableOpacity
            style={styles.withdrawButton}
            activeOpacity={0.8}
            onPress={() => {
              // Handle withdraw
            }}
          >
            <Text style={styles.withdrawButtonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Earnings Summary Cards */}
        <View style={styles.earningsContainer}>
          <View style={styles.earningsCard}>
            <Text style={styles.earningsLabel}>Today</Text>
            <Text style={styles.earningsAmount}>$24</Text>
          </View>
          <View style={styles.earningsCard}>
            <Text style={styles.earningsLabel}>Week</Text>
            <Text style={styles.earningsAmount}>$87.65</Text>
          </View>
          <View style={styles.earningsCard}>
            <Text style={styles.earningsLabel}>Month</Text>
            <Text style={styles.earningsAmount}>$449.80</Text>
          </View>
        </View>

        {/* Transaction List */}
        <View style={styles.transactionsSection}>
          {transactions.map((transaction, index) => {
            const isWithdrawal = transaction.type === 'withdrawal';
            const isPositive = transaction.amount > 0;
            
            return (
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
                    isWithdrawal
                      ? styles.transactionIconWithdrawal
                      : styles.transactionIconOrder,
                  ]}
                >
                  {isWithdrawal ? (
                    <Feather name="arrow-up-right" size={16} color="#FFFFFF" />
                  ) : (
                    <Feather name="check" size={16} color="#FFFFFF" />
                  )}
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.transactionTitle}>
                    {isWithdrawal ? transaction.title : `Order #${transaction.orderNumber}`}
                  </Text>
                  <Text style={styles.transactionSubtitle}>
                    {transaction.date}
                    {!isWithdrawal && transaction.distance && ` • ${transaction.distance}`}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    isPositive ? styles.transactionAmountPositive : styles.transactionAmountNegative,
                  ]}
                >
                  {isPositive ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, activeNavTab === 'Home' && styles.navItemActive]}
          onPress={() => {
            setActiveNavTab('Home');
            navigation.navigate('MerchantHome');
          }}
          activeOpacity={0.7}
        >
          <Feather
            name="home"
            size={22}
            color={activeNavTab === 'Home' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeNavTab === 'Home' && styles.navLabelActive]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeNavTab === 'Orders' && styles.navItemActive]}
          onPress={() => {
            setActiveNavTab('Orders');
            navigation.navigate('MerchantOrderHistory');
          }}
          activeOpacity={0.7}
        >
          <Feather
            name="shopping-bag"
            size={22}
            color={activeNavTab === 'Orders' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeNavTab === 'Orders' && styles.navLabelActive]}>
            Orders
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeNavTab === 'Wallet' && styles.navItemActive]}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <Feather
            name="credit-card"
            size={22}
            color={activeNavTab === 'Wallet' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeNavTab === 'Wallet' && styles.navLabelActive]}>
            Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navItem, activeNavTab === 'More' && styles.navItemActive]}
          onPress={() => setActiveNavTab('More')}
          activeOpacity={0.7}
        >
          <Feather
            name="settings"
            size={22}
            color={activeNavTab === 'More' ? '#4F7942' : '#666666'}
          />
          <Text style={[styles.navLabel, activeNavTab === 'More' && styles.navLabelActive]}>
            More
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '400',
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  balanceCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
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
    marginBottom: 8,
  },
  pendingBalance: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 20,
  },
  withdrawButton: {
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  withdrawButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  earningsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  earningsCard: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  earningsLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 8,
  },
  earningsAmount: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  transactionsSection: {
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
    borderBottomColor: '#E5E5E5',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionIconWithdrawal: {
    backgroundColor: '#EF4444',
  },
  transactionIconOrder: {
    backgroundColor: '#4F7942',
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
    fontWeight: '400',
    color: '#666666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '400',
  },
  transactionAmountPositive: {
    color: '#4F7942',
  },
  transactionAmountNegative: {
    color: '#EF4444',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    zIndex: 1000,
    overflow: 'visible',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    minWidth: 60,
  },
  navItemActive: {
    backgroundColor: '#F0FDF4',
  },
  navLabel: {
    fontSize: 11,
    color: '#666666',
    marginTop: 4,
    fontWeight: '400',
  },
  navLabelActive: {
    color: '#4F7942',
    fontWeight: '400',
  },
});
