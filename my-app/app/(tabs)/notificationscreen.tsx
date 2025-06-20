import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const notifications = [
  { id: '1', type: 'New order', desc: 'You have received a new order.', time: '2m' },
  { id: '2', type: 'New order', desc: 'You have received a new order.', time: '4m' },
  { id: '3', type: 'New order', desc: 'You have received a new order.', time: '7m' },
  { id: '4', type: 'Payment', desc: 'Verdant Farms from a completed order.', time: '12:30 PM', date: 'Yesterday' },
  { id: '5', type: 'Please update', desc: 'your product catalog.', time: '2d ago', date: 'This Week' },
];

const NotificationScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <View style={styles.iconContainer}>
        {item.type === 'New order' && <Ionicons name="notifications" size={20} color="#000" />}
        {item.type === 'Payment' && <Ionicons name="card" size={20} color="#000" />}
        {item.type === 'Please update' && <MaterialIcons name="error-outline" size={20} color="#000" />}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.type}</Text>
        <Text style={styles.description}>{item.desc}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <Text style={styles.sectionTitle}>Today</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            {renderItem({ item })}
            <View style={styles.separator} />
          </>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    height: 120,
    backgroundColor: '#C7E62B', 
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000', 
    marginTop: 40,
    marginLeft: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#C7E62B', 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: '#000',
    fontWeight: '600',
    fontSize: 15,
  },
  description: {
    color: '#777',
    fontSize: 13,
  },
  time: {
    color: '#666',
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 30,
  },
  sectionTitle: {
    color: '#000',
    fontSize: 14,
    marginBottom: 10,
    marginLeft: 30,
    marginTop: 30,
  },
});

export default NotificationScreen;
