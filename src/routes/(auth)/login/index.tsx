import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './login.css?inline';
import { Form, routeAction$, zod$, z } from '@builder.io/qwik-city';

export const useLoginAction = routeAction$(({ email, password }, { cookie, redirect }) => {
  if (email === 'jim@gmail.com' && password === '123456') {
    cookie.set('jwt', 'my_jwt', { secure: true, path: '/' });
    redirect(302, '/');
    return {
      success: true,
      jwt: 'my_jwt'
    };
  }

  return {
    success: false
  };
}, zod$({
  email: z.string().email('Email invalido'),
  password: z.string().min(6, 'Mínimo 6 letras')
}));

export default component$(() => {

  useStylesScoped$(styles);

  const action = useLoginAction();

  return (
    <Form class="login-form mt-5" action={action} >
      <div class="relative">
        <input
          name="email"
          type="text"
          placeholder="Email address" />
        <label for="email">Email Address</label>
      </div>
      <div class="relative">
        <input
          name="password"
          type="password"
          placeholder="Password" />
        <label for="password">Password</label>
      </div>
      <div class="relative">
        <button>Ingresar</button>
      </div>

      <p>
        {action.value?.success && (
          <code>Token: {action.value.jwt}</code>
        )}
      </p>

      <code>
        {JSON.stringify(action.value, undefined, 2)}
      </code>
    </Form>
  )
});
