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

export default function ReceiptsScreen({ navigation }) {
  const [receipts] = useState([
    {
      id: 1,
      orderNumber: '3190',
      restaurant: 'KFC',
      date: 'Dec 15, 2024',
      total: 15.50,
    },
    {
      id: 2,
      orderNumber: '3189',
      restaurant: 'Pizza Inn',
      date: 'Dec 14, 2024',
      total: 22.00,
    },
  ]);

  const renderReceipt = (receipt) => (
    <TouchableOpacity
      key={receipt.id}
      style={styles.receiptCard}
      activeOpacity={0.7}
      onPress={() => {}}
    >
      <View style={styles.receiptIcon}>
        <Feather name="file-text" size={24} color="#4F7942" />
      </View>
      <View style={styles.receiptInfo}>
        <Text style={styles.receiptOrder}>Order # {receipt.orderNumber}</Text>
        <Text style={styles.receiptRestaurant}>{receipt.restaurant}</Text>
        <Text style={styles.receiptDate}>{receipt.date}</Text>
      </View>
      <View style={styles.receiptAmount}>
        <Text style={styles.amountText}>${receipt.total.toFixed(2)}</Text>
        <Feather name="download" size={18} color="#6B7280" />
      </View>
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
        <Text style={styles.headerTitle}>Receipts</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {receipts.length > 0 ? (
            receipts.map(renderReceipt)
          ) : (
            <View style={styles.emptyState}>
              <Feather name="file-text" size={64} color="#CCCCCC" />
              <Text style={styles.emptyText}>No receipts yet</Text>
              <Text style={styles.emptySubtext}>Your receipts will appear here</Text>
            </View>
          )}
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
  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  receiptIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  receiptInfo: {
    flex: 1,
  },
  receiptOrder: {
    fontSize: 14,
    fontWeight: '400',
    color: '#111827',
    marginBottom: 4,
  },
  receiptRestaurant: {
    fontSize: 16,
    fontWeight: '400',
    color: '#111827',
    marginBottom: 4,
  },
  receiptDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  receiptAmount: {
    alignItems: 'flex-end',
    gap: 8,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#111827',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
