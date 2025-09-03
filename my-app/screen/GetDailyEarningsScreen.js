import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { getDailyEarnings } from "../api/getDailyEarnings";

export default function GetDailyEarningsScreen() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await getDailyEarnings();
        if (response.error) {
          setError(response.error);
        } else {
          setRecords(response.records || []);
          setTotal(response.total_earning || 0);
        }
      } catch (err) {
        setError("Failed to fetch daily earnings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (records.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No records found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Earnings: ₹{total}</Text>
      <FlatList
        data={records}
        keyExtractor={(item, index) => item.email + index}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Role: {item.role}</Text>
            <Text>Hourly Pay: ₹{item.hourly_pay}</Text>
            <Text>Daily Earning: ₹{item.daily_earning}</Text>
            <Text>Date: {item.date_of_earning}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" ,marginTop:20},
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: "#f9f9f9"
  },
  error: { color: "red", fontSize: 16 }
});
