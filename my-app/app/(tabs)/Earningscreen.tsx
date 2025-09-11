import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const EarningsScreen = () => {
  const router = useRouter(); // ✅ Expo Router
  const totalEarnings = 2560;
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const data = [300, 500, 800, 1000, 750, 1200, 900];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/Dashboardscreen')}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.logo}>zepto</Text>
        <Ionicons name="wifi" size={20} color="#000" />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>EARNINGS</Text>

        {/* Total Earnings Card */}
        <View style={styles.earningsCard}>
          <Text style={styles.cardLabel}>Total Earnings</Text>
          <Text style={styles.cardValue}>₹ {totalEarnings.toFixed(2)}</Text>
        </View>

        {/* Earnings Chart */}
        <Text style={styles.sectionTitle}>Earnings</Text>
        <BarChart
          data={{
            labels: days,
            datasets: [{ data }],
          }}
          width={Dimensions.get('window').width - 32}
          height={220}
          yAxisLabel="₹"
          fromZero
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(199, 230, 43, ${opacity})`, 
            labelColor: () => '#000',
            barPercentage: 0.5,
            propsForBackgroundLines: {
              strokeDasharray: '',
            },
          }}
          style={{ borderRadius: 12 }}
        />

        {/* View Payouts Button */}
        <TouchableOpacity
          style={styles.payoutButton}
          onPress={() => router.push('/payout')}
        >
          <Text style={styles.payoutButtonText}>View Payouts</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push('/home')}>
          <Ionicons name="home-outline" size={24} color="#000" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/Orderscreen')}>
          <Ionicons name="cart-outline" size={24} color="#000" />
          <Text style={styles.navText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/storeproduct')}>
          <Ionicons name="pricetag-outline" size={24} color="#000" />
          <Text style={styles.navText}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="stats-chart" size={24} color="#000" />
          <Text style={styles.navText}>Earnings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EarningsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', marginTop: -5 },
  header: {
    backgroundColor: '#C7E62B', 
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
  },
  logo: { color: '#000', fontSize: 24, fontWeight: 'bold' },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 12, marginTop: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, color: '#000' },
  earningsCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  cardLabel: { fontSize: 14, color: '#666' },
  cardValue: { fontSize: 24, fontWeight: 'bold', color: '#000', marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginTop: 20, marginBottom: 8, color: '#000' },
  payoutButton: { backgroundColor: '#C7E62B', paddingVertical: 14, alignItems: 'center', borderRadius: 8, marginTop: 16 },
  payoutButtonText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#C7E62B', paddingVertical: 8 },
  navText: { color: '#000', fontSize: 12, marginTop: 4 },
});
