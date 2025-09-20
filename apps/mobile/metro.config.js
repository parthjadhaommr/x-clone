const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const workspaceRoot = path.resolve(__dirname, "../..");
const projectRoot = __dirname;

let config = getDefaultConfig(projectRoot);

// 1. Watch all files in the monorepo
config.watchFolders = [workspaceRoot];

// 2. Resolver paths
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 3. Force Metro to resolve (sub)dependencies only from nodeModulesPaths
config.resolver.disableHierarchicalLookup = true;

// 4. Add support for CSS files (NativeWind uses global.css)
config.resolver.sourceExts.push("css");

// 5. Wrap the Metro config with NativeWind
config = withNativeWind(config, {
  input: "./global.css", // point to your Tailwind global file
});

module.exports = config;