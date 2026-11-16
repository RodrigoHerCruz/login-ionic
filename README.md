# login-ionic

Aplicación móvil de demostración construida con Ionic React, Capacitor 8 y Android. La pantalla de login muestra un anuncio nativo de video de prueba de Google en Android. Para verlo no hace falta levantar el backend; sí se necesita conexión a Internet para solicitar la creatividad de prueba. El flujo de autenticación con X sí depende del backend.

## Requisitos en Windows

- Git para Windows.
- Node.js 22 o superior (incluye npm).
- pnpm 11.4.0, fijado en `package.json`.
- Ionic CLI (`@ionic/cli`).
- Android Studio 2025.2.1 o posterior, con Android SDK Platform 36, Android SDK Build Tools, Platform Tools y Android Emulator.
- Un dispositivo virtual con imagen de sistema Google Play, o un teléfono Android con depuración USB.

Android Studio incluye el JDK adecuado para Gradle. En Android Studio, revisa **Settings > Build, Execution, Deployment > Build Tools > Gradle > Gradle JDK** y selecciona el JDK integrado de Android Studio. Al compilar desde una terminal externa, configura `JAVA_HOME` para que apunte a ese mismo JDK. En SDK Manager instala la plataforma y herramientas Android requeridas si aún no aparecen.

## Instalación desde cero

Abre PowerShell y ejecuta:

```powershell
# Instalar Node.js 22+ desde https://nodejs.org y Git desde https://git-scm.com/download/win
node --version
npm --version

# Instalar pnpm y la CLI de Ionic
npm install --global pnpm@11.4.0
npm install --global @ionic/cli
pnpm --version
ionic --version

# Clonar el repositorio y entrar a su carpeta
git clone https://github.com/RodrigoHerCruz/login-ionic.git
cd login-ionic

# Instalar las versiones exactas registradas en pnpm-lock.yaml
pnpm install --frozen-lockfile

# Compilar el frontend y actualizar los archivos nativos de Android
pnpm build
pnpm android:sync

# Abrir el proyecto Android en Android Studio
pnpm android:open
```

En Android Studio, espera a que termine **Gradle Sync**, selecciona un emulador en el selector de dispositivos y pulsa **Run**. La primera sincronización puede tardar porque Gradle descarga la distribución y dependencias; si la descarga se interrumpe, vuelve a sincronizar después de revisar la conexión. El wrapper usa Gradle 8.14.3 y ahora espera hasta 120 segundos por la descarga.

También se puede ejecutar desde PowerShell, si Android Studio ya tiene instalado el SDK y hay un emulador iniciado o un teléfono autorizado:

```powershell
pnpm android:run
```

Para revisar la interfaz web sin Android:

```powershell
pnpm dev
```

La vista web no muestra el anuncio nativo. Para probarlo, abre la app Android y entra a **Login**. Se usa el ID de anuncio de prueba oficial de Google incluido en el código. Los IDs de prueba sirven para desarrollo; antes de publicar, configura IDs propios de AdMob y el consentimiento correspondiente.

## Comandos útiles

| Comando | Uso |
| --- | --- |
| `pnpm install --frozen-lockfile` | Instala dependencias desde `pnpm-lock.yaml` |
| `pnpm build` | Comprueba TypeScript y compila el frontend en `dist/` |
| `pnpm android:sync` | Copia el frontend compilado y sincroniza plugins nativos |
| `pnpm android:open` | Abre la carpeta Android en Android Studio |
| `pnpm android:run` | Compila e instala la app en un dispositivo conectado |
| `pnpm dev` | Inicia Vite para desarrollo web |

`android/` está versionado. En una copia del repositorio no hace falta volver a ejecutar `cap add android`; `pnpm android:sync` mantiene el proyecto nativo alineado con los plugins instalados.

