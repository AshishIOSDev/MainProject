

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import WalkthroughScreen from './screens/Walkthrough/WalkthroughScreen';
import NameScreen from './screens/OnBoarding/NameScreen';
import BirthdayScreen from './screens/OnBoarding/BirthdayScreen';
import GenderScreen from './screens/OnBoarding/GenderScreen';
import HomeScreen from './screens/HomeScreen';
import UserDetailsScreen from './screens/UserDetailsScreen'

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      const password = await AsyncStorage.getItem('userPassword');
      if (email && password) {
        setInitialRoute('HomeScreen');
      } else {
        setInitialRoute('WalkthroughScreen');
      }
    };
    checkLogin();
  }, []);

  if (!initialRoute) {
    // Loading indicator dikha sakte hain
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName= {initialRoute} screenOptions={{ headerShown:  false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="WalkthroughScreen" component={WalkthroughScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
        <Stack.Screen name="Name" component={NameScreen}/>
        <Stack.Screen name="GenderScreen" component={GenderScreen}/>
        <Stack.Screen name="BirthdayScreen" component={BirthdayScreen}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
