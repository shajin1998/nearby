import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Switch,
} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const ProfileDetailsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loginType, setLoginType] = useState('Email');
  const [joinedDate, setJoinedDate] = useState(new Date('2024-06-17'));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isPreferenceOn, setIsPreferenceOn] = useState(false);

  const PRIMARY_COLOR = '#C7E62B';
  const PRIMARY_BACKGROUND_COLOR = '#FFFCF0';

  const colors = {
    background: isDarkMode ? '#121212' : '#fff',
    text: isDarkMode ? '#fff' : '#000',
    subText: isDarkMode ? '#aaa' : '#666',
    border: PRIMARY_COLOR,
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setJoinedDate(selectedDate);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: '#C7E62B' }]}>Profile Details</Text>
        <TouchableOpacity>
          <Feather name="edit-2" size={25} color='#C7E62B' />
        </TouchableOpacity>
      </View>

      {/* Profile */}
      <View style={styles.profileSection}>
        <Image
          source={require('@/assets/images/pro.jpg')}
          style={styles.profileImage}
        />
        <Text style={[styles.profileName, { color: colors.text }]}>Shreya</Text>
        <Text style={[styles.profileRole, { color: colors.subText }]}>Store Owner</Text>
      </View>

      {/* Personal Info */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.subText }]}>PERSONAL INFO</Text>

        {/* Email */}
        <View style={[styles.infoCard, { borderColor: colors.border, backgroundColor: PRIMARY_BACKGROUND_COLOR }]}>
          <TouchableOpacity style={styles.infoRow}>
            <MaterialIcons name="email" size={20} color={PRIMARY_COLOR} />
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: colors.subText }]}>Email</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>shreya@store.com</Text>
            </View>
            <Feather name="chevron-right" size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>

        {/* Phone */}
        <View style={[styles.infoCard, { borderColor: colors.border, backgroundColor: PRIMARY_BACKGROUND_COLOR }]}>
          <TouchableOpacity style={styles.infoRow}>
            <Feather name="phone" size={20} color={PRIMARY_COLOR} />
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: colors.subText }]}>Phone</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>+91 98765 42110</Text>
            </View>
            <Feather name="chevron-right" size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>

        {/* Website */}
        <View style={[styles.infoCard, { borderColor: colors.border, backgroundColor: PRIMARY_BACKGROUND_COLOR }]}>
          <TouchableOpacity style={styles.infoRow}>
            <Ionicons name="globe-outline" size={20} color={PRIMARY_COLOR} />
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: colors.subText }]}>Website</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>www.shreyastore.in</Text>
            </View>
            <Feather name="chevron-right" size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Info */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.subText }]}>ACCOUNT INFO</Text>

        {/* Store ID */}
        <View style={[styles.infoCard, { borderColor: colors.border, backgroundColor: PRIMARY_BACKGROUND_COLOR }]}>
          <View style={styles.infoRow}>
            <MaterialIcons name="store" size={20} color={PRIMARY_COLOR} />
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: colors.subText }]}>Store ID</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>SHREYA9876</Text>
            </View>
          </View>
        </View>

        {/* Login Type */}
        <View style={[styles.infoCard, { borderColor: colors.border, backgroundColor: PRIMARY_BACKGROUND_COLOR }]}>
          <View style={styles.infoRow}>
            <MaterialIcons name="login" size={20} color={PRIMARY_COLOR} />
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: colors.subText }]}>Login Type</Text>
              <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <TouchableOpacity
                  onPress={() => setLoginType('Email')}
                  style={[
                    styles.loginTypeButton,
                    {
                      backgroundColor: loginType === 'Email' ? PRIMARY_COLOR : PRIMARY_BACKGROUND_COLOR,
                      borderColor: PRIMARY_COLOR,
                    },
                  ]}
                >
                  <Text style={{ color: loginType === 'Email' ? '#000' : PRIMARY_COLOR }}>Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setLoginType('OTP')}
                  style={[
                    styles.loginTypeButton,
                    {
                      backgroundColor: loginType === 'OTP' ? PRIMARY_COLOR : PRIMARY_BACKGROUND_COLOR,
                      borderColor: PRIMARY_COLOR,
                    },
                  ]}
                >
                  <Text style={{ color: loginType === 'OTP' ? '#000' : PRIMARY_COLOR }}>OTP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Joined On with Date Picker */}
        <View
          style={[
            styles.infoCard,
            { borderColor: colors.border, backgroundColor: PRIMARY_BACKGROUND_COLOR },
          ]}
        >
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color={PRIMARY_COLOR} />
            <View style={styles.infoText}>
              <Text style={[styles.infoLabel, { color: colors.subText }]}>Joined On</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {formatDate(joinedDate)}
              </Text>
            </View>
            <Feather name="calendar" size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={joinedDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}
      </View>

       {/* KYC & Verification */}
<View style={styles.section}>
  <Text style={[styles.sectionTitle, { color: colors.subText }]}>KYC & VERIFICATION</Text>

  {/* PAN Row */}
  <View style={[styles.kycRow, { borderBottomColor: colors.border }]}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="card-outline" size={18} color={colors.text} />
      <Text style={[styles.kycLabel, { color: colors.text }]}>  PAN</Text>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={[styles.kycStatus, { color: colors.subText }]}>Verified</Text>
    </View>
  </View>

  {/* Verified / Pending Row */}
  <View style={[styles.kycRow, { borderBottomColor: colors.border }]}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="checkmark-circle-outline" size={18} color={PRIMARY_COLOR} />
      <Text style={[styles.kycLabel, { color: colors.text }]}>  Verified</Text>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={[styles.kycStatus, { color: colors.subText }]}>Pending</Text>
    </View>
  </View>

  {/* Upload KYC Docs Button */}
  <TouchableOpacity
    style={[styles.uploadButton, { borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_BACKGROUND_COLOR }]}
  >
    <Text style={[styles.uploadButtonText, { color: colors.text }]}>Upload KYC Docs</Text>
  </TouchableOpacity>
</View>


      {/* Preferences */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.subText }]}>PREFERENCES</Text>

        <View style={[styles.preferenceRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.preferenceLabel, { color: colors.text }]}>Preferences</Text>
          <Switch
            value={isPreferenceOn}
            onValueChange={(val) => setIsPreferenceOn(val)}
            thumbColor={PRIMARY_COLOR}
            trackColor={{ false: '#999', true: PRIMARY_COLOR }}
          />
        </View>

        <View style={[styles.preferenceRow, { borderBottomColor: colors.border }]}>
          <Text style={[styles.preferenceLabel, { color: colors.text }]}>Notifications</Text>
          <TouchableOpacity
            style={[styles.modeButton, { borderColor: PRIMARY_COLOR, backgroundColor: PRIMARY_BACKGROUND_COLOR }]}
            onPress={() => setIsDarkMode(!isDarkMode)}
          >
            <Text style={[styles.modeButtonText, { color: PRIMARY_COLOR }]}>
              {isDarkMode ? 'Dark' : 'Light'} / Dark
            </Text>
          </TouchableOpacity>
        </View>
      </View>

     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '600',
    
  },
  profileSection: {
    marginVertical: 12,
    marginLeft:20,
    marginTop:5
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -80,
    marginLeft:130
  },
  profileRole: {
    fontSize: 14,
    marginTop: 2,
    marginLeft:130
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 50,
  },
  sectionTitle: {
    fontSize: 12,
    marginBottom: 15,
    fontWeight: '600',
  },
  infoCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 12,
  },
  infoValue: {
    fontSize: 14,
    marginTop: 2,
  },
  loginTypeButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    marginRight: 8,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  preferenceLabel: {
    fontSize: 14,
  },
   modeButton: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  modeButtonText: {
    fontSize: 12,
  },
  kycRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 12,
  borderBottomWidth: 1,
},
kycLabel: {
  fontSize: 14,
  marginLeft: 6,
},
kycStatus: {
  fontSize: 12,
},
uploadButton: {
  borderWidth: 1,
  borderRadius: 20,
  paddingVertical: 8,
  paddingHorizontal: 16,
  marginTop: 12,
  alignSelf: 'flex-start',
},
uploadButtonText: {
  fontSize: 13,
  fontWeight: '500',
},

});

export default ProfileDetailsScreen;
