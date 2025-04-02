// apps/shell/withDynamicRemotes.ts
import type { NxComposableRspackPlugin } from '@nx/rspack';
import { container } from '@rspack/core';

const { ModuleFederationPlugin } = container;

export const withDynamicRemotes: NxComposableRspackPlugin = (config, _ctx) => {
  config.resolve = config.resolve || {};
  config.resolve.alias = config.resolve.alias || {};

  config.plugins = config.plugins || [];
  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'engineering',
      filename: 'remoteEntry.js',
      remotes: {
        engineering: `promise new Promise(resolve => {
          const remoteUrl = "http://localhost:4203/remoteEntry.js";
          const script = document.createElement("script");
          script.src = remoteUrl;
          script.onload = () => {
            const proxy = {
              get: (request) => window.engineering.get(request),
              init: (arg) => {
                try {
                  return window.engineering.init(arg);
                } catch (e) {
                  console.log("Remote already initialized");
                }
              }
            };
            resolve(proxy);
          };
          document.head.appendChild(script);
        })`,
      },
      shared: {}, // you can also add shared deps here if needed
    })
  );

  return config;
};
