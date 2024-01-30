const path = require('path')

const { override, babelInclude, addWebpackResolve } = require('customize-cra')

module.exports = function (config, env) {
  return Object.assign(
    config,
    override(
      babelInclude([
        /* transpile (converting to es5) code in src/ and shared component library */
        path.resolve('src'),
        path.resolve('../common'),
      ]),
      addWebpackResolve({
        fallback: { fs: false, os: false, path: false },
      }),
    )(config, env),
  )
}
