<template>
  <div class="college father">
    <div class="college-carousel">
      <el-carousel height="898px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3><i class="el-icon-caret-right"></i></h3>
        </el-carousel-item>
      </el-carousel>
      <div class="content">
        <div class="thumbs">
          <ul>
            <li v-for="item in 5" class="thumb"></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="college-course">
        <div class="investment-course course-list">
          <div class="title">
            <h3>投行课程</h3>
            <div class="course-more">
            </div>
          </div>
          <div class="course-line">
            <div class="course-line-active"></div>
          </div>
          <div class="course-pre-list">
            <el-row :gutter="34">
              <el-col :span="6" class="course-pre">
                <div class="video-pre">
                  <div class="video-pre-mask">
                    <div class="video-pre-mask-info">
                      <i class="el-icon-time"></i>
                      <span>May 06,2014</span>
                      <i class="el-icon-edit-outline"></i>
                      <span>10</span>
                    </div>
                  </div>
                </div>
                <div class="course-title">
                  <h4>第一部分</h4>
                </div>
              </el-col>
              <el-col :span="6" class="course-pre">
                <div class="video-pre">
                  <div class="video-pre-mask">
                    <div class="video-pre-mask-info">
                      <i class="el-icon-time"></i>
                      <span>May 06,2014</span>
                      <i class="el-icon-edit-outline"></i>
                      <span>10</span>
                    </div>
                  </div>
                </div>
                <div class="course-title">
                  <h4>第二部分</h4>
                </div>
              </el-col>
              <el-col :span="6" class="course-pre">
                <div class="video-pre">
                  <div class="video-pre-mask">
                    <div class="video-pre-mask-info">
                      <i class="el-icon-time"></i>
                      <span>May 06,2014</span>
                      <i class="el-icon-edit-outline"></i>
                      <span>10</span>
                    </div>
                  </div>
                </div>
                <div class="course-title">
                  <h4>第三部分</h4>
                </div>
              </el-col>
              <el-col :span="6" class="course-pre">
                <div class="video-pre">
                  <div class="video-pre-mask">
                    <div class="video-pre-mask-info">
                      <i class="el-icon-time"></i>
                      <span>May 06,2014</span>
                      <i class="el-icon-edit-outline"></i>
                      <span>10</span>
                    </div>
                  </div>
                </div>
                <div class="course-title">
                  <h4>第四部分</h4>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="advanced-course course-list">
          <div class="title">
            <h3>进阶课程</h3>
            <div class="course-more">
            </div>
          </div>
          <div class="course-line">
            <div class="course-line-active"></div>
          </div>
          <div class="course-pre-list">
            <el-row :gutter="34">
              <el-col :span="6" class="course-pre">
                <div class="video-pre">
                  <div class="video-pre-mask">
                    <div class="video-pre-mask-info">
                      <i class="el-icon-time"></i>
                      <span>May 06,2014</span>
                      <i class="el-icon-edit-outline"></i>
                      <span>10</span>
                    </div>
                  </div>
                </div>
                <div class="course-title">
                  <h4>第一部分</h4>
                </div>
              </el-col>
              <el-col :span="6" class="course-pre">
                <div class="video-pre">
                  <div class="video-pre-mask">
                    <div class="video-pre-mask-info">
                      <i class="el-icon-time"></i>
                      <span>May 06,2014</span>
                      <i class="el-icon-edit-outline"></i>
                      <span>10</span>
                    </div>
                  </div>
                </div>
                <div class="course-title">
                  <h4>第二部分</h4>
                </div>
              </el-col>
              <el-col :span="6" class="course-pre">
                <div class="video-pre">
                  <div class="video-pre-mask">
                    <div class="video-pre-mask-info">
                      <i class="el-icon-time"></i>
                      <span>May 06,2014</span>
                      <i class="el-icon-edit-outline"></i>
                      <span>10</span>
                    </div>
                  </div>
                </div>
                <div class="course-title">
                  <h4>第三部分</h4>
                </div>
              </el-col>
              <el-col :span="6" class="course-pre">
                <div class="video-pre">
                  <div class="video-pre-mask">
                    <div class="video-pre-mask-info">
                      <i class="el-icon-time"></i>
                      <span>May 06,2014</span>
                      <i class="el-icon-edit-outline"></i>
                      <span>10</span>
                    </div>
                  </div>
                </div>
                <div class="course-title">
                  <h4>第四部分</h4>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="high-course course-list">
          <div class="title">
            <h3>高阶课程</h3>
            <div class="course-more">
            </div>
          </div>
          <div class="course-line">
            <div class="course-line-active"></div>
          </div>
          <div class="course-pre-list">
            <el-row :gutter="34">
              <el-col :span="6" class="course-pre">
                <div class="video-pre">
                  <div class="video-pre-mask">
                    <div class="video-pre-mask-info">
                      <i class="el-icon-time"></i>
                      <span>May 06,2014</span>
                      <i class="el-icon-edit-outline"></i>
                      <span>10</span>
                    </div>
                  </div>
                </div>
                <div class="course-title">
                  <h4>第一部分</h4>
                </div>
              </el-col>
              <el-col :span="6" class="course-pre">
                <div class="video-pre">
                  <div class="video-pre-mask">
                    <div class="video-pre-mask-info">
                      <i class="el-icon-time"></i>
                      <span>May 06,2014</span>
                      <i class="el-icon-edit-outline"></i>
                      <span>10</span>
                    </div>
                  </div>
                </div>
                <div class="course-title">
                  <h4>第二部分</h4>
                </div>
              </el-col>
              <el-col :span="6" class="course-pre">
                <div class="video-pre">
                  <div class="video-pre-mask">
                    <div class="video-pre-mask-info">
                      <i class="el-icon-time"></i>
                      <span>May 06,2014</span>
                      <i class="el-icon-edit-outline"></i>
                      <span>10</span>
                    </div>
                  </div>
                </div>
                <div class="course-title">
                  <h4>第三部分</h4>
                </div>
              </el-col>
              <el-col :span="6" class="course-pre">
                <div class="video-pre">
                  <div class="video-pre-mask">
                    <div class="video-pre-mask-info">
                      <i class="el-icon-time"></i>
                      <span>May 06,2014</span>
                      <i class="el-icon-edit-outline"></i>
                      <span>10</span>
                    </div>
                  </div>
                </div>
                <div class="course-title">
                  <h4>第四部分</h4>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div class="course-free">
      <div class="content">
        免费公开课
      </div>
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style lang="scss" src="../assets/scss/college.scss" scoped>

</style>
