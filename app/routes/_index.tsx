import { MetaFunction, json } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { useActionData } from '@remix-run/react/dist/components';
import { useEffect, useId, useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const action = () => {
  return json({ message: 'success' });
};

export default function Index() {
  const actionResult = useActionData<typeof action>();
  const [message, setMessage] = useState('renderd');
  const id = useId();

  useEffect(() => {
    if (actionResult?.message) {
      setMessage(actionResult.message);
    }
  }, [actionResult, setMessage]);

  return (
    <div>
      <h1>{message}</h1>
      <Form id={id} method="post"></Form>

      <button form={id} type="submit">
        submit
      </button>
    </div>
  );
}
