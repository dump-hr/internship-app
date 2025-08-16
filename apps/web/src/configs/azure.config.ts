export const msalConfig = {
  auth: {
    clientId: process.env.VITE_MSAL_CLIENT_ID ?? '',
    authority: 'https://login.microsoftonline.com/organizations',
    redirectUri: '/admin',
    postLogoutRedirectUri: '/admin',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};
