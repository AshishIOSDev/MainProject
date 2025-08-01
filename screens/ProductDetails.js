import React from 'react';
import { SafeAreaView ,View, Text, Image, StyleSheet, ScrollView ,TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductDetails = ({ route , navigation }) => {
  const { product } = route.params;

  return (
    <SafeAreaProvider>
      <SafeAreaView>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack('Signup')}
      >
      <Icon name="arrow-left" size={25} color="#1F41BB" />
      </TouchableOpacity>
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

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  
  image: {
    width: 300,
    height: 250,
    borderRadius: 10,
  },

    backButton: {
    width: 30,
    height: 20,
    marginLeft: 10,
    color: '#1F41BB',
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
