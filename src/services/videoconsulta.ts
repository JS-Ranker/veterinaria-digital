import AgoraRTC, {
  IAgoraRTCClient,
  ILocalVideoTrack,
  ILocalAudioTrack,
  IRemoteVideoTrack,
  UID,
} from "agora-rtc-sdk-ng";

export class AgoraService {
  client: IAgoraRTCClient;
  localAudioTrack: ILocalAudioTrack | null = null;
  localVideoTrack: ILocalVideoTrack | null = null;
  isConnected: boolean = false;

  constructor() {
    this.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    this.setupRemoteHandlers();
  }

  private setupRemoteHandlers() {
    this.client.on("user-published", async (user, mediaType) => {
      try {
        await this.client.subscribe(user, mediaType);
        if (mediaType === "video") {
          const remoteVideoTrack = user.videoTrack as IRemoteVideoTrack;
          const container = document.createElement("div");
          container.id = `user-${user.uid}`;
          container.style.width = "100%";
          container.style.height = "300px";
          container.style.marginTop = "10px";
          document.getElementById("remote-container")?.appendChild(container);
          remoteVideoTrack.play(container);
        }
      } catch (err) {
        console.error("Error al suscribirse al usuario remoto:", err);
      }
    });

    this.client.on("user-unpublished", (user) => {
      const remoteElement = document.getElementById(`user-${user.uid}`);
      if (remoteElement) remoteElement.remove();
    });

    this.client.on("exception", (evt) => {
      if (evt.code === 2003) {
        console.warn("Red débil: calidad de audio reducida.");
      }
    });
  }

  async join(appId: string, channel: string, uid: UID | null = null) {
    if (this.isConnected) {
      console.log("Ya está conectado.");
      return;
    }

    try {
      await this.client.join(appId, channel, null, uid);

      const [audioTrack, videoTrack] = await Promise.all([
        AgoraRTC.createMicrophoneAudioTrack({ encoderConfig: "high_quality" }),
        AgoraRTC.createCameraVideoTrack(),
      ]);

      this.localAudioTrack = audioTrack;
      this.localVideoTrack = videoTrack;

      await this.client.publish([audioTrack, videoTrack]);

      videoTrack.play("local-player");

      this.isConnected = true;
    } catch (error) {
      console.error("Error al unirse a la llamada:", error);
      setTimeout(() => this.join(appId, channel, uid), 5000);
    }
  }

  async leave() {
    try {
      this.localAudioTrack?.close();
      this.localVideoTrack?.close();
      await this.client.leave();

      const remoteContainer = document.getElementById("remote-container");
      if (remoteContainer) {
        remoteContainer.innerHTML = "";
      }

      this.isConnected = false;
    } catch (error) {
      console.error("Error al salir de la llamada:", error);
    }
  }

  muteAudio() {
    this.localAudioTrack?.setEnabled(false);
  }

  unmuteAudio() {
    this.localAudioTrack?.setEnabled(true);
  }

  disableVideo() {
    this.localVideoTrack?.setEnabled(false);
  }

  enableVideo() {
    this.localVideoTrack?.setEnabled(true);
  }
}
