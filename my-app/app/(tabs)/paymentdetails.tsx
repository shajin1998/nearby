import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PaymentDetailScreen = () => {
  const router = useRouter(); // ✅ Expo Router

  const handleBack = () => {
    router.push('/payment'); // Back arrow → PaymentsScreen
  };

  const handleBankTransfer = () => {
    router.push('/paymentmethod'); // Bank transfer → PaymentMethodsScreen
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verdant Farms</Text>
      </View>

      {/* Completed Order Info */}
      <View style={styles.orderInfo}>
        <Text style={styles.statusText}>Completed order</Text>
        <Text style={styles.amountText}>$50.00</Text>
      </View>
      <Text style={styles.dateText}>Jan 13, 2024 at 12:30 PM</Text>

      {/* Underline */}
      <View style={styles.underline} />

      {/* Payout Section */}
      <Text style={styles.sectionTitle}>PAYOUT</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Amount</Text>
      </View>
      <Text style={styles.value}>$50.00</Text>
      <View style={styles.row1}>
        <Text style={styles.label}>Transaction ID</Text>
      </View>
      <Text style={styles.value}>ABC1234567</Text>

      {/* Underline */}
      <View style={styles.underline} />

      {/* Payment Method */}
      <Text style={styles.sectionTitle}>Payment method</Text>
      <TouchableOpacity style={styles.paymentMethod} onPress={handleBankTransfer}>
        <Ionicons name="home-outline" size={20} color="#000" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.methodText}>Bank transfer</Text>
          <Text style={styles.methodSubText}>Checking •••• 5678</Text>
        </View>
      </TouchableOpacity>

      {/* View Statement Button */}
      <TouchableOpacity style={styles.statementButton}>
        <Text style={styles.statementButtonText}>VIEW STATEMENT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -10,
    height: 130,
    backgroundColor: '#C7E62B',
    width: 390,
    marginLeft: -9,
    paddingLeft: 16,
  },
  headerTitle: { color: '#000', fontSize: 20, fontWeight: 'bold', marginLeft: 12 },
  orderInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusText: { color: 'black', fontSize: 15 },
  amountText: { color: 'black', fontSize: 22, fontWeight: 'bold' },
  dateText: { color: 'black', fontSize: 13, marginTop: 4, marginBottom: 12 },
  sectionTitle: { color: 'black', fontSize: 20, marginTop: 20, marginBottom: 8, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  row1: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, marginTop: 30 },
  label: { color: 'black', fontSize: 17 },
  value: { color: 'grey', fontSize: 14, marginLeft: 24 },
  paymentMethod: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#C7E62B', padding: 12, borderRadius: 15, marginTop: 8 },
  methodText: { color: '#000', fontSize: 14 },
  methodSubText: { color: '#333', fontSize: 12 },
  statementButton: { backgroundColor: '#C7E62B', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 30 },
  statementButtonText: { color: '#000', fontSize: 14, fontWeight: 'bold' },
  underline: { height: 1, backgroundColor: '#ccc', marginVertical: 12 },
});

export default PaymentDetailScreen;
