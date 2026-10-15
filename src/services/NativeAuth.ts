import { Capacitor } from '@capacitor/core';
import {
  InAppBrowser,
  AndroidViewStyle,
  AndroidAnimation,
  iOSViewStyle,
  iOSAnimation,
  DismissStyle,
} from '@capacitor/inappbrowser';


const API_URL = Capacitor.isNativePlatform()
  ? (import.meta.env.VITE_API_URL || 'http://10.0.2.2:3000')
  : 'http://localhost:3000';

const VERIFIER_KEY = 'native_oauth_verifier';

let sessionToken: string | null = null;

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function randomVerifier(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return base64UrlEncode(bytes);
}

async function createChallenge(verifier: string): Promise<string> {
  const bytes = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', bytes);

  return base64UrlEncode(new Uint8Array(digest));
}


export async function startXLogin(): Promise<void> {    
  if (!Capacitor.isNativePlatform()) {
    window.location.assign(`${API_URL}/auth/x/start`);
    return;
  }

  const verifier = randomVerifier();
  const challenge = await createChallenge(verifier);

  sessionStorage.setItem(VERIFIER_KEY, verifier);

    const oauthUrl = import.meta.env.VITE_OAUTH_URL;

    if (!oauthUrl) {
    throw new Error('Falta configurar VITE_OAUTH_URL.');
    }

    const url = new URL('/auth/x/start', oauthUrl);
    url.searchParams.set('platform', 'native');
    url.searchParams.set('handoff_challenge', challenge);

await InAppBrowser.openInSystemBrowser({
  url: url.toString(),
  options: {
    android: {
      showTitle: true,
      hideToolbarOnScroll: false,
      viewStyle: AndroidViewStyle.FULL_SCREEN,
      startAnimation: AndroidAnimation.FADE_IN,
      exitAnimation: AndroidAnimation.FADE_OUT,
    },
    iOS: {
      closeButtonText: DismissStyle.CLOSE,
      viewStyle: iOSViewStyle.FULL_SCREEN,
      animationEffect: iOSAnimation.CROSS_DISSOLVE,
      enableBarsCollapsing: false,
      enableReadersMode: false,
    },
  },
});
}


export async function exchangeNativeCode(code: string): Promise<void> {
  const verifier = sessionStorage.getItem(VERIFIER_KEY);

  console.log('[NativeAuth] Código recibido:', Boolean(code));
  console.log('[NativeAuth] Verificador encontrado:', Boolean(verifier));
  console.log('[NativeAuth] API_URL:', API_URL);

  if (!verifier) {
    throw new Error('No se encontró el verificador. Inicia sesión nuevamente.');
  }

  const response = await fetch(`${API_URL}/auth/x/native/exchange`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, verifier }),
  });

  const data = await response.json();

  console.log('[NativeAuth] Estado HTTP:', response.status);
  console.log('[NativeAuth] Respuesta del servidor:', data);

  if (!response.ok || typeof data.token !== 'string') {
    throw new Error(data.message || 'No se pudo iniciar sesión.');
  }

  sessionToken = data.token;
  sessionStorage.removeItem(VERIFIER_KEY);
}


export async function getNativeProfile() {
  if (!sessionToken) {
    throw new Error('No hay una sesión activa en memoria.');
  }

  const response = await fetch(`${API_URL}/auth/x/native/me`, {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo obtener el perfil.');
  }

  return data;
}

export async function logoutNative(): Promise<void> {
  if (!sessionToken) return;

  const token = sessionToken;

  const response = await fetch(`${API_URL}/auth/x/native/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('No se pudo cerrar la sesión en el servidor.');
  }

  sessionToken = null;
}
