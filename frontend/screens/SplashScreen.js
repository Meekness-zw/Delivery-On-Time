import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const translateX = useRef(new Animated.Value(-SCREEN_WIDTH)).current;

  useEffect(() => {
    // Animate logo speeding in from the left
    Animated.timing(translateX, {
      toValue: 0,
      duration: 700,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    // Navigate to role selection after 5 seconds
    const timer = setTimeout(() => {
      navigation.replace('RoleSelection');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation, translateX]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Splash Screen .png')}
        style={styles.background}
        resizeMode="cover"
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ translateX }],
            },
          ]}
        >
          <Image
            source={require('../assets/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4F7942',
  },
  background: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignSelf: 'center',
  },
  logo: {
    width: 180,
    height: 80,
  },
});

