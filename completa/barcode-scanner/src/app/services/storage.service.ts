import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializa el almacenamiento
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Guardar dato
  async set(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value);
  }

  // Obtener dato
  async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  // Eliminar dato
  async remove(key: string): Promise<void> {
    await this._storage?.remove(key);
  }

  // Limpiar todo el almacenamiento
  async clear(): Promise<void> {
    await this._storage?.clear();
  }
}
