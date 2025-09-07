// src/services/duenos.ts
import axios from "axios";

const API_URL = "http://localhost:3000/api"; // ajusta la URL si es diferente

export const apiService = {
  crearDueno: (data: {
    nombre: string;
    apellido: string;
    rut: string;
    email: string;
    telefono?: string;
    password: string;
  }) => {
    return axios.post(`${API_URL}/duenos`, data);
  },

  loginDueno: (data: {
    rut: string;
    password: string;
  }) => {
    return axios.post(`${API_URL}/duenos/login`, data);
  }
};
