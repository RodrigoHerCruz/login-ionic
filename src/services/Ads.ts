import { Capacitor } from '@capacitor/core';
import { AdMob, AdmobConsentStatus } from '@capacitor-community/admob';

const INTERSTITIAL_TEST_ID = 'ca-app-pub-3940256099942544/1033173712';

let setupPromise: Promise<void> | null = null;
let interstitialReady = false;

export const prepareHomeInterstitial = (): Promise<void> => {
  if (!Capacitor.isNativePlatform()) return Promise.resolve();
  if (setupPromise) return setupPromise;

  setupPromise = (async () => {
    let consent = await AdMob.requestConsentInfo();
    if (
      consent.isConsentFormAvailable &&
      consent.status === AdmobConsentStatus.REQUIRED
    ) {
      consent = await AdMob.showConsentForm();
    }

    if (!consent.canRequestAds) return;

    await AdMob.initialize();
    await AdMob.prepareInterstitial({
      adId: INTERSTITIAL_TEST_ID,
      isTesting: true,
    });
    interstitialReady = true;
  })().catch((error: unknown) => {
    setupPromise = null;
    console.warn('[AdMob] No se pudo preparar el intersticial:', error);
  });

  return setupPromise;
};

export const showHomeInterstitial = async (): Promise<void> => {
  if (!Capacitor.isNativePlatform()) return;

  await prepareHomeInterstitial();
  if (!interstitialReady) return;

  interstitialReady = false;
  try {
    await AdMob.showInterstitial({ adId: INTERSTITIAL_TEST_ID });
  } catch (error) {
    console.warn('[AdMob] No se pudo mostrar el intersticial:', error);
  }
};
