/* eslint-disable qwik/jsx-img */
import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik"
import { isServer } from "@builder.io/qwik/build"

interface Props {
  id: number;
  size?: number;
  backImage?: boolean;
  isVisible?: boolean;
}

export const PokemonImage = component$(({ id, size = 200, backImage, isVisible = true }: Props) => {
  const imageLoaded = useSignal(false);

  useTask$(({ track }) => {
    track(() => id);

    imageLoaded.value = isServer ? true : false;
  });

  const imageUrl = useComputed$(() => (
    backImage ?
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png` :
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  ));

  return (
    <div class="flex items-center justify-center" style={{
      width: `${size}px`,
      height: `${size}px`
    }}>
      {!imageLoaded.value && <span>Cargando...</span>}
      <img
        src={imageUrl.value}
        alt="Pokemon Sprite"
        style={{ width: `${size}px` }}
        onLoad$={() => imageLoaded.value = true}
        class={[{
          hidden: !imageLoaded.value,
          'brightness-0': !isVisible
        }, 'transition-all']}
      />
    </div>
  )
})
