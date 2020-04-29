<template>
	<div class="user">
		<section class="user-info">
			<img :src="user.avatar" :alt="user.username" :title="user.username">
			<h3>{{user.username}}</h3>
		</section>
		<section class="article">
			<div class="item" v-for="blog in blogs" :key="blog.id" @click="goTodetail(blog.id)">
				<div class="date">
					<span class="day">{{splitDateStr(blog.createdAt).day}}</span>
					<span class="month">{{splitDateStr(blog.createdAt).month}}月</span>
					<span class="year">{{splitDateStr(blog.createdAt).year}}</span>
				</div>
				<h3>{{blog.title}}</h3>
				<p>{{blog.description}}</p>
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
import blog from '@/api/blog.js';
export default {
  data() {
    return {
      blogs: [],
      user: {},
      total: 0,
      currentPage: 1,
      date: '',
    };
  },
  created() {
    let page = parseInt(this.$route.query.page),
      id = this.$route.params.userId;
    blog.getBlogsByUserId(id, { page }).then((res) => {
      this.blogs = res.data;
      this.total = res.total;
      this.currentPage = page;
      if (res.data.length > 0) {
        this.user = res.data[0].user;
      }
    });
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
      blog.getBlogsByUserId(this.$route.params.userId, { page: this.currentPage }).then((res) => {
        this.blogs = res.data;
        this.total = res.total;
        if (res.data.length > 0) {
          this.user = res.data[0].user;
        }
      });
      this.$router.push({ path: '/user/' + this.user.id, query: { page: val } });
    },
    goTodetail(id) {
      this.$router.push('/detail/' + id);
    },
    splitDateStr(dateStr) {
      let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr);
      return {
        day: dateObj.getDate(),
        month: dateObj.getMonth() + 1,
        year: dateObj.getFullYear(),
      };
    },
  },
};
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
    grid-template-rows: 50px 80px;
    margin: 20px 0;
    border-bottom: 1px solid rgba(178, 186, 194, 0.25);
  }
  .date {
    grid-area: 1/1/3/2;
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    color: #989898;
  }
  .day {
    font-size: 40px;
    flex-grow: 1;
  }
  .month {
    padding: 10px 0;
  }
}
</style>
