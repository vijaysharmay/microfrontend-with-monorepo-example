import { composePlugins, withNx, withReact } from '@nx/rspack';

import { container, rspack } from '@rspack/core';

const engineeringRemoteUrl =
  process.env.ENGINEERING_REMOTE_URL || 'http://localhost:4203';

const hrRemoteUrl = process.env.HR_REMOTE_URL || 'http://localhost:4201';
const financeRemoteUrl =
  process.env.FINANCE_REMOTE_URL || 'http://localhost:4202';

// const engineeringRemoteUrl = 'https://hooli-engineering.vercel.app';
// const hrRemoteUrl = 'https://hooli-hr.vercel.app';
// const financeRemoteUrl = 'https://hooli-finance.vercel.app';

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

  config.experiments ??= {};
  config.experiments.outputModule = true; // ✅ Critical

  config.output ??= {};
  config.output.module = true; // ✅ ESM build
  config.output.library = {
    type: 'module', // ✅ Required for native ESM remote
  };

  config.plugins ??= [];

  config.plugins = config.plugins.filter(
    (plugin) => !(plugin instanceof rspack.HtmlRspackPlugin)
  );

  config.plugins.push(
    new rspack.HtmlRspackPlugin({
      scriptLoading: 'module',
      template: './src/index.html',
      filename: 'index.html',
    })
  );

  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'shell',
      filename: 'remoteEntry.js',
      library: { type: 'module' },
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
