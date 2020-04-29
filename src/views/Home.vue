<template>
	<div class="home">
		<section>
			<div class="item" v-for="blog in blogs" :key="blog.key">
				<figure @click="onGetuser(blog.user.id)">
					<template v-if="blog.user">
						<img :src="blog.user.avatar" :alt="blog.user.username">
						<figcaption>{{ blog.user.username }}</figcaption>
					</template>
				</figure>
				<h3 @click="goDetail(blog.id)">
					{{blog.title}}
					<span>&nbsp;&nbsp;&nbsp;{{ friendlyDate(blog.updatedAt) }}</span>
				</h3>
				<p @click="goDetail(blog.id)">{{ blog.description }}</p>
			</div>
		</section>

		<section class="page">
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-size="10"
				:pager-count="9"
				layout="prev, pager, next"
				:total="total">
			</el-pagination>
		</section>
	</div>
</template>

<script>
import blog from '@/api/blog.js';

export default {
	name: 'home',
	data() {
		return {
			blogs: [],
			total: 0,
			currentPage: 1,
		};
	},
	created() {
		blog.getIndexBlogs({ page: this.$route.query.page }).then((res) => {
			this.blogs = res.data;
			this.total = res.total;
			this.currentPage = parseInt(this.$route.query.page);
		});
	},
	methods: {
		handleCurrentChange(val) {
			this.currentPage = val;
			blog.getIndexBlogs({ page: val }).then((res) => {
				this.blogs = res.data;
				this.total = res.total;
			});
			this.$router.push({ path: '', query: { page: val } });
		},
		goDetail(id) {
			this.$router.push(`/detail/${id}`);
		},
		onGetuser(id) {
			this.$router.push(`/user/${id}`);
		},
	},
};
</script>
<style lang="scss">
@import '@/assets/base.scss';

.home {
	.item {
		clear: both;
		margin-top: 60px;
		padding: 5px 0;
		min-height: 110px;
		border-bottom: 1px solid rgba(178, 186, 194, 0.15);
		&:hover {
			background-color: #b2bac226;
		}
		figure {
			float: left;
			margin: 20px 30px;
			text-align: center;
			width: 65px;
			font-size: 12px;
			color: #999;
			&:hover {
				cursor: pointer;
			}
			img {
				width: 65px;
				height: 65px;
			}
		}
		h3 {
			margin: 20px;
			&:hover {
				text-decoration: underline;
				cursor: pointer;
			}
		}
		span {
			font-size: 14px;
			font-weight: normal;
			color: $light-color;
		}
		p {
			line-height: 1.8;
			margin: 20px;
		}
	}
}
</style>
