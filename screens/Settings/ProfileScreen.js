import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const OpenImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        selectionLimit: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled picker');
        } else if (response.errorCode) {
          console.log('Error:', response.errorMessage);
        } else {
          const asset = response.assets[0];
          setImage(asset);
        }
      },
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack('Signup')}
        >
          <Icon name="arrow-left" size={25} color="#1F41BB" />
        </TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.image}>
            {image && image.type?.startsWith('image') ? (
              <Image source={{ uri: image.uri }} style={styles.image} />
            ) : (
              <Icon name="account-circle-outline" size={120} color="#ccc" />
            )}
          </View>
          <TouchableOpacity onPress={OpenImagePicker}>
            <LinearGradient
              colors={['#1F41BB', '#5C7CFA']}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>Change Profile Picture</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderColor: 'gray',
    marginBottom: 20,
  },
  backButton: {
    width: 30,
    height: 20,
    marginLeft: 10,
    color: '#1F41BB',
  },

  gradientButton: {
    height: 40,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  imagePicker: {
    height: 40,
    width: 180,
    backgroundColor: '#1F41BB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: '600',
    alignItems: 'center',
  },
});

export default ProfileScreen;
