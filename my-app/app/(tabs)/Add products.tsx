import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AddProductScreen = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(true);
  const [image, setImage] = useState(null);

  const router = useRouter();

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

  const handleAddProduct = () => {
    // 🔹 Ippo dummy action
    alert("✅ Product Added Successfully!");
    router.back(); // Back to previous screen (Inventory)
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Product</Text>
        <View style={{ width: 24 }} /> {/* dummy space */}
      </View>

      {/* Image Picker */}
      <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <Text style={styles.imageText}>+{"\n"}Add Image</Text>
        )}
      </TouchableOpacity>

      {/* Name Input */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Bananas"
        value={name}
        onChangeText={setName}
      />

      {/* Category Input */}
      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Fruits & Vegetables"
        value={category}
        onChangeText={setCategory}
      />

      {/* Stock Switch */}
      <View style={styles.switchContainer}>
        <Text style={styles.inStockLabel}>In Stock</Text>
        <Switch
          value={inStock}
          onValueChange={setInStock}
          trackColor={{ false: "#ccc", true: "#C7E62B" }}
          thumbColor={inStock ? "#fff" : "#f4f3f4"}
        />
      </View>

      {/* Add Button */}
      <TouchableOpacity style={styles.button} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>ADD PRODUCT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: "#C7E62B",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    width:"110%",
    marginLeft:-20
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    
  },
  imageBox: {
    backgroundColor: "#f0f0f0",
    height: 100,
    width: 100,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  imageText: {
    textAlign: "center",
    color: "#888",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#C7E62B",
    padding: 10,
    borderRadius: 8,
  },
  inStockLabel: {
    color: "#000",
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#C7E62B",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
