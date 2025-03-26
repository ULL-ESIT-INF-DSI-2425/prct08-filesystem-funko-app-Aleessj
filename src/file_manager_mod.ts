import * as fs from 'fs';
import * as path from 'path';

/**
 * Clase FileManagerMod contiene metodo para listar ficheros.
 */
class FileManagerMod {
  /**
   * Constructor por defecto
   */
  constructor() {}

  /**
   * Lista los ficheros de la ruta seleccionada.
   * @param user_path - Ruta de la se muestran los ficheros.
   */
  listDirectoryFiles(user_path: string): void {
    fs.access(user_path, (err) => {
      if (err) console.log("La ruta no existe.");

      fs.readdir(user_path, (err, files) => {
        if (err) console.log("Error al leer la ruta.");
        files.forEach(file => {
          fs.stat(file, (err, stats) => {
            if (err) console.log("Error al leer el fichero o directorio.");
            if (typeof stats !== "undefined") {
              console.log(`${file} - Size: ${stats.size} - ModTime: ${stats.mtime}`);
            }
          });
        });
      });
    });
  }
  /**
   * Elimina una ruta o fichero.
   * @param rute - Ruta a eliminar.
   * @param other_rute - Ruta a enviar lo eliminado (papelera).
   */
  deleteFile(rute: string, other_rute: string) {
    fs.cp(rute, other_rute, (err) => {
      if (err) console.log("La ruta no existe.");
      console.log(`Copiado a ruta ${other_rute}`);
    }); 

    fs.rm(rute, (err) => {
      if (err) console.log("La ruta no existe.");
      console.log(`Archivo o ruta eliminado ${rute}`);
    });
  }
}

let fm = new FileManagerMod();

fm.listDirectoryFiles("../");
fm.deleteFile("../prct08-filesystem-funko-app-Aleessj/data/Alexander/ex.txt", "");