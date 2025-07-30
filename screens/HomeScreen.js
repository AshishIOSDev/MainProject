import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
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

  const handleLogout = () => {
    navigation.replace('Welcome');
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
            style={[
              styles.deleteButton,
              { backgroundColor: '#1F41BB', marginBottom: 10 },
            ]}
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
      <SafeAreaView>
        <TouchableOpacity onPress={handleLogout} style={styles.buttonStyle}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>

        <FlatList
          data={users}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          // contentContainerStyle={{ paddingBottom: 100 }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: '#F1F4FF',
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F41BB',
  },

  userEmail: {
    fontSize: 19,
    color: '#555',
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
    color: 'black',
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
