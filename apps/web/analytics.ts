declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const initDataLayer = () => {
  window.dataLayer = window.dataLayer || [];
};

export const pushToDataLayer = (event: string) => {
  window.dataLayer.push({
    event,
  });
};
