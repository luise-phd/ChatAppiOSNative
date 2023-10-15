/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

AppRegistry.registerComponent(appName, () => App);

// Inicializar AsyncStorage
AsyncStorage.setItem('token', 'exampleValue'); // Puedes usar cualquier clave y valor
