import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from "@builder.io/qwik"
import { PokemonGameContext, type PokemonGameState } from "./pokemon-game.context";
import { PokemonListContext, type PokemonListState } from "./pokemon-list.context";

export const PokemonProvider = component$(() => {
  const pokemonGame = useStore<PokemonGameState>({
    pokemonId: 1,
    isPokemonVisible: false,
    isBackImage: false
  });
  const pokemonList = useStore<PokemonListState>({
    currentPage: 0,
    loadingPage: false,
    pokemons: []
  });

  useContextProvider(PokemonGameContext, pokemonGame);
  useContextProvider(PokemonListContext, pokemonList);

  useVisibleTask$(() => {
    const data = localStorage.getItem('pokemon-game');
    if (data) {
      const {
        pokemonId = 0,
        isPokemonVisible = false,
        isBackImage = false
      }: PokemonGameState = JSON.parse(data);

      pokemonGame.pokemonId = pokemonId;
      pokemonGame.isPokemonVisible = isPokemonVisible;
      pokemonGame.isBackImage = isBackImage;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => [pokemonGame.isBackImage, pokemonGame.isPokemonVisible, pokemonGame.pokemonId]);

    localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame));
  });


  return <Slot />;
});
