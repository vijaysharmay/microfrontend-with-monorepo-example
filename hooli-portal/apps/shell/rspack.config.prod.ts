import { ModuleFederationConfig } from '@nx/module-federation';
import { withModuleFederation } from '@nx/module-federation/rspack';
import { composePlugins, withNx, withReact } from '@nx/rspack';

import baseConfig from './module-federation.config';

const prodConfig: ModuleFederationConfig = {
  ...baseConfig,
  remotes: [
    ['hr', process.env.HR_REMOTE_URL || 'http://localhost:4201/'],
    ['finance', process.env.FINANCE_REMOTE_URL || 'http://localhost:4202/'],
  ],
};

// Nx plugins for rspack to build config object from Nx options and context.
/**
 * DTS Plugin is disabled in Nx Workspaces as Nx already provides Typing support for Module Federation
 * The DTS Plugin can be enabled by setting dts: true
 * Learn more about the DTS Plugin here: https://module-federation.io/configure/dts.html
 */
export default composePlugins(
  withNx(),
  withReact(),
  withModuleFederation(prodConfig, { dts: false })
);
