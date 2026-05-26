import Script from "next/script";

const DEFAULTS = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
try {
  var stored = window.localStorage.getItem('nn-consent');
  if (stored === 'granted') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }
} catch (e) {}
`;

export function ConsentDefault() {
  return (
    // App Router places beforeInteractive scripts in the root layout —
    // see node_modules/next/dist/docs/01-app/03-api-reference/02-components/script.md.
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      id="nn-consent-default"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: DEFAULTS }}
    />
  );
}
