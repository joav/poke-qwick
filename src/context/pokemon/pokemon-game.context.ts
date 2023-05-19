import { createContextId } from "@builder.io/qwik";

export interface PokemonGameState {
  pokemonId: number;
  isBackImage: boolean;
  isPokemonVisible: boolean;
}


export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game-context');
