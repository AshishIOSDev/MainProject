import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Connect with Top Talent & Business Opportunities',
    description:
      'Explore all the existing job roles based on your interest and study major',
    image: require('/Users/ie14/Projects/MyApp/React-Native/Training/MainProject/assets/images/man-running.jpg'),
  },

  {
    id: '2',
    title: 'Unlock Your Next Career Move',
    description:
      'Discover new opportunities that align with your experience, interests, and professional goals.',
    image: require('/Users/ie14/Projects/MyApp/React-Native/Training/MainProject/assets/images/employee.jpg'),
  },

  {
    id: '3',
    title: 'Connect with Top Talent & Business Opportunities',
    description:
      'Explore potential hires, partnerships, and ventures tailored to your industry and business needs.',
    image: require('/Users/ie14/Projects/MyApp/React-Native/Training/MainProject/assets/images/businessman.jpg'),
  },
];

const WalkthroughScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleSkip = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex - 1 });
    } else {
      navigation.replace('Welcome');
    }
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('Welcome');
    }
  };

  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      {item.image && <Image source={item.image} style={styles.image} />}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        scrollEventThrottle={16}
      />

      <View style={styles.bottomControls}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.controlText}>
            {currentIndex === 0 ? 'Skip' : 'Previous'}
          </Text>
        </TouchableOpacity>

        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.controlText}>
            {currentIndex === slides.length - 1 ? 'Done' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
  },

  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#1F41BB',
  },

  description: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    fontWeight: "600",
    paddingHorizontal: 30,
  },

  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },

  controlText: {
    justifyContent: 'space-between',
    fontSize: 16,
    color: '#1F41BB',
    fontWeight: '800',
  },

  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1F41BB',
    color: "white",
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  activeDot: {
    justifyContent: 'space-between',
    width: 19,
    backgroundColor: 'black',
    alignItems: 'center',
  },
});

export default WalkthroughScreen;