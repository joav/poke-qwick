import { component$, Slot, useContextProvider, useStore, useStyles$ } from '@builder.io/qwik';

import Navbar from '~/components/shared/navbar/navbar';

import styles from './styles.css?inline';
import { PokemonGameContext, PokemonListContext } from '~/context';
import type { PokemonListState, PokemonGameState } from '~/context';

export default component$(() => {
  useStyles$(styles);

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

  return (
    <>
      <Navbar />
      <main class="flex flex-col items-center justify-center">
        <Slot />
      </main>
    </>
  );
});
