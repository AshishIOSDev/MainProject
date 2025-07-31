import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const json = await response.json();
      setProducts(json.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>$ {item.price}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaView >
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
    productCard: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F1F4FF',
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center', 
    elevation: 3,
    shadowOffset: 'bottom',
    shadowOpacity: 0.9,
    shadowColor: 'midnightblue',
    tintColor: '#F1F4FF',
    borderColor: 'midnightblue',
  },

  itemContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },

  image: {
    width: 230,
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },

  textContainer: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },

  price: {
    fontSize: 16,
    color: 'green',
    marginVertical: 4,
    textAlign: 'left',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

