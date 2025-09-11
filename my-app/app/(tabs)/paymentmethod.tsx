import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PaymentMethodsScreen = () => {
  const router = useRouter(); // ✅ Expo Router

  const handleBack = () => {
    router.push('/settingspage'); // Back arrow navigation
  };

  const handleBankTransfer = () => {
    router.push('/payment'); // Bank transfer click navigation
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment methods</Text>
      </View>

      {/* Active Payment Method */}
      <TouchableOpacity style={styles.methodBox} onPress={handleBankTransfer}>
        <Ionicons name="home-outline" size={20} color="#000" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.methodText}>Bank transfer</Text>
          <Text style={styles.methodSubText}>Checking •••• 5678</Text>
        </View>
      </TouchableOpacity>

      {/* Add Payment Method */}
      <TouchableOpacity style={styles.addMethod}>
        <Text style={styles.addMethodText}>+ Add payment method</Text>
      </TouchableOpacity>

      {/* Payout Details */}
      <Text style={styles.payoutTitle}>Payout details</Text>
      <View style={styles.payoutRow}>
        <Text style={styles.payoutLabel}>Amount</Text>     
      </View>
      <Text style={styles.payoutValue}>$50.00</Text>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 40 },
  headerTitle: { color: '#000', fontSize: 23, fontWeight: 'bold', marginLeft: 12, marginTop: 10 },
  methodBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C7E62B',
    padding: 12,
    borderRadius: 12,
    marginTop: 30,
    height: 100,
  },
  methodText: { color: '#000', fontSize: 14, fontWeight: '600' },
  methodSubText: { color: '#333', fontSize: 12 },
  addMethod: { marginTop: 35 },
  addMethodText: { color: '#C7E62B', fontSize: 14, fontWeight: '700' },
  payoutTitle: { color: '#000', fontSize: 22, marginTop: 32, marginBottom: 12, fontWeight: 'bold' },
  payoutRow: { flexDirection: 'row', justifyContent: 'space-between' },
  payoutLabel: { color: '#000', fontSize: 18 },
  payoutValue: { color: 'grey', fontSize: 15, fontWeight: '600', marginTop: 10, marginLeft: 20 },
});

export default PaymentMethodsScreen;
