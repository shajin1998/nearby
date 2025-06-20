import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const initialProducts = [
  { id: '1', name: 'Banana', price: 25, stock: true, image: require('@/assets/images/banana.jpg') },
  { id: '2', name: 'Bread', price: 40, stock: false, image: require('@/assets/images/bread.jpg') },
  { id: '3', name: 'Tomatoes', price: 35, stock: true, image: require('@/assets/images/tomato.png') },
  { id: '4', name: 'Potato', price: 20, stock: true, image: require('@/assets/images/potato.jpg') },
  { id: '5', name: 'Butter', price: 60, stock: true, image: require('@/assets/images/butter.jpeg') },
  { id: '6', name: 'Cabbage', price: 15, stock: true, image: require('@/assets/images/cabbage.jpg') },
  { id: '7', name: 'Chocolate', price: 50, stock: false, image: require('@/assets/images/chocolate.jpeg') },
  { id: '8', name: 'Fresh Creams', price: 70, stock: true, image: require('@/assets/images/fresh cream.jpeg') },
];

const StoreProductsScreen = () => {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');

  const toggleStock = (id) => {
    const updated = products.map((item) =>
      item.id === id ? { ...item, stock: !item.stock } : item
    );
    setProducts(updated);
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>₹{item.price}.00</Text>
        <Text style={item.stock ? styles.inStock : styles.outStock}>
          {item.stock ? 'In stock' : 'Out of stock'}
        </Text>
      </View>
      <Switch
        value={item.stock}
        onValueChange={() => toggleStock(item.id)}
        thumbColor={item.stock ? '#fff' : '#fff'}
        trackColor={{ false: '#ccc', true: '#C7E62B' }} // Changed to #C7E62B
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>STORE PRODUCTS</Text>
        <TouchableOpacity style={styles.plusButton}>
          <Ionicons name="add" size={22} color="#C7E62B" />
        </TouchableOpacity>
      </View>

      {/* Search Box */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search products"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* List or No Results */}
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View style={styles.noResults}>
          <Ionicons name="alert-circle-outline" size={50} color="#ccc" />
          <Text style={{ color: '#999', fontSize: 16, marginTop: 8 }}>No products found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#C7E62B', // Changed to #C7E62B
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    height: 100,
  },
  headerTitle: {
    color: '#000', // Changed to black for better contrast with #C7E62B
    fontWeight: 'bold',
    fontSize: 18,
  },
  plusButton: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 16,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginHorizontal: 12,
    marginTop: 12,
    elevation: 2,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    color: '#000',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 12,
    marginTop: 10,
    elevation: 2,
  },
  image: {
    width: 65,
    height: 55,
    marginRight: 16,
    borderRadius: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  price: {
    color: '#555',
    marginVertical: 2,
  },
  inStock: {
    color: 'green',
    fontSize: 13,
  },
  outStock: {
    color: 'red',
    fontSize: 13,
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});

export default StoreProductsScreen;
