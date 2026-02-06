import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function CustomerSearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches] = useState(['Pizza', 'Burger', 'Sushi', 'Coffee']);
  const [popularSearches] = useState([
    'Chicken Wings',
    'Pasta',
    'Salad',
    'Ice Cream',
    'Smoothie',
    'Sandwich',
  ]);
  const [categories] = useState([
    { name: 'Groceries', icon: 'shopping-bag', iconLib: 'Feather' },
    { name: 'Pharmacy', icon: 'heart', iconLib: 'Feather' },
    { name: 'Restaurant', icon: 'coffee', iconLib: 'Feather' },
    { name: 'Fast Food', icon: 'restaurant', iconLib: 'Ionicons' },
    { name: 'Beverages', icon: 'droplet', iconLib: 'Feather' },
    { name: 'Health & Beauty', icon: 'smile', iconLib: 'Feather' },
  ]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // TODO: Implement search functionality
  };

  const clearSearch = () => {
    setSearchQuery('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      {/* Header with Search Bar */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#999999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for restaurants, dishes..."
              placeholderTextColor="#999999"
              value={searchQuery}
              onChangeText={handleSearch}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Feather name="x" size={20} color="#999999" />
              </TouchableOpacity>
            )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        scrollEventThrottle={16}
      >
          {searchQuery.length === 0 ? (
            <>
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Recent Searches</Text>
                    <TouchableOpacity>
                      <Text style={styles.clearAllText}>Clear All</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.chipsContainer}>
                    {recentSearches.map((search, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.chip}
                        onPress={() => handleSearch(search)}
                        activeOpacity={0.7}
                      >
                        <Feather name="clock" size={14} color="#666666" />
                        <Text style={styles.chipText}>{search}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              {/* Popular Searches */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Popular Searches</Text>
                <View style={styles.chipsContainer}>
                  {popularSearches.map((search, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.chip}
                      onPress={() => handleSearch(search)}
                      activeOpacity={0.7}
                    >
                      <Feather name="trending-up" size={14} color="#4F7942" />
                      <Text style={styles.chipText}>{search}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Browse Categories */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Browse Categories</Text>
                <View style={styles.categoriesGrid}>
                  {categories.map((category, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.categoryCard}
                      activeOpacity={0.7}
                    >
                      <View style={styles.categoryIconContainer}>
                        {category.iconLib === 'Ionicons' ? (
                          <Ionicons name={category.icon} size={24} color="#4F7942" />
                        ) : (
                          <Feather name={category.icon} size={24} color="#4F7942" />
                        )}
                      </View>
                      <Text style={styles.categoryName}>{category.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </>
          ) : (
            /* Search Results */
            <View style={styles.section}>
              <Text style={styles.resultsText}>
                Search results for "{searchQuery}"
              </Text>
              {/* TODO: Add actual search results here */}
              <View style={styles.noResultsContainer}>
                <Feather name="search" size={48} color="#CCCCCC" />
                <Text style={styles.noResultsText}>No results found</Text>
                <Text style={styles.noResultsSubtext}>
                  Try searching with different keywords
                </Text>
              </View>
            </View>
          )}

          {/* Bottom Spacing for Navigation Bar */}
          <View style={styles.bottomSpacing} />
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
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  searchContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
  },
  clearButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
    marginBottom: 16,
  },
  clearAllText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4F7942',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    gap: 6,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
  },
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 16,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
    marginTop: 16,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  bottomSpacing: {
    height: 100,
  },
});
