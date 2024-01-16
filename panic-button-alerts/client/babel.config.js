module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
        },
      ],
      "react-native-reanimated/plugin",
      [
        "i18next-extract",
        {
          locales: ["en"],
          outputPath: "locales/{{locale}}/{{ns}}.json",
          keyAsDefaultValue: ["en"],
          keySeparator: null,
          nsSeparator: null,
        },
      ],
    ],
  };
};
