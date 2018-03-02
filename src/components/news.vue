<template>
  <div class="news father">
    <section class="news-slider">
      <el-carousel trigger="click" height="370px">
        <el-carousel-item v-for="item in sliderSrc" :key="item">
          <img :src="item">
        </el-carousel-item>
      </el-carousel>
    </section>
    <div class="content">
      <div class="info-link">
        <el-row :gutter="100">
          <el-col :span="6"><a href="javascript:;"><img
            src="http://static.zhiqiantong.com/upload/eduplat/article/20170315/1489575103818696449.png" alt=""></a>
          </el-col>
          <el-col :span="6"><a href="javascript:;"><img
            src="http://static.zhiqiantong.com/upload/eduplat/article/20170315/1489575114361347235.png" alt=""></a>
          </el-col>
          <el-col :span="6"><a href="javascript:;"><img
            src="http://static.zhiqiantong.com/upload/eduplat/article/20170313/1489392167715205938.png" alt=""></a>
          </el-col>
          <el-col :span="6"><a href="javascript:;"><img
            src="http://static.zhiqiantong.com/upload/eduplat/article/20170313/1489392241823159082.png" alt=""></a>
          </el-col>
        </el-row>
      </div>
      <div class="lists">
        <el-row :gutter="30">
          <el-col :span="18">
            <div class="news-list">
              <el-row v-for="(o, index) in 5" :key="o" :offset="index > 0 ? 5 : 0" style="margin-bottom: 20px;">
                <el-col :span="24">
                  <el-card :body-style="{ padding: '20px' }">
                    <img src="http://static.zhiqiantong.com/upload/eduplat/forumTopic/20171122/1511320694984487595.jpg"
                         class="image">
                    <div style="padding: 14px;" class="list-content">
                      <span style="font: 18px/150% 'Microsoft YaHei';">四个妙招让你的简历超过80%的竞争者~~</span>
                      <div class="bottom clearfix">
                        <div class="tags">
                          <el-row>
                            <el-col :span="6"><time class="time">2017-11-22</time></el-col>
                            <el-col :span="18">
                              <span class="tag">抹茶咖啡</span>
                              <span class="tag">简历</span>
                              <span class="tag">技巧</span>
                              <span class="tag">干货</span>
                            </el-col>
                          </el-row>
                        </div>
                        <div class="text">
                          漂亮的简历怎么做出来
                        </div>
                        <el-button type="text" class="button">操作按钮</el-button>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="6" class="right-list-container">
            <div class="right-list">
              <el-row>
                <el-col :span="24">
                  <p>推荐阅读</p>
                  <ul>
                    <li><a href="javascript:;">免费三餐下午茶+租房补贴，关心你的只有它了！</a></li>
                    <li><a href="javascript:;">免费三餐下午茶+租房补贴，关心你的只有它了！</a></li>
                    <li><a href="javascript:;">免费三餐下午茶+租房补贴，关心你的只有它了！</a></li>
                    <li><a href="javascript:;">免费三餐下午茶+租房补贴，关心你的只有它了！</a></li>
                    <li><a href="javascript:;">免费三餐下午茶+租房补贴，关心你的只有它了！</a></li>
                  </ul>
                  <a href="javascript:;" class="right-list-img">
                    <img src="http://static.zhiqiantong.com/upload/eduplat/bannerImages/20171116/1510817905025860040.jpg">
                  </a>
                  <a href="javascript:;" class="right-list-img">
                    <img src="http://static.zhiqiantong.com/upload/eduplat/bannerImages/20171116/1510817905025860040.jpg">
                  </a>
                  <a href="javascript:;" class="right-list-img">
                    <img src="http://static.zhiqiantong.com/upload/eduplat/bannerImages/20171116/1510817905025860040.jpg">
                  </a>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'news',
    data() {
      return {
        sliderSrc: [
          './src/assets/imgs/news_banner/1510901345135010976.jpg',
          './src/assets/imgs/news_banner/1510901378311673518.jpg'
        ],
        currentDate: new Date()
      }
    }
  }

</script>
<style lang="scss" src="../assets/scss/news.scss" scoped></style>
