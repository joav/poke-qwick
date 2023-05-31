import { $, component$, useComputed$, useStore, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';

export default component$(() => {

  useStylesScoped$(styles);

  const formState = useStore({
    email: '',
    password: '',
    formPosted: false
  });

  const emailError = useComputed$(() => {
    if (formState.email.includes('@')) return '';
    return 'not-valid';
  });

  const passwordError = useComputed$(() => {
    if (formState.password.length >= 6) return '';
    return 'not-valid';
  });

  const isFormValid = useComputed$(() => {
    return (
      emailError.value === '' &&
      passwordError.value === ''
    );
  });

  const onSubmit = $(() => {
    formState.formPosted = true;
    console.log(formState);

    console.log({ isFormValid: isFormValid.value });

  });


  return (
    <form class="login-form" preventdefault:submit onSubmit$={onSubmit} >
      <div class="relative">
        <input
          onInput$={(ev) => formState.email = (ev.target as HTMLInputElement).value}
          value={formState.email}
          class={formState.formPosted ? emailError.value : ''}
          name="email"
          type="text"
          placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          onInput$={(ev) => formState.password = (ev.target as HTMLInputElement).value}
          value={formState.password}
          class={formState.formPosted ? passwordError.value : ''}
          id="password"
          name="password"
          type="password"
          placeholder="Password" />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button>Ingresar</button>
      </div>


      <code>
        {JSON.stringify(formState, undefined, 2)}
      </code>
    </form>
  )
});
