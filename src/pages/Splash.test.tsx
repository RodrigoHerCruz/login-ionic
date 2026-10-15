import { fireEvent, render, screen, act, cleanup } from '@testing-library/react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import { afterEach, expect, test, vi } from 'vitest';
import Splash from './Splash';

// Keep Splash mounted to reproduce Ionic's cached page behavior.
const NavigationHarness = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return <><Splash /><output data-testid="path">{pathname}</output><button onClick={() => navigate('/login')}>Continuar</button></>;
};

afterEach(() => { cleanup(); vi.useRealTimers(); });

test('a cached Splash does not send the user back after continuing to Login', () => {
  vi.useFakeTimers();
  render(<MemoryRouter initialEntries={['/splash']}><NavigationHarness /></MemoryRouter>);
  act(() => { vi.advanceTimersByTime(2000); });
  expect(screen.getByTestId('path').textContent).toBe('/about');
  fireEvent.click(screen.getByText('Continuar'));
  act(() => { vi.advanceTimersByTime(10000); });
  expect(screen.getByTestId('path').textContent).toBe('/login');
});

test('leaving Splash cancels its pending redirect', () => {
  vi.useFakeTimers();
  render(<MemoryRouter initialEntries={['/splash']}><NavigationHarness /></MemoryRouter>);
  fireEvent.click(screen.getByText('Continuar'));
  act(() => { vi.advanceTimersByTime(10000); });
  expect(screen.getByTestId('path').textContent).toBe('/login');
});
