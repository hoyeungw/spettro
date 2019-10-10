class BabelLocal {}

BabelLocal.base =
  {
    babelrc: false,
    comments: true,
    sourceMap: true,
    exclude: 'node_modules/**',
  }

/**
 *
 * @ {*[][]}
 */
BabelLocal.presets =
  [
    ['@babel/preset-env', {
      modules: false,
      loose: true,
    }],
  ]

/**
 *
 * @ {*[][]}
 */
BabelLocal.plugins =
  [
    ['@babel/plugin-proposal-pipeline-operator', {
      'proposal': 'minimal'
    }],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-private-methods']
  ]

export {
  BabelLocal
}