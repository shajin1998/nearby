import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const StoreDetailsScreen = () => {
  const PRIMARY_COLOR = '#C7E62B';

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>Store Details</Text>
      <Text style={styles.storeName}>Rajesh Super Mart</Text>
      <Text style={styles.address}>15th Main Road, Kochi, Kerala – 882001</Text>

      {/* Store Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>STORE INFO</Text>

        <View style={[styles.infoBox]}>
        <Ionicons name="storefront-outline" size={18} color={PRIMARY_COLOR} />
        <Text style={[styles.label, { color: 'black' }]}> Store ID:</Text>
        <Text style={[styles.value, { color: 'black' }]}> S113456</Text>
        </View>

        <View style={[styles.infoBox,]}>
          <Ionicons name="calendar-outline" size={18}  color={PRIMARY_COLOR} />
          <Text style={[styles.label, { color: 'black' }]}> Opened On:</Text>
          <Text style={[styles.value, { color: 'black' }]}> Jan 20, 2022</Text>
        </View>

        <View style={[styles.infoBox, ]}>
          <Ionicons name="time-outline" size={18} color={PRIMARY_COLOR}/>
          <Text style={[styles.label, { color: 'black' }]}> Store Timings:</Text>
          <Text style={[styles.value, { color: 'black' }]}> 9:00 AM – 9:00 PM</Text>
        </View>

        <View style={[styles.infoBox, ]}>
          <Ionicons name="call-outline" size={18} color={PRIMARY_COLOR} />
          <Text style={[styles.label, { color: 'black' }]}> Support Contact:</Text>
          <Text style={[styles.value, { color: 'black' }]}> +91 9123453789</Text>
        </View>
      </View>

      {/* Status & Operations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>STATUS & OPERATIONS</Text>
        <View style={styles.card}>
          <View style={styles.halfRow}>
            <View style={[styles.columnBox, ]}>
              <Ionicons name="checkmark-circle-outline" size={18} color={PRIMARY_COLOR} />
              <Text style={[styles.label, { color: 'black' }]}> Store Status</Text>
              <Text style={[styles.value, { color: 'black' }]}> Active</Text>
            </View>
            <View style={[styles.columnBox, ]}>
              <Feather name="credit-card" size={18} color={PRIMARY_COLOR} />
              <Text style={[styles.label, { color: 'black' }]}> Account Ending</Text>
              <Text style={[styles.value, { color: 'black' }]}> **4341</Text>
            </View>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Ionicons name="repeat-outline" size={18} color={PRIMARY_COLOR} />
            <Text style={styles.label}> Payout Cycle:</Text>
            <Text style={styles.value}> Weekly</Text>
          </View>
        </View>
      </View>

      {/* Documents */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DOCUMENTS</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Feather name="file-text" size={18} color={PRIMARY_COLOR} />
            <Text style={styles.label}> FSSAI License:</Text>
            <Text style={styles.value}> Verified</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <MaterialCommunityIcons name="file-certificate-outline" size={18} color={PRIMARY_COLOR} />
            <Text style={styles.label}> GST Number:</Text>
            <Text style={styles.value}> 27XXXXXXXXZT</Text>
          </View>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#000' }]}>
          <Text style={[styles.buttonText, { color: '#fff' }]}>Edit Store Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { borderColor: PRIMARY_COLOR, borderWidth: 1 }]}>
          <Text style={[styles.buttonText, { color: PRIMARY_COLOR }]}>Upload License</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 25, fontWeight: '600', marginBottom: 15, marginTop: 10, color:'#C7E62B' },
  storeName: { fontSize: 22, fontWeight: '700' },
  address: { fontSize: 14, color: '#666', marginBottom: 16 },

  section: { marginTop: 20 },
  sectionTitle: { fontSize: 12, fontWeight: '600', color: '#888', marginBottom: 8 },

  infoBox: {
  backgroundColor: '#FFFCF0',
  borderWidth: 1,
  borderRadius: 8,
  padding: 12,
  marginBottom: 10,
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: '#C7E62B',
},


  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  halfRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnBox: {
    width: '48%',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    backgroundColor: '#FFFCF0',
    borderColor: '#C7E62B',
  },

  label: { fontSize: 14, color: '#222', marginLeft: 6 },
  value: { fontSize: 14, color: '#555', marginLeft: 4 },

  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
  },

  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    marginBottom:20
  },
  buttonText: { fontSize: 14, fontWeight: '600' },
});

export default StoreDetailsScreen;
