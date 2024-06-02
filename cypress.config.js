const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ji4a8p",
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
