import { component$, useContext } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemons-image';
import { PokemonGameContext } from '~/context';

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
  // const { params: { id } } = useLocation();
  const result = usePokemonId();
  const pokemonGame = useContext(PokemonGameContext);


  if ('errorMessage' in result.value) return (<>
    <p>{result.value.errorMessage}</p>
  </>);

  const { pokemonId } = result.value;

  return <>
    <h1>Hello Pokemon: {pokemonId}</h1>
    <PokemonImage id={pokemonId} isVisible={pokemonGame.isPokemonVisible} backImage={pokemonGame.isBackImage} />
  </>;
});
