import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Axios from 'axios';
// Axios.defaults.baseURL = 'http://192.168.20.23:4000';
Axios.defaults.baseURL = 'http://127.0.0.1:4000';
// Axios.defaults.baseURL = 'https://backchatapp-production.up.railway.app'

const Login = () => {
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const navigation = useNavigation();

  // useEffect(() => {
  //   const id = AsyncStorage.getItem('idUsuario')
  //     .then(value => {
  //       if (value !== undefined) {
  //         navigation.navigate('VerUsuarios', {phone: phone});
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error al obtener el valor:', error);
  //     });
  // }, [navigation, phone]);

  const iniciarSesion = async () => {
    try {
      const usuario = {phone, pass};
      const respuesta = await Axios.post('/usuarios/login', usuario);

      const token = respuesta.data.token;
      const nombre = respuesta.data.nombre;
      const idUsuario = respuesta.data.id;

      if (token !== undefined) {
        AsyncStorage.setItem('token', token)
          .then(() => {})
          .catch(error => {
            console.error(error);
          });

        AsyncStorage.setItem('nombre', nombre)
          .then(() => {})
          .catch(error => {
            console.error(error);
          });

        AsyncStorage.setItem('idUsuario', idUsuario)
          .then(() => {})
          .catch(error => {
            console.error(error);
          });
      }
      if (respuesta.data.mensaje !== 'Contraseña incorrecta') {
        navigation.navigate('VerUsuarios', {phone: phone});
      } else {
        Alert.alert('Datos incorrectos');
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleLogin = () => {
    iniciarSesion();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        keyboardDismissMode="on-drag">
        <Text style={styles.regularText}>Iniciar sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={phone}
          // keyboardType="numeric"
          maxLength={10}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={pass}
          onChangeText={setPass}
          secureTextEntry
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  regularText: {
    fontSize: 24,
    paddingBottom: 20,
    color: 'black',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Login;
