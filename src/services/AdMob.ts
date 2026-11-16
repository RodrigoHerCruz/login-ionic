
import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  AdmobConsentStatus,
} from '@capacitor-community/admob';

let initializationPromise: Promise<boolean> | null = null;

export function initializeAdMob(): Promise<boolean> {
  // Los anuncios nativos solo se inicializan en Android.
  if (Capacitor.getPlatform() !== 'android') {
    return Promise.resolve(false);
  }

  // Evita inicializar el SDK varias veces.
  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    console.log('[AdMob] Solicitando información de consentimiento...');

    const consentInfo = await AdMob.requestConsentInfo();

    let finalConsentInfo = consentInfo;

    // Mostrar el formulario cuando el consentimiento sea obligatorio.
    if (
      consentInfo.status === AdmobConsentStatus.REQUIRED &&
      consentInfo.isConsentFormAvailable
    ) {
      console.log('[AdMob] Mostrando formulario de consentimiento...');

      finalConsentInfo = await AdMob.showConsentForm();
    }

    // No solicitar anuncios si no está permitido.
    if (!finalConsentInfo.canRequestAds) {
      console.log('[AdMob] No está permitido solicitar anuncios.');
      return false;
    }

    console.log('[AdMob] Inicializando Google Mobile Ads...');

    await AdMob.initialize();

    console.log('[AdMob] SDK inicializado correctamente.');

    return true;
  })().catch((error: unknown) => {
    // Permite volver a intentar la inicialización si ocurre un error.
    initializationPromise = null;

    console.error('[AdMob] Error al inicializar:', error);

    throw error;
  });

  return initializationPromise;
}
