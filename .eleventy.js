// eleventyConfig.addLayoutAlias("cocktail", "layouts/cocktail.njk");

module.exports = function(config) {
  config.addWatchTarget("./static/");

  config.addPassthroughCopy({
    static: "/"
  });

  config.addPlugin(require("./_11ty/extensionScss.js"));
  config.addPlugin(require("./_11ty/extensionTs.js"));
  config.addPlugin(require("./_11ty/transformTsLinks.js"));
  config.addPlugin(require("./_11ty/transformScssLinks.js"));
  config.addPlugin(require("./_11ty/transformAppendIndexHtml.js"));

  const eleventyPluginCookLang = require('eleventy-plugin-cooklang');
  config.addPlugin(eleventyPluginCookLang, {
    outputHtml: true , // default false
    //excludeContent: true / false, // default false
    //limitIngredientDecimals: Integer, // default null
  });

  config.addTemplateFormats(["md", "njk", "html"]);

  return {
    // templateFormats: ["md", "njk", "html"],
    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    dir: {
      input: "src",
      output: "_site_eleventy",
      includes: "../_includes",
      data: "../_data"
    }
  };
};
