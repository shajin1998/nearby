import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  getDailyEarnings,
  createDailyEarning,
  updateDailyEarning,
  deleteDailyEarning,
} from "../api/dailyearning";

export default function DailyEarningScreen() {
  const [earnings, setEarnings] = useState([]);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  
  const USER_ID = 3;

  const fetchEarnings = async () => {
    setLoading(true);
    const data = await getDailyEarnings();
    if (!data.error) {
      setEarnings(data);
    } else {
      setMessage(" Failed to load earnings");
      console.log(" Fetch Error:", data.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSave = async () => {
    if (!amount || !date) {
      setMessage(" Amount and Date required!");
      return;
    }

    const payload = {
  user: USER_ID,
  date_of_earning: date,
  earning: amount.toString(), // number → string
};


    console.log("🚀 Payload sending:", payload);

    let res;
    if (editingId) {
      res = await updateDailyEarning(editingId, payload);
      if (!res.error) setMessage(" Updated successfully!");
      else setMessage("Failed to update");
      setEditingId(null);
    } else {
      
      res = await createDailyEarning(payload);
      if (!res.error) setMessage("✅ Created successfully!");
      else {
        console.log(" Create Error Response:", res);  
        setMessage("❌ Failed to create");
      }
    }

    setAmount("");
    setDate("");
    fetchEarnings();
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setAmount(item.earning.toString());
    setDate(item.date_of_earning);
  };

  const handleDelete = (id) => {
  Alert.alert("Confirm Delete", "Are you sure you want to delete?", [
    { text: "Cancel", style: "cancel" },
    {
      text: "Delete",
      style: "destructive",
      onPress: async () => {
        const res = await deleteDailyEarning(id);
        console.log("Delete Response:", res); // 🔥 Debug
        if (res.success) {
          setMessage("✅ Deleted successfully!");
        } 
        fetchEarnings();
      },
    },
  ]);
};



  
  const totalEarning = earnings.reduce(
    (sum, item) => sum + Number(item.earning),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Daily Earnings</Text>

      {message ? (
        <Text
          style={[
            styles.message,
            message.startsWith("✅") ? { color: "green" } : { color: "red" },
          ]}
        >
          {message}
        </Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <Button title={editingId ? "Update" : "Add"} onPress={handleSave} />

      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={earnings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>
                {item.date_of_earning} - ₹{item.earning}
              </Text>
              <View style={styles.actions}>
                <Button title="Edit" onPress={() => handleEdit(item)} />
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => handleDelete(item.id)}
                />
              </View>
            </View>
          )}
        />
      )}

      {/* Total Summary */}
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total: ₹{totalEarning}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
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
  actions: { flexDirection: "row", gap: 10 },
  message: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  summary: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
