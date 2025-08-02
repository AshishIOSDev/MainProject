import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const App = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10; // Number of products per page

  const fetchProducts = async (currentPage = 1) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${(currentPage - 1) * limit}`
      );
      const json = await response.json();
      setTotalProducts(json.total);
      
      if (currentPage === 1) {
        setProducts(json.products);
      } else {
        setProducts(prev => [...prev, ...json.products]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const loadMoreProducts = () => {
    if (products.length < totalProducts && !loadingMore) {
      setLoadingMore(true);
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <View style={styles.productCard}>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>$ {item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="blue" />
        <Text style={styles.loadingText}>Loading more products...</Text>
      </View>
    );
  };

  if (loading && page === 1) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerText}>Products</Text>
          </View>
        }
        ListFooterComponent={renderFooter}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F4FF',
  },
  header: {
    padding: 16,
    backgroundColor: '#F1F4FF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F4FF',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F41BB',
  },
  productCard: {
    flex: 1,
    padding: 12,
    backgroundColor: '#F1F4FF',
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowColor: 'midnightblue',
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
    color: '#1F41BB',
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
    backgroundColor: '#F1F4FF',
  },
  footerLoader: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadingText: {
    marginLeft: 10,
    color: '#1F41BB',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default App;