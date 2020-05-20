const path = require("path");
const { override, fixBabelImports, addWebpackAlias } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css"
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src")
  })
);
