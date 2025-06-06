import React, { useState, useEffect, useRef } from "react";
import { AgoraService } from "C:/Users/Alvaro/Documents/GitHub/veterinaria-digital/src/services/videoconsulta";
import "./VideoConsulta.module.css";

const VideoConference: React.FC = () => {
  const [channelName, setChannelName] = useState("");
  const [inCall, setInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const agoraServiceRef = useRef<AgoraService | null>(null);

  useEffect(() => {
    // Inicializar el servicio Agora
    agoraServiceRef.current = new AgoraService();

    return () => {
      // Limpiar al desmontar
      if (agoraServiceRef.current?.isConnected) {
        agoraServiceRef.current.leave();
      }
    };
  }, []);

  const startCall = async () => {
    if (!channelName.trim()) return;

    // Reemplaza con tu App ID de Agora
    const appId = "e83d68a7ae864d4a9e920fcaae47fcd5";
    try {
      await agoraServiceRef.current?.join(appId, channelName);
      setInCall(true);
    } catch (error) {
      console.error("Error al iniciar la llamada:", error);
    }
  };

  const leaveCall = async () => {
    try {
      await agoraServiceRef.current?.leave();
      setInCall(false);
    } catch (error) {
      console.error("Error al salir de la llamada:", error);
    }
  };

  const toggleMic = () => {
    if (isMuted) {
      agoraServiceRef.current?.unmuteAudio();
    } else {
      agoraServiceRef.current?.muteAudio();
    }
    setIsMuted(!isMuted);
  };

  const toggleVideo = () => {
    if (isCameraOff) {
      agoraServiceRef.current?.enableVideo();
    } else {
      agoraServiceRef.current?.disableVideo();
    }
    setIsCameraOff(!isCameraOff);
  };

  return (
    <div className="video-conference-container">
      <header className="conference-header">
        <div className="logo-container">
          <img src="assets/img/Logo.jpeg" alt="Logo" className="logo-barra" />
        </div>
        <h1>Video-Conferencias-Veterinarias</h1>
      </header>

      <main className="conference-content">
        {/* Input del nombre del canal */}
        <div className="channel-input">
          <label htmlFor="channelName">Nombre del canal</label>
          <input
            id="channelName"
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            disabled={inCall}
          />
        </div>

        {/* GRILLA DE VIDEOS */}
        <div className="video-container">
          {/* Local Participant */}
          <div className="participant" id="user-local">
            <div id="local-player" className="video-box"></div>
            <div className="participant-footer">
              <span className="participant-name">Yo</span>
              <span className="signal-icon">📶📶📶📶</span>
            </div>
          </div>

          {/* Participantes remotos */}
          <div id="remote-container" className="remote-grid"></div>
        </div>

        {/* BOTONES */}
        <div className="controls-container">
          <div className="main-buttons">
            <button
              onClick={startCall}
              disabled={inCall || !channelName.trim()}
              className="btn btn-success"
            >
              Iniciar
            </button>
            <button
              onClick={leaveCall}
              disabled={!inCall}
              className="btn btn-danger"
            >
              Salir
            </button>
          </div>

          <div className="secondary-buttons">
            <button onClick={toggleMic} className="btn btn-control">
              <span className="icon">{isMuted ? "🎤❌" : "🎤"}</span>
              {isMuted ? "Activar micrófono" : "Silenciar micrófono"}
            </button>
            <button onClick={toggleVideo} className="btn btn-control">
              <span className="icon">{isCameraOff ? "📷❌" : "📷"}</span>
              {isCameraOff ? "Activar cámara" : "Apagar cámara"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoConference;
