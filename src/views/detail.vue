<template>
	<div class="detail">
		<section class="user-info">
			<img :src="user.avatar" :alt="user.username" :title="user.username">
			<h3>{{title}}</h3>
			<p>
				<router-link :to="`/user/${user.id}`">{{user.username}}</router-link>
				<span>发布于{{friendlyDate(createdAt)}}</span>
			</p>
		</section>

		<section class="artitle" v-html="markdown"></section>
	</div>
</template>

<script>

import blog from '@/api/blog.js'
import marked from 'marked'

export default {
	data() {
		return {
			title: '',
			rawContent: '',
			user: {},
			createdAt: ''
		}
	},
	computed: {
		markdown() {
			return marked(this.rawContent)
		}
	},
	created() {
		blog.getDetail({ blogId: this.$route.params.blogId })
		.then(res => {
			this.title = res.data.title
			this.rawContent = res.data.content
			this.user = res.data.user
			this.createdAt = res.data.createdAt
		})
	}
}
</script>

<style lang="scss">
@import '@/assets/base.scss';

.detail {
	.user-info {
		border-bottom: 1px solid rgba(178,186,194,.35);
		span {
			margin-left: 10px;
			color: $light-color;
		}
		img {
			float: left;
			margin: 0 30px;
		}
		a {
			text-decoration: none;
			color: $them-color;
		}
	}
	.artitle {
		margin: 10px 30px;
	}
}
</style>
