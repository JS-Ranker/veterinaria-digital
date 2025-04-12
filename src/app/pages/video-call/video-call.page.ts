import { Component, OnDestroy, OnInit } from '@angular/core';
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
  private APP_ID = 'c109f0586a9f40a78b72a62efc0ddc98'; // 🔹 Reemplaza con tu App ID de Agora
  private CHANNEL_NAME = 'test-channel'; // 🔹 Puedes cambiarlo
  private TOKEN = null; // 🔹 Deja null si la seguridad está deshabilitada

  constructor() {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  }

  async ngOnInit() {
    await this.initAgora();
  }

  async initAgora() {
    try {
      console.log("🔄 Uniéndose al canal de Agora...");
      await this.client.join(this.APP_ID, this.CHANNEL_NAME, this.TOKEN, null);
      console.log("✅ Unido al canal correctamente");

      this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      console.log("🔊 Pista de audio local creada:", this.localAudioTrack);

      this.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      console.log("📹 Pista de video local creada:", this.localVideoTrack);

      await this.client.publish([this.localAudioTrack, this.localVideoTrack]);
      console.log("📢 Publicando pistas de audio y video...");

      const videoContainer = document.getElementById('local-video');
      if (videoContainer) {
        this.localVideoTrack.play(videoContainer);
      }
    } catch (error) {
      console.error('❌ Error al iniciar Agora:', error);
    }
  }

  async leaveChannel() {
    console.log("🚪 Saliendo del canal...");
    if (this.localAudioTrack) {
      this.localAudioTrack.close();
      console.log("🔇 Pista de audio cerrada");
    }
    if (this.localVideoTrack) {
      this.localVideoTrack.close();
      console.log("📴 Pista de video cerrada");
    }
    await this.client.leave();
    console.log("✅ Salida del canal completada");
  }

  ngOnDestroy() {
    this.leaveChannel();
  }
}
