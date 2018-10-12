const env = process.env.NODE_ENV;

export default {
	url: env === 'development' ? 'http://10.64.5.140:8888' : 'http://125.211.166.247:19984/',
	imgBaseUrl: 'http://125.211.166.247:19984/'
}

// export default {
// 	url: 'http://10.64.42.66:8090',
// 	imgBaseUrl: 'http://10.64.42.65:8090/'
// }
