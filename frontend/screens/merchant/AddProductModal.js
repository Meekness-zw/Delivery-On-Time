import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { pickImageWithOptions } from '../../utils/imagePicker';

export default function AddProductModal({ visible, onClose, onSave }) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Fast Food');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [preparationTime, setPreparationTime] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [productPhoto, setProductPhoto] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const categories = [
    'Fast Food',
    'Groceries',
    'Pharmacy',
    'Others',
  ];

  const handleUploadPhoto = async () => {
    const image = await pickImageWithOptions({
      aspect: [1, 1], // Square for product images
      quality: 0.8,
    });
    if (image) {
      setProductPhoto(image);
    }
  };

  const handleSave = () => {
    if (!productName.trim() || !price.trim()) {
      // Show error - name and price are required
      return;
    }

    const productData = {
      name: productName,
      category,
      price: parseFloat(price) || 0,
      description,
      preparationTime,
      ingredients,
      isAvailable,
      photo: productPhoto,
    };

    onSave(productData);
    
    // Reset form
    setProductName('');
    setCategory('Fast Food');
    setPrice('');
    setDescription('');
    setPreparationTime('');
    setIngredients('');
    setIsAvailable(true);
    setProductPhoto(null);
    
    onClose();
  };

  const formatPrice = (text) => {
    // Remove any non-numeric characters except decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    // Ensure only one decimal point
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      return parts[0] + '.' + parts.slice(1).join('');
    }
    return cleaned;
  };

  return (
    <>
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={onClose}
          />
          <View style={styles.modalContent} pointerEvents="box-none">
            <View pointerEvents="auto">
            {/* Drag Handle */}
            <View style={styles.dragHandle} />

            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Product</Text>
              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                <Feather name="x" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {/* Product Name */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Product Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter product name"
                  placeholderTextColor="#999999"
                  value={productName}
                  onChangeText={setProductName}
                  autoCapitalize="words"
                />
              </View>

              {/* Category */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Category</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowCategoryModal(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.inputText}>{category}</Text>
                  <Feather name="chevron-down" size={20} color="#999999" />
                </TouchableOpacity>
              </View>

              {/* Price */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Price</Text>
                <View style={styles.priceInputContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.priceInput}
                    placeholder="0.00"
                    placeholderTextColor="#999999"
                    value={price}
                    onChangeText={(text) => setPrice(formatPrice(text))}
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>

              {/* Product Photo */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Product Photo</Text>
                <TouchableOpacity
                  style={[styles.photoUploadArea, productPhoto && styles.photoUploadAreaFilled]}
                  onPress={handleUploadPhoto}
                  activeOpacity={0.7}
                >
                  {productPhoto ? (
                    <View style={styles.photoUploadedContent}>
                      <Image
                        source={{ uri: productPhoto.uri }}
                        style={styles.photoPreview}
                        resizeMode="cover"
                      />
                      <View style={styles.photoOverlay}>
                        <Feather name="camera" size={20} color="#FFFFFF" />
                      </View>
                    </View>
                  ) : (
                    <>
                      <View style={styles.cameraIconContainer}>
                        <Feather name="camera" size={32} color="#999999" />
                        <View style={styles.plusIcon}>
                          <Feather name="plus" size={16} color="#FFFFFF" />
                        </View>
                      </View>
                      <Text style={styles.uploadText}>Upload</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              {/* Description */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Type in description of product...."
                  placeholderTextColor="#999999"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              {/* Preparation Time */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Preparation Time (minutes)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 15"
                  placeholderTextColor="#999999"
                  value={preparationTime}
                  onChangeText={setPreparationTime}
                  keyboardType="number-pad"
                />
              </View>

              {/* Ingredients */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Ingredients (Optional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="List ingredients separated by commas"
                  placeholderTextColor="#999999"
                  value={ingredients}
                  onChangeText={setIngredients}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>

              {/* Availability Toggle */}
              <View style={styles.inputContainer}>
                <View style={styles.availabilityRow}>
                  <View>
                    <Text style={styles.label}>Available</Text>
                    <Text style={styles.availabilitySubtext}>Product will be visible to customers</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.toggle, isAvailable && styles.toggleActive]}
                    onPress={() => setIsAvailable(!isAvailable)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.toggleCircle, isAvailable && styles.toggleCircleActive]} />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, (!productName.trim() || !price.trim()) && styles.saveButtonDisabled]}
                onPress={handleSave}
                disabled={!productName.trim() || !price.trim()}
                activeOpacity={0.8}
              >
                <Text style={styles.saveButtonText}>Save Product</Text>
              </TouchableOpacity>
            </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Category Selection Modal */}
      <Modal
        visible={showCategoryModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.categoryModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
                <Feather name="x" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.categoryList}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryOption,
                    category === cat && styles.categoryOptionSelected,
                  ]}
                  onPress={() => {
                    setCategory(cat);
                    setShowCategoryModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.categoryOptionText,
                      category === cat && styles.categoryOptionTextSelected,
                    ]}
                  >
                    {cat}
                  </Text>
                  {category === cat && (
                    <Feather name="check" size={20} color="#4F7942" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    width: '100%',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    width: '100%',
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#CCCCCC',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },
  scrollView: {
    maxHeight: 500,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 16,
    color: '#000000',
    flex: 1,
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
    marginRight: 8,
  },
  priceInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#000000',
  },
  photoUploadArea: {
    backgroundColor: '#FAFAFA',
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
  },
  photoUploadAreaFilled: {
    borderColor: '#4F7942',
    borderStyle: 'solid',
    backgroundColor: '#FFFFFF',
  },
  cameraIconContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  plusIcon: {
    position: 'absolute',
    bottom: -4,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4F7942',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#999999',
  },
  photoUploadedContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  photoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  photoUploadedText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4F7942',
    marginTop: 8,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 14,
    paddingBottom: 14,
  },
  availabilityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  availabilitySubtext: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  toggle: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#CCCCCC',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleActive: {
    backgroundColor: '#4F7942',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  toggleCircleActive: {
    transform: [{ translateX: 20 }],
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4F7942',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
  },
  categoryModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingTop: 20,
  },
  categoryList: {
    maxHeight: 400,
  },
  categoryOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryOptionSelected: {
    backgroundColor: '#F0FDF4',
  },
  categoryOptionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  categoryOptionTextSelected: {
    fontWeight: '400',
    color: '#4F7942',
  },
});
