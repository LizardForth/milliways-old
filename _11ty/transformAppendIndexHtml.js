const posthtml = require("posthtml");
const urls = require("posthtml-urls");

function addTransformIndexToHtmlLinks(config) {
  config.addTransform("transform-htmllinks", async function(contents) {
    if (this.outputPath.endsWith(".html")) {
      // add "index.html" to links
      const plugin = urls({
        eachURL: url => {
          // if its a directory
          if (
            !(
              url
                .split("/")
                .pop()
                .indexOf(".") > -1
            )
          ) {
            if (url.charAt(url.length - 1) != "/") {
              return url + "/index.html";
            } else {
              return url + "index.html";
            }
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
    addTransformIndexToHtmlLinks(eleventyConfig)
  },
};
