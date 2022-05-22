const posthtml = require("posthtml");
const urls = require("posthtml-urls");

function addTransformTsLinks(config) {
  config.addTransform("transform-tslinks", async function(contents) {
    if (this.outputPath.endsWith(".html")) {
      const plugin = urls({
        eachURL: url => {
          if (url.endsWith(".ts")) {
            return url.slice(0, -3) + ".js";
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
    addTransformTsLinks(eleventyConfig)
  },
};
