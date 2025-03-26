/**
 * Tipo del Funko.
 */
export type FunkoType = 'Pop!' | 'Pop! Rides' | 'Vynil Soda' | 'Vynil Gold';

/**
 * Genero del Funko.
 */
export type FunkoGenre = 'Animación' | 'Películas y TV' | 'Videojuegos' | 'Deportes' | 'Música' | 'Anime';

/**
 * Interfaz con las caracteristicas principales de un Funko.
 */
export interface Funko {
  /**
   * ID único de un Funko.
   */
  id: number;

  /**
   * Nombre del personaje del Funko.
   */
  name: string;

  /**
   * Descripción breve del Funko.
   */
  description: string;

  /**
   * Tipo del Funko.
   */
  type: FunkoType;

  /**
 * Genero del Funko.
 */
  genre: FunkoGenre;

  /**
   * Franquicia a la que pertenece el personaje.
   */
  franchise: string;

  /**
   * Número del personaje en la colección de la Franquicia.
   */
  f_number: number;

  /**
   * Bolleano que muestra si es exclusivo o no.
   */
  is_exclusive: boolean;

  /**
   * Caracteristicas especiales del Funko.
   */
  special_features: string;

  /**
   * Precio del Funko.
   */
  value: number;
}