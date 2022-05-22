const posthtml = require("posthtml");
const urls = require("posthtml-urls");

function addTransformScssLinks(config) {
  config.addTransform("transform-scsslinks", async function(contents) {
    if (this.outputPath.endsWith(".html")) {
      const plugin = urls({
        eachURL: url => {
          if (url.endsWith(".scss")) {
            return url.slice(0, -5) + ".css";
          }
          return url;
        }
      });
      const res = (
        await posthtml()
          .use(plugin)
          .process(contents)
      ).html;
      return res;
    }
    return contents; // no change done.
  });
}


module.exports = {
  configFunction: async (eleventyConfig, _ = {}) => {
    addTransformScssLinks(eleventyConfig)
  },
};
