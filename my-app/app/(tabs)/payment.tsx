import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';

const transactions = [
  { id: '1', type: 'Completed order', amount: '$50.00', date: 'Jan 18' },
  { id: '2', type: 'Completed order', amount: '$35.00', date: 'Jan 15' },
  { id: '3', type: 'Completed order', amount: '$20.00', date: 'Jan 13' },
  { id: '4', type: 'Completed order', amount: '$45.00', date: 'Jan 10' },
];

const PaymentsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Payments</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total balance</Text>
        <Text style={styles.balanceAmount}>$1,250.00</Text>
        <TouchableOpacity style={styles.withdrawButton}>
          <Text style={styles.withdrawButtonText}>WITHDRAW</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.transactionsHeading}>Transactions</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View>
              <Text style={styles.transactionType}>{item.type}</Text>
              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>
            <Text style={styles.transactionAmount}>{item.amount}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  heading: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 30,
  },
  balanceCard: {
    backgroundColor: '#C7E62B',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  balanceLabel: {
    color: '#222',
    fontSize: 14,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  withdrawButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  withdrawButtonText: {
    color: '#222',
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionsHeading: {
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFCF0',
    borderWidth: 1,
    borderColor: '#C7E62B',
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
  },
  transactionType: {
    color: '#222',
    fontSize: 16,
    marginBottom: 4,
  },
  transactionDate: {
    color: '#888',
    fontSize: 13,
  },
  transactionAmount: {
    color: '#C7E62B',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentsScreen;
