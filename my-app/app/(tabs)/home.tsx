import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const StoreHome = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>Store Partner</Text>

      {/* Arrow Button */}
      <TouchableOpacity style={styles.arrowButton} onPress={() => router.push('/loginscreen')}>
        <Ionicons name="arrow-forward-circle" size={100} color="#000" />
      </TouchableOpacity>

      {/* Footer text */}
      <Text style={styles.footer}>Click to continue</Text>
    </SafeAreaView>
  );
};

export default StoreHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C7E62B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 40,
  },
  arrowButton: {
    marginVertical: 20,
  },
  footer: {
    fontSize: 16,
    color: '#000',
    marginTop: 10,
  },
});
