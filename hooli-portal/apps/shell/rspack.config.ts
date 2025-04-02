import { ModuleFederationConfig } from '@nx/module-federation';
import { composePlugins, withNx, withReact } from '@nx/rspack';

import baseConfig from './module-federation.config';

import { container } from '@rspack/core';

const remoteEngineeringUrl =
  process.env.ENGINEERING_REMOTE_URL || 'http://localhost:4203';

const { ModuleFederationPlugin } = container;

const config: ModuleFederationConfig = {
  ...baseConfig,
  remotes: [
    ['hr', process.env.HR_REMOTE_URL || 'http://localhost:4201/'],
    ['finance', process.env.FINANCE_REMOTE_URL || 'http://localhost:4202/'],
    ['engineering', `${remoteEngineeringUrl}`],
  ],
};

// Nx plugins for rspack to build config object from Nx options and context.
/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default composePlugins(withNx(), withReact(), async (config) => {
  config.resolve ??= {};
  config.resolve.alias ??= {};

  config.plugins ??= [];

  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'shell',
      filename: 'remoteEntry.js',
      remotes: {
        hr: 'hr@http://localhost:4201/remoteEntry.js',
        finance: 'finance@http://localhost:4202/remoteEntry.js',
        engineering: `promise import("http://localhost:4203/remoteEntry.js")`,
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
      },
    })
  );

  return config;
});
