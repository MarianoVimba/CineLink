// Configuración de desarrollo (reemplaza a environment.ts en el build dev, ver angular.json).
export const environment = {
  production: false,

  // Backend local (json-server): `npx json-server db/db.json`
  apiBaseUrl: 'http://localhost:3000',

  tmdb: {
    baseUrl: 'https://api.themoviedb.org/3',
    apiKey: '43599da22af9abeb763c46dae25030b9',          // TMDB v3 (?api_key=)
    accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzU5OWRhMjJhZjlhYmViNzYzYzQ2ZGFlMjUwMzBiOSIsIm5iZiI6MTczMTAzOTUwMi4xMzc4MDc2LCJzdWIiOiI2NzFiMjE0ODQyN2M1YzE5ZjAyNWUwMzQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7BgIP38YGpVReuZJO6j8sREDQ0YCcUDXxTZ_oifDtTQ', // TMDB v4 (Bearer)
  },
};
