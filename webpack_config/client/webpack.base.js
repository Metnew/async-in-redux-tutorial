import path from 'path'
import rimraf from 'rimraf'
import webpack from 'webpack'
import config from '../config'
import isomorphicWebpackConfig from '../webpack.isomorphic'
import AssetsPlugin from 'assets-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'
import WebpackAssetsManifest from 'webpack-assets-manifest'
const {
	CLIENT_DIST_PATH,
	BASE_API,
	rootPath,
	srcPath,
	publicPath,
	isProduction,
	title,
	manifest
} = config

rimraf(`${config.distPath}/client`, {}, () => {})

const definePluginArgs = {
	'process.env.BASE_API': JSON.stringify(BASE_API),
	'process.env.BROWSER': JSON.stringify(true)
}

// use hash filename to support long-term caching in production
// NOTE: [chunkhash] leads to high memory consumption
const filename = isProduction ? '[name].[hash:6].js' : '[name].js'
const chunkFilename = isProduction ? '[name].[chunkhash:6].js' : '[name].js'
const hints = isProduction ? 'warning' : false
const devtool = isProduction ? 'cheap-source-map' : 'eval'

const baseBuild = {
	name: 'client',
	devtool,
	entry: {
		client: path.join(srcPath, './client')
	},
	output: {
		filename,
		publicPath,
		path: CLIENT_DIST_PATH,
		chunkFilename,
		crossOriginLoading: 'anonymous'
	},
	performance: {
		hints
	},
	resolve: {
		alias: {
			...isomorphicWebpackConfig.resolve.alias
			// NOTE: Preact + preact-compat can save you 148Kb parsed or 14kb gzipped
			// Preact may breaks your React app, starter by default doesn't aim to support Preact
			// react: 'preact-compat',
			// 'react-dom': 'preact-compat',
			// 'preact-compat': 'preact-compat/dist/preact-compat'
		},
		modules: isomorphicWebpackConfig.resolve.modules,
		extensions: isomorphicWebpackConfig.resolve.extensions.concat([
			'.css',
			'.scss',
			'.sass'
		])
	},
	module: {
		rules: isomorphicWebpackConfig.module.rules.concat([
			{
				test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
				use: `file-loader?limit=100000&name=assets/[name].[hash:6].[ext]`
			}
			// NOTE: LQIP loader doesn't work with file-loader and url-loader :(
			// `npm i --save-dev lqip-loader`
			// {
			//   test: /\.(jpe?g|png)$/i,
			//   enforce: 'pre',
			//   loaders: [
			//     {
			//       loader: 'lqip-loader',
			//       options: {
			//         path: '/images-lqip', // your image going to be in media folder in the output dir
			//         name: '[name]-lqip.[hash:8].[ext]' // you can use [hash].[ext] too if you wish
			//       }
			//     }
			//   ]
			// }
		])
	},
	plugins: isomorphicWebpackConfig.plugins.concat([
		new webpack.DefinePlugin(definePluginArgs),
		new AssetsPlugin({
			path: CLIENT_DIST_PATH
		}),
		new WebpackAssetsManifest({
			assets: config.manifest
		})
	]),
	target: 'web'
}

export default baseBuild
