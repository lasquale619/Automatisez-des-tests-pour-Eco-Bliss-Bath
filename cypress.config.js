const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:4200/#/",
    env: {
      apiUrl: "http://localhost:8081/",
      testEmail: "test2@test.fr",
      testMDP: "testtest"
    },
  },
});
