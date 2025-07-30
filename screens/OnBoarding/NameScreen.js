import React, { useState } from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const NameScreen = ({ navigation }) => {
  const [name, setName] = useState('');

const isValidName = () => {
if (!name) {
    Alert.alert('Please enter your name')
} else {
     navigation.navigate("BirthdayScreen")
    }
};

  return (
    <SafeAreaProvider>
      <ScrollView>
         <SafeAreaView>
        <View style={styles.verticalStack}>
          <Text style={styles.heading}>Your Name</Text>
          <Text style={styles.textHeading}>Please Enter Your Name</Text>

          <Image
            source={require('/Users/ie14/Projects/MyApp/React-Native/Training/MainProject/assets/images/web-surfing.jpg')}
            style={styles.image}
          />

            <TextInput
              style={styles.CustomTextInput}
              placeholderTextColor="black"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />

          <TouchableOpacity 
          style={styles.buttonStyle}
          onPress={isValidName}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({

  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 30,
  },

  heading: {
    fontSize: 28,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 40,
    color: '#1F41BB',
  },

  textHeading: {
    fontSize: 18,
    paddingVertical: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Medium',
  },

  buttonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#1F41BB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    shadowColor: 'midnightblue',
    shadowOpacity: 0.9,
    shadowOffset: 'bottom',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  verticalStack: {
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },

  CustomTextInput: {
    height: 45,
    width: '100%',
    borderColor: 'midnightblue',
    borderWidth: 1,
    color: 'black',
    fontSize: 15,
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: '#F1F4FF',
    tintColor: '#F1F4FF',
    shadowColor: 'midnightblue',
    shadowOpacity: 0.9,
    shadowOffset: 'bottom',
  },
});

export default NameScreen;
