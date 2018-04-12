<template>
  <div class="job father">
    <div>
      <div class="carousel"
           :style="{backgroundColor: courList[courIndex].bgColor}">
        <div class="carousel-container">
          <el-carousel trigger="click" height="336px" @change="courChange">
            <el-carousel-item v-for="(item,index) in courList" :key="index">
              <a :href="item.resourcePath" target="_blank">
                <img :src="item.filePath" alt="" style="height: 336px;width: 100%;">
              </a>
            </el-carousel-item>
          </el-carousel>
          <div class="banner">
            <ul>
              <el-row>
                <el-col :span="6" v-for="(item, index) in bannerList" :key="index" :offset="index!=0?3:0">
                  <a
                    :href="item.resourcePath"
                    target="_blank">
                    <div class="banner-item"
                         style="height: 116px;">
                      <img :src="item.filePath" alt="">
                    </div>
                  </a>
                </el-col>
              </el-row>
            </ul>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="main">
          <div class="job-classify clearfix">
            <ul @click="classifyActivate($event)">
              <li class="job-classify-item" :class="{'item-active':classify == 0}" :classify-index="0"
                  @click="classify = 0;selectPosition({position_type:1})">实习岗位
              </li>
              <li class="job-classify-item" :class="{'item-active':classify == 1}" :classify-index="1"
                  @click="classify = 1;selectPosition({position_type:2})">校园招聘
              </li>
              <li class="job-classify-item" :class="{'item-active':classify == 2}" :classify-index="2"
                  @click="classify = 2;selectPosition({position_type:3})">社招职位
              </li>
            </ul>
            <div class="position-id-search-box clearfix">
              <!--<el-input v-model="positionId" placeholder="请输入职位ID"></el-input>-->
              <div class="input-container">
                <input type="text" placeholder="请输入职位ID或关键字" v-model="keyword">
              </div>
              <div class="search-btn">
                <button type="primary" @click="searchByPositionId">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-search"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <el-row>
            <el-col :span="24">
              <div class="tags">
                <ul @click="tagActivate($event)">
                  <el-row>
                    <el-col :sm="3" :xs="6">
                      <li class="tags-item" :class="{'tags-active':tagIndex == 1}" :tag-index="1"
                          @click="tagIndex = 1;selectPosition({position_function:1})">投资银行
                      </li>
                    </el-col>
                    <el-col :sm="3" :xs="6">
                      <li class="tags-item" :class="{'tags-active':tagIndex == 2}" :tag-index="2"
                          @click="tagIndex = 2;selectPosition({position_function:2})">证券研究
                      </li>
                    </el-col>
                    <el-col :sm="3" :xs="6">
                      <li class="tags-item" :class="{'tags-active':tagIndex == 3}" :tag-index="3"
                          @click="tagIndex = 3;selectPosition({position_function:3})">资产管理
                      </li>
                    </el-col>
                    <el-col :sm="3" :xs="6">
                      <li class="tags-item" :class="{'tags-active':tagIndex == 4}" :tag-index="4"
                          @click="tagIndex = 4;selectPosition({position_function:4})">固定收益
                      </li>
                    </el-col>
                    <el-col :sm="3" :xs="6">
                      <li class="tags-item" :class="{'tags-active':tagIndex == 5}" :tag-index="5"
                          @click="selectPosition({position_function:5});tagIndex = 5">私募股权
                      </li>
                    </el-col>
                    <el-col :sm="3" :xs="6">
                      <li class="tags-item" :class="{'tags-active':tagIndex == 6}" :tag-index="6"
                          @click="tagIndex = 6;selectPosition({position_function:6})">银行保险
                      </li>
                    </el-col>
                    <el-col :sm="3" :xs="6">
                      <li class="tags-item" :class="{'tags-active':tagIndex == 7}" :tag-index="7"
                          @click="tagIndex = 7;selectPosition({position_function:7})">其他
                      </li>
                    </el-col>
                    <el-col :sm="3" :xs="6">
                      <li class="tags-item tags-more">
                        <router-link to="/job/all">更多筛选<i class="el-icon-arrow-right"></i></router-link>
                      </li>
                    </el-col>
                  </el-row>
                </ul>
              </div>
            </el-col>
          </el-row>
          <div class="job-content"
               v-loading="loading"
               element-loading-text="拼命加载中"
               element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.3)">
            <el-row style="margin-bottom: 20px;" v-for="(item, index) in jobList.slice(0,jobShowNum)" :key="index">
              <el-col :span="24">
                <el-card class="box-card">
                  <el-collapse accordion>
                    <el-collapse-item>
                      <template slot="title">
                        <div class="box-card-collapse-title">
                          <div slot="header" class="clearfix" style="font-weight: bold;font-size: 15px;">
                            <span>{{item.position_company}}</span>
                            <span>{{item.position_depart}}</span>
                          </div>
                          <div class="text-item clearfix" style="font-size: 12px;">
                            <span style="margin-right: 20px;">{{item.position_address}}</span>
                            <span style="margin-right: 20px;">{{typeList[item.position_type - 0]}}</span>
                            <span style="margin-right: 20px;">{{yearList[item.position_graduation_year - 0]}}</span>
                            <span style="margin-right: 20px;">职位编号:{{item.position_index}}</span>
                            <span class="fr">{{getDate(item.create_time)}}发布</span>
                          </div>
                        </div>
                      </template>
                      <div style="margin: 50px 50px 20px 10px;">
                        <h4 style="font-size: 13px;font-weight: bold;margin-bottom: 20px;">
                          <icon name="caret-right" style="vertical-align: -2px;color: #aaa;"></icon>
                          职责说明：
                        </h4>
                        <ol style="line-height: 1.5rem;margin-left: 1rem;font-size: 12px;">
                          <li class="duty-list" v-html="item.position_work_context"></li>
                        </ol>
                        <h4 style="margin-top: 20px;font-size: 13px;font-weight: bold;margin-bottom: 20px;">
                          <icon name="caret-right" style="vertical-align: -2px;color: #aaa;"></icon>
                          任职要求：
                        </h4>
                        <ol style="line-height: 1.5rem;margin-left: 1rem;font-size: 12px;">
                          <li class="duty-require" v-html="item.position_work_requir"></li>
                        </ol>
                        <h4 style="margin-top: 20px;font-size: 13px;font-weight: bold;margin-bottom: 20px;">
                          <icon name="caret-right" style="vertical-align: -2px;color: #aaa;"></icon>
                          其他：
                        </h4>
                        <ol style="line-height: 1.5rem;margin-left: 1rem;font-size: 12px;">
                          <li class="duty-require" v-html="item.position_work_other || '无'"></li>
                        </ol>
                      </div>
                    </el-collapse-item>
                    <div class="go-publish">
                      <div class="btn" style="width: 100px;margin: 10px 0 -30px;">
                        <button @click="renderDialog(index)">马上投递</button>
                      </div>
                      <div class="fr">
                        <router-link :to="'/position/' + item.id" target="_blank">
                          <el-button type="text" size="mini" class="fr" style="margin: 10px 0;">详情..</el-button>
                        </router-link>
                      </div>
                    </div>
                  </el-collapse>
                </el-card>
              </el-col>
            </el-row>
          </div>
          <button class="load-more" @click="loadMore" :disabled="loadMOreBtnDsb">{{loadMoreBtnMsg}}</button>
        </div>
      </div>
    </div>
    <!--返回顶部-->
    <transition name="el-fade-in">
      <div class="bar" v-show="barVisible">
        <div class="back-to-top">
          <el-button @click="backTop">返回顶部</el-button>
        </div>
      </div>
    </transition>
    <!--投递简历对话框-->
    <el-dialog title="简历投递" :visible.sync="dialogFormVisible">
      <el-form :model="resumeForm">
        <div class="resume">
          您正在向 <span>{{diaCompany}}公司</span> <span>{{diaDepart}}部门</span> 投递简历
        </div>
        <div class="tips" style="margin-top: 30px">
          请选择你要投递的简历
        </div>
        <el-form-item>
          <el-radio-group v-model="resumeForm.select">
            <br>
            <el-radio label="0" style="margin: 30px 0;">
              在线简历：
              <span style="color: #C20C0C;">
                <el-select v-model="selectResume" :disabled="fillList.length === 0">
                  <el-option
                    v-for="(item,index) in fillList"
                    :key="item.id"
                    :label="item.vitaeName + '-' + getTime(item.create_time).fd + '-' + getTime(item.create_time).ft"
                    :value="item.vitae_id"></el-option>
                </el-select>
                <div style="margin-top: 10px;">
                <span style="cursor: pointer;margin-left: 30px;" @click="$router.push('/fillResume')">还没有在线简历？去新增</span>
                </div>
              </span>
            </el-radio>
            <br>
            <el-radio label="1" :disabled="pdfDisable">
              附件简历：
              <el-select v-model="selectPdfResume" :disabled="pdfDisable">
                <el-option v-for="(item,index) in pdfList"
                           :key="item.vitae_id"
                           :label="item.vitaeName"
                           :value="item.vitae_id"></el-option>
              </el-select>
              <!--<div class="resume-title" style="display: inline-block;margin-left: 50px;">{{pdfList[0] ?-->
              <!--pdfList[0].vitaeName :''}}-->
              <!--</div>-->
              <el-upload
                class="resume-upload"
                ref="resUpload"
                :action="api.uploadVitaeAddress"
                style="display: inline-block;margin-left: 50px;"
                :file-list="fileList"
                :show-file-list=false
                :headers="headerObj"
                :on-success="resumeUpload"
                :data="{'id':id}"
                accept=".pdf"
                :before-upload="beforePdfUpload"
              >
                上传简历
              </el-upload>
              <div
                style=
                  "color: #C20C0C;margin-top: 10px;
                  margin-left: 30px;
                  width: auto;
                  -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
                  padding: 0 80px 0 0;
                  white-space: normal;
                  line-height: 1.5rem;"
              >注意：系统最多同时保存三份上传的简历附件，超过此数量后，系统将会自动覆盖最早上传的简历附件</div>
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="fl" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="deliver">投 递</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" src="../assets/scss/job.scss" scoped></style>
<style lang="scss">

  .el-select-dropdown__item {
    font-size: 12px;
  }

  .job {
    .job-content {
      .el-card__body {
        padding-top: 0 !important;
      }
    }

    .el-tabs__header {
      border: none;
      padding: 0 15px;
    }
    .el-tabs__nav {
      margin: 0 auto !important;
      width: 100%;
      overflow: hidden;
      float: none;
      background-color: #505f6e;
      .el-tabs__item {
        width: 33.5%;
        text-align: center;
        color: #ffffff;
      }
      .is-active {
        border: none;
        background-color: #818E97 !important;
        color: #ffffff !important;
      }
    }
    .el-tabs__content {
      padding-top: 0;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item:hover {
      color: #ffffff;
    }
    .tag {
      text-align: center;
      padding: 30px 20px 15px 0;
      background-color: #818E97;
      button {
        border: solid 1px #19a4b7;
      }
    }
    .el-dialog {
      width: 40%;
    }
  }
</style>

<script>
  import api from '../assets/datas/api'
  import {mapActions} from 'vuex'
  import {mapMutations} from 'vuex'
  import '../assets/icon/iconfont'

  export default {
    name: 'job',
    data() {
      return {
        selectResume: '',
        selectPdfResume: '',
        diaCompany: '',
        diaDepart: '',
        courIndex: 0,
        loading: true,
        jobList: [],
        tagIndex: 0,
        classify: 0,
        positionNumber: 5,
        dialogFormVisible: false,
        successTableVisible: false,
        resumeForm: {
          select: '0'
        },
        barVisible: false,
        resumeList: [],
        pdfList: [],
        fillList: [],
        fileList: [],
        positionFilter: {
          position_function: 0,
          position_type: 1,
          first_page: 0,
          page_size: 5
        },
        yearList: ['不限毕业时间',
          new Date().getFullYear() + '年毕业',
          new Date().getFullYear() + 1 + '年毕业',
          new Date().getFullYear() + 2 + '年及以后毕业',
          '1-2年工作经验',
          '3-4年工作经验',
          '5-6年工作经验',
          '7-8年工作经验',
          '8年以上工作经验'],
        typeList: [
          '',
          '实习',
          '校招',
          '社招'
        ],
        jobShowNum: 5,
        loadMoreBtnMsg: '加载更多职位...',
        loadMOreBtnDsb: false,
        api: api,
        uploadData: {"id": this.id},
        pdfDisable: false,
        courList: [{bgColor: '#fff'}],
        bannerList: [],
        keyword: ''
      }
    },
    methods: {
      ...mapActions([
        'actionResumeList'
      ]),
      ...mapMutations([
        'writeResumeList'
      ]),
      getDate(num) {
        let date = new Date(num);
        let formatDate = date.getFullYear() + "/" + (date.getMonth() - 0 + 1) + "/" + date.getDate();
        return formatDate;
      },
      getTime(num) {
        let d = new Date(num);
        let fd = d.getFullYear() + '.' + d.getMonth() + 1 + '.' + d.getDate();
        let ft = d.getHours() + ':' + d.getMinutes();
        return {fd, ft}
      },
      courChange(curIndex, oldIndex) {
        this.courIndex = curIndex;
      },
      deliver() {
        if (this.resumeForm.select === "0") {
          this.$store.commit('writeIdList2', this.selectResume);
          if (!this.selectResume) {
            this.$message('请选择有效的简历');
            return
          }
        } else {
          this.$store.commit('writeIdList2', this.selectPdfResume);
          if (!this.selectPdfResume) {
            this.$message('请选择有效的简历');
            return
          }
        }
        this.dialogFormVisible = false;
        this.$router.push('/dbe');
      },
      tagActivate(event) {
        this.tagIndex = event.target.attributes[1].value;
      },
      classifyActivate(event) {
        this.classify = event.target.attributes[1].value;
      },
      loadMore() {
        this.positionFilter.page_size += 5;
      },
      backTop() {
        let timer = setInterval(() => {
          let top = (document.documentElement.scrollTop || document.body.scrollTop);
          let speed = Math.ceil(top / 5);
          document.documentElement.scrollTop = top - speed;
          document.body.scrollTop = top - speed;
          if (top <= 5) {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            clearInterval(timer);
          }
        }, 20)
      },
      handleScroll() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= 400) {
          this.barVisible = true;
        } else {
          this.barVisible = false;
        }
      },
      renderDialog(index) {
        if (sessionStorage.getItem('logged')) {
          this.completeRes();
          this.dialogFormVisible = true;
          this.diaCompany = this.jobList[index].position_company;
          this.diaDepart = this.jobList[index].position_depart;
          let id = this.$store.state.userInfo.id;
          let position_id = this.jobList[index].id;
          let n = {"id": id, "position_id": position_id};
          this.$store.commit('writeIdList1', n);
        } else {
          this.$router.push('/login');
        }
      },
      completeRes() {
        this.axios({
          method: 'post',
          url: api.selectMyVitae,
          data: {id: this.$store.state.userInfo.id}
        }).then((res) => {
          let data = res.data;
          if (data.code == 0) {
            this.resumeList = data.data.ruv;
          } else {
            this.resumeList = []
          }
          this.fillList = this.resumeFilter(this.resumeList).fillList;
          this.pdfList = this.resumeFilter(this.resumeList).pdfList;
          if (this.pdfList.length === 0) {
            this.pdfDisable = true;
          } else {
            this.pdfDisable = false;
          }
        }).catch((err) => {
          if (err) {
            alert('服务器请求出错，请稍后再试或联系管理员');
          }
        })
      },
      selectPosition(obj) {
        this.jobShowNum = 5;
        Object.assign(this.positionFilter, obj);
        if (+this.positionFilter.position_type === 0) {
          delete this.positionFilter.position_type;
        } else if (+this.positionFilter.position_industry === 0) {
          delete this.positionFilter.position_industry;
        } else if (this.positionFilter.position_address === '全部') {
          delete this.positionFilter.position_address;
        } else if (this.positionFilter.position_graduation_year === '不限') {
          delete this.positionFilter.position_graduation_year;
        }
      },

      //上传前检查文件类型
      beforePdfUpload(file) {
        const isPDF = file.type === 'application/pdf';
        if (!isPDF) {
          this.$message.error('只能上传pdf');
        }
        return isPDF;
      },

      //附件简历上传成功后
      resumeUpload: function (res) {
        if (res.code == '0') {
          // this.dialogFormVisible = false;
          this.$refs.resUpload.clearFiles;
          let id = this.$store.state.userInfo.id;
          // this.actionResumeList({"id": id});
          this.axios({
            method: 'post',
            url: api.selectMyVitae,
            data: {"id": id}
          }).then((res) => {
            if (res.data.code == 0 || res.data.code == 1001) {
              this.resumeList = res.data.data.ruv || [];
              this.pdfList = this.resumeFilter(this.resumeList).pdfList;
              this.pdfDisable = this.pdfList.length === 0;
              if (res.data.data.ruv) {
                this.writeResumeList(res.data.data.ruv);
              } else {
                this.writeResumeList([]);
              }
            }
          }).catch((err) => {
            if (err) {
              console.log(err);
            }
          })
        }
      },
      resumeFilter(list) {
        let fillList = [];
        let pdfList = [];
        for (let i = 0; i < list.length; i++) {
          if (list[i].vitaeType == '0') {
            fillList.push(list[i]);
          } else {
            pdfList.unshift(list[i]);
          }
        }
        return {"fillList": fillList, "pdfList": pdfList};
      },
      loadCour() {
        this.axios({
          method: 'post',
          url: api.getCarouselFigure,
          data: {
            "deleted": 0
          }
        }).then((res) => {
          this.courList = res.data.data;
        })
      },
      loadBanner() {
        this.axios({
          method: 'post',
          url: api.getBanner,
          data: {
            "deleted": 0
          }
        }).then((res) => {
          this.bannerList = res.data.data;
        })
      },
      searchByPositionId() {
        if (this.keyword) {
          this.keyword = this.keyword.slice(0, 9);
          console.log(this.keyword);
          this.$store.dispatch('searchByKeyWord', {keyword: this.keyword}).then(res => {
            let data = res.data.data;
            if (data) {
              if (data.operation === 1) {
                this.$router.push('/job/' + this.keyword);
              } else if (data.operation === 0) {
                let id = data.rpDTO[0].id;
                this.$router.push('/position/' + id)
              }
            } else {
              this.$message.error('未能查询到相关职位');
            }
          })
        } else {
          this.$message.error('请输入有效搜索内容');
        }
      },
      getPosition(filter) {
        return this.$store.dispatch('selectPosition', filter);
      }
    },
    computed: {
      headerObj: function () {
        return {'token': sessionStorage.getItem('token'), 'userId': sessionStorage.getItem('userId')}
      },
      id: function () {
        return this.$store.state.userInfo.id;
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
      document.getElementsByClassName('el-dialog')[0].classList.add('width40');
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    // created: function () {
    //   this.axios({
    //     method: 'post',
    //     url: api.selectPosition,
    //     data: this.positionFilter
    //   }).then((res) => {
    //     if (+res.data.code >= 0) {
    //       this.jobList = res.data.data.rpDTO;
    //       this.loading = false;
    //     } else {
    //       this.$message.error('服务器出错')
    //     }
    //   });
    //   this.loadCour();
    //   this.loadBanner();
    // },
    created() {
      this.getPosition(this.positionFilter).then(res => {
        if (+res.data.code >= 0) {
          this.jobList = res.data.data.rpDTO;
          this.loading = false;
        } else {
          this.$message.error('服务器出错')
        }
      })
      this.loadCour();
      this.loadBanner();
    },
    watch: {
      positionFilter: {
        handler: function (newVal, oldVal) {
          this.loading = true;
          this.getPosition(this.positionFilter).then(res => {
            this.jobList = res.data.data.rpDTO;
            this.count = res.data.data.num;
            this.loading = false;
            if (this.jobShowNum >= this.count) {
              this.loadMoreBtnMsg = '该条件下无更多职位';
              this.loadMOreBtnDsb = true
            } else {
              this.loading = false;
              this.loadMOreBtnDsb = false;
              this.jobShowNum += 5;
              this.loadMoreBtnMsg = '加载更多职位...';
            }
          })
        },
        deep: true
      }
    }
  }
</script>
