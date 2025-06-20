import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AddProductScreen = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [inStock, setInStock] = useState(true);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imageText}>+{'\n'}Add Image</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Bananas"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Fruits & Vegetables"
        value={category}
        onChangeText={setCategory}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.inStockLabel}>In Stock</Text>
        <Switch
          value={inStock}
          onValueChange={setInStock}
          trackColor={{ false: '#ccc', true: '#C7E62B' }} 
          thumbColor={inStock ? '#fff' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ADD PRODUCT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  imageBox: {
    backgroundColor: '#f0f0f0',
    height: 100,
    width: 100,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 100,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  imageText: {
    textAlign: 'center',
    color: '#888',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C7E62B', 
    padding: 10,
    borderRadius: 8,
  },
  inStockLabel: {
    color: '#000',
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#C7E62B', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000', 
    fontWeight: 'bold',
  },
});

export default AddProductScreen;
