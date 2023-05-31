import { $, component$, useComputed$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$, useLocation } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemons-image';
import { Modal } from '~/components/shared';
import { getChatGPTResponse } from '~/helpers/get-chat-gpt-response';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import type { SmallPokemon } from '~/interfaces';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({ query, redirect, pathname }) => {
  const offset = +(query.get('offset') || 0);

  if (isNaN(offset) || offset < 0) redirect(301, pathname);

  return getSmallPokemons(offset);
});

export default component$(() => {
  const pokemons = usePokemonList();
  const location = useLocation();

  const currentOffset = useComputed$(() => +(location.url.searchParams.get('offset') || 0));


  const modal = useStore({
    visible: false,
    id: 0,
    name: '',
    openAIResponse: ''
  });

  const showModal = $((id: string, name: string) => {
    modal.id = +id;
    modal.name = name;
    modal.visible = true;
  });

  const closeModal = $(() => {
    modal.visible = false;
  });

  useVisibleTask$(async ({ track }) => {
    track(() => modal.name);
    modal.openAIResponse = '';

    if (modal.name) {
      modal.openAIResponse = await getChatGPTResponse(modal.name);
    }
  });

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Offset: {currentOffset}</span>
        <span>Está cargando página: {location.isNavigating ? 'Si' : 'No'}</span>
      </div>

      <div class="mt-10">
        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value - 10}`} class="btn btn-primary mr-2">Ateriores</Link>
        <Link href={`/pokemons/list-ssr/?offset=${currentOffset.value + 10}`} class="btn btn-primary mr-2">Siguientes</Link>
      </div>

      <div class="grid grid-cols-6 mt-5">
        {
          pokemons.value.map(({ name, id }) => (
            <div key={name} onClick$={() => showModal(id, name)} class="m-5 flex flex-col justify-center items-center">
              <PokemonImage id={+id} />
              <span class="capitalize">{name}</span>
            </div>
          ))
        }
      </div>

      <Modal persistent showModal={modal.visible} closeFn={closeModal}>
        <div q:slot='title'>
          {modal.name}
        </div>
        <div q:slot='content' class="flex flex-col justify-center items-center">
          <PokemonImage id={modal.id} />
          <span>{modal.openAIResponse || 'Preguntadole a ChatGPT'}</span>
        </div>
      </Modal>
    </>
  );
});

export const head: DocumentHead = {
  title: 'SSR-List',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
