import request from '@/helpers/request.js'

const URL = {
	REGISTER: '/auth/register',
	LOGIN: '/auth/login',
	LOGOUT: '/auth/logout',
	ISLOGIN: '/auth'
}

export default {
	register({ username,password }) {
		return request(URL.REGISTER,'POST',{ username,password })
	},
	login({ username,password }) {
		return request(URL.LOGIN,'POST',{ username,password })
	},
	logout() {
		return request(URL.LOGOUT)
	},
	islogin() {
		return request(URL.ISLOGIN)
	}
}