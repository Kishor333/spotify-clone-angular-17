import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run spotify-clone-angular-17:serve:development',
        production: 'nx run spotify-clone-angular-17:serve:production',
      },
      ciWebServerCommand: 'nx run spotify-clone-angular-17:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
