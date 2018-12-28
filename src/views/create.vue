<template>
  <div class="create">
    <h1>创建文章</h1>
    <h3>标题</h3>
    <el-input v-model="title"></el-input>
    <p class="limit">限30个字</p>
    <h3>简介</h3>
    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="description"></el-input>
    <p  class="limit">限30个字</p>
    <h3>内容</h3>
		<el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" v-model="content"></el-input>
		<p  class="limit">限30个字</p>
		<p class="btn">
			<el-button @click="onCreate">确定</el-button>
			<span>是否展示到首页&nbsp;&nbsp;&nbsp;</span>
			<el-switch v-model="atIndex" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
		</p>
	</div>
</template>

<script>

import blog from '@/api/blog.js'
export default {
	data() {
		return {
			title: '',
			content: '',
			description: '',
			atIndex: false
		}
	},
	methods: {
		onCreate() {
			blog.createBlog({
				title: this.title,
				content: this.content,
				description: this.description,
				atIndex: this.atIndex
			})
			.then(res => {
				this.$message.success(res.msg)
				this.$router.push({ path: '/detail/'+ res.data.id})
			})
		}
	}
}
</script>

<style lang="scss">

.create {
	width: 60%;
	margin: 50px 20%;
	h1 {
		text-align: center;
	}
	h3 {
		font-weight: normal;
	}
	.limit {
		text-align: right;
		font-size: 13px;
		color: #999;
	}
	.btn {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		span {
			flex-grow: 1;
			text-align: right;
		}
	}
}
</style>
