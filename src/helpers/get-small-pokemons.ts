import type { PokemonListResponse, SmallPokemon } from "~/interfaces";

export const getSmallPokemons = async (offset = 0, limit = 10): Promise<SmallPokemon[]> => {
  const data: PokemonListResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).then(r => r.json());

  return data.results.map(({ url, name }) => ({
    id: url.split('/').at(-2)!,
    name
  }));
}
