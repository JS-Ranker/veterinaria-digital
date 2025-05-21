import { Component } from '@angular/core';
import { AgoraService } from 'src/app/services/agora.service';
import AgoraRTC, { ILocalVideoTrack, IRemoteAudioTrack, IRemoteVideoTrack } from 'agora-rtc-sdk-ng';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

const APP_ID = 'e83d68a7ae864d4a9e920fcaae47fcd5';

@Component({
  selector: 'app-videollamada',
  templateUrl: './videollamada.page.html',
  styleUrls: ['./videollamada.page.scss'],
  standalone: false
})
export class VideollamadaPage {
  inCall = false;
  isMuted = false;
  isCameraOff = false;
  isLocalSpeaking = false;
  isSharingScreen = false;
  usuarioRemotoConectado = false;
  channelName: string = '';
  screenShareButtonLabel = 'Compartir pantalla';

  private localVideoTrack: ILocalVideoTrack | null = null;
  private screenVideoTrack: ILocalVideoTrack | null = null;

  constructor(
    private agora: AgoraService,
    private androidPermissions: AndroidPermissions
  ) {}

  ionViewDidEnter() {
    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.CAMERA,
      this.androidPermissions.PERMISSION.RECORD_AUDIO,
    ]);
  }

  async startCall() {
    const uid = String(Math.floor(Math.random() * 10000));

    setTimeout(async () => {
      await this.agora.join(APP_ID, this.channelName, uid);
      this.inCall = true;

      this.agora.client.enableAudioVolumeIndicator();
      this.agora.client.on('volume-indicator', volumes => {
        volumes.forEach(v => {
          if (v.uid === uid) {
            this.isLocalSpeaking = v.level > 5;
          } else {
            const el = document.getElementById(`user-${v.uid}`);
            if (el) el.parentElement?.classList.toggle('speaking', v.level > 5);
          }
        });
      });

      this.agora.client.on('user-published', async (user, mediaType) => {
        await this.agora.client.subscribe(user, mediaType);

        if (mediaType === 'video') {
          const remoteVideoTrack = user.videoTrack as IRemoteVideoTrack;
          const remoteVideo = document.getElementById('remoteVideo');
          if (remoteVideo) {
            remoteVideoTrack.play(remoteVideo);
            remoteVideo.style.display = 'block';
            this.usuarioRemotoConectado = true;
            this.updateVideoLayout();
          }
        } else if (mediaType === 'audio') {
          const remoteAudioTrack = user.audioTrack as IRemoteAudioTrack;
          if (remoteAudioTrack) {
            remoteAudioTrack.play();
          } else {
            console.log('No audio track available for user ' + user.uid);
          }
        }
      });

      setInterval(() => this.updateGridLayout(), 1000);
      setInterval(() => this.updateSignalIcons(), 5000);
    }, 500);
  }

  async leaveCall() {
    await this.agora.leave();
    this.inCall = false;
    this.isMuted = false;
    this.isCameraOff = false;
    this.isLocalSpeaking = false;
    this.isSharingScreen = false;
    this.usuarioRemotoConectado = false;
    this.screenShareButtonLabel = 'Compartir pantalla';
    this.updateVideoLayout();

    if (this.localVideoTrack) {
      this.localVideoTrack.close();
      this.localVideoTrack = null;
    }

    if (this.screenVideoTrack) {
      this.screenVideoTrack.close();
      this.screenVideoTrack = null;
    }

    const remoteVideo = document.getElementById('remoteVideo');
    if (remoteVideo) {
      remoteVideo.style.display = 'none';
    }
  }

  toggleMic() {
    this.isMuted ? this.agora.unmuteAudio() : this.agora.muteAudio();
    this.isMuted = !this.isMuted;
  }

  toggleVideo() {
    this.isCameraOff ? this.agora.enableVideo() : this.agora.disableVideo();
    this.isCameraOff = !this.isCameraOff;
  }

  async shareScreen() {
    const screenResult = await AgoraRTC.createScreenVideoTrack({});
    let screenVideoTrack: ILocalVideoTrack;
    if (Array.isArray(screenResult)) {
      [screenVideoTrack] = screenResult;
    } else {
      screenVideoTrack = screenResult;
    }

    this.localVideoTrack = this.agora.localVideoTrack;

    await this.agora.client.unpublish([this.agora.localVideoTrack!]);
    this.agora.localVideoTrack?.close();

    await this.agora.client.publish([screenVideoTrack]);
    screenVideoTrack.play('local-player');

    this.screenVideoTrack = screenVideoTrack;
    this.isSharingScreen = true;
    this.screenShareButtonLabel = 'Detener compartir pantalla';
  }

  async stopScreenShare() {
    if (this.screenVideoTrack) {
      this.agora.client.unpublish([this.screenVideoTrack]);
      this.screenVideoTrack.close();
      this.screenVideoTrack = null;

      if (!this.isCameraOff) {
        const videoTrack = await AgoraRTC.createCameraVideoTrack();
        this.agora.localVideoTrack = videoTrack;
        await this.agora.client.publish([videoTrack]);
        videoTrack.play('local-player');
        this.localVideoTrack = videoTrack;
      }

      this.isSharingScreen = false;
      this.screenShareButtonLabel = 'Compartir pantalla';
    }
  }

  private updateGridLayout() {
    const count = document.querySelectorAll('#remote-container .participant').length + 1;
    const cols = Math.ceil(Math.sqrt(count));
    (document.getElementById('remote-container') as HTMLElement).style.gridTemplateColumns =
      `repeat(${cols}, 1fr)`;
  }

  private updateSignalIcons() {
    const statsMap = this.agora.client.getRemoteAudioStats();
    Object.entries(statsMap).forEach(([uid, stat]) => {
      const bars = Math.min(4, Math.floor((stat.receiveBitrate ?? 0) / 50));
      const iconEl = document.querySelector(`#user-${uid} .signal-icon`);
      if (iconEl) iconEl.textContent = '📶'.repeat(bars);
    });
  }

  private updateVideoLayout() {
    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');

    if (localVideo && remoteVideo) {
      if (this.usuarioRemotoConectado) {
        localVideo.className = 'local-video small';
        remoteVideo.className = 'remote-video fullscreen';
        remoteVideo.style.display = 'block';
      } else {
        localVideo.className = 'local-video fullscreen';
        remoteVideo.className = 'remote-video fullscreen';
        remoteVideo.style.display = 'none';
      }
    }
  }
}
