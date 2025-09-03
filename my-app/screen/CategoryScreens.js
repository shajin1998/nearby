import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from "react-native";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../api/category";

export default function CategoryScreen() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    const data = await getCategories();
    if (!data.error) setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (!categoryName) {
      Alert.alert("Validation", "Category name cannot be empty");
      return;
    }

    if (editingId) {
      // Update
      const res = await updateCategory(editingId, categoryName);
      if (!res.error) {
        Alert.alert("Success", "Category updated successfully");
        setEditingId(null);
        setCategoryName("");
        fetchCategories();
      } else {
        Alert.alert("Error", res.error);
      }
    } else {
      // Create
      const res = await createCategory(categoryName);
      if (!res.error) {
        setCategoryName("");
        fetchCategories();
      } else {
        Alert.alert("Error", res.error);
      }
    }
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setCategoryName(name);
  };

  const handleDelete = async (id) => {
    const res = await deleteCategory(id);
    if (!res.error) {
      fetchCategories();
    } else {
      Alert.alert("Error", res.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Categories</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Category Name"
        value={categoryName}
        onChangeText={setCategoryName}
      />
      <Button
        title={editingId ? "Update Category" : "Add Category"}
        onPress={handleSave}
      />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <View style={styles.actions}>
              <Button title="Edit" onPress={() => handleEdit(item.id, item.name)} />
              <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20,marginTop:150},
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 10,marginLeft:100},
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
}); 