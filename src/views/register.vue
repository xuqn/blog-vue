<template>
  <div class="register">
		<div>
			<h3>用户名：</h3>
			<el-input v-model="username" placeholder="请设置用户名"></el-input>
			<p>用户名长度1到15个字符，只能是字母数字下划线中文</p>
			<h3>密码：</h3>
			<el-input
				v-model="password"
				placeholder="请设置密码"
				type="password"
				@keyup.13.native="onRegister">
				<i slot="suffix" class="el-input__icon el-icon-view" @click="showPassword"></i>
			</el-input>
			<p>密码长度6到16个字符</p>
			<el-button plain type="success" size="small" @click="onRegister">立即注册</el-button>
			<P class="foot">已有帐号？<router-link to="/login">去登陆</router-link></P>
		</div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
export default {
	data() {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		...mapActions(['register']),
		onRegister() {
			if (!this.username || this.username.length > 15) {
				this.$message.error('用户名长度1到15个字符')
				return
			}
			if (this.password.length<6 || this.password.length>16) {
				this.$message.error('密码长度6到16个字符')
				return
			}
			this.register({ username: this.username,password: this.password})
			.then(() => {
				this.$router.push('/my')
			})
		},
		showPassword(e) {
			let input = e.target.parentNode.parentNode.parentNode.childNodes[1]
			input.type = (input.type === 'password'?'text':'password')
		}
	}
}
</script>

<style lang="scss">

.register {
	display: flex;
	justify-content: center;

	.el-input {
		width: 400px;
	}

	h3 {
		font-size: 14px;
		font-weight: 700;
    color: #666;
	}

	p {
		font-size: 12px;
		line-height: 1.5;
		color: #999;
	}

	a {
		color: #090;
	}

	.foot {
		float: right;
	}

	.el-input__icon {
		font-size: 20px;
		&:hover {
			cursor: pointer;
		}
	}

}
</style>
