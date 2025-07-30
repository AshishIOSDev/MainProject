import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
      if (!email) {
        Alert.alert('Error', 'Email is required');
        return false;
      }
      
      if (!/\S+@\S+\.\S+/.test(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return false;
      }
  
      if (!password) {
        Alert.alert('Error', 'Password is required');
        return false;
      }
      
      if (password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters');
        return false;
      }

      if (!confirmPassword) {
        Alert.alert('Error', 'Password is required');
        return false;
      }
      
      if (confirmPassword.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters');
        return false;
      }
  
     if (confirmPassword !== password){
        Alert.alert('Error', 'Enter same password as before')
        return false;
      }
      
      return true;
    };
  

const handleSubmit = async () => {
  if (validateForm()) {
    const existing = await AsyncStorage.getItem('users');
    const users = existing ? JSON.parse(existing) : [];

    const userExists = users.find(u => u.email === email);
    if (userExists) {
      Alert.alert('Error', 'This email is already registered');
      return;
    }

    // Store email/password temporarily in navigation state
    navigation.navigate('UserDetails', {
      email,
      password,
    });
  }
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

        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.heading}>Create Account</Text>
            <Text style={styles.textHeading}>
              Create an account so you can explore all the existing jobs
            </Text>

            <View style={styles.verticalStack}>
              <TextInput
                style={styles.CustomTextInput}
                placeholderTextColor="black"
                keyboardType= 'email-address'
                placeholder="Email"
                value={email}
                // onChangeText={text => setEmail(text)}
                onChangeText={setEmail}
              />
              {errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <TextInput
                style={styles.CustomTextInput}
                placeholderTextColor="black"
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
              />
              {errors.password && <Text style={styles.error}>{errors.password}</Text>}


              <TextInput
                style={styles.CustomTextInput}
                placeholderTextColor="black"
                placeholder="Confirm password"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
              />
              {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Sign up</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.createText}>Already have an account</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.verticalStack}>
              <Text style={styles.continueText}>Or continue with</Text>

              <View style={styles.horizontalView}>
                <Image
                  source={require('/Users/ie14/Projects/MyApp/React-Native/Training/MainProject/assets/images/google.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Image
                  source={require('/Users/ie14/Projects/MyApp/React-Native/Training/MainProject/assets/images/facebook.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Image
                  source={require('/Users/ie14/Projects/MyApp/React-Native/Training/MainProject/assets/images/apple.png')}
                  style={styles.icon}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },

  heading: {
    fontSize: 25,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 40,
    color: '#1F41BB',
  },

  backButton: {
    width: 30,
    height: 20,
    marginLeft: 10,
    color: '#1F41BB',
  },

  textHeading: {
    fontSize: 14,
    paddingVertical: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: '60',
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
    marginTop: 20,
    shadowColor: 'midnightblue',
    shadowOpacity: 0.9,
    shadowOffset: 'bottom',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  createText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    paddingTop: 20,
  },

  continueText: {
    color: '#1F41BB',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 40,
  },

  horizontalView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },

  verticalStack: {
    width: '85%',
    alignItems: 'center',
    marginTop: 20,
  },

  CustomTextInput: {
    height: 45,
    width: '100%',
    borderColor: 'midnightblue',
    borderWidth: 1,
    color: 'black',
    fontWeight: '400',
    fontSize: 15,
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: '#F1F4FF',
    tintColor: '#F1F4FF',
    shadowColor: 'midnightblue',
    shadowOpacity: 0.6,
    shadowOffset: 'bottom',
  },

  icon: {
    width: 60,
    height: 60,
    color: 'black',
    shadowColor: 'midnightblue',
    shadowOpacity: 0.2,
  },
});

export default SignupScreen;
