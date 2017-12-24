module.exports = ({file, options, env}) => ({
	plugins: {
		'postcss-import': {},
		'postcss-cssnext': options.cssnext ? {} : false,
		autoprefixer: env === 'production' ? {} : false
	}
})
