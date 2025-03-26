import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { Funko, FunkoType, FunkoGenre } from '../models/funko';
import { UserCollection } from '../models/user_collection';

void yargs(hideBin(process.argv))
.command('add', 'Añadir un Funko', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
    name: { type: 'string', demandOption: true },
    description: { type: 'string', demandOption: true },
    type: { type: 'string', choices: ['Pop!', 'Pop! Rides', 'Vynil Soda', 'Vynil Gold'], demandOption: true },
    genre: { type: 'string', choices: ['Animación', 'Películas y TV', 'Videojuegos', 'Deportes', 'Música', 'Anime'], demandOption: true },
    franchise: { type: 'string', demandOption: true },
    f_number: { type: 'number', demandOption: true },
    is_exclusive: { type: 'boolean', demandOption: true },
    special_features: { type: 'string', demandOption: true },
    value: { type: 'number', demandOption: true },
  }, (args) => {
    const collection = new UserCollection(args.user);
    const funko: Funko = {
      id: args.id,
      name: args.name,
      description: args.description,
      type: args.type as FunkoType,
      genre: args.genre as FunkoGenre,
      franchise: args.franchise,
      f_number: args.f_number,
      is_exclusive: args.is_exclusive,
      special_features: args.special_features,
      value: args.value
    };
    collection.addFunko(funko);
  })

  .command('update', 'Actualizar un Funko', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
    name: { type: 'string', demandOption: true },
    description: { type: 'string', demandOption: true },
    tipo: { type: 'string', choices: ['Pop!', 'Pop! Rides', 'Vynil Soda', 'Vynil Gold'], demandOption: true },
    genre: { type: 'string', choices: ['Animación', 'Películas y TV', 'Videojuegos', 'Deportes', 'Música', 'Ánime'], demandOption: true },
    franchise: { type: 'string', demandOption: true },
    f_number: { type: 'number', demandOption: true },
    is_exclusive: { type: 'boolean', demandOption: true },
    special_features: { type: 'string', demandOption: true },
    value: { type: 'number', demandOption: true },
  }, (args) => {
    const coleccion = new UserCollection(args.user);
    const funko: Funko = {
      id: args.id,
      name: args.name,
      description: args.description,
      type: args.type as FunkoType,
      genre: args.genre as FunkoGenre,
      franchise: args.franchise,
      f_number: args.f_number,
      is_exclusive: args.is_exclusive,
      special_features: args.special_features,
      value: args.value,
    };
    coleccion.updateFunko(funko);
  })

  .command('remove', 'Eliminar un Funko', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
  }, (args) => {
    const coleccion = new UserCollection(args.user);
    coleccion.removeFunko(args.id);
  })

  .command('list', 'Listar Funkos de un usuario', {
    user: { type: 'string', demandOption: true },
  }, (args) => {
    const coleccion = new UserCollection(args.user);
    coleccion.listCollection();
  })

  .command('show', 'Mostrar un Funko por ID', {
    user: { type: 'string', demandOption: true },
    id: { type: 'number', demandOption: true },
  }, (args) => {
    const coleccion = new UserCollection(args.user);
    coleccion.showFunko(args.id);
  })

  .command('clear', 'Eliminar todos los Funkos de un usuario', {
    user: { type: 'string', demandOption: true },
  }, (args) => {
    const coleccion = new UserCollection(args.user);
    coleccion.clearCollection();
  })

  .help()
  .argv;