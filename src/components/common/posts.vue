<template>
    <div class="posts-container rd-col-14">
        <transition name="fade">
            <div class="loading" v-if="showLoading">
                <div class="loading_dialog">
                    <img src="../../assets/loading.svg" alt="">
                </div>
            </div>
        </transition>
        <div class="posts-wrap" :class="{'adaptor': showLoading === true}">
            <h1 class="posts-head-title">电影列表</h1>
            <div class="posts-article" transition="fadeIn" v-show="showLoading === false">
                <ul class="uk-grid">
                    <li class="class_8" v-for="(movie, index) in movies" :key="index">
                        <router-link :to="'/detail/'+movie.id">
                            <h1 class="ft-overflow">
                                <a href="">{{movie.title}}</a>
                            </h1>
                            <time>{{movie.pubdate}}</time>
                            <div class="img">
                                <div>
                                    <a href="">
                                        <img width="140" height="160" :src="movie.img" class="post-image">
                                    </a>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!-- 分页、 -->
            <div class="page-wrap" v-show="showLoading === false">
                <ul v-show="prePage" class="li-page" @click="goPrePage">上一页</ul>
                <ul>
                    <li v-for="(i, index) in showPageBtn" :key="index" :class="{active: i === currentPage, pointer: i, hover: i && i !== currentPage}" @click="pageOffset(i)">
                        <a v-if="i" class="notPointer">{{i}}</a>
                        <a v-else>···</a>
                    </li>
                </ul>
                <ul v-show="nextPage" class="li-page" @click="goNextPage">下一页</ul>
            </div>
        </div>
        <!-- <pageNav></pageNav> -->
    </div>
</template>

<script>
import pageNav from "./pageNav.vue";
import { mapActions, mapState } from "vuex";
//import { getArticleList } from '../../vuex/actions'
//import { moviesList } from "../../http/fetchData";
import api from "../../http/fetchData";
export default {
    name: "posts",
    data() {
        return {
            showLoading: true,
            id: 1,
            num: 30,
            start: 0,
            limit: 6,
            movies: []
            // movies: [
            //     {
            //         id: 1,
            //         title: "你有本事喜欢我，你有本事洗衣做饭",
            //         createTime: "2016年8月8日",
            //         img:
            //             "http://qzhai.net/000/wp-content/uploads/2016/08/timthumb-8-140x160.jpeg"
            //     },
            //     {
            //         id: 2,
            //         title: "你有本事喜欢我，你有本事洗衣做饭",
            //         createTime: "2016年8月8日",
            //         img:
            //             "http://qzhai.net/000/wp-content/uploads/2016/08/timthumb-7-140x160.jpeg"
            //     },
            //     {
            //         id: 3,
            //         title: "你有本事喜欢我，你有本事洗衣做饭",
            //         createTime: "2016年8月8日",
            //         img:
            //             "http://qzhai.net/000/wp-content/uploads/2016/08/timthumb-6-140x160.jpeg"
            //     },
            //     {
            //         id: 4,
            //         title: "你有本事喜欢我，你有本事洗衣做饭",
            //         createTime: "2016年8月8日",
            //         img:
            //             "http://qzhai.net/000/wp-content/uploads/2016/08/timthumb-5-140x160.jpeg"
            //     },
            //     {
            //         id: 4,
            //         title: "你有本事喜欢我，你有本事洗衣做饭",
            //         createTime: "2016年8月8日",
            //         img:
            //             "http://qzhai.net/000/wp-content/uploads/2016/08/timthumb-4-140x160.jpeg"
            //     },
            //     {
            //         id: 4,
            //         title: "你有本事喜欢我，你有本事洗衣做饭",
            //         createTime: "2016年8月8日",
            //         img:
            //             "http://qzhai.net/000/wp-content/uploads/2016/08/timthumb-3-140x160.jpeg"
            //     },
            // ]
        };
    },
    components: {
        pageNav: pageNav
    },
    filters: {
        substrArticle(value) {
            return value.substr(0, 50);
        }
    },
    computed: {
        initMovies() {
            return this.$store.state.movies;
        },
        offset() {
            return this.$store.state.offset;
        },
        prePage() {
            return this.offset !== 0 && this.num;
        },
        nextPage() {
            return this.offset + this.limit < this.num && this.num;
        },
        totalPage() {
            return Math.ceil(this.num / this.limit);
        },
        currentPage() {
            return Math.ceil(this.offset / this.limit) + 1;
        },
        showPageBtn() {
            const pageNum = this.totalPage;
            const index = this.currentPage;
            if (pageNum <= 5)
                return [...new Array(pageNum)].map((v, i) => i + 1);
            if (index <= 2) return [1, 2, 3, 0, pageNum];
            if (index >= pageNum - 1)
                return [1, 0, pageNum - 2, pageNum - 1, pageNum];
            if (index === 3) return [1, 2, 3, 4, 0, pageNum];
            if (index === pageNum - 2)
                return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
            return [1, 0, index - 1, index, index + 1, 0, pageNum];
        }
        //...mapState(["initMovies"])
    },
    created() {
        var id = Number(this.$route.params.id);
        if (!id) {
            this.id = 1;
        } else {
            this.id = id;
        }
        this.initData();
    },
    watch: {
        initMovies(val) {
            this.showLoading = false;
            val.map(movie => {
                movie.img = movie.images.large;
                movie.pubdate = movie.pubdates[0];
            });
            this.movies = val;
        }
    },
    methods: {
        initData() {
            // var url = this.HOST + "/movie/in_theaters";
            this.showLoading = true;
            let opts = {
                start: this.start,
                limit: this.limit
            };
            var id = this.id;
            switch (id) {
                case 1:
                    this.moviesList(opts);
                    break;
                case 2:
                    this.comingList(opts);
                    break;
                case 3:
                    this.topList(opts);
                    break;
                default:
                    this.moviesList(opts);
                    break;
            }
            console.log(id);

            // this.$http
            //     .get(url)
            //     .then(data => {
            //         setTimeout(() => {
            //             this.showLoading = false;
            //         }, 500);
            //         this.movies = data.data.subjects;
            //         this.movies.map(movie => {
            //             movie.img = movie.images.large;
            //         });
            //         console.log(this.movies);
            //         // this.$store.dispatch("initVideoData", {
            //         //     initVideoData: data
            //         // });
            //     })
            //     .catch(e => console.log("error", e));
        },
        //获取最近上映电影列表
        moviesList(opts) {
            api
                .moviesList(opts)
                .then(data => {
                    setTimeout(() => {
                        this.showLoading = false;
                    }, 500);
                    this.num = data.data.total; //分页总数
                    this.movies = data.data.subjects;
                    this.movies.map(movie => {
                        movie.img = movie.images.large;
                        movie.pubdate = movie.pubdates[0];
                    });
                    this.$store.dispatch("initMovies", {
                        initMovies: this.movies
                    });
                })
                .catch(e => console.log("error", e));
        },
        //获取即将上映电影列表
        comingList(opts) {
            api
                .comingList(opts)
                .then(data => {
                    setTimeout(() => {
                        this.showLoading = false;
                    }, 500);
                    this.num = data.data.total; //分页总数
                    this.movies = data.data.subjects;
                    this.movies.map(movie => {
                        movie.img = movie.images.large;
                        movie.pubdate = movie.pubdates[0];
                    });
                    this.$store.dispatch("initMovies", {
                        initMovies: this.movies
                    });
                })
                .catch(e => console.log("error", e));
        },
        //获取TOP上映电影列表
        topList(opts) {
            api
                .topList(opts)
                .then(data => {
                    setTimeout(() => {
                        this.showLoading = false;
                    }, 500);
                    this.num = data.data.total; //分页总数
                    this.movies = data.data.subjects;
                    this.movies.map(movie => {
                        movie.img = movie.images.large;
                        movie.pubdate = movie.pubdates[0];
                    });
                    this.$store.dispatch("initMovies", {
                        initMovies: this.movies
                    });
                })
                .catch(e => console.log("error", e));
        },

        pageOffset(i) {
            let id = this.id;
            //console.log(this.currentPage, i);
            if (i === 0 || i === this.currentPage) return;
            this.showLoading = true;
            this.start = i;
            const opts = {
                start: this.start,
                limit: this.limit
            };
            this.$store.dispatch("goData", { opts, id });
            // this.$store.commit("GO_PAGE", (i - 1) * this.limit);
            //this.$emit("getNew");
        },
        goPrePage() {
            let id = this.id;
            this.showLoading = true;
            let opts = {
                start: this.start,
                limit: this.limit
            };
            if (this.start <= 0) {
                opts.start = 0;
            } else {
                this.start--;
            }
            this.$store.dispatch("preData", { opts, id });
            //this.$store.commit("PRE_PAGE", this.limit);
            //this.$emit("getNew");
        },
        goNextPage() {
            let id = this.id;
            this.showLoading = true;
            let opts = {
                start: this.start,
                limit: this.limit
            };
            console.log(this.start, Math.ceil(this.num / this.limit));
            if (this.start >= Math.ceil(this.num / this.limit)) {
                opts.start = Math.ceil(this.num / this.limit);
            } else {
                this.start++;
            }
            this.$store.dispatch("nextData", { opts, id });
            // this.$store.commit("NEXT_PAGE", this.limit);
            // this.$emit("getNew");
        }
    },
    components: {
        // 'page-nav': pageNav
    }
};
</script>

