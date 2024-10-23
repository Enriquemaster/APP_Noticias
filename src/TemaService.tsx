// src/TemaService.tsx
import { Storage } from '@ionic/storage-angular';

class TemaService {
  private storage: Storage | null = null;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  async init() {
    await this.storage?.create();
  }

  async getTema() {
    return (await this.storage?.get('darkMode')) || false; // Devuelve false si no hay valor almacenado
  }

  async setTema(darkMode: boolean) {
    await this.storage?.set('darkMode', darkMode);
  }
}

export default TemaService;
