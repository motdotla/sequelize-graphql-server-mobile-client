const { getDefaultConfig } = require("expo/metro-config");

module.exports = async () => {
  const {
    resolver: { sourceExts },
  } = await getDefaultConfig(__dirname);
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
      minifierConfig: {
        compress: {
          drop_console: true,
        },
      },
    },
    resolver: {
      sourceExts: [...sourceExts, "cjs"],
    },
  };
};
