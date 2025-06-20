import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const SettingsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SETTINGS</Text>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={require('@/assets/images/profile.jpeg')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Nilan</Text>
        <Text style={styles.email}>store@example.com</Text>
      </View>

      <View style={styles.menuSection}>
        <MenuItem icon="person-outline" text="Profile" />
        <MenuItem icon="store" text="Store details" type="material" />
        <MenuItem icon="notifications-outline" text="Notifications" />
        <MenuItem icon="chatbubbles-outline" text="Chat" />
        <MenuItem icon="credit-card-outline" text="Payment" />
        <MenuItem icon="shield-check" text="Security" type="material-community" />
        <MenuItem icon="help-with-circle" text="Help" type="entypo" color="#C7E62B" />
      </View>
    </ScrollView>
  );
};

const MenuItem = ({ icon, text, type = 'ionicon', color = '#333' }) => {
  const IconComponent = {
    ionicon: Ionicons,
    material: MaterialIcons,
    'material-community': MaterialCommunityIcons,
    entypo: Entypo,
  }[type] || Ionicons;

  return (
    <TouchableOpacity style={styles.menuItem}>
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
