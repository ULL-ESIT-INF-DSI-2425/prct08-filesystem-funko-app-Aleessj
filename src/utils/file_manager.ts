import * as fs from 'fs';
import * as path from 'path';

/**
 * Clase FileManager. Gestiona las operaciones con ficheros.
 * Se encarga de leer, escribir, eliminar y listar archivos JSON que representan Funkos.
 */
export class FileManager {
  /**
   * Obtiene o crea el directorio donde se almacenan los Funkos de un usuario.
   * @param username - Nombre del usuario
   * @returns - Ruta al directorio del usuario
   */
  static getUserDirectory(username: string): string {
    const user_path: string = path.join(__dirname, '../../data', username);
    if (!fs.existsSync(user_path)) fs.mkdirSync(user_path, { recursive: true });

    return user_path;
  }

  /**
   * Devuelve la ruta del archivo JSON correspondiente a un Funko específico de un usuario.
   * @param username - Nombre del usuario
   * @param funko_id - ID del Funko
   * @returns - Ruta del archivo JSON del Funko
   */
  static getFunkoPath(username: string, funko_id: number): string {
    return path.join(this.getUserDirectory(username), `${funko_id}.json`);
  }

  /**
   * Elimina un archivo JSON del sistema de ficheros si existe.
   * @param filepath - Ruta del archivo a eliminar
   */
  static deleteFile(filepath: string): void {
    if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
  }

  /**
   * Lee un archivo JSON y lo convierte a tipo T
   * @param path - Ruta al archivo
   * @returns - Contenido del archivo como tipo T
   */
  static readJSON<T>(filepath: string): T | undefined {
    if (!fs.existsSync(filepath)) return undefined;
    const content: string = fs.readFileSync(filepath, 'utf-8');

    return JSON.parse(content) as T;
  }
  
  /**
   * Escribe un dato de tipo T en un archivo JSON
   * @param path - Ruta al archivo
   * @param data - Dato a escribir
   */
  static writeJSON<T>(path: string, data: T): void {
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
  }

  /**
   * Lee todos los Funkos del directorio de un usuario.
   * @param user_direction - Ruta al directorio del usuario
   * @returns - Lista de objetos de tipo T (Funkos)
   */
  static readAllFunkos<T>(user_direction: string): T[] {
    if (!fs.existsSync(user_direction)) return [];

    return fs.readdirSync(user_direction).filter(file => file.endsWith('.json'))
    .map(file => this.readJSON<T>(path.join(user_direction, file))!).filter(Boolean);
  }
}