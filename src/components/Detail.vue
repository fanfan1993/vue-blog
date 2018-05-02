<template>
    <div class="home-container rd-row-flex">
        <transition name="fade">
            <div class="loading" v-if="showLoading">
                <div class="loading_dialog">
                    <img src="../assets/loading.svg" alt="">
                </div>
            </div>
        </transition>
        <side-left></side-left>
        <!-- <page-article></page-article> -->
        <div class="posts-container rd-col-14">
            <div class="posts-wrap" :class="{'adaptor': showLoading === true}">
                <h1 class="posts-head-title">电影详情</h1>
                <div class="posts-article" transition="fadeIn" v-show="showLoading === false">
                    <h1 class="article-title">{{detailData.title}} </h1>
                    <div class="movie-out">
                        <img :src="detailData.img" alt="电影" />
                    </div>
                    <div class="movie-app">
                        <p>评分：
                            <span class="text-red">{{detailData.average}}</span>
                        </p>
                        <p>时长：{{detailData.durations}}</p>
                        <p>上映时间：{{detailData.mainland_pubdate}}</p>
                        <p>主演：
                            <span v-for="(cast,index) in  detailData.casts" :key="index">{{cast.name}} </span>
                        </p>
                        <p>类型：
                            <span v-for="(genre,index) in  detailData.genres" :key="index">{{genre}} </span>
                        </p>
                        <p>国家/地区：{{detailData.countries}}</p>
                    </div>
                    <div claas="movie-describe" style=" padding: 0px 20px 30px;">
                        <h3 style="  text-align: left; font-size: 20px;line-height: 20px; color: #b2b2b2; margin-bottom: 20px;">剧情介绍</h3>
                        <div class="movie-text" style=" text-align: left;font-size: 16px;">
                            {{detailData.summary}}
                        </div>
                    </div>
                </div>

            </div>
            <!--<page-nav :start="start"></page-nav>-->
        </div>
        <sidebar></sidebar>
    </div>
</template>

<script>
//import highlight from 'highlight.js'
import sideLeft from "./common/sideLeft.vue";
//import article from './common/article.vue'
import sidebar from "./common/sidebar.vue";

export default {
    name: "detail",
    data() {
        return {
            detailData: {},
            showLoading: true
        };
    },
    methods: {
        // highlightCode () {
        //   $('pre code').each(function (i, block) {
        //     highlight.highlightBlock(block)
        //   })
        // }
    },
    components: {
        "side-left": sideLeft,
        sidebar: sidebar
    },
    created() {
        this.initData();
    },
    methods: {
        initData() {
            var id = this.$route.params.id;
            var url = this.HOST + "/movie/subject/" + id;
           // console.log(this.HOST);
            this.showLoading = true;
            this.$http
                .get(url)
                .then(data => {
                    setTimeout(() => {
                        this.showLoading = false;
                    }, 500);
                    this.detailData = data.data;
                    this.detailData.img = data.data.images.large;
                    this.detailData.durations = data.data.durations[0];
                    this.detailData.countries = data.data.countries[0];
                    this.detailData.average=data.data.rating.average;

                    console.log(data.data);
                    // this.$store.dispatch("initVideoData", {
                    //     initVideoData: data
                    // });
                })
                .catch(e => console.log("error", e));
        }
    },
    vuex: {
        getters: {
            //articleDetail: state => state.articleDetail,
            showLoading: state => state.showLoading
        },
        actions: {
            //getArticleDetail
        }
    }
};
</script>

<style lang='scss' scoped>
@import "../assets/css/animate.scss";
@import "../assets/css/base/_default";

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

.article-title {
    font-size: 30px;
    margin-bottom: 20px;
}
.movie-app {
    padding: 0px 20px 10px;
    p {
        text-align: left;
        font-size: 14px;
        color: #000;
        .text-red {
            color: $error-color;
        }
    }
}
.movie-out {
    margin: 0px;
    padding: 0px 20px 15px;
    border: none;
    outline: none;
    font-size: 12px;
    line-height: 30px;
    color: #24241f;
    img {
        display: block;
        max-width: 100%;
        height: auto;
        box-sizing: border-box;
        border: 0;
    }
}
.movie-describe {
    padding: 0px 20px 30px;
    border: none;
    outline: none;
    font-size: 12px;
    line-height: 20px;
    color: #24241f;
    h3 {
        text-align: left;
        font-size: 20px;
        line-height: 20px;
        color: #b2b2b2;
    }
}
</style>