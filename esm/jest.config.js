export default {
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(js?|ts?)$",
  testPathIgnorePatterns: [
    "/lib/",
    "/node_modules/",
    "^.+\\.data\.ts?$",
    "/src/"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true
};