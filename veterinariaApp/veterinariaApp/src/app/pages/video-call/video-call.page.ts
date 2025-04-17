import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; // Asegúrate de importar NavController
import AgoraRTC, { IAgoraRTCClient, ICameraVideoTrack, IMicrophoneAudioTrack } from 'agora-rtc-sdk-ng';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.page.html',
  styleUrls: ['./video-call.page.scss'],
  standalone: false
})
export class VideoCallPage implements OnInit, OnDestroy {
  private client: IAgoraRTCClient;
  private localAudioTrack!: IMicrophoneAudioTrack;
  private localVideoTrack!: ICameraVideoTrack;
  private APP_ID = 'c109f0586a9f40a78b72a62efc0ddc98'; // App ID de Agora
  private CHANNEL_NAME = 'test-channel';
  private TOKEN = null;

  constructor(private navCtrl: NavController) { // Inyectamos NavController
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  }

  async ngOnInit() {
    // Puedes llamar initAgora aquí si quieres iniciar al entrar
  }

  async initAgora() {
    try {
      await this.client.join(this.APP_ID, this.CHANNEL_NAME, this.TOKEN, null);
      this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      this.localVideoTrack = await AgoraRTC.createCameraVideoTrack();

      await this.client.publish([this.localAudioTrack, this.localVideoTrack]);

      const videoContainer = document.getElementById('local-video');
      if (videoContainer) {
        this.localVideoTrack.play(videoContainer);
      }
    } catch (error) {
      console.error('Error al iniciar Agora:', error);
    }
  }

  async leaveChannel() {
    if (this.localAudioTrack) {
      this.localAudioTrack.close();
    }
    if (this.localVideoTrack) {
      this.localVideoTrack.close();
    }
    await this.client.leave();
  }

  ngOnDestroy() {
    this.leaveChannel();
  }

  // Método para volver a la página de inicio
  volverInicio() {
    this.navCtrl.navigateBack('/bienvenida');  // Navega a la página de bienvenida
  }
}
