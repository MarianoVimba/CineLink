// Configuración por defecto (usada en el build de producción).
// El build de desarrollo reemplaza este archivo por environment.development.ts (ver angular.json).
//
// ⚠️ SEGURIDAD: en una SPA (frontend puro) estas credenciales SIEMPRE viajan al navegador,
// no se pueden "ocultar". Las llaves que estaban hardcodeadas y commiteadas en el repo
// quedaron expuestas públicamente: hay que ROTARLAS en TMDB. Lo ideal es mover las
// llamadas a TMDB detrás de un backend propio que guarde el token del lado del servidor.
export const environment = {
  production: true,

  // Backend (json-server / mock). Reemplazar por la URL real (HTTPS) en producción.
  apiBaseUrl: 'http://localhost:3000',

  tmdb: {
    baseUrl: 'https://api.themoviedb.org/3',
    apiKey: '43599da22af9abeb763c46dae25030b9',          // TMDB v3 (?api_key=)
    accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzU5OWRhMjJhZjlhYmViNzYzYzQ2ZGFlMjUwMzBiOSIsIm5iZiI6MTczMTAzOTUwMi4xMzc4MDc2LCJzdWIiOiI2NzFiMjE0ODQyN2M1YzE5ZjAyNWUwMzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7BgIP38YGpVReuZJO6j8sREDQ0YCcUDXxTZ_oifDtTQ', // TMDB v4 (Bearer)
  },
};
