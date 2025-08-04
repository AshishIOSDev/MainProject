import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/LoginAndSignUp/LoginScreen';
import SignupScreen from './screens/LoginAndSignUp/SignupScreen';
import ForgotPasswordScreen from './screens/LoginAndSignUp/ForgotPasswordScreen';
import WelcomeScreen from './screens/LoginAndSignUp/WelcomeScreen';
import WalkthroughScreen from './screens/Walkthrough/WalkthroughScreen';
import NameScreen from './screens/OnBoarding/NameScreen';
import BirthdayScreen from './screens/OnBoarding/BirthdayScreen';
import GenderScreen from './screens/OnBoarding/GenderScreen';
import HomeScreen from './screens/HomeScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import PhotoListScreen from './screens/PhotoListScreen';
import ProductDetails from './screens/ProductDetails';
import SettingScreen from './screens/Settings/SettingScreen';
import MediaScreen from './screens/Settings/MediaScreen';
import ProfileScreen from './screens/Settings/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#1F41BB',
      tabBarLabelStyle: { fontWeight: 'bold' },
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Product"
      component={PhotoListScreen}
      options={{
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color, size }) => (
          <Icon name="animation" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingScreen}
      options={{
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({ color, size }) => (
          <Icon name="cog" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const email = await AsyncStorage.getItem('userEmail');
      const password = await AsyncStorage.getItem('userPassword');
      if (email && password) {
        setInitialRoute('MainTabs');
      } else {
        setInitialRoute('WalkthroughScreen');
      }
    };
    checkLogin();
  }, []);

  if (!initialRoute) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="WalkthroughScreen" component={WalkthroughScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
        <Stack.Screen name="Name" component={NameScreen} />
        <Stack.Screen name="GenderScreen" component={GenderScreen} />
        <Stack.Screen name="BirthdayScreen" component={BirthdayScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PhotoListScreen" component={PhotoListScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="MediaScreen" component={MediaScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
