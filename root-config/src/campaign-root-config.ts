import { registerApplication, start } from "single-spa";

registerApplication({
  name: "@campaign/home",
  app: () => System.import("@campaign/home") as any,
  activeWhen: ["/"],
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
