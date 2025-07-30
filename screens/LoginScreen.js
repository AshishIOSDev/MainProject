/* eslint-disable react-native/no-inline-styles */
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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const [errors, setErrors] = useState({});


const handleSubmit = async () => {
  if (validateForm()) {
    try {
      const existing = await AsyncStorage.getItem('users');
      const users = existing ? JSON.parse(existing) : [];

      const matchedUser = users.find(
        u => u.email === email && u.password === password
      );

      if (matchedUser) {
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('userPassword', password);
        navigation.replace('HomeScreen');
      } else {
        Alert.alert('Error', 'Invalid credentials');
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  }
};


// useEffect(() => {
//   const fetchData = async () => {
//     const storedEmail = await AsyncStorage.getItem('userEmail');
//     const storedPassword = await AsyncStorage.getItem('userPassword');
//     console.log('Stored Email:', storedEmail);
//     console.log('Stored Password:', storedPassword);
//     // if (storedEmail) setEmail(storedEmail);
//     // if (storedPassword) setPassword(storedPassword);
    
//       setEmail(storedEmail);
//       setPassword(storedPassword); 
//   };

//   fetchData();
// }, []);

const validateForm = () => {
    // Email validation
    if (!email) {
      Alert.alert('Error', 'Email is required');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    // Password validation
    if (!password) {
      Alert.alert('Error', 'Password is required');
      return false;
    }
    
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return false;
    }

    return true;
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
            <Text style={styles.heading}>Login here</Text>
            <Text style={styles.textHeading}>
              Welcome back you’ve been missed!
            </Text>

            <View style={styles.verticalStack}>
              <TextInput
                style={styles.CustomTextInput}
                placeholderTextColor="black"
                placeholder="Email"
                keyboardType= 'email-address'
                value={email}
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

              <View style={{ width: '100%', alignItems: 'flex-end' }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}
                >
                  <Text style={styles.forgotText}>Forgot your password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Sign in</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.createText}>Create new account</Text>
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

    backButton: {
    width: 30,
    height: 20,
    marginLeft: 10,
    color: '#1F41BB',
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

  textHeading: {
    fontSize: 14,
    paddingVertical: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: '120',
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
    paddingTop: 30,
  },

  forgotText: {
    color: '#1F41BB',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
    marginVertical: 20,
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

  icon: {
    width: 60,
    height: 60,
    color: 'black',
    shadowColor: 'midnightblue',
    shadowOpacity: 0.2,
  },
});

export default LoginScreen;
