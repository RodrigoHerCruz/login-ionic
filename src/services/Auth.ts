
import { Capacitor } from '@capacitor/core';

export interface AuthUser {
  id: number | string;
  nombre: string | null;
  nombreUsuario: string | null;
  fotoPerfil: string | null;
}

interface AuthResponse {
  authenticated: boolean;
  user?: AuthUser;
  message?: string;
}

const API_URL =
  import.meta.env.VITE_API_URL ||
  (Capacitor.isNativePlatform()
    ? 'http://10.0.2.2:3000'
    : 'http://localhost:3000');

export async function getCurrentUser(): Promise<AuthUser | null> {
  const response = await fetch(`${API_URL}/auth/x/me`, {
    method: 'GET',
    credentials: 'include',
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error('No se pudo consultar la sesión');
  }

  const data: AuthResponse = await response.json();
  return data.user ?? null;
}

export function loginWithX(): void {
  window.location.href = `${API_URL}/auth/x/start`;
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_URL}/auth/x/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('No se pudo cerrar la sesión');
  }
}
