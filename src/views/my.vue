<template>
	<div class="user">
		<section class="user-info">
			<img :src="user.avatar" :alt="user.username" :title="user.username">
			<h3>{{user.username}}</h3>
		</section>
		<section class="article">
			<div class="item" v-for="blog in blogs" :key="blog.id">
				<div class="date"  @click="goTodetail(blog.id)">
					<span class="day">{{splitDateStr(blog.createdAt).day}}</span>
					<span class="month">{{splitDateStr(blog.createdAt).month}}月</span>
					<span class="year">{{splitDateStr(blog.createdAt).year}}</span>
				</div>
				<h3 @click="goTodetail(blog.id)">{{blog.title}}</h3>
				<p @click="goTodetail(blog.id)">{{blog.description}}</p>
				<div class="btn">
					<el-button type="text" @click="onEdit(blog.id)">编辑</el-button>
					<el-button type="text" @click="onDelete(blog.id)">删除</el-button>
				</div>
			</div>
		</section>
    <section class="page">
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="10"
				:pager-count="11"
				layout="prev, pager, next"
				:total="total">
			</el-pagination>
		</section>
  </div>
</template>

<script>

import blog from '@/api/blog.js'
import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			blogs: [],
			total: 0,
			currentPage: 1,
			date: ''
		}
	},
	computed: {
		...mapGetters(['user'])
	},
	created() {
		let page = parseInt(this.$route.query.page) || 1
		blog.getBlogsByUserId(this.user.id,{ page })
		.then(res => {
			this.blogs = res.data
			this.total = res.total
			this.currentPage = page
		})
	},
	methods: {
		handleCurrentChange(val) {
			this.currentPage = val
			blog.getBlogsByUserId(this.user.id,{ page: this.currentPage })
			.then(res => {
				this.blogs = res.data
				this.total = res.total
			})
			this.$router.push({ path: '/my/',query: { page: val}})
		},
		goTodetail(id) {
			this.$router.push('/detail/' + id)
		},
		splitDateStr(dateStr) {
			let dateObj = typeof dateStr === 'object' ? dateStr:new Date(dateStr)
			return {
				day: dateObj.getDate(),
				month: dateObj.getMonth() + 1,
				year: dateObj.getFullYear(),
			}
		},
		onEdit(id) {
			this.$router.push('/edit/' + id)
		},
		onDelete(id) {
			blog.deleteBlog({ blogId:id })
			.then(res => {
				this.$message.success(res.msg)
				this.blogs = this.blogs.filter(item => item.id!=id)
			})
		}
	}
}
</script>

<style lang="scss">

.user {
	.user-info {
		display: flex;
		padding: 30px 0;
		border-bottom: 1px solid #dcdfe6;
		h3 {
			margin-left: 30px;
		}
	}
	.item {
		display: grid;
		grid-template-columns: 120px 1fr;
		grid-template-rows: 50px 80px 30px;
		margin: 20px 0;
		border-bottom: 1px solid rgba(178,186,194,.25);
	}
	.date {
		grid-area: 1/1/3/2;
		display: flex;
		flex-direction: column;
		padding: 20px 0;
		color: #989898;
	}
	.btn {
		grid-column: 2/3;
		margin-top: -25px;
	}
	.day {
		font-size: 40px;
		flex-grow: 1;
	}
	.month {
		padding: 10px 0;
	}
	.el-button--text {
		color: #63b938;
	}
}
</style>