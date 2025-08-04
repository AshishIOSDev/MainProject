import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={25} color="#1F41BB" />
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
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    paddingTop: 0,
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
    color: 'black',
    textAlign: 'left',
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
    color: '#555',
  },
  label: {
    textAlign: 'left',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
});

export default ProductDetails;