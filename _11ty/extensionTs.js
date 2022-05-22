const ts = require("typescript");

function addTsExtension(config) {
  config.addTemplateFormats("ts");
  config.addExtension("ts", {
    outputFileExtension: "js",
    compile: function(source) {
      return () => {
        let ret = ts.transpileModule(source, {
          compilerOptions: {
            module: ts.ModuleKind.CommonJS
          }
        });
        return ret.outputText;
      };
    },
    getData: () => ({
      layout: null,
      eleventyExcludeFromCollections: true
    })
  });
}

module.exports = {
  configFunction: async (eleventyConfig, _ = {}) => {
    addTsExtension(eleventyConfig)
  },
};
