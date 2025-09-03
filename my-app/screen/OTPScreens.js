import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { generateOTP } from "../api/auth";

export default function OTPScreens() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [otpResponse, setOtpResponse] = useState(null);

  const handleGenerateOTP = async () => {
    if (!email || !role) {
      setOtpResponse({ error: "Please enter both email and role" });
      return;
    }

    const data = await generateOTP(email, role);

    // ✅ OTP or error console la check panrathu
    console.log(" OTP from handleGenerateOTP:", data);

    // UI la display pannuthu
    setOtpResponse(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Generate OTP</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Role"
        value={role}
        onChangeText={setRole}
      />

      <Button title="Generate OTP" onPress={handleGenerateOTP} />

      {otpResponse && (
        <View style={styles.responseBox}>
          <Text
            style={[
              styles.responseText,
              otpResponse.error ? { color: "red" } : { color: "green" },
            ]}
          >
            {otpResponse.otp
              ? `OTP Generated: ${otpResponse.otp}`
              : `Error: ${otpResponse.error}`}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  responseBox: { marginTop: 20 },
  responseText: { fontSize: 16, textAlign: "center" },
});
