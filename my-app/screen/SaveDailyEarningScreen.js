import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { saveDailyEarning } from "../api/savedailyearning";

export default function SaveDailyEarningScreen() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [result, setResult] = useState(null);

  const handleSave = async () => {
    if (!email || !role || !date || !hoursWorked) {
      setResult({ error: "All fields required da!" });
      return;
    }

    const payload = { 
      email, 
      role, 
      date, 
      hours_worked: Number(hoursWorked) 
    };

    const res = await saveDailyEarning(payload);

    if (res.error) {
      setResult({ error: res.error });
    } else {
      setResult({
        success: `Success!\n\nDate: ${res.data.date_of_earning}\nHours: ${res.calculation.hours_worked}\nRate: ₹${res.calculation.hourly_rate}\nTotal: ₹${res.calculation.total_earning}`
      });

     
      setEmail("");
      setRole("");
      setDate("");
      setHoursWorked("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Save Daily Earning</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Role (user/delivery_partner)"
        value={role}
        onChangeText={setRole}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Hours Worked"
        value={hoursWorked}
        onChangeText={setHoursWorked}
        keyboardType="numeric"
      />

      <Button title="Save Earning" onPress={handleSave} />

      {/* Error / Success message */}
      {result?.error && (
        <Text style={styles.errorText}>{result.error}</Text>
      )}
      {result?.success && (
        <View style={styles.resultBox}>
          <Text style={styles.successText}>{result.success}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorText: { color: "red", marginTop: 15, textAlign: "center" },
  successText: { color: "green", fontWeight: "bold", textAlign: "center" },
  resultBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#e6ffe6",
  },
});
