<template>
	<header :class="{'no-login': !isLogin,'is-login': isLogin }">
		<template v-if="!isLogin" class="no-login">
			<h1>Let's share</h1>
			<P>精品博客</P>
			<div class="buttons">
				<el-button @click="onLogin">登陆</el-button>
				<el-button @click="onRegister">注册</el-button>
			</div>
		</template>
		<template v-else class="is-login">
			<h1><router-link to="/">Let's share</router-link></h1>
			<router-link to="/create"><i class="el-icon-edit"></i></router-link>
			<div>
				<img :src="user.avatar" :alt="user.username" :title="user.username">
				<ul>
					<li><el-button type="text" @click="onMy">我的</el-button></li>
					<li><el-button type="text" @click="onLogout">注销</el-button></li>
				</ul>
			</div>
		</template>
	</header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
	name: 'home',
	components: {},
	data() {
		return {};
	},
	computed: {
		...mapGetters(['isLogin', 'user']),
	},
	created() {
		// this.checklogin()
	},
	methods: {
		...mapActions(['checklogin', 'logout']),
		onLogout() {
			this.logout();
			this.$router.push('/');
		},
		onLogin() {
			this.$router.push('/login');
		},
		onRegister() {
			this.$router.push('/register');
		},
		onMy() {
			this.$router.push('/my');
		},
	},
};
</script>

<style lang="scss">
@import '@/assets/base.scss';
header {
	background-color: $them-color;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #fff;
	h1 {
		text-transform: uppercase;
		margin: 60px 0 0;
		font-size: 40px;
	}
	.buttons {
		padding: 10px 0 30px 0;
	}
}

header.is-login {
	flex-direction: row;
	justify-content: flex-start;
	a {
		text-decoration: none;
		color: #fff;
	}
	h1 {
		margin: 10px 0;
		flex-grow: 1;
	}
	i {
		font-size: 40px;
		margin-right: 20px;
	}
	img {
		border-radius: 50%;
		&:hover {
			& + ul {
				display: block;
			}
		}
	}
	ul {
		background-color: #fff;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
		border: 1px solid rgba(177, 180, 185, 0.45);
		border-radius: 4px;
		position: absolute;
		top: 64px;
		padding: 0;
		margin: 0;
		width: 64px;
		text-align: center;
		list-style: none;
		display: none;
		&:hover {
			display: block;
		}
	}
}
</style>
