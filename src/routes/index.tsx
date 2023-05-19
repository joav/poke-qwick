import { $, component$, useContext } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemons-image';
import { PokemonGameContext } from '~/context';

export default component$(() => {

  const pokemonGame = useContext(PokemonGameContext);

  // const pokemonId = useSignal(1);
  // const isBackImage = useSignal(false);
  // const isPokemonVisible = useSignal(false);
  const nav = useNavigate();

  const changePokemonId = $((value: number) => {
    if (pokemonGame.pokemonId + value <= 0) return;

    pokemonGame.isBackImage = false;
    // isVisible.value = false;
    pokemonGame.pokemonId += value;
  });

  const goToPokemon = $(async () => {
    await nav(`/pokemon/${pokemonGame.pokemonId}/`);
  });

  return (
    <>
      <span class="text-2xl">Buscador simple</span>
      <span class="text-9xl">{pokemonGame.pokemonId}</span>

      {/* <Link href={`/pokemon/${pokemonGame.pokemonId}/`}> */}
      <div onClick$={goToPokemon}>
        <PokemonImage id={pokemonGame.pokemonId} backImage={pokemonGame.isBackImage} isVisible={pokemonGame.isPokemonVisible} />
      </div>

      <div class="mt-2">
        <button onClick$={() => changePokemonId(-1)} class="btn btn-primary mr-2">Anterior</button>
        <button onClick$={() => changePokemonId(1)} class="btn btn-primary mr-2">Siguiente</button>
        <button onClick$={() => pokemonGame.isBackImage = !pokemonGame.isBackImage} class="btn btn-primary mr-2">Voltear</button>
        <button onClick$={() => pokemonGame.isPokemonVisible = !pokemonGame.isPokemonVisible} class="btn btn-primary">Revelar</button>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'PokeQwik',
    },
  ],
};
