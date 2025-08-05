import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { SafeAreaProvider , SafeAreaView} from 'react-native-safe-area-context';
import { get } from './services/methods/get';
import { endpoints } from './services/constants/endpoints';

const App = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 10;

  const fetchProducts = async (currentPage = 1) => {
    try {
      const skip = (currentPage - 1) * limit;
      const endpoint = endpoints.getPaginatedProducts(limit, skip);
      const json = await get(endpoint);

      setTotalProducts(json.total);
      if (currentPage === 1) {
        setProducts(json.products);
      } else {
        setProducts((prev) => [...prev, ...json.products]);
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
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
      const nextPage = page + 1;
      setPage(nextPage);
      setLoadingMore(true);
      fetchProducts(nextPage);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
      activeOpacity={0.7}
    >
        <View style={styles.androidCard}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>$ {item.price}</Text>
          </View>
        </View>
      
    </TouchableOpacity>
  );

  const renderFooter = () =>
    loadingMore ? (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="white" />
        <Text style={styles.loadingText}>Loading more products...</Text>
      </View>
    ) : null;

  if (loading && page === 1) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <ImageBackground
        // source={{
        //   uri: 'https://w0.peakpx.com/wallpaper/479/900/HD-wallpaper-gradient-purple-blue-gradient-thumbnail.jpg',
        // }}
        source={{uri: 'https://i.pinimg.com/236x/65/2e/71/652e71da97da6c7364a6dad06a341fbb.jpg'}} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
            <View style={styles.androidHeader}>
              <Text style={styles.headerText}>Products</Text>
            </View>
          <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
            onEndReached={loadMoreProducts}
            onEndReachedThreshold={0.5}
            contentContainerStyle={styles.listContent}
            style={styles.flatList}
          />
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  flatList: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  iosHeader: {
    padding: 16,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  androidHeader: {
    marginBottom: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  iosCardContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 15,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  iosBlurView: {
    padding: 12,
    alignItems: 'center',
  },
  androidCard: {
    padding: 12,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
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
    color: 'white',
    textAlign: 'left',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  footerLoader: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadingText: {
    marginLeft: 10,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default App;