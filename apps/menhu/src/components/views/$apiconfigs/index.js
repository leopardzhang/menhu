const env = process.env.NODE_ENV;

export default {
	url: env === 'development' ? 'http://10.64.5.140:8888' : 'http://10.64.42.66:8090'
}
