const { defineConfig } = require("cypress");
const codeCoverageTask = require('@cypress/code-coverage/task');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
    baseUrl: "http://localhost:4200/#/",
    env: {
      apiUrl: "http://localhost:8081/",
      testEmail: "test2@test.fr",
      testMDP: "testtest"
    },
  },

  reporter: 'mochawesome'
});
