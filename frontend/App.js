import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './context/AuthContext';
import SplashScreen from './screens/SplashScreen';
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import AuthScreen from './screens/AuthScreen';
import VerificationScreen from './screens/customer/VerificationScreen';
import CustomerMainScreen from './screens/customer/CustomerMainScreen';
import WalletScreen from './screens/customer/WalletScreen';
import CheckoutScreen from './screens/customer/CheckoutScreen';
import OrderConfirmedScreen from './screens/customer/OrderConfirmedScreen';
import RestaurantMenuScreen from './screens/customer/RestaurantMenuScreen';
import LiveTrackingScreen from './screens/customer/LiveTrackingScreen';
import PaymentMethodsScreen from './screens/customer/PaymentMethodsScreen';
import SavedAddressScreen from './screens/customer/SavedAddressScreen';
import OrderHistoryScreen from './screens/customer/OrderHistoryScreen';
import FavoritesScreen from './screens/customer/FavoritesScreen';
import ReceiptsScreen from './screens/customer/ReceiptsScreen';
import HelpSupportScreen from './screens/customer/HelpSupportScreen';
import AboutScreen from './screens/customer/AboutScreen';
import EditProfileScreen from './screens/customer/EditProfileScreen';
import CourierHomeScreen from './screens/courier/CourierHomeScreen';
import CourierVehicleRegistrationScreen from './screens/courier/CourierVehicleRegistrationScreen';
import CourierProfileRegistrationScreen from './screens/courier/CourierProfileRegistrationScreen';
import CourierDriverLicenseScreen from './screens/courier/CourierDriverLicenseScreen';
import CourierPayoutMethodScreen from './screens/courier/CourierPayoutMethodScreen';
import CourierAccountVerificationScreen from './screens/courier/CourierAccountVerificationScreen';
import CourierHelpSupportScreen from './screens/courier/CourierHelpSupportScreen';
import CourierPerformanceScreen from './screens/courier/CourierPerformanceScreen';
import CourierWalletScreen from './screens/courier/CourierWalletScreen';
import CourierDocumentsScreen from './screens/courier/CourierDocumentsScreen';
import CourierNotificationsScreen from './screens/courier/CourierNotificationsScreen';
import CourierSettingsScreen from './screens/courier/CourierSettingsScreen';
import CourierAccountDetailsScreen from './screens/courier/CourierAccountDetailsScreen';
import CourierVehicleInformationScreen from './screens/courier/CourierVehicleInformationScreen';
import CourierActiveOrderScreen from './screens/courier/CourierActiveOrderScreen';
import CourierPickupScreen from './screens/courier/CourierPickupScreen';
import MerchantHomeScreen from './screens/merchant/MerchantHomeScreen';
import MerchantOnboardingScreen from './screens/merchant/MerchantOnboardingScreen';
import BusinessTypeScreen from './screens/merchant/BusinessTypeScreen';
import BusinessInformationScreen from './screens/merchant/BusinessInformationScreen';
import StoreLocationScreen from './screens/merchant/StoreLocationScreen';
import UploadBusinessDocumentsScreen from './screens/merchant/UploadBusinessDocumentsScreen';
import StoreDetailsScreen from './screens/merchant/StoreDetailsScreen';
import AddProductsScreen from './screens/merchant/AddProductsScreen';
import CourierAcceptedScreen from './screens/merchant/CourierAcceptedScreen';
import MerchantOrderHistoryScreen from './screens/merchant/MerchantOrderHistoryScreen';
import MerchantWalletScreen from './screens/merchant/MerchantWalletScreen';
import MerchantMoreScreen from './screens/merchant/MerchantMoreScreen';
import BusinessProfileScreen from './screens/merchant/BusinessProfileScreen';
import MerchantSettingsScreen from './screens/merchant/MerchantSettingsScreen';
import MenuManagementScreen from './screens/merchant/MenuManagementScreen';
import EditProductScreen from './screens/merchant/EditProductScreen';
import MerchantHelpSupportScreen from './screens/merchant/MerchantHelpSupportScreen';

const Stack = createNativeStackNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0F172A',
    card: '#020617',
    text: '#F9FAFB',
    border: '#1F2937',
  },
};

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar barStyle="light-content" />
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerTintColor: '#F9FAFB',
          }}
        >
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RoleSelection"
            options={{ headerShown: false }}
          >
            {({ navigation }) => (
              <RoleSelectionScreen
                onSelectRole={(role) => {
                  navigation.navigate('Auth', { role });
                }}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Verification"
            component={VerificationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierVehicleRegistration"
            component={CourierVehicleRegistrationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierProfileRegistration"
            component={CourierProfileRegistrationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierDriverLicense"
            component={CourierDriverLicenseScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierPayoutMethod"
            component={CourierPayoutMethodScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierAccountVerification"
            component={CourierAccountVerificationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierHelpSupport"
            component={CourierHelpSupportScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierPerformance"
            component={CourierPerformanceScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierWallet"
            component={CourierWalletScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierDocuments"
            component={CourierDocumentsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierNotifications"
            component={CourierNotificationsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierSettings"
            component={CourierSettingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierAccountDetails"
            component={CourierAccountDetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierVehicleInformation"
            component={CourierVehicleInformationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierActiveOrder"
            component={CourierActiveOrderScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierPickup"
            component={CourierPickupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CustomerMain"
            component={CustomerMainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Wallet"
            component={WalletScreen}
            options={{ 
              headerShown: false,
              animation: 'none',
            }}
          />
          <Stack.Screen
            name="Checkout"
            component={CheckoutScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderConfirmed"
            component={OrderConfirmedScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LiveTracking"
            component={LiveTrackingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RestaurantMenu"
            component={RestaurantMenuScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentMethods"
            component={PaymentMethodsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SavedAddress"
            component={SavedAddressScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderHistory"
            component={OrderHistoryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Receipts"
            component={ReceiptsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HelpSupport"
            component={HelpSupportScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="About"
            component={AboutScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierHome"
            component={CourierHomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MerchantHome"
            component={MerchantHomeScreen}
            options={{ 
              headerShown: false,
              animation: 'none',
            }}
          />
          <Stack.Screen
            name="MerchantOnboarding"
            component={MerchantOnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BusinessType"
            component={BusinessTypeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BusinessInformation"
            component={BusinessInformationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StoreLocation"
            component={StoreLocationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UploadBusinessDocuments"
            component={UploadBusinessDocumentsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StoreDetails"
            component={StoreDetailsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddProducts"
            component={AddProductsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CourierAccepted"
            component={CourierAcceptedScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MerchantOrderHistory"
            component={MerchantOrderHistoryScreen}
            options={{ 
              headerShown: false,
              animation: 'none',
            }}
          />
          <Stack.Screen
            name="MerchantWallet"
            component={MerchantWalletScreen}
            options={{ 
              headerShown: false,
              animation: 'none',
            }}
          />
          <Stack.Screen
            name="MerchantMore"
            component={MerchantMoreScreen}
            options={{ 
              headerShown: false,
              animation: 'none',
            }}
          />
          <Stack.Screen
            name="BusinessProfile"
            component={BusinessProfileScreen}
            options={{ 
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MerchantSettings"
            component={MerchantSettingsScreen}
            options={{ 
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MenuManagement"
            component={MenuManagementScreen}
            options={{ 
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EditProduct"
            component={EditProductScreen}
            options={{ 
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="MerchantHelpSupport"
            component={MerchantHelpSupportScreen}
            options={{ 
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#020617',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '400',
  },
});