<style lang='scss' scoped>
@import "../../assets/css/animate.scss";
.posts-container {
    box-sizing: border-box;
    margin-left: 30px;
    .posts-wrap {
        box-sizing: border-box;
        width: 100%;
        height: auto;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02),
            0 4px 10px rgba(0, 0, 0, 0.06);
        margin-bottom: 30px;
    }
    .adaptor {
        min-height: 1000px;
    }
}

.posts-head-title {
    box-sizing: border-box;
    width: 100%;
    height: 55px;
    line-height: 55px;
    font-size: 16px;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.4);
    padding: 0 30px;
    margin: 0;
    border-bottom: 1px solid #eee;
}

.posts-article-list {
    .posts-article-item {
        position: relative;
        padding: 15px 30px 10px;
        border-bottom: 1px solid #eee;
        &:after {
            content: "";
            position: absolute;
            bottom: 1px;
            left: 0;
            height: 2px;
            width: 0;
            background: #42b983;
            transition: all 0.4s ease-in;
        }
        &:hover {
            .article-head-title {
                color: #42b983;
            }
            &:after {
                width: 100%;
            }
        }
    }
}

.article-head-title {
    margin: 0 0 10px 0;
    cursor: pointer;
}

.article-head-time {
    display: block;
    font-size: 12px;
    color: #999;
    margin-bottom: 20px;
}

.article-content-desc {
    width: 100%;
    max-height: 100px;
    margin: 0;
    color: #7f7f7f;
    overflow: hidden;
}

//  列表
.uk-grid {
    position: relative;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -ms-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
    li {
        text-align: center;
        z-index: 10;
        width: 33.333%;
        h1 {
            font-size: 14px;
            line-height: 18px;
            margin-bottom: 2px;
        }
        time {
            font-size: 12px;
            line-height: 14px;
            color: #b2b2b2;
        }
        .img {
            height: 180px;
            position: relative;
            div {
                position: absolute;
                bottom: 0;
                width: 100%;
                img.post-image {
                    opacity: 0.7 !important;
                    -moz-transition: all 0.2s ease-in;
                    -webkit-transition: all 0.2s ease-in;
                    -o-transition: all 0.2s ease-in;
                    -ms-transition: all 0.2s ease-in;
                    max-width: 160px;
                    max-height: 160px;
                    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1),
                        2px 0 2px rgba(0, 0, 0, 0.17);
                    &:after {
                        transition: all 0.4s ease-in;
                    }
                    &:hover {
                        border: 1px solid #42b983;
                        color: #42b983;
                        opacity: 1 !important;
                        -moz-transition: all 0.2s ease-in;
                        -webkit-transition: all 0.2s ease-in;
                        -o-transition: all 0.2s ease-in;
                        -ms-transition: all 0.2s ease-in;
                    }
                }
            }
        }
    }
}

//分页
.page-wrap {
    text-align: center;
    font-size: 18px;
    // margin-top: 180px;
    padding: 20px 0;
    ul {
        display: inline-block;
        list-style: none;
        overflow: hidden;
        li {
            float: left;
            color: #1e5a6b;
            padding: 1px 10px;
            margin: 0 5px;
            border-radius: 50%;
            user-select: none;
            border: 1px solid transparent;
        }
    }
    .pointer {
        cursor: pointer;
    }
    .hover {
        &:hover {
            border-color: #7ba6b3;
        }
    }
    .li-page {
        line-height: 1.5;
        cursor: pointer;
        color: #1e5a6b;
        &:hover {
            color: #7ba6b3;
        }
    }
    .active {
        border-color: #246c81;
    }
}
</style>

