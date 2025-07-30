import React, { useState } from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserDetailsScreen = ({ route, navigation }) => {
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
  const [errors, setErrors] = useState({});

  const handleFinalSubmit = async () => {
    let newErrors = {};

    if (!mobile) newErrors.mobile = 'Mobile is required';
    if (!name) newErrors.name = 'Name is required';
    if (!address) newErrors.address = 'Address is required';
    if (!state) newErrors.state = 'State is required';
    if (!city) newErrors.city = 'City is required';
    if (!pin) newErrors.pin = 'Pin Code is required';
    if (!gender) newErrors.gender = 'Gender is required';
    if (!education) newErrors.education = 'Education is required';
    if (!age) newErrors.age = 'Age is required';
    if (!skill) newErrors.skill = 'Skill is required';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

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

  const renderInput = (label, value, setter, fieldName, keyboardType = 'default') => (
    <View>
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        placeholderTextColor="black"
        style={styles.input}
        value={value}
        onChangeText={(text) => {
          setter(text);
          setErrors((prev) => ({ ...prev, [fieldName]: '' }));
        }}
      />
      {errors[fieldName] ? <Text style={styles.error}>{errors[fieldName]}</Text> : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderInput('Mobile', mobile, setMobile, 'mobile', 'number-pad')}
        {renderInput('Name', name, setName, 'name')}
        {renderInput('Address', address, setAddress, 'address')}
        {renderInput('State', state, setState, 'state')}
        {renderInput('City', city, setCity, 'city')}
        {renderInput('Pin Code', pin, setPin, 'pin', 'number-pad')}
        {renderInput('Gender', gender, setGender, 'gender')}
        {renderInput('Education', education, setEducation, 'education')}
        {renderInput('Age', age, setAge, 'age', 'number-pad')}
        {renderInput('Skill', skill, setSkill, 'skill')}

        <TouchableOpacity style={styles.button} onPress={handleFinalSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: 'black',
    borderColor: 'midnightblue',
    fontSize: 15,
    marginVertical: 10,
    paddingLeft: 10,
    backgroundColor: '#F1F4FF',
    tintColor: '#F1F4FF',
    shadowColor: 'midnightblue',
    shadowOpacity: 0.9,
    shadowOffset: 'bottom',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 4,
    fontSize: 13,
  },
});

export default UserDetailsScreen;