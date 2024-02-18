module.exports = {
  preset: 'jest-preset-angular',
  collectCoverageFrom: ["src/**/*.{ts,jxs}"],
  coverageDirectory: 'coverage/banco-pichincha-app',
  coveragePathIgnorePatterns: [
    "node_modules",
    "interfaces",
    ".module.ts",
    "<rootDir>/src/main.ts",
    ".mock.ts"
],
};
