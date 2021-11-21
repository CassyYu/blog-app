import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(function (config) {
	const token = localStorage.getItem('token')
	return { ...config, headers: { ...config.headers, token } }
}, function (error) {
	return Promise.reject(error);
});

export default axios