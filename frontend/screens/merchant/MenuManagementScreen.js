import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  Switch,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function MenuManagementScreen({ navigation, route }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState(route.params?.products || [
    {
      id: 1,
      name: 'Chicken Burger',
      price: 4.50,
      category: 'Fast Food',
      isAvailable: true,
      photo: null,
    },
    {
      id: 2,
      name: 'Fries',
      price: 2.00,
      category: 'Fast Food',
      isAvailable: false,
      photo: null,
    },
  ]);

  const categories = ['All', 'Fast Food', 'Groceries', 'Pharmacy', 'Others'];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleToggleAvailability = (productId) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? { ...product, isAvailable: !product.isAvailable }
          : product
      )
    );
  };

  const handleSaveProduct = (productData, productId) => {
    if (productId) {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.id === productId
            ? { ...product, ...productData }
            : product
        )
      );
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: Date.now(),
        category: productData.category || 'Fast Food',
        isAvailable: true,
      };
      setProducts([...products, newProduct]);
    }
  };

  const handleEditProduct = (product) => {
    navigation.navigate('EditProduct', {
      product,
      onSave: (productData) => handleSaveProduct(productData, product.id),
    });
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
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
        <Text style={styles.headerTitle}>Products / Menu</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Category Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}
        style={styles.categoryScrollView}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products List */}
      <ScrollView
        style={styles.productsScrollView}
        contentContainerStyle={styles.productsContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredProducts.length === 0 ? (
          <View style={styles.emptyState}>
            <Feather name="package" size={64} color="#CCCCCC" />
            <Text style={styles.emptyStateText}>No products found</Text>
            <Text style={styles.emptyStateSubtext}>
              Add your first product to get started
            </Text>
          </View>
        ) : (
          filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              activeOpacity={0.7}
              onPress={() => handleEditProduct(product)}
            >
              {/* Product Image */}
              <View style={styles.productImageContainer}>
                {product.photo ? (
                  <Image
                    source={{ uri: product.photo.uri }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.productImagePlaceholder}>
                    <Feather name="image" size={24} color="#CCCCCC" />
                  </View>
                )}
              </View>

              {/* Product Info */}
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
              </View>

              {/* Toggle Switch */}
              <Switch
                value={product.isAvailable}
                onValueChange={() => handleToggleAvailability(product.id)}
                trackColor={{ false: '#E5E5E5', true: '#4F7942' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E5E5E5"
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          navigation.navigate('EditProduct', {
            onSave: (productData) => handleSaveProduct(productData),
          });
        }}
        activeOpacity={0.8}
      >
        <Feather name="plus" size={28} color="#FFFFFF" />
      </TouchableOpacity>
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
  categoryScrollView: {
    maxHeight: 60,
  },
  categoryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  categoryButtonActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#4F7942',
    borderWidth: 2,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  categoryButtonTextActive: {
    color: '#4F7942',
    fontWeight: '400',
  },
  productsScrollView: {
    flex: 1,
  },
  productsContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginTop: 8,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4F7942',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
