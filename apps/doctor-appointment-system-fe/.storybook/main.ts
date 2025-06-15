import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  staticDirs: ['../src/static-assets'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@nx/react/plugins/storybook',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
};

export default config;
