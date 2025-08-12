import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

const DATA = [
  {
    title: 'SETTINGS',
    data: [
      { name: 'Profile', icon: 'account', iconColor: 'white' },
      { name: 'Media', icon: 'image', iconColor: 'white' },
      { name: 'Friend List', icon: 'account-group', iconColor: 'white' },
    ],
  },
  {
    title: 'SUBSCRIPTIONS',
    data: [
      { name: 'Your Purchases', icon: 'cart', iconColor: 'white' },
      { name: 'Payment Methods', icon: 'credit-card', iconColor: 'white' },
      { name: 'Active Plans', icon: 'calendar-check', iconColor: 'white' },
    ],
  },
  {
    title: 'HELP & SUPPORT',
    data: [
      { name: 'FAQ', icon: 'help-circle', iconColor: 'white' },
      { name: 'Forums', icon: 'forum', iconColor: 'white' },
      { name: 'Contact Us', icon: 'headset', iconColor: 'white' },
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

const Item = ({ name, icon, iconColor = '#555', onPress, profileImage }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemLeft}>
      {name === 'Profile' && profileImage ? (
        <Image
          source={{ uri: profileImage }}
          style={{ width: 32, height: 32, borderRadius: 16, marginRight: 16 }}
        />
      ) : (
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={iconColor}
          style={styles.icon}
        />
      )}
      <Text style={styles.title}>{name}</Text>
    </View>
    <MaterialCommunityIcons name="chevron-right" size={24} color="white" />
  </TouchableOpacity>
);

const SettingScreen = ({ navigation }) => {
  const profileImage = useSelector(state => state.profile.profilePicture);

  const handleItemPress = itemName => {
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
      <ImageBackground
        source={{
          uri: 'https://e1.pxfuel.com/desktop-wallpaper/445/615/desktop-wallpaper-papers-co-iphone-blur.jpg',
        }}
        style={styles.backgroundImage}
      >
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
                profileImage={profileImage} // Pass image here
                onPress={() => handleItemPress(item.name)}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            stickySectionHeadersEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            SectionSeparatorComponent={() => (
              <View style={styles.sectionSeparator} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  screenTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
    padding: 24,
    paddingBottom: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f5b20bff',
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 24,
    letterSpacing: 0.8,
  },
  item: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 16, width: 24 },
  title: { fontSize: 19, color: 'white', fontWeight: 'bold' },
  separator: { height: 0.3, backgroundColor: 'gray' },
  sectionSeparator: { height: 1 },
});

export default SettingScreen;
