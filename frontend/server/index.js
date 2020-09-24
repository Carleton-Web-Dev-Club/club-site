require( 'ignore-styles' )

require( '@babel/register' )( {
  ignore: [ /(node_modules)/ ],
  presets: [ '@babel/preset-env', '@babel/preset-react' ],
  plugins: [
    [
      'css-modules-transform', {
        generateScopedName: '[name]_[local]',
        extensions: [ '.css' ],
      },
    ],
  ],
} )

require( './server' )
