import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Keychain from 'react-native-keychain';

const GenderScreen = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState('Male');

  const handleGenderSelect = gender => {
    setSelectedGender(gender);
  };

  return (
    <SafeAreaProvider>
      <ScrollView>
        <SafeAreaView>
          <View style={styles.verticalStack}>
            <Text style={styles.heading}>Gender</Text>
            <Text style={styles.textHeading}>Please Select Your Gender</Text>
            <Image
              source={{
                uri: 'https://i.guim.co.uk/img/media/9e2f0f7c2059c9b93d535a23f88b88b099275a91/0_168_3888_2333/master/3888.jpg?width=1200&quality=85&auto=format&fit=max&s=f9b50356dc82c5e9e7c6ee012188d3dd',
              }}
              // source={require('/Users/ie14/Projects/MyApp/React-Native/Training/MainProject/assets/images/female-hormone-imbalance.jpg')}
              style={styles.image}
            />

            <View style={styles.segmentContainer}>
              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  selectedGender === 'Male' && styles.selectedSegment,
                ]}
                onPress={() => handleGenderSelect('Male')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    selectedGender === 'Male' && styles.selectedText,
                  ]}
                >
                  Male
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.segmentButton,
                  selectedGender === 'Female' && styles.selectedSegment,
                ]}
                onPress={() => handleGenderSelect('Female')}
              >
                <Text
                  style={[
                    styles.segmentText,
                    selectedGender === 'Female' && styles.selectedText,
                  ]}
                >
                  Female
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                if (selectedGender) {
                  Alert.alert('Gender ', ` ${selectedGender}`);
                  Keychain.resetGenericPassword();
                }
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 350,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 30,
  },

  heading: {
    fontSize: 28,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 40,
    color: '#1F41BB',
  },

  textHeading: {
    fontSize: 18,
    paddingVertical: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontFamily: 'Poppins-Medium',
  },
  verticalStack: {
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },

  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#F1F4FF',
    borderRadius: 10,
    marginVertical: 10,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedSegment: {
    backgroundColor: '#1F41BB',
  },
  segmentText: {
    color: '#1F41BB',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#fff',
  },
  buttonStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#1F41BB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    shadowColor: 'midnightblue',
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GenderScreen;
