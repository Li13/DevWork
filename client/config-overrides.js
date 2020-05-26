const path = require("path");
const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addWebpackModuleRule
} = require("customize-cra");

module.exports = override(
  addWebpackModuleRule({
    test: require.resolve("snapsvg/dist/snap.svg.js"),
    use: "imports-loader?this=>window,fix=>module.exports=0"
  }),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
    snapsvg: "snapsvg/dist/snap.svg.js"
  })
);
