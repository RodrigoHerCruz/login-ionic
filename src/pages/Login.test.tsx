import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Login from './Login';

const LoginNavigationHarness = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Login />
      <output data-testid="path">{pathname}</output>
    </>
  );
};

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

test('successful login shows confirmation before redirecting to About', () => {
  vi.useFakeTimers();
  render(
    <MemoryRouter initialEntries={['/login?login=success']}>
      <LoginNavigationHarness />
    </MemoryRouter>,
  );

  expect(screen.getByText('Inicio de sesión con X completado.')).toBeInTheDocument();
  expect(screen.getByTestId('path').textContent).toBe('/login');

  act(() => {
    vi.advanceTimersByTime(1999);
  });
  expect(screen.getByTestId('path').textContent).toBe('/login');

  act(() => {
    vi.advanceTimersByTime(1);
  });
  expect(screen.getByTestId('path').textContent).toBe('/about');
});

test('failed login stays on Login without starting the success redirect', () => {
  vi.useFakeTimers();
  render(
    <MemoryRouter initialEntries={['/login?login=error']}>
      <LoginNavigationHarness />
    </MemoryRouter>,
  );

  expect(screen.getByRole('alert')).toHaveTextContent(
    'No se pudo completar el inicio de sesión.',
  );

  act(() => {
    vi.advanceTimersByTime(3000);
  });

  expect(screen.getByTestId('path').textContent).toBe('/login');
});

test('back arrow returns from Login to Splash', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/login']}>
      <LoginNavigationHarness />
    </MemoryRouter>,
  );

  const backArrow = container.querySelector('.login-back');
  expect(backArrow).not.toBeNull();
  fireEvent.click(backArrow!);

  expect(screen.getByTestId('path').textContent).toBe('/splash');
});
