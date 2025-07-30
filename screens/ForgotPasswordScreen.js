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
  const [newPassword, setNewPassword] = useState('');
  const [confirmVisible, setConfirmVisible] = useState(false);

  const checkEmailExists = async () => {
    const storedUsers = await AsyncStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const userExists = users.find(u => u.email === email);

    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    if (!userExists) {
      Alert.alert('Not Found', 'This email is not registered.');
    } else {
      setConfirmVisible(true);  
    }
  };

  const updatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
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

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          {!confirmVisible && (
            <TouchableOpacity style={styles.button} onPress={checkEmailExists}>
              <Text style={styles.buttonText}>Check Email</Text>
            </TouchableOpacity>
          )}

          {confirmVisible && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
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

  linkText: {
    color: '#1F41BB',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },

});

export default ForgotPasswordScreen;
