import { describe, it, expect } from 'vitest';
import Index, { action } from './_index';
import { createRemixStub } from '@remix-run/testing';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

const prepare = () => {
  const RemixStub = createRemixStub([
    {
      path: '/',
      Component: Index,
      action,
    },
  ]);

  return { RemixStub };
};

describe('test', async () => {
  it('render actionResult message', async () => {
    const { RemixStub } = prepare();
    const dom = render(<RemixStub initialEntries={['/']} />);

    const preh1 = await screen.findByRole('heading', { level: 1 });
    await waitFor(() => {
      expect(preh1.textContent).toEqual('renderd');
    });

    fireEvent.submit(dom.container.querySelector('form')!);

    const h1 = await screen.findByRole('heading', { level: 1 });
    await waitFor(() => {
      expect(h1.textContent).toEqual('success');
    });
  });
});
