import React, { useState ,useContext} from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { verifyOTP } from "../api/auth";   
import { useNavigation } from "@react-navigation/native";
import MyContext from '../App'; 


export default function VerifyOTPScreens() {
  const { sharedValue,setSharedValue } = useContext(MyContext) || {};
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [otp, setOtp] = useState("");
  const [responseMsg, setResponseMsg] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigation = useNavigation(); 

  const handleVerifyOTP = async () => {
    const data = await verifyOTP(email, role, otp);
    console.log("profile data",data)
    
    if (data.error) {
      setIsSuccess(false);
      setResponseMsg(data.error);
    } else {
      setIsSuccess(true);
      setResponseMsg(data.message);
     console.log(data.profile)
      if (data.profile) {
        setSharedValue(data.profile)
        console.log(sharedValue)
        // localStorage.setItem("profile",data.profile)
        navigation.navigate("ProfileDetailScreen");
      } else {
        setResponseMsg(data.error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Verify OTP</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />

      <Button title="Verify OTP" onPress={handleVerifyOTP} />

      {responseMsg && (
        <Text
          style={[
            styles.message,
            isSuccess ? styles.success : styles.error,
          ]}
        >
          {responseMsg}
        </Text>
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
  message: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  success: { color: "green" },  
  error: { color: "red" },     
});
