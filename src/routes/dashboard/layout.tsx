import { Slot, component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import Navbar from '~/components/shared/navbar/navbar';

export const useCheckAuthCookie = routeLoader$(({ cookie, redirect }) => {
  const jwt = cookie.get('jwt');

  if (jwt?.value !== 'my_jwt') return redirect(302, '/login') && false;

  return true;
});

export default component$(() => {
  return (
    <>
      <Navbar />
      <div class="flex flex-col justify-center items-center mt-2">
        <span class="text-5xl">Dashboard Layout</span>
        <Slot />
      </div>
    </>
  );
});
