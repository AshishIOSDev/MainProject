import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <SafeAreaProvider>
      <ImageBackground
              source={{
                uri: 'https://w0.peakpx.com/wallpaper/479/900/HD-wallpaper-gradient-purple-blue-gradient-thumbnail.jpg',
              }}
              style={styles.backgroundImage}
              resizeMode="cover"
       >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={{ uri: product.thumbnail }} style={styles.image} />
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>Price: $ {product.price}</Text>
          <Text style={styles.label}>Brand: {product.brand}</Text>
          <Text style={styles.label}>Category: {product.category}</Text>
          <Text style={styles.label}>Stock: {product.stock}</Text>
          <Text style={styles.label}>Rating: {product.rating}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
      </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    paddingTop: 0,
  },
    backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    width: 300,
    height: 250,
    borderRadius: 10,
  },
  backButton: {
    padding: 10,
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
    textAlign: 'left',
  },
price: {
    fontSize: 16,
    color: '#4CAF50',
    marginVertical: 4,
    textAlign: 'left',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
    color: 'white',
  },
  label: {
    textAlign: 'left',
    fontSize: 14,
    color: 'white',
    marginBottom: 4,
  },
});

export default ProductDetails;