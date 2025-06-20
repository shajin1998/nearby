import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';

const PartnerLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Login clicked:', email, password);
    // navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Image
          source={require('@/assets/images/cart.jpg')}
          style={styles.logo}
        />
        <Text style={styles.title}>STORE{'\n'}PARTNER</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.loginText}>Login</Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 140,
    height: 120,
    marginTop: -30,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  form: {},
  loginText: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#C7E62B', 
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  forgotText: {
    textAlign: 'right',
    color: '#666',
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: '#C7E62B', 
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#000', 
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PartnerLoginScreen;
