import { Message } from '@arco-design/web-react';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

axios.interceptors.request.use(function (config) {
	const token = localStorage.getItem('token');
	return { ...config, headers: { ...config.headers, token } };
}, function (error) {
	return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if (error.response.status === 403) {
		const href = window.location.href;
		window.location.href += href[href.length - 1] === '/' ? 'login' : '/login';
	} else {
		Message.error('页面崩溃了～');
	}
	return Promise.reject(error);
});

export default axios