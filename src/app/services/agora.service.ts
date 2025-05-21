import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import AgoraRTC, {
  IAgoraRTCClient,
  ILocalVideoTrack,
  ILocalAudioTrack,
  IRemoteVideoTrack
} from 'agora-rtc-sdk-ng';

@Injectable({
  providedIn: 'root'
})
export class AgoraService {
  client: IAgoraRTCClient;
  localAudioTrack: ILocalAudioTrack | null = null;
  localVideoTrack: ILocalVideoTrack | null = null;
  isConnected: boolean = false; // Control de estado de conexión

  constructor(private toastCtrl: ToastController) {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    // Configurar handlers globales
    this.setupRemoteHandlers();

    // Manejador de errores global de Agora
    this.client.on('exception', async (evt) => {
      if (evt.code === 2003) {
        const toast = await this.toastCtrl.create({
          message: 'Red débil: calidad de audio reducida.',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
    });
  }

  // Configurar eventos para manejar usuarios remotos
  private setupRemoteHandlers() {
    this.client.on('user-published', async (user, mediaType) => {
      try {
        await this.client.subscribe(user, mediaType);
        if (mediaType === 'video') {
          const remoteVideoTrack = user.videoTrack as IRemoteVideoTrack;
          const container = document.createElement('div');
          container.id = `user-${user.uid}`;
          container.style.width = '100%';
          container.style.height = '300px';
          container.style.marginTop = '10px';
          document.getElementById('remote-container')?.appendChild(container);
          remoteVideoTrack.play(container);
        }
      } catch (err) {
        console.error('Error al suscribirse al usuario remoto:', err);
      }
    });

    this.client.on('user-unpublished', (user) => {
      const remoteElement = document.getElementById(`user-${user.uid}`);
      if (remoteElement) remoteElement.remove();
    });
  }

  // Método para unirse al canal
  async join(appId: string, channel: string, uid: string) {
    if (this.isConnected) {
      console.log('Ya está conectado.');
      return;
    }

    try {
      await this.client.join(appId, channel, null, uid);

      // Crear y publicar pistas locales
      const [audioTrack, videoTrack] = await Promise.all([
        AgoraRTC.createMicrophoneAudioTrack({ encoderConfig: 'high_quality' }),
        AgoraRTC.createCameraVideoTrack()
      ]);

      this.localAudioTrack = audioTrack;
      this.localVideoTrack = videoTrack;

      await this.client.publish([audioTrack, videoTrack]);

      // Reproducir video local
      videoTrack.play('local-player');

      this.isConnected = true;
    } catch (error) {
      console.error('Error al unirse a la llamada:', error);
      const toast = await this.toastCtrl.create({
        message: 'No se pudo unir a la llamada.',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();

      // Reintentar conexión
      setTimeout(() => this.join(appId, channel, uid), 5000);
    }
  }

  // Salir del canal
  async leave() {
    try {
      // Detener pistas
      this.localAudioTrack?.close();
      this.localVideoTrack?.close();

      await this.client.leave();

      // Limpiar contenedor remoto
      const remoteContainer = document.getElementById('remote-container');
      if (remoteContainer) {
        remoteContainer.innerHTML = '';
      }

      this.isConnected = false;
    } catch (error) {
      console.error('Error al salir de la llamada:', error);
      const toast = await this.toastCtrl.create({
        message: 'No se pudo salir de la llamada.',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  // Silenciar y reactivar audio
  muteAudio() {
    this.localAudioTrack?.setEnabled(false);
  }

  unmuteAudio() {
    this.localAudioTrack?.setEnabled(true);
  }

  // Deshabilitar y habilitar video
  disableVideo() {
    this.localVideoTrack?.setEnabled(false);
  }

  enableVideo() {
    this.localVideoTrack?.setEnabled(true);
  }
}
