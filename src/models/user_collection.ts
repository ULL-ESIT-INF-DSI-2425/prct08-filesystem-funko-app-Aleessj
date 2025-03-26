import { Funko } from "./funko";
import { FileManager } from "../utils/file_manager";
import chalk, { ChalkInstance } from 'chalk';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Clase UserCollection. Representa la colección de Funkos de un usuario.
 * Permite agregar, eliminar, actualizar, listar y mostrar Funkos individuales.
 */
export class UserCollection {
  /**
   * Crea una nueva colección para un usuario.
   * @param username - Nombre del usuario propietario de la colección.
   */
  constructor(private username: string) {}
  
  /**
   * Obtiene el path del directorio del usuario.
   * @returns - Ruta al directorio donde se almacenan los Funkos del usuario.
   */
  private getUserPath() {
    return FileManager.getUserDirectory(this.username);
  }
  
  /**
   * Obtiene la ruta del archivo JSON para un Funko dado su ID.
   * @param id - ID del Funko
   * @returns Ruta al archivo JSON del Funko
   */
  private getFunkoFilePath(id: number): string {
    return FileManager.getFunkoPath(this.username, id);
  }

  /**
   * Carga todos los Funkos del usuario desde su directorio.
   * @returns - Lista de Funkos cargados
   */
  private loadAll(): Funko[] {
    return FileManager.readAllFunkos<Funko>(this.getUserPath());
  }

  /**
   * Determina el color a usar según el valor de mercado del Funko.
   * @param value - Valor del Funko
   * @returns - Función de color de `chalk` correspondiente
   */
  private valueRanks(value: number): ChalkInstance {
    if (value >= 50) return chalk.greenBright;
    if (value < 50 && value >= 30) return chalk.blue;
    if (value < 30 && value >= 16) return chalk.yellow;
    return chalk.red; 
  }

  /**
   * Añade un Funko nuevo a la colección si no existe uno con el mismo ID.
   * @param funko - Funko a añadir
   */
  addFunko(funko: Funko): void {
    const path: string = this.getFunkoFilePath(funko.id);
    if (FileManager.readJSON(path)) {
       console.log(chalk.red(`Ya existe un Funko con ID ${funko.id}.`));
       return;
    }
    FileManager.writeJSON(this.getFunkoFilePath(funko.id), funko);
    console.log(chalk.green('Funko añadido correctamente.'));
  } 

  /**
   * Actualiza un Funko existente con nuevos datos.
   * @param funko - Funko a actualizar
   */
  updateFunko(funko: Funko): void {
    const path: string = this.getFunkoFilePath(funko.id);
    if (!FileManager.readJSON(path)) {
      console.log(chalk.red(`No existe ningún Funko con ID ${funko.id}.`));
      return;
    }
    FileManager.writeJSON(this.getFunkoFilePath(funko.id), funko);
    console.log(chalk.green('Funko actualizado correctamente.'));
  }

  /**
   * Elimina un Funko de la colección usando su ID.
   * @param id - ID del Funko a eliminar
   */
  removeFunko(id: number): void {
    const path: string = this.getFunkoFilePath(id);
    if (!FileManager.readJSON(path)) {
      console.log(chalk.red(`No existe ningún Funko con ID ${id}.`));
      return;
    }
    FileManager.deleteFile(path);
    console.log(chalk.green('Funko eliminado correctamente.'));
  }

  /**
   * Lista todos los Funkos en la colección del usuario.
   * Muestra la información de cada Funko con colores según su valor de mercado.
   */
  listCollection(): void {
    const funkos: Funko[] = this.loadAll();
    if (funkos.length === 0) {
      console.log(chalk.yellow('No hay Funkos registrados.'));
      return;
    }

    funkos.forEach(funko => {
      const color = this.valueRanks(funko.value);
      console.log(color(`[${funko.id}] ${funko.name} - ${funko.type} - ${funko.franchise} - $${funko.value}`));
    })
  }

  /**
   * Muestra los detalles completos de un Funko específico.
   * @param id - ID del Funko a mostrar
   */
  showFunko(id: number): void {
    const funko = FileManager.readJSON<Funko>(this.getFunkoFilePath(id));
    if (!funko) {
      console.log(chalk.red(`No existe ningún Funko con ID ${id}.`));
      return;
    }

    const color = this.valueRanks(funko.value);
    console.log(color(`Funko encontrado:
    ------------------------------
    ID: ${funko.id}
    Nombre: ${funko.name}
    Descripción: ${funko.description}
    Tipo: ${funko.type}
    Género: ${funko.genre}
    Franquicia: ${funko.franchise}
    Número: ${funko.f_number}
    Exclusivo: ${funko.is_exclusive ? 'Sí' : 'No'}
    Características especiales: ${funko.special_features}
    Valor de mercado: ${funko.value}€
    ------------------------------`));
  }

  /**
   * Elimina todos la colección del usuario.
   */
  clearCollection(): void {
    const user_path = this.getUserPath();
  
    if (!fs.existsSync(user_path)) {
      console.log(chalk.yellow(`El usuario ${this.username} no tiene colección.`));
      return;
    }
  
    const files = fs.readdirSync(user_path);
    if (files.length === 0) {
      console.log(chalk.yellow(`No hay Funkos para eliminar.`));
      return;
    }
  
    files.forEach(file => {
      if (file.endsWith('.json')) {
        fs.unlinkSync(path.join(user_path, file));
      }
    });
  
    console.log(chalk.green(`Colección de "${this.username}" eliminada correctamente.`));
  }
}