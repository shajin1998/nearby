import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const inventoryItems = [
  { id: "1", name: "Apples", stock: 25, price: "₹120/kg" },
  { id: "2", name: "Bananas", stock: 40, price: "₹60/kg" },
  { id: "3", name: "Tomatoes", stock: 15, price: "₹45/kg" },
  { id: "4", name: "Potatoes", stock: 50, price: "₹30/kg" },
];

const InventoryScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/Dashboardscreen')}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inventory</Text>
        <Ionicons name="add-circle-outline" size={26} color="#000" />
      </View>

      {/* Inventory List */}
      <FlatList
        data={inventoryItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <Text style={styles.itemStock}>Stock: {item.stock}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Add Product Button */}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add New Product</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InventoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    backgroundColor: "#C7E62B",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },

  card: {
    backgroundColor: "#FFFCF0",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#C7E62B",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },

  itemPrice: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },

  itemStock: {
    fontSize: 14,
    fontWeight: "600",
    color: "#C7E62B",
  },

  addButton: {
    backgroundColor: "#C7E62B",
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },

  addButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
