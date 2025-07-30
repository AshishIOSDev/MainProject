import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


const BirthdayScreen = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios'); // iOS me picker visible rahega
    setDate(currentDate);

  };
    const handleSubmit = () => {
    if (date) {
         navigation.navigate("GenderScreen")
    }
};

  const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

  return (
    <SafeAreaProvider>
      <ScrollView>
<SafeAreaView>
        <View style={styles.verticalStack}>
          <Text style={styles.heading}>Birthday</Text>
          <Text style={styles.textHeading}>Please Enter Your Date Of Birth</Text>
          <Image
            source={require('/Users/ie14/Projects/MyApp/React-Native/Training/MainProject/assets/images/happy-birthday.png')}
            style={styles.image}
          />

          {/* Tap to show Date Picker */}
          <TouchableOpacity
            style={styles.CustomTextInput}
            onPress={() => setShowPicker(true)}>
            <Text style={{ color: 'black', fontSize: 15 }}>
              {formattedDate}
            </Text>
          </TouchableOpacity>

          {/* Date Picker */}
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
              maximumDate={new Date()} // Prevent future DOB
            />
          )}

          <TouchableOpacity style={styles.buttonStyle}
          onPress={(handleSubmit)}
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
    marginBottom: 40,
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

  verticalStack: {
    marginHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },

  CustomTextInput: {
    height: 45,
    width: '100%',
    borderColor: 'midnightblue',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#F1F4FF',
    marginVertical: 10,
  },
});

export default BirthdayScreen;
