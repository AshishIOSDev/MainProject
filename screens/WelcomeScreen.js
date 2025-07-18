import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const WelcomScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('/Users/ie14/Projects/MyApp/React-Native/Training/MainProject/assets/images/welcomeImage.png')}
        style={{ width: '368', height: '422' }}
      />
      <Text style={styles.heading}>Discover Your Dream Job here</Text>
      <Text style={styles.textHeading}>
        Explore all the existing job roles based on your interest and study
        major
      </Text>

      <View style={styles.horizontalView}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigation('Login')}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    multiline: true,
    textAlign: 'center',
    paddingHorizontal: 80,
    color: '#1F41BB',
    fontFamily: 'Poppins',
  },
  textHeading: {
    fontSize: 14,
    marginBottom: 20,
    multiline: true,
    textAlign: 'center',
    paddingHorizontal: 42,
    fontFamily: 'Poppins-Medium',
  },

  buttonStyle: {
    width: '160',
    height: 50,
    backgroundColor: '#1F41BB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: 'midnightblue',
    shadowOpacity: 0.9,
    shadowOffset: 'bottom',
  },

  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' ,shadowColor: 'midnightblue',
    shadowOpacity: 0.9,
    shadowOffset: 'bottom',},
  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
});

export default WelcomScreen;
