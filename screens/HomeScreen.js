import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      const storedUsers = await AsyncStorage.getItem('users');
      setUsers(storedUsers ? JSON.parse(storedUsers) : []);
    };

    const unsubscribe = navigation.addListener('focus', loadUsers);
    return unsubscribe;
  }, [navigation]);

  const toggleExpand = index => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  
  const handleDeleteUser = async indexToRemove => {
    const storedUsers = await AsyncStorage.getItem('users');
    let updated = storedUsers ? JSON.parse(storedUsers) : [];
    updated.splice(indexToRemove, 1);
    await AsyncStorage.setItem('users', JSON.stringify(updated));
    setUsers(updated);
    Alert.alert('User deleted successfully');
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.userCard}>
      <TouchableOpacity onPress={() => toggleExpand(index)}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
      </TouchableOpacity>

      {expandedIndex === index && (
        <View style={styles.userDetails}>
          <Text style={styles.userDetail}>Mobile: {item.mobile}</Text>
          <Text style={styles.userDetail}>Address: {item.address}</Text>
          <Text style={styles.userDetail}>State: {item.state}</Text>
          <Text style={styles.userDetail}>City: {item.city}</Text>
          <Text style={styles.userDetail}>Pin: {item.pin}</Text>
          <Text style={styles.userDetail}>Gender: {item.gender}</Text>
          <Text style={styles.userDetail}>Education: {item.education}</Text>
          <Text style={styles.userDetail}>Age: {item.age}</Text>
          <Text style={styles.userDetail}>Skill: {item.skill}</Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserDetails', { user: item, index })
            }
            style={[styles.deleteButton, { backgroundColor: '#1F41BB' }]}
          >
            <Text style={styles.deleteText}>Edit User</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleDeleteUser(index)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteText}>Delete User</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaProvider>
      <ImageBackground
        // source={{
        //   uri: 'https://w0.peakpx.com/wallpaper/479/900/HD-wallpaper-gradient-purple-blue-gradient-thumbnail.jpg',
        // }}
        source={{uri: 'https://e1.pxfuel.com/desktop-wallpaper/445/615/desktop-wallpaper-papers-co-iphone-blur.jpg'}} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <FlatList
            data={users}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  userCard: {
    backgroundColor: '#f1f4ff1f',
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowOffset: 'bottom',
    shadowOpacity: 0.9,
    shadowColor: 'midnightblue',
    tintColor: '#F1F4FF',
    borderColor: 'midnightblue',
  },

  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  userEmail: {
    fontSize: 17,
    color: '#f5b20bff',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  userDetails: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 10,
    paddingTop: 10,
  },

  userDetail: {
    fontSize: 15,
    color: 'white',
    marginBottom: 5,
  },

  buttonStyle: {
    width: 120,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    margin: 10,
    shadowColor: 'midnightblue',
    shadowOpacity: 0.9,
    shadowOffset: 'bottom',
    alignSelf: 'flex-end',
  },

  buttonText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
  },

  deleteButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',

    borderRadius: 8,
    alignItems: 'center',
  },

  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
  },
});

export default HomeScreen;
