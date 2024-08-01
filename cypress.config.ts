import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {},
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
