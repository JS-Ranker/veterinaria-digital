import { Component } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications'; // 🔹
import { Platform } from '@ionic/angular';
import { Device } from '@capacitor/device'; // 🔹 Importar Device para obtener la versión del sistema operativo
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx'; // 🔹 Importar permisos

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private platform: Platform, private androidPermissions: AndroidPermissions) {
    if (this.platform.is('capacitor')) this.initPush();
  }

  async initPush() {
    console.log('Inicializando notificaciones push');

    const result = await PushNotifications.requestPermissions();
    if (result.receive === 'granted') {
      PushNotifications.register();
    } else {
      alert('Permiso para notificaciones no concedido');
      return;
    }

    // 🔹 Solicitar permiso para notificaciones en Android 13+ (Android 13 API nivel 33)
    if (this.platform.is('android')) {
      try {
        const deviceInfo = await Device.getInfo();
        const osVersion = parseInt(deviceInfo.osVersion, 10); // Convertir la versión a número
        if (osVersion >= 33) { // Android 13 (API nivel 33) o superior
          this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.POST_NOTIFICATIONS).then(
            (result) => {
              if (!result.hasPermission) {
                this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.POST_NOTIFICATIONS);
              }
            },
            (err) => {
              console.error('Error al comprobar el permiso de notificación:', err);
            }
          );
        }
      } catch (error) {
        console.error('Error al obtener la información del dispositivo:', error);
      }
    }

    // 🔹 Crear canal de notificación (Android 8+)
    await LocalNotifications.createChannel({
      id: 'default',
      name: 'Default',
      description: 'Canal por defecto',
      importance: 5,
      sound: 'default',
    });

    PushNotifications.addListener('registration', (token: Token) => {
      alert('Registro exitoso para notificaciones push. Token: ' + token.value);
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error en el registro: ' + JSON.stringify(error));
    });

    // 🔹 Notificación recibida con app abierta
    PushNotifications.addListener('pushNotificationReceived', async (notification: PushNotificationSchema) => {
      console.log('Notificación recibida en foreground:', notification);

      // 🔹 Pedir permisos para notificaciones locales
      await LocalNotifications.requestPermissions();

      // 🔹 Mostrar notificación local
      await LocalNotifications.schedule({
        notifications: [
          {
            id: Date.now(), // ID único
            title: notification.title ?? 'Notificación',
            body: notification.body ?? 'Has recibido una notificación',
            schedule: { at: new Date(Date.now() + 100) }, // Inmediata
            channelId: 'default', // 🔹 Asociar con canal
          },
        ],
      });
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      alert('Acción realizada con la notificación: ' + JSON.stringify(notification));
    });
  }
}
