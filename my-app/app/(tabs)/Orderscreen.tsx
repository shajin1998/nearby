import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const orders = [
  {
    id: '162305',
    name: 'Karthick',
    items: [
      { id: '2', name: 'Whole Wheat Bread', qty: '21', image: require('@/assets/images/bread.jpg') },
      { id: '2', name: 'Fresh cream', qty: '1', image: require('@/assets/images/fresh cream.jpeg') },
    ],
    time: '12:40 PM',
    date: 'June 10',
    address: 'Chennai',
    status: 'New',
  },
  {
    id: '162306',
    name: 'Priya',
    items: [
      { id: '1', name: 'Bananas', qty: '1 kg', image: require('@/assets/images/banana.jpg') },
      { id: '2', name: 'Whole Wheat Bread', qty: '1', image: require('@/assets/images/bread.jpg') },
      { id: '3', name: 'Tomatoes', qty: '500 g', image: require('@/assets/images/tomato.png') },
      { id: '4', name: 'Cabbage', qty: '2', image: require('@/assets/images/cabbage.jpg') },
    ],
    time: '1:35 PM',
    date: 'July 12',
    address: '123 Main St, Springfield, IL',
    status: 'Preparing',
  },
  {
    id: '162308',
    name: 'Sunil',
    items: [
      { id: '2', name: 'Whole Wheat Bread', qty: '1', image: require('@/assets/images/bread.jpg') },
      { id: '3', name: 'Tomatoes', qty: '500 g', image: require('@/assets/images/tomato.png') },
      { id: '4', name: 'Cabbage', qty: '2', image: require('@/assets/images/cabbage.jpg') },
    ],
    time: '12:00 PM',
    date: 'June 13',
    address: 'Chennai',
    status: 'New',
  },
  {
    id: '162309',
    name: 'Navami',
    items: [
      { id: '2', name: 'Butter', qty: '21', image: require('@/assets/images/butter.jpeg') },
      { id: '2', name: 'Chocolate', qty: '1', image: require('@/assets/images/chocolate.jpeg') },
    ],
    time: '2:00 PM',
    date: 'June 13',
    address: 'Madhurai',
    status: 'Order is Ready',
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'New':
      return { backgroundColor: '#4CAF50', color: 'white' };
    case 'Preparing':
      return { backgroundColor: '#f43f5e', color: 'white' };
    case 'Order is Ready':
      return { backgroundColor: '#f44336', color: 'white' };
    default:
      return {};
  }
};

const OrderCard = ({ order, isExpanded, onPress }: any) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderText}>Order #{order.id}</Text>
        <View
          style={[
            styles.statusBox,
            { backgroundColor: getStatusStyle(order.status).backgroundColor },
          ]}
        >
          <Text style={[styles.statusText, { color: getStatusStyle(order.status).color }]}>
            {order.status}
          </Text>
        </View>
      </View>

      <Text style={styles.nameText}>{order.name}</Text>
      <Text style={styles.addressText}>{order.address}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.timeText}>{order.time}</Text>
        <Text style={styles.timeText}>{order.date}</Text>
      </View>

      {isExpanded && (
        <View style={styles.detailBox}>
          <Text style={styles.itemsTitle}>Items</Text>
          {order.items.map((item: any) => (
            <View key={item.id} style={styles.itemRow}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
              <Text style={styles.itemQty}>{item.qty}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  </TouchableOpacity>
);

export default function OrdersScreen() {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const router = useRouter();

  const handlePress = (order: any) => {
    if (order.name === 'Karthick') {
      router.push('/settingspage');
    } else {
      setExpandedOrderId(expandedOrderId === order.id ? null : order.id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#C7E62B" barStyle="dark-content" />

      {/* Header with Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/storeproduct')}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.logo}>Nearby</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <Text style={styles.title}>ORDERS</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            isExpanded={expandedOrderId === item.id}
            onPress={() => handlePress(item)}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#C7E62B',
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
  },
  logo: { color: '#000', fontSize: 22, fontWeight: 'bold' },
  title: { fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginTop: 10 },
  list: { padding: 10 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  orderText: { fontWeight: 'bold', fontSize: 16 },
  statusBox: { borderRadius: 5, paddingHorizontal: 8, paddingVertical: 2 },
  statusText: { fontWeight: '600', fontSize: 12 },
  nameText: { marginTop: 6, fontSize: 16, fontWeight: '600' },
  addressText: { color: '#666', fontSize: 13, marginTop: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  timeText: { color: '#777', fontSize: 12 },
  detailBox: { marginTop: 10, backgroundColor: '#f9f9f9', padding: 8, borderRadius: 8 },
  itemsTitle: { fontWeight: 'bold', fontSize: 14, marginVertical: 6 },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  itemImage: { width: 40, height: 40, borderRadius: 4, marginRight: 10 },
  itemName: { fontSize: 14, color: '#333' },
  itemQty: { fontSize: 14, color: '#333', fontWeight: '500' },
});
