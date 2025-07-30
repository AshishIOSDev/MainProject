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

const SignupDetailsScreen = ({ route, navigation }) => {
  const { email, password } = route.params;

  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [pin, setPin] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [age, setAge] = useState('');
  const [skill, setSkill] = useState('');

  const handleFinalSubmit = async () => {
    if (
      !mobile ||
      !name ||
      !address ||
      !state ||
      !city ||
      !pin ||
      !gender ||
      !education ||
      !age ||
      !skill
    ) {
      Alert.alert('Error', 'Please fill all details');
      return;
    }

    const newUser = {
      email,
      password,
      mobile,
      name,
      address,
      state,
      city,
      pin,
      gender,
      education,
      age,
      skill,
    };

    const existing = await AsyncStorage.getItem('users');
    const users = existing ? JSON.parse(existing) : [];

    users.push(newUser);
    await AsyncStorage.setItem('users', JSON.stringify(users));
    await AsyncStorage.setItem('userEmail', email);
    await AsyncStorage.setItem('userPassword', password);

    navigation.replace('HomeScreen');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Complete Your Profile</Text>

          <TextInput
            placeholder="Mobile"
            placeholderTextColor= 'black'
            style={styles.input}
            onChangeText={setMobile}
            value={mobile}
          />
          <TextInput
            placeholder="Name"
            placeholderTextColor= 'black'
            style={styles.input}
            onChangeText={setName}
            value={name}
          />
          <TextInput
            placeholder="Address"
            placeholderTextColor= 'black'
            style={styles.input}
            onChangeText={setAddress}
            value={address}
          />
          <TextInput
            placeholder="State"
            placeholderTextColor= 'black'
            style={styles.input}
            onChangeText={setState}
            value={state}
          />
          <TextInput
            placeholder="City"
            placeholderTextColor= 'black'
            style={styles.input}
            onChangeText={setCity}
            value={city}
          />
          <TextInput
            placeholder="Pin Code"
            placeholderTextColor= 'black'
            style={styles.input}
            onChangeText={setPin}
            value={pin}
          />
          <TextInput
            placeholder="Gender"
            placeholderTextColor= 'black'
            style={styles.input}
            onChangeText={setGender}
            value={gender}
          />
          <TextInput
            placeholder="Education"
            placeholderTextColor= 'black'
            style={styles.input}
            onChangeText={setEducation}
            value={education}
          />
          <TextInput
            placeholder="Age"
            placeholderTextColor= 'black'
            style={styles.input}
            onChangeText={setAge}
            value={age}
            keyboardType="number-pad"
          />
          <TextInput
            placeholder="Skill"
            placeholderTextColor= 'black'
            style={styles.input}
            onChangeText={setSkill}
            value={skill}
          />

          <TouchableOpacity style={styles.button} onPress={handleFinalSubmit}>
            <Text style={styles.buttonText}>Submit & Register</Text>
          </TouchableOpacity>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F41BB',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'midnightblue',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#F1F4FF',
  },
  button: {
    backgroundColor: '#1F41BB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  
  buttonText: { 
    color: '#fff',
     fontSize: 16,
      fontWeight: 'bold' 
    },
});

export default SignupDetailsScreen;
