import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemons-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';

export const usePokemonId = routeLoader$(({ params, fail }) => {
  const pokemonId = +params.id;

  if (isNaN(pokemonId)) return fail(400, {
    errorMessage: 'Estás confundido'
  });
  if (pokemonId <= 0 || pokemonId > 1281) return fail(404, {
    errorMessage: 'No se encuentra en la PokeDex'
  });

  return { pokemonId };
});

export default component$(() => {
  const result = usePokemonId();

  if ('errorMessage' in result.value) return (<>
    <p>{result.value.errorMessage}</p>
  </>);

  const { isPokemonVisible, isBackImage, flip, toggleVisible } = usePokemonGame();

  const { pokemonId } = result.value;

  return <>
    <h1>Hello Pokemon: {pokemonId}</h1>
    <PokemonImage id={pokemonId} isVisible={isPokemonVisible.value} backImage={isBackImage.value} />
    <div class="mt-2">
      <button onClick$={flip} class="btn btn-primary mr-2">Voltear</button>
      <button onClick$={toggleVisible} class="btn btn-primary">Revelar</button>
    </div>
  </>;
});
