import React, { useState } from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('email'); // 'email' | 'otp' | 'password'

  const checkEmailExists = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const userExists = users.find(u => u.email === email);

    if (!userExists) {
      Alert.alert('Not Found', 'This email is not registered.');
    } else {
      const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(otpCode);
      Alert.alert('OTP Sent', `Your OTP is: ${otpCode}`);
      setStep('otp');
    }
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      setStep('password');
    } else {
      Alert.alert('Invalid OTP', 'Please enter the correct OTP sent to your email.');
    }
  };

  const updatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Mismatch', 'Passwords do not match');
      return;
    }

    const storedUsers = await AsyncStorage.getItem('users');
    let users = storedUsers ? JSON.parse(storedUsers) : [];

    const index = users.findIndex(u => u.email === email);
    users[index].password = newPassword;

    await AsyncStorage.setItem('users', JSON.stringify(users));
    Alert.alert('Success', 'Password updated successfully');
    navigation.navigate('Login');
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

        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Forgot Password</Text>

          {step === 'email' && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TouchableOpacity style={styles.button} onPress={checkEmailExists}>
                <Text style={styles.buttonText}>Check Email</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 'otp' && (
            <>
              <Text style={{ marginBottom: 10, color: 'gray', textAlign: 'center' }}>
                OTP sent to: {email}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={4}
              />
              <TouchableOpacity style={styles.button} onPress={verifyOtp}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 'password' && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity style={styles.button} onPress={updatePassword}>
                <Text style={styles.buttonText}>Update Password</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    color: '#1F41BB',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'midnightblue',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#F1F4FF',
  },
  button: {
    backgroundColor: '#1F41BB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    width: 30,
    height: 20,
    marginLeft: 10,
    color: '#1F41BB',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
