import React from 'react';
import {
  Button,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MediaScreen = ({navigation}) => {
  const [media, setMedia] = React.useState(null);

  const pickMedia = () => {
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
          setMedia(asset);
        }
      },
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={25} color="#1F41BB" />
        </TouchableOpacity>
        <View style={styles.container}>
          <Button title="Open Gallery" onPress={pickMedia} />

          {media && media.type?.startsWith('image') && (
            <Image
              source={{ uri: media.uri }}
              style={{ width: 200, height: 200, marginTop: 20 }}
            />
          )}

          {media && media.type?.startsWith('video') && (
              <Video
                source={{ uri: media.uri }}
                style={styles.video}
                controls
              />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
   container: {
    padding: 20,
    alignItems: 'center',
    paddingTop: 0,
  },
  video: {
    width: '100%',
    height: 300,
    marginTop: 20,
    backgroundColor: 'black',
  },
    backButton: {
    padding: 10,
    marginLeft: 5,
  },
});

export default MediaScreen;
