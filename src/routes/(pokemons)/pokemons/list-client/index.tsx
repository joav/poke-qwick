import { $, component$, useContext, useOnDocument, useTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemons-image';
import { PokemonListContext } from '~/context';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';

const POKEMON_LIMIT = 30;

export default component$(() => {
  const pokemonState = useContext(PokemonListContext);

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);

    const pokemons = await getSmallPokemons(pokemonState.currentPage * POKEMON_LIMIT, POKEMON_LIMIT);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.loadingPage = false;
  });

  useOnDocument('scroll', $(() => {
    const maxScroll = document.body.scrollHeight;
    const currentScroll = window.scrollY + window.innerHeight;

    if (!pokemonState.loadingPage && currentScroll + 200 >= maxScroll) {
      pokemonState.loadingPage = true;
      pokemonState.currentPage++;
    }
  }));

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span style={{ 'position': 'fixed' }}>Página actual: {pokemonState.currentPage}</span>
        <span>Está cargando: </span>
      </div>

      <div class="mt-10">
        {/* <button onClick$={() => pokemonState.currentPage--} class="btn btn-primary mr-2">Ateriores</button> */}
        <button onClick$={() => pokemonState.currentPage++} class="btn btn-primary mr-2">Siguientes</button>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-5 xl:grid-cols-7 mt-5">
        {
          pokemonState.pokemons.map(({ name, id }) => (
            <div key={name} class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={+id} />
              <span class="capitalize">{name}</span>
            </div>
          ))
        }
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Client-List',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
