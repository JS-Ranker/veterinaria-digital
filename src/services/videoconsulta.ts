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
        // 🚫 No subscribirse a sí mismo para evitar eco
        if (user.uid === this.client.uid) return;

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

        if (mediaType === "audio") {
          const remoteAudioTrack = user.audioTrack;
          remoteAudioTrack?.play(); // ✅ Reproducir solo audio remoto
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

      // Crear solo audio primero
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
        encoderConfig: "high_quality",
      });
      this.localAudioTrack = audioTrack;

      let videoTrack: ILocalVideoTrack | null = null;
      try {
        // Intentar crear la cámara
        videoTrack = await AgoraRTC.createCameraVideoTrack();
        this.localVideoTrack = videoTrack;
        videoTrack.play("local-player");
        await this.client.publish([audioTrack, videoTrack]);
        console.log("📹 Cámara y 🎤 micrófono publicados.");
      } catch (videoError) {
        // Si falla la cámara, publicar solo audio
        console.warn(
          "⚠️ No se pudo acceder a la cámara. Solo se publicará audio."
        );
        this.localVideoTrack = null;
        await this.client.publish([audioTrack]);
      }

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
