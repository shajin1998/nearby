import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const orderData = [
  { id: '1', count: 4, label: 'New' },
  { id: '2', count: 2, label: 'Preparing' },
  { id: '3', count: 8, label: 'Ready for Pickup' },
];

const PartnerDashboardScreen = () => {
  const router = useRouter(); // ✅ Expo Router

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#C7E62B" barStyle="dark-content" />

      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/loginscreen')}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.logoText}>zepto</Text>
        <Ionicons name="notifications-outline" size={24} color="#000" />
      </View>

      {/* Greeting */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hi, Partner</Text>

        <View style={styles.orderHeader}>
          <Text style={styles.ordersText}>Orders</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Order Status Cards */}
        <FlatList
          data={orderData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Text style={styles.cardCount}>{item.count}</Text>
              <Text style={styles.cardLabel}>{item.label}</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color="black"
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/home')} // ✅ Home navigation
        >
          <Ionicons name="home" size={20} color="#000" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/storeproduct')}
        >
          <FontAwesome5 name="box-open" size={18} color="#000" />
          <Text style={styles.tabLabel}>Products</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.tabItem}
          onPress={() => router.push('/inventory')}>

          <MaterialIcons name="inventory" size={20} color="#000" />
          <Text style={styles.tabLabel}>Inventory</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => router.push('/Earningscreen')}
        >
          <Ionicons name="wallet" size={20} color="#000" />
          <Text style={styles.tabLabel}>Earnings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    backgroundColor: '#C7E62B',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
  },

  logoText: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },

  greetingContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    flex: 1,
  },

  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1,
    color: '#000',
    marginTop: -10,
  },

  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  ordersText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  viewAllText: {
    color: '#C7E62B',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
    height: 130,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  cardCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },

  cardLabel: {
    fontSize: 16,
    color: '#444',
  },

  arrowIcon: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },

  bottomTab: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#C7E62B',
    paddingVertical: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  tabItem: {
    alignItems: 'center',
  },

  tabLabel: {
    color: '#000',
    fontSize: 12,
    marginTop: 2,
  },
});

export default PartnerDashboardScreen;
