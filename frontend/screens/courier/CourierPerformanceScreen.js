import React, { useState } from 'react';
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

export default function CourierPerformanceScreen({ navigation }) {
  const [selectedPeriod, setSelectedPeriod] = useState('Day');

  const periods = ['Day', 'Week', 'Month'];

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
        <Text style={styles.headerTitle}>Performance</Text>
        <TouchableOpacity style={styles.infoButton} activeOpacity={0.7}>
          <Feather name="info" size={22} color="#999999" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Period Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.periodSelector}
          contentContainerStyle={styles.periodSelectorContent}
        >
          {periods.map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.periodButtonTextActive,
                ]}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Date */}
        <Text style={styles.dateText}>Jan 25, 2026</Text>

        {/* Net Income */}
        <View style={styles.netIncomeContainer}>
          <Text style={styles.netIncomeAmount}>$64.80</Text>
          <Text style={styles.netIncomeLabel}>Net Income</Text>
        </View>

        {/* Daily Income Plan Card */}
        <View style={styles.incomePlanCard}>
          <View style={styles.incomePlanHeader}>
            <Text style={styles.incomePlanTitle}>Daily Income Plan</Text>
            <Text style={styles.incomePlanTarget}>$60</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={[styles.progressBarFill, { width: '108%' }]} />
            </View>
          </View>
          <Text style={styles.incomePlanMessage}>
            Great job, you achieved your daily income plan!
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>89.4 km</Text>
            <Text style={styles.statLabel}>Mileage</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>$0.58</Text>
            <Text style={styles.statLabel}>Per km</Text>
          </View>
        </View>

        {/* Received Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Received</Text>
          <View style={styles.transactionCard}>
            <View style={styles.transactionIconContainer}>
              <View style={[styles.transactionIcon, { backgroundColor: '#4F7942' }]}>
                <Feather name="check" size={16} color="#FFFFFF" />
              </View>
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionLabel}>Fares only</Text>
            </View>
            <Text style={[styles.transactionAmount, { color: '#4F7942' }]}>+$80.00</Text>
          </View>
        </View>

        {/* Paid Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Paid</Text>
          <View style={styles.transactionCard}>
            <View style={styles.transactionIconContainer}>
              <View style={[styles.transactionIcon, { backgroundColor: '#DC2626' }]}>
                <Feather name="arrow-up-right" size={16} color="#FFFFFF" />
              </View>
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionLabel}>Service payment and taxes</Text>
            </View>
            <Text style={[styles.transactionAmount, { color: '#DC2626' }]}>-$15.20</Text>
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
  periodSelector: {
    marginBottom: 12,
  },
  periodSelectorContent: {
    gap: 12,
  },
  periodButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  periodButtonActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#4F7942',
    borderWidth: 2,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  periodButtonTextActive: {
    color: '#4F7942',
    fontWeight: '400',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 16,
  },
  netIncomeContainer: {
    marginBottom: 24,
  },
  netIncomeAmount: {
    fontSize: 36,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  netIncomeLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  incomePlanCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4F7942',
    padding: 16,
    marginBottom: 24,
  },
  incomePlanHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  incomePlanTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  incomePlanTarget: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4F7942',
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4F7942',
    borderRadius: 4,
  },
  incomePlanMessage: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4F7942',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666666',
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
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
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
  transactionLabel: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '400',
  },
});
