import React, { useEffect } from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setProfilePicture } from '../store/profileSlice';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const profileImage = useSelector(state => state.profile.profilePicture);

  const PROFILE_DATA = [
    { id: '1', title: 'Phone Number' },
    { id: '2', title: 'Address' },
    { id: '3', title: 'Email' },
  ];

  useEffect(() => {
    (async () => {
      const savedImage = await AsyncStorage.getItem('appProfilePicture');
      if (savedImage) {
        dispatch(setProfilePicture(savedImage));
      }
    })();
  }, [dispatch]);

  const handleImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.8,
      },
      async response => {
        if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          dispatch(setProfilePicture(uri));
          await AsyncStorage.setItem('appProfilePicture', uri);
        }
      },
    );
  };

  const ProfileItem = ({ title }) => (
    <View style={styles.profileItem}>
      <Text style={styles.profileItemText}>{title}</Text>
      <Icon name="chevron-right" size={24} color="#666" />
    </View>
  );

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{
          uri: 'https://e1.pxfuel.com/desktop-wallpaper/445/615/desktop-wallpaper-papers-co-iphone-blur.jpg',
        }}
        style={styles.backgroundImage}
        blurRadius={2}
      >
        <SafeAreaView style={styles.safeAreaContainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Icon name="arrow-left" size={25} color="white" />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>My Profile</Text>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.profilePictureContainer}>
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  style={styles.profileImage}
                />
              ) : (
                <Icon
                  name="account-circle-outline"
                  size={120}
                  color="rgba(255,255,255,0.7)"
                />
              )}
            </View>

            <TouchableOpacity onPress={handleImagePicker} activeOpacity={0.7}>
              <LinearGradient
                colors={['#1F41BB', '#0D2E8A']}
                style={styles.changePictureButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>Change Profile Picture</Text>
                <Icon
                  name="camera"
                  size={18}
                  color="white"
                  style={styles.buttonIcon}
                />
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.profileListContainer}>
              <FlatList
                data={PROFILE_DATA}
                renderItem={({ item }) => <ProfileItem title={item.title} />}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, resizeMode: 'cover' },
  safeAreaContainer: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  contentContainer: { flex: 1, padding: 24, alignItems: 'center' },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: { padding: 8 },
  screenTitle: { color: 'white', fontSize: 20, fontWeight: '600' },
  headerSpacer: { width: 25 },
  profilePictureContainer: {
    height: 140,
    width: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  profileImage: { height: '100%', width: '100%', borderRadius: 70 },
  changePictureButton: {
    height: 44,
    width: 350,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    marginVertical: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
  },
  buttonIcon: { marginLeft: 4 },
  profileListContainer: { width: '100%', marginTop: 32 },
  profileItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 18,
    marginVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileItemText: { fontSize: 18, color: 'white', fontWeight: '500' },
});

export default ProfileScreen;
