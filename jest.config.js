module.exports = {
  preset: 'jest-preset-angular',
  globalSetup: 'jest-preset-angular/global-setup',
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,jxs}"],
  coverageDirectory: 'coverage/banco-pichincha-app'
};
