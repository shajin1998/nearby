import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SettingsScreen = () => {
  const router = useRouter(); // ✅ Expo Router

  const handleBack = () => {
    router.push('/Orderscreen'); // Back arrow navigation
  };

  const handleProfile = () => {
    router.push('/profilescreen'); // Profile navigation
  };

  const handleStoreDetails = () => {
    router.push('/storedetails'); // Store Details navigation
  };

  const handleNotifications = () => {
    router.push('/notificationscreen'); // Notifications navigation
  };

  const handlePayment = () => {
    router.push('/paymentmethod'); // Payment navigation
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SETTINGS</Text>
      </View>

      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleProfile}>
          <Image
            source={require('@/assets/images/profile.jpeg')}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.name}>Karthick</Text>
        <Text style={styles.email}>karthick@gmail.com</Text>
      </View>

      <View style={styles.menuSection}>
        <MenuItem icon="person-outline" text="Profile" onPress={handleProfile} />
        <MenuItem icon="store" text="Store details" type="material" onPress={handleStoreDetails} />
        <MenuItem icon="notifications-outline" text="Notifications" onPress={handleNotifications} />
        <MenuItem icon="chatbubbles-outline" text="Chat" />
        <MenuItem icon="credit-card-outline" text="Payment" onPress={handlePayment} />
        <MenuItem icon="shield-check" text="Security" type="material-community" />
        <MenuItem icon="help-with-circle" text="Help" type="entypo" color="#C7E62B" />
      </View>
    </ScrollView>
  );
};

const MenuItem = ({ icon, text, type = 'ionicon', color = '#333', onPress }) => {
  const IconComponent = {
    ionicon: Ionicons,
    material: MaterialIcons,
    'material-community': MaterialCommunityIcons,
    entypo: Entypo,
  }[type] || Ionicons;

  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <IconComponent name={icon} size={22} color={color} style={styles.menuIcon} />
      <Text style={styles.menuText}>{text}</Text>
      <Ionicons name="chevron-forward" size={20} color="#C7E62B" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    backgroundColor: '#C7E62B', 
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    color: '#000', 
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#C7E62B', 
    marginTop: -10,
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  email: {
    color: '#666',
  },
  menuSection: {
    paddingHorizontal: 20,
    marginTop: -10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  menuIcon: {
    marginRight: 15,
    color: '#333',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});

export default SettingsScreen;
