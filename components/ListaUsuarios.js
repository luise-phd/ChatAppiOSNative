import React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import * as BackgroundFetch from 'expo-background-fetch';
// import * as TaskManager from 'expo-task-manager';

// const BACKGROUND_FETCH_TASK = 'background-fetch';

/*TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  // Aquí debes realizar tu lógica de fondo
  const now = Date.now();
  console.log(`Tarea en segundo plano ejecutada en: ${new Date(now).toISOString()}`);

  // Agregar notificación
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Tarea en segundo plano ejecutada',
      body: 'Revisa la consola para más detalles.',
    },
    trigger: null,
  });

  return BackgroundFetch.BackgroundFetchResult.NewData;
});

async function registerBackgroundFetchAsync() {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 0.001,
      stopOnTerminate: false,
      startOnBoot: true,
    });
    console.log('Tarea en segundo plano registrada con éxito.');
  } catch (error) {
    console.error('Error al registrar la tarea en segundo plano:', error);
  }
}

async function unregisterBackgroundFetchAsync() {
  await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}*/

import Axios from 'axios';
// Axios.defaults.baseURL = 'http://192.168.20.23:4000';
Axios.defaults.baseURL = 'http://192.168.20.146:4000';
// Axios.defaults.baseURL = 'https://backchatapp-production.up.railway.app'

/*import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});*/

const Separator = () => <View style={styles.separator} />;

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUsuarios = async () => {
    const id = await AsyncStorage.getItem('idUsuario');
    const token = await AsyncStorage.getItem('token');
    try {
      const respuesta = await Axios.get(`/usuarios/buscar/${id}`, {
        headers: {autorizacion: token},
      });
      setPhone(respuesta.data.phone);

      // eslint-disable-next-line prettier/prettier
      const respuesta2 = await Axios.get(`/usuarios/listarUsuariosConMensajes/${phone}`, {
          headers: {autorizacion: token},
      });

      const usuariosActivos = respuesta2.data.usuarios.filter(usuario => {
        return usuario.state === 'Activo' && usuario._id !== id;
      });
      setUsuarios(usuariosActivos);
    } catch (error) {
      // Verificar error de Axios
      // console.error(error);
    }
  };

  const totalMensajesSinLeer = usuarios.reduce(
    (total, usuario) => total + usuario.mensajesSinLeer,
    0,
  );

  const showNotification = async totalMensajesSinLeer => {
    const notificationId = 'mensajeSinLeer';

    /*await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Mensajes sin leer',
        body: `Tienes ${totalMensajesSinLeer} mensajes sin leer`,
        sound: 'default',
      },
      trigger: null,
      identifier: notificationId,
    });*/
  };

  // No solicita los permisos al usuario, algo no funciona bien
  // const checkNotificationPermissions = async () => {
  //   const settings = await Notifications.getPermissionsAsync();
  //   if (settings.granted) {
  //     console.log('Permisos de notificación otorgados.');
  //   } else {
  //     console.log('Permisos de notificación denegados.');
  //   }
  // };

  // Este código va a quedar obsoleto
  /*const checkNotificationPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status === 'granted') {
      console.log('Permisos de notificación otorgados.');
    } else {
      console.log('Permisos de notificación denegados.');
    }
  };

  const checkBackgroundTaskPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (status === 'granted') {
      console.log('Permisos de tareas en segundo plano otorgados.');
    } else {
      console.log('Permisos de tareas en segundo plano denegados.');
    }
  };*/

  // Manejador de notificaciones en primer plano
  /*const notificationForegroundListener = Notifications.addNotificationReceivedListener(notification => {
    console.log('Notificación recibida en primer plano:', notification);
    // Puedes personalizar cómo manejar la notificación aquí
  });*/

  // Manejador de notificaciones en segundo plano
  /*const notificationBackgroundListener = Notifications.addNotificationResponseReceivedListener(response => {
    console.log('Notificación recibida en segundo plano:');
    // console.log('Notificación recibida en segundo plano:', response.notification);
    // Puedes personalizar cómo manejar la notificación aquí
  });*/

  const [isRegistered, setIsRegistered] = useState(false);
  const [status, setStatus] = useState(null);

  /*const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
    if (!isRegistered) {
      // await registerBackgroundFetchAsync();
    }
    console.log(status, isRegistered);
    // registerBackgroundFetchAsync();
  };*/

  useEffect(() => {
    // checkNotificationPermissions();
    // checkBackgroundTaskPermissions();

    fetchUsuarios();
    // checkStatusAsync();

    const intervalId = setInterval(() => {
      if (totalMensajesSinLeer > 0) {
        fetchUsuarios();
      }
    }, 10000);

    // const intervalId2 = setInterval(() => {
    //   if (totalMensajesSinLeer > 0) {
    //     showNotification(totalMensajesSinLeer);
    //   }
    // }, 30000);

    return () => {
      clearInterval(intervalId);
      // clearInterval(intervalId2);
    };
  }, [fetchUsuarios, totalMensajesSinLeer]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.item, {width: deviceWidth}]}
      onPress={() => handleItemClick(item)}>
      <View style={styles.leftColumn}>
        <Text style={{fontSize: 16}}>{item.nombre}</Text>
        <Text style={{fontSize: 14}}>{item.phone}</Text>
      </View>
      <Text style={{fontSize: 14}}>
        {item.mensajesSinLeer > 0 ? item.mensajesSinLeer : ''}
      </Text>
    </TouchableOpacity>
  );

  const handleItemClick = item => {
    navigation.navigate('VerMensajes', {
      phoneOrigen: phone,
      phoneDestino: item.phone,
    });
  };

  const deviceWidth = Dimensions.get('window').width - 10;

  return (
    <View style={styles.container}>
      <FlatList
        data={usuarios}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    margin: 2,
  },
  leftColumn: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
});

export default ListaUsuarios;
