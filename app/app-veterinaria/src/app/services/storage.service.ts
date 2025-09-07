import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create(); // Crea la instancia de almacenamiento al inicio
  }

  // Guardar datos genéricos
  async set(key: string, value: any) {
    try {
      await this.storage.set(key, value);
      console.log(`Guardado en el storage: ${key}`, value);
    } catch (error) {
      console.error(`Error al guardar ${key}:`, error);
    }
  }

  // Obtener datos genéricos
  async get(key: string) {
    try {
      const value = await this.storage.get(key);
      console.log(`Recuperado del storage: ${key}`, value);
      return value;
    } catch (error) {
      console.error(`Error al obtener ${key}:`, error);
      return null;
    }
  }

  // ✅ Obtener usuario por correo
  async getUsuario(correo: string): Promise<any> {
    const usuarios = await this.get('usuarios') || [];
    return usuarios.find((u: any) => u.correo === correo); // Busca el usuario por correo
  }

  // ✅ Actualizar datos de un usuario
  async actualizarUsuario(correo: string, nuevoUsuario: any): Promise<void> {
    let usuarios = await this.get('usuarios') || [];
    const index = usuarios.findIndex((u: any) => u.correo === correo);
    
    if (index !== -1) {
      usuarios[index] = { ...usuarios[index], ...nuevoUsuario };
      await this.set('usuarios', usuarios); // Actualiza los usuarios en el storage
    }
  }

  // Guardar o actualizar mascotas
  async saveOrUpdateMascota(correo: string, mascota: any) {
    let mascotas = await this.get(`mascotas_${correo}`);
    if (!mascotas) {
      mascotas = [];
    }

    if (mascota.id) {
      const index = mascotas.findIndex((m: any) => m.id === mascota.id);
      if (index !== -1) {
        mascotas[index] = { ...mascotas[index], edad: mascota.edad };
      }
    } else {
      mascota.id = new Date().getTime(); // ID único
      mascotas.push(mascota);
    }

    await this.set(`mascotas_${correo}`, mascotas);
  }

  // Obtener mascotas
  async getMascotas(correo: string) {
    return await this.get(`mascotas_${correo}`);
  }

  // Guardar o actualizar historial
  async saveOrUpdateHistorial(correo: string, mascotaNombre: string, historial: any[]) {
    const key = `historial_${correo}_${mascotaNombre}`;
    await this.set(key, historial);
  }

  // Obtener historial
  async getHistorial(correo: string, mascotaNombre: string) {
    const key = `historial_${correo}_${mascotaNombre}`;
    return await this.get(key);
  }

  // Agregar ítem al historial
  async addHistorialItem(correo: string, mascotaNombre: string, nuevoItem: any) {
    const key = `historial_${correo}_${mascotaNombre}`;
    let historial = await this.get(key);
    if (!historial) {
      historial = [];
    }
    historial.push(nuevoItem);
    await this.set(key, historial);
  }

  // ✅ Eliminar clave del storage (por ejemplo para cerrar sesión)
  async remove(key: string): Promise<void> {
    try {
      await this.storage.remove(key);
      console.log(`Clave eliminada del storage: ${key}`);
    } catch (error) {
      console.error(`Error al eliminar ${key}:`, error);
    }
  }
}
