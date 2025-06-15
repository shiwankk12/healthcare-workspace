import { initialize, mswLoader } from 'msw-storybook-addon';

// Initialize MSW
initialize();

// Provide the MSW addon loader globally
export const loaders = [mswLoader];
