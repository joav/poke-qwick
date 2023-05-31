import { Slot, component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <>
      <h3>Auth Layout</h3>
      <Slot />
    </>
  );
});
