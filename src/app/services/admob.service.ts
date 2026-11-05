
import {
  AdMob,
  type AdMobRewardItem,
} from '@capacitor-community/admob';

class AdmobService {
  private readonly adId =
    'ca-app-pub-3940256099942544/5224354917';

  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) return;

    await AdMob.initialize();

    this.initialized = true;
  }

  async showRewardedAd(): Promise<AdMobRewardItem | null> {
    try {
      await this.initialize();

      // Cargar el anuncio
      await AdMob.prepareRewardVideoAd({
        adId: this.adId,
      });

      // Mostrar anuncio y obtener resultado
      const reward = await AdMob.showRewardVideoAd();

      console.log('Recompensa obtenida:', reward);

      return reward;

    } catch (error) {
      console.error('Error con AdMob:', error);

      return null;
    }
  }
}

export const admobService = new AdmobService();
