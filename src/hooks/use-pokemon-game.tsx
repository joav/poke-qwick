import { $, useComputed$, useContext } from "@builder.io/qwik";
import { PokemonGameContext } from "~/context";

export const usePokemonGame = () => {
  const pokemonGame = useContext(PokemonGameContext);

  const changePokemonId = $((value: number) => {
    if (pokemonGame.pokemonId + value <= 0) return;

    pokemonGame.isBackImage = false;
    // isVisible.value = false;
    pokemonGame.pokemonId += value;
  });

  const spin = $(() => pokemonGame.isBackImage = !pokemonGame.isBackImage);
  const toggleVisible = $(() => pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible);

  return {
    pokemonId: useComputed$(() => pokemonGame.pokemonId),
    isBackImage: useComputed$(() => pokemonGame.isBackImage),
    isPokemonVisible: useComputed$(() => pokemonGame.isPokemonVisible),
    nextPokemon: $(() => changePokemonId(1)),
    prevPokemon: $(() => changePokemonId(-1)),
    spin,
    toggleVisible,
  };
};
