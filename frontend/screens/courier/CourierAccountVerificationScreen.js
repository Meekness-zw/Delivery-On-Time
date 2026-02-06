import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function CourierAccountVerificationScreen({ navigation }) {
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

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>We're verifying your account.</Text>
        <Text style={styles.description}>
          Our team is reviewing you documents to make sure everything checks out. You'll get a notification once your driver profile is approved.
        </Text>
      </View>

      {/* Go to Home Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('CourierHome')}
          activeOpacity={0.8}
        >
          <Text style={styles.homeButtonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    backgroundColor: '#FFFFFF',
  },
  homeButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#4F7942',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
