import React, { useState ,useContext} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MyContext from '../App'; 

export default function ProfileDetailScreen() {
  // const { sharedValue } = useContext(MyContext);
    const profile = {};
 
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{profile?.name}</Text>
      <Text>Email: {profile?.email}</Text>
      <Text>Phone: {profile?.phone}</Text>
      <Text>Role: {profile?.role}</Text>

      {profile && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Store Info</Text>
          <Text>{profile?.store_name}</Text>
          <Text>{profile?.store_address}</Text>
          <Text>Status: {profile?.store_status}</Text>
        </View>
     )} 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
});
