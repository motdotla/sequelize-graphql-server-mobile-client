module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "^~(.+)": "./src/\\1",
            assets: "./assets",
          },
        },
      ],

      "react-native-reanimated/plugin",
    ],
  };
};
