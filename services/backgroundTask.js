import BackgroundTimer from 'react-native-background-timer';
import backgroundTask from 'react-native-background-task';

let task = 0;

BackgroundTimer.runBackgroundTimer(() => {
  try {
    task++;
    console.log('holas ' + task);
    // Realiza la lógica de tu tarea aquí
  } catch (error) {
    console.error('Error en tarea en segundo plano:', error);
  }
}, 3000);

BackgroundTimer.start();

// Configura una tarea en segundo plano
backgroundTask.define(async () => {
  // Código de la tarea en segundo plano
  console.log('Tarea en segundo plano ejecutada');
  // Asegúrate de finalizar la tarea
  backgroundTask.finish();
});

// Programa la tarea en segundo plano para que se ejecute cada 15 minutos (en segundos)
backgroundTask.schedule({
  period: 900, // 15 minutos
});
