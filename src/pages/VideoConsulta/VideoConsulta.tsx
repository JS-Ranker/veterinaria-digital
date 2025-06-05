import React, { useState, useEffect } from "react";
import AgoraUIKit from "agora-react-uikit";
import { FaPhoneSlash, FaUserMd, FaPaw, FaSpinner } from "react-icons/fa";
import styles from "./VideoConsulta.module.css";
import AgoraRTC from "agora-rtc-sdk";

const VideoConsulta = () => {
  const [videoCall, setVideoCall] = useState(false);
  const [isVet, setIsVet] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Configuración de Agora
  const rtcProps = {
    appId: "e7f6e9aeecf14b2ba10e3f40be9f56e7",
    channel:
      "consultorio-veterinario-" + Math.random().toString(36).substr(2, 8), // Canal único
    token: null,
    role: (isVet ? "host" : "audience") as "host" | "audience",
  };

  const callbacks = {
    EndCall: () => {
      setVideoCall(false);
      setIsInitializing(false);
    },
  };

  const startCall = async () => {
    try {
      setIsInitializing(true);
      setError(null);

      // Pequeño delay para permitir que la UI se actualice
      await new Promise((resolve) => setTimeout(resolve, 100));

      setVideoCall(true);
    } catch (err) {
      console.error("Error al iniciar la llamada:", err);
      setError("No se pudo iniciar la videollamada. Intente nuevamente.");
      setIsInitializing(false);
    }
  };

  // Verificar si el SDK está cargado
  useEffect(() => {
    if (videoCall && !window.AgoraRTC) {
      setError("El SDK de Agora no se cargó correctamente");
      setVideoCall(false);
      setIsInitializing(false);
    }
  }, [videoCall]);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error</h2>
        <p>{error}</p>
        <button
          onClick={() => {
            setError(null);
            setIsInitializing(false);
          }}
          className={styles.retryButton}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return videoCall ? (
    <div className={styles.videoContainer}>
      <AgoraUIKit
        rtcProps={rtcProps}
        callbacks={callbacks}
        styleProps={{
          localBtnContainer: { background: "#2fb8c6" },
          remoteBtnContainer: { background: "#2fb8c6" },
          UIKitContainer: { height: "100vh", width: "100vw" },
        }}
      />
    </div>
  ) : (
    <div className={styles.preCallContainer}>
      <h1 className={styles.title}>
        <FaUserMd /> Consulta Veterinaria Virtual <FaPaw />
      </h1>

      <div className={styles.roleSelector}>
        <label className={styles.roleLabel}>
          <input
            type="checkbox"
            checked={isVet}
            onChange={() => setIsVet(!isVet)}
            className={styles.roleCheckbox}
          />
          <span>Soy el veterinario</span>
        </label>
      </div>

      <button
        onClick={startCall}
        className={styles.startButton}
        disabled={isInitializing}
      >
        {isInitializing ? (
          <>
            <FaSpinner className={styles.spinnerIcon} /> Preparando...
          </>
        ) : (
          "Iniciar Video Consulta"
        )}
      </button>

      <div className={styles.requirements}>
        <h3>Requisitos técnicos:</h3>
        <ul>
          <li>Navegador actualizado (Chrome, Firefox, Edge)</li>
          <li>Permitir acceso a cámara y micrófono</li>
          <li>Conexión estable a internet</li>
        </ul>
      </div>
    </div>
  );
};

export default VideoConsulta;
