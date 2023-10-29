import React from 'react';
import {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {useRoute} from '@react-navigation/native';

import ListaUsuarios from '../components/ListaUsuarios';
import Footer from '../components/Footer';

import BackgroundFetch from '../services/backgroundTask';

import {request, PERMISSIONS} from 'react-native-permissions';

// const requestLocationPermission = async () => {
//   const status = await request(PERMISSIONS.IOS.LOCATION_ALWAYS);
//   if (status === 'granted') {
//     // Permiso otorgado, puedes iniciar tareas en segundo plano que requieran acceso a la ubicación.
//     console.error('hola');
//   } else {
//     console.error('no hay permiso');
//   }
// };

export default function VerUsuarios() {
  const navigation = useNavigation();

  // requestLocationPermission();

  // backgroundTask.schedule({
  //   period: 900, // Intervalo de ejecución en segundos
  // });

  // const [phone, setPhone] = useState('');
  // const route = useRoute();
  // const telefono = route.params?.phone;

  // useEffect(() => {
  //   setPhone(telefono);
  // }, [telefono]);

  const editUsuarios = () => {
    // navigation.navigate('Login');
  };

  const editPassword = () => {
    navigation.navigate('EditPass');
  };

  return (
    <View style={styles.container}>
      {/* <Header phone={phone}/> */}
      <ListaUsuarios />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonContainer} onPress={editUsuarios}>
          <Text style={styles.buttonText}>Editar usuarios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={editPassword}>
          <Text style={styles.buttonText}>Editar contraseña</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: "center",
    // justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: 'tomato',
    padding: 5,
    borderRadius: 5,
    flex: 1, // Esto asegura que los elementos ocupen el mismo espacio
    marginRight: 1, // Espacio entre los botones
    marginLeft: 1,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row', // Esto coloca los elementos en la misma fila
    justifyContent: 'space-between', // Esto separa los elementos horizontalmente
    paddingHorizontal: 1, // Espaciado horizontal para los elementos en la fila
    marginTop: 1, // Espacio superior
    marginBottom: 1, // Espacio inferior
  },
});
