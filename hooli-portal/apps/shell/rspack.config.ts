import { composePlugins, withNx, withReact } from '@nx/rspack';

import { container } from '@rspack/core';

const engineeringRemoteUrl =
  process.env.ENGINEERING_REMOTE_URL || 'http://localhost:4203';

const hrRemoteUrl = process.env.HR_REMOTE_URL || 'http://localhost:4201';
const financeRemoteUrl =
  process.env.FINANCE_REMOTE_URL || 'http://localhost:4202';

const { ModuleFederationPlugin } = container;

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
        hr: `promise import("${hrRemoteUrl}/remoteEntry.js")`,
        finance: `promise import("${financeRemoteUrl}/remoteEntry.js")`,
        engineering: `promise import("${engineeringRemoteUrl}/remoteEntry.js")`,
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false },
      },
    })
  );

  return config;
});
