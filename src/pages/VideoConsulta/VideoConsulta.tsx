import React, { useState } from "react";
import AgoraUIKit from "agora-react-uikit";
import { FaPhoneSlash, FaUserMd, FaPaw } from "react-icons/fa";
import styles from "./VideoConsulta.module.css";

const VideoConsulta = () => {
  const [videoCall, setVideoCall] = useState(false);
  const [isVet, setIsVet] = useState(false);

  // Configuración con tipo seguro para role
  const rtcProps = {
    appId: "e7f6e9aeecf14b2ba10e3f40be9f56e7",
    channel: "consultorio-veterinario",
    token: null,
    role: (isVet ? "host" : "audience") as "host" | "audience",
  };

  const callbacks = {
    EndCall: () => {
      setVideoCall(false);
      console.log("Consulta finalizada");
    },
  };

  const toggleRole = () => setIsVet(!isVet);

  return videoCall ? (
    <div className={styles.videoContainer}>
      <AgoraUIKit
        rtcProps={rtcProps}
        callbacks={callbacks}
        styleProps={{
          localBtnContainer: { background: "#2fb8c6" },
          remoteBtnContainer: { background: "#2fb8c6" },
          UIKitContainer: { height: "100%", width: "100%" },
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
            onChange={toggleRole}
            className={styles.roleCheckbox}
          />
          <span>Soy el veterinario</span>
        </label>
      </div>

      <button onClick={() => setVideoCall(true)} className={styles.startButton}>
        Iniciar Video Consulta
      </button>
    </div>
  );
};

export default VideoConsulta;
