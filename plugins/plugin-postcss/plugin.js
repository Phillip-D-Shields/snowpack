const path = require('path');
const execa = require('execa');

module.exports = function postcssPlugin(_, options) {
  return {
    name: '@snowpack/postcss-transform',
    async transform({id, fileExt, contents}) {
      const {input = ['.css'], config} = options;
      if (!input.includes(fileExt) || !contents) return;

      const flags = [];
      if (config) flags.push(`--config ${config}`);

      const {stdout} = await execa('postcss', flags, {
        cwd: path.dirname(id),
        input: contents,
      });

      if (stdout) return stdout;
    },
  };
};
