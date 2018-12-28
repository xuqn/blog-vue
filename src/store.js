import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/stores/auth.js'
import blog from '@/stores/blog.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		auth,
		blog
	}
})
