const sass = require("sass");

function addScssExtension(config) {
  config.addTemplateFormats("scss");
  config.addExtension("scss", {
    outputFileExtension: "css",
    //read: false,
    compile: function(_, inputPath) {
      let loadPaths = ["_includes/styles"];
      return () => {
        let ret = sass.compile(inputPath, {
          loadPaths
        });
        return ret.css.toString("utf8");
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
    addScssExtension(eleventyConfig)
  },
};

