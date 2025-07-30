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
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserDetailsScreen = ({ route, navigation }) => {
  // const { email, password } = route.params;
  const { email, password, user, index } = route.params || {};

  const [mobile, setMobile] = useState(user?.mobile || '');
  const [name, setName] = useState(user?.name || '');
  const [address, setAddress] = useState(user?.address || '');
  const [state, setState] = useState(user?.state || '');
  const [city, setCity] = useState(user?.city || '');
  const [pin, setPin] = useState(user?.pin || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [education, setEducation] = useState(user?.education || '');
  const [age, setAge] = useState(user?.age || '');
  const [skill, setSkill] = useState(user?.skill || '');
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
      email: user?.email || email,
      password: user?.password || password,
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

    if (typeof index === 'number') {
      // Update existing user
      users[index] = newUser;
    } else {
      // Add new user
      users.push(newUser);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPassword', password);
    }

    await AsyncStorage.setItem('users', JSON.stringify(users));
    navigation.replace('HomeScreen');
  };

  const renderInput = (
    label,
    value,
    setter,
    fieldName,
    keyboardType = 'default',
  ) => (
    <View>
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        placeholderTextColor="black"
        style={styles.input}
        value={value}
        onChangeText={text => {
          setter(text);
          setErrors(prev => ({ ...prev, [fieldName]: '' }));
        }}
      />
      {errors[fieldName] ? (
        <Text style={styles.error}>{errors[fieldName]}</Text>
      ) : null}
    </View>
  );

  return (
    <SafeAreaProvider>

 <SafeAreaView style={styles.container}>
      <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack('Signup')}
              >
                <Icon name="arrow-left" size={25} color="#1F41BB" />
              </TouchableOpacity>
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
          <Text style={styles.buttonText}>
            {typeof index === 'number' ? 'Update' : 'Submit'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
    
    </SafeAreaProvider>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

    backButton: {
    width: 30,
    height: 20,
    marginBottom: 30,
    color: '#1F41BB',
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
