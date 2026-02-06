import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AddProductModal from './AddProductModal';

export default function AddProductsScreen({ navigation, route }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState([]);

  const handleAddFirstProduct = () => {
    setShowAddModal(true);
  };

  const handleSaveProduct = (productData) => {
    setProducts([...products, { ...productData, id: Date.now() }]);
    // If this is the first product, navigate to merchant home
    if (products.length === 0) {
      setTimeout(() => {
        navigation.navigate('MerchantHome', {
          ...route.params,
          products: [...products, productData],
        });
      }, 500);
    }
  };

  const handleSkip = () => {
    // Navigate to merchant home without adding products
    navigation.navigate('MerchantHome', {
      ...route.params,
      products: [],
    });
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
        <Text style={styles.title}>Add Your Products</Text>
        <Text style={styles.subtitle}>You need at least one item to start receiving orders.</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Illustration Area */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require('../../assets/merchant.jpg')}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
        </View>

        {/* Empty State Message */}
        <Text style={styles.emptyStateText}>You haven't added any products yet</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleSkip}
          activeOpacity={0.7}
        >
          <Text style={styles.skipButtonText}>Skip for now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddFirstProduct}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>Add First Product</Text>
        </TouchableOpacity>
      </View>

      {/* Add Product Modal */}
      <AddProductModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveProduct}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#FAFAFA',
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  illustrationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    height: 300,
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
    maxWidth: 320,
    maxHeight: 280,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
    marginTop: 24,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    gap: 12,
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
  },
  addButton: {
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
});
