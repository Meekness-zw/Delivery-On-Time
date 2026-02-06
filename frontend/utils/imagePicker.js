import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Alert, Platform } from 'react-native';

/**
 * Request camera and media library permissions
 */
export const requestPermissions = async () => {
  if (Platform.OS !== 'web') {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
      Alert.alert(
        'Permission Required',
        'Sorry, we need camera and media library permissions to upload images!',
        [{ text: 'OK' }]
      );
      return false;
    }
  }
  return true;
};

/**
 * Pick an image from the library or camera with cropping
 * @param {Object} options - Configuration options
 * @param {boolean} options.allowsEditing - Enable cropping (default: true)
 * @param {number} options.aspect - Aspect ratio for cropping [width, height] (default: [1, 1] for square)
 * @param {string} options.source - 'library' or 'camera' (default: 'library')
 * @param {number} options.quality - Image quality 0-1 (default: 0.8)
 * @param {number} options.maxWidth - Maximum width after manipulation (default: 800)
 * @param {number} options.maxHeight - Maximum height after manipulation (default: 800)
 * @returns {Promise<Object|null>} Image object with uri, width, height, or null if cancelled
 */
export const pickImage = async (options = {}) => {
  const {
    allowsEditing = true,
    aspect = [1, 1],
    source = 'library',
    quality = 0.8,
    maxWidth = 800,
    maxHeight = 800,
  } = options;

  // Request permissions
  const hasPermission = await requestPermissions();
  if (!hasPermission) {
    return null;
  }

  try {
    let result;

    // Pick image from library or camera
    if (source === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing,
        aspect,
        quality,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing,
        aspect,
        quality,
      });
    }

    if (result.canceled) {
      return null;
    }

    const image = result.assets[0];

    // If cropping was enabled, the image is already cropped
    // But we'll still resize it if needed
    let manipulatedImage = image;

    // Resize if image is too large
    if (image.width > maxWidth || image.height > maxHeight) {
      const resizeOptions = {
        uri: image.uri,
        compress: quality,
      };

      // Calculate new dimensions maintaining aspect ratio
      const aspectRatio = image.width / image.height;
      let newWidth = image.width;
      let newHeight = image.height;

      if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = newWidth / aspectRatio;
      }
      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = newHeight * aspectRatio;
      }

      resizeOptions.width = Math.round(newWidth);
      resizeOptions.height = Math.round(newHeight);

      const resizeResult = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ resize: { width: resizeOptions.width, height: resizeOptions.height } }],
        { compress: quality, format: ImageManipulator.SaveFormat.JPEG }
      );

      manipulatedImage = resizeResult;
    }

    return {
      uri: manipulatedImage.uri,
      width: manipulatedImage.width || image.width,
      height: manipulatedImage.height || image.height,
      type: 'image/jpeg',
      name: `image_${Date.now()}.jpg`,
    };
  } catch (error) {
    console.error('Error picking image:', error);
    Alert.alert('Error', 'Failed to pick image. Please try again.');
    return null;
  }
};

/**
 * Show action sheet to choose between camera and library
 * @param {Object} options - Same options as pickImage
 * @returns {Promise<Object|null>} Image object or null
 */
export const pickImageWithOptions = async (options = {}) => {
  return new Promise((resolve) => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: async () => {
            const result = await pickImage({ ...options, source: 'camera' });
            resolve(result);
          },
        },
        {
          text: 'Photo Library',
          onPress: async () => {
            const result = await pickImage({ ...options, source: 'library' });
            resolve(result);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => resolve(null),
        },
      ],
      { cancelable: true, onDismiss: () => resolve(null) }
    );
  });
};

/**
 * Crop an existing image
 * @param {string} uri - Image URI
 * @param {Object} cropOptions - Crop options
 * @param {Array<number>} cropOptions.aspect - Aspect ratio [width, height]
 * @param {number} cropOptions.quality - Image quality 0-1
 * @returns {Promise<Object|null>} Cropped image object or null
 */
export const cropImage = async (uri, cropOptions = {}) => {
  const { aspect = [1, 1], quality = 0.8 } = cropOptions;

  try {
    // First, we need to let user pick and crop
    // Since ImageManipulator doesn't have interactive cropping,
    // we'll use ImagePicker's built-in cropping
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect,
      quality,
    });

    if (result.canceled) {
      return null;
    }

    const image = result.assets[0];
    return {
      uri: image.uri,
      width: image.width,
      height: image.height,
      type: 'image/jpeg',
      name: `cropped_${Date.now()}.jpg`,
    };
  } catch (error) {
    console.error('Error cropping image:', error);
    Alert.alert('Error', 'Failed to crop image. Please try again.');
    return null;
  }
};
