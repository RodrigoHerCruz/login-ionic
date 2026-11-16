
import { createElement, useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import {
  NativeAdFeed,
  NativeAdPluginEvents,
  NativeAdTemplate,
} from '@capacitor-community/admob';

import { initializeAdMob } from '../services/AdMob';

const FEED_ID = 'login-native-video-feed';
const SLOT_KEY = 'login-native-video-slot';

// Identificador oficial de prueba de Google para anuncios nativos de video.
const TEST_VIDEO_AD_ID = 'ca-app-pub-3940256099942544/1044960115';

const NativeVideoAd: React.FC = () => {
  const [feedReady, setFeedReady] = useState(false);

  useEffect(() => {
    let active = true;
    let feed: NativeAdFeed | null = null;

    const setupAd = async () => {
      // No ejecutar anuncios en navegador ni en iOS.
      if (Capacitor.getPlatform() !== 'android') {
        return;
      }

      // Primero comprobamos el consentimiento e inicializamos AdMob.
      const canRequestAds = await initializeAdMob();

      if (!active || !canRequestAds) {
        return;
      }

      // Creamos el feed de anuncios nativos.
      const createdFeed = await NativeAdFeed.create({
        feedId: FEED_ID,
        adId: TEST_VIDEO_AD_ID,
        template: NativeAdTemplate.Medium,
        androidScrollSnapshot: true,
        style: {
          backgroundColor: '#141414',
          cornerRadius: 16,
          headlineColor: '#ffffff',
          headlineFontSize: 16,
          bodyColor: '#bbbbbb',
          bodyFontSize: 13,
          callToActionBackgroundColor: '#f4f4f0',
          callToActionTextColor: '#000000',
          callToActionFontSize: 14,
        },
      });

      try {
        await createdFeed.addListener(
          NativeAdPluginEvents.FailedToLoad,
          (event) => {
            console.error(
              `[AdMob] Falló la carga del anuncio (${event.code}): ${event.message}`,
              event,
            );
          },
        );
      } catch (error) {
        await createdFeed.destroy();
        throw error;
      }

      if (!active) {
        await createdFeed.destroy();
        return;
      }

      feed = createdFeed;
      setFeedReady(true);

      console.log('[AdMob] Feed de anuncios nativos creado.');
    };

    void setupAd().catch((error: unknown) => {
      console.error('[AdMob] No se pudo cargar el anuncio:', error);
    });

    return () => {
      active = false;
      setFeedReady(false);

      if (feed) {
        void feed.destroy().catch((error: unknown) => {
          console.error('[AdMob] No se pudo destruir el feed:', error);
        });
      }
    };
  }, []);

  // No mostrar el espacio del anuncio fuera de Android.
  if (Capacitor.getPlatform() !== 'android') {
    return null;
  }

  if (!feedReady) {
    return null;
  }

  return (
    <div
      className="native-video-ad-container"
      role="region"
      aria-label="Anuncio"
    >
      {createElement('capacitor-admob-native', {
        'feed-id': FEED_ID,
        'slot-key': SLOT_KEY,
      })}
    </div>
  );
};

export default NativeVideoAd;
