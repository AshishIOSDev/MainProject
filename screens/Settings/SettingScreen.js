import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DATA = [
  {
    title: 'SETTINGS',
    data: [
      { name: 'Profile', icon: 'account', iconColor: '#1F41BB' },
      { name: 'Media', icon: 'image', iconColor: '#1F41BB' },
      { name: 'Friend List', icon: 'account-group', iconColor: '#1F41BB' },
    ],
  },
  {
    title: 'SUBSCRIPTIONS',
    data: [
      { name: 'Your Purchases', icon: 'cart', iconColor: '#1F41BB' },
      { name: 'Payment Methods', icon: 'credit-card', iconColor: '#1F41BB' },
      { name: 'Active Plans', icon: 'calendar-check', iconColor: '#1F41BB' },
    ],
  },
  {
    title: 'HELP & SUPPORT',
    data: [
      { name: 'FAQ', icon: 'help-circle', iconColor: '#1F41BB' },
      { name: 'Forums', icon: 'forum', iconColor: '#1F41BB' },
      { name: 'Contact Us', icon: 'headset', iconColor: '#1F41BB' },
    ],
  },
  {
    title: 'ACCOUNT',
    data: [
      { name: 'Delete Account', icon: 'delete', iconColor: '#ff4444' },
      { name: 'Log Out', icon: 'logout', iconColor: '#ff4444' },
    ],
  },
];


const Item = ({ name, icon, iconColor = '#555', onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemLeft}>
      <MaterialCommunityIcons name={icon} size={24} color={iconColor} style={styles.icon} />
      <Text style={styles.title}>{name}</Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={24} color="#aaa" />
  </TouchableOpacity>
);

const showPopup = ({navigation}) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to proceed?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: () => navigation.replace('Welcome')
        }
      ],
      { cancelable: false }
    );
  };
const App = ({navigation}) => {
  
  const handleItemPress = (itemName) => {
    switch (itemName) {
      case 'Profile':
         navigation.navigate('ProfileScreen');
        break;
      case 'Media':
        navigation.navigate('MediaScreen');
        break;
      case 'Friend List':
        Alert.alert('Friend List Tapped');
        break;
      case 'Log Out':
        navigation.replace('Welcome');
        showPopup
        break;
      case 'Delete Account':
        Alert.alert('Delete Account Tapped');
        break;
      default:
        Alert.alert(itemName + ' clicked');
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.screenTitle}>Settings</Text>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({ item }) => (
            <Item
              name={item.name}
              icon={item.icon}
              iconColor={item.iconColor}
              onPress={() => handleItemPress(item.name)}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          stickySectionHeadersEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screenTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: '#1F41BB',
    padding: 24,
    paddingBottom: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F41BB',
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 24,
    letterSpacing: 0.8,
  },
  item: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
    width: 24,
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 64,
  },
  sectionSeparator: {
    height: 8,
  },
});

export default App;
