import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const payouts = [
  { id: '1', date: 'Jan 20, 2024', amount: '₹500.00', status: 'Completed' },
  { id: '2', date: 'Jan 15, 2024', amount: '₹750.00', status: 'Completed' },
  { id: '3', date: 'Jan 10, 2024', amount: '₹320.00', status: 'Pending' },
];

const PayoutsScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/Earningscreen')}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payouts</Text>
      </View>

      {/* Payouts List */}
      <FlatList
        data={payouts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.amount}>{item.amount}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <Text
              style={[
                styles.status,
                item.status === 'Completed'
                  ? { color: 'green' }
                  : { color: 'orange' },
              ]}
            >
              {item.status}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default PayoutsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff',marginTop:35 },
  header: {
    backgroundColor: '#C7E62B',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    height: 100,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 12,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFCF0',
    borderWidth: 1,
    borderColor: '#C7E62B',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 12,
  },
  amount: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  date: { fontSize: 13, color: '#666', marginTop: 4 },
  status: { fontSize: 14, fontWeight: '600', alignSelf: 'center' },
});
