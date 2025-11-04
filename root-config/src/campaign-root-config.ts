import { registerApplication, start } from "single-spa";

registerApplication({
  name: '@campaign/home-mfe',
  app: () => System.import('@campaign/home-mfe') as any,
  activeWhen: (location) => !location.pathname.startsWith('/campaigns')
});

registerApplication({
  name: '@campaign/campaigns-mfe',
  app: () => System.import('@campaign/campaigns-mfe') as any,
  activeWhen: ['/campaigns']
});

// registerApplication({
//   name: "@campaign/navbar",
//   app: () =>
//     import(
//       /* webpackIgnore: true */ // @ts-ignore-next
//       "@campaign/navbar"
//     ),
//   activeWhen: ["/"],
// });

start({
  urlRerouteOnly: true,
});
