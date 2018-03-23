<template>
  <div class="needjob father">
    <div>
      <div class="content">
        <!--过滤器容器-->
        <div class="filter-container">
          <div class="filter filter-type clearfix">
            <div class="filter-title">类型</div>
            <div class="filter-type-tags filter-tags clearfix">
              <ul @click="typeActivate($event)">
                <li v-for="(item,index) in typeList"
                    :class="{'filter-tag-active':typeActiveIndex == index}"
                    @click="typeActiveIndex = index;selectPosition({position_type:index});"
                    :classify-index=index>
                  {{item}}
                </li>
              </ul>
            </div>
          </div>
          <div class="filter filter-industry">
            <div class="filter-title">行业</div>
            <div class="filter-industry-tags filter-tags clearfix">
              <ul @click="industryActivate($event)">
                <li v-for="(item,index) in industryList"
                    :class="{'filter-tag-active':industryActiveIndex == index}"
                    @click="industryActiveIndex = index;selectPosition({position_industry:index});"
                    :classify-index=index>
                  {{item}}
                </li>
              </ul>
            </div>
          </div>
          <div class="filter filter-area">
            <div class="filter-title">地区</div>
            <div class="filter-area-tags filter-tags clearfix">
              <ul @click="areaActivate($event)">
                <li v-for="(item,index) in areaList"
                    :class="{'filter-tag-active':areaActiveIndex == index}"
                    @click="areaActiveIndex = index;selectPosition({position_address:item});"
                    :classify-index=index>
                  {{item}}
                </li>
                <!--<li class="filter-area-tags-more">更多</li>-->
              </ul>
            </div>
          </div>
          <div class="filter filter-graduate" v-if="typeActiveIndex === 3">
            <div class="filter-title">工作年限</div>
            <div class="filter-graduate-tags filter-tags clearfix">
              <ul @click="graduateActivate($event)">
                <li v-for="(item,index) in graduateList"
                    :class="{'filter-tag-active':graduateActiveIndex == index}"
                    @click="graduateActiveIndex = index;selectPosition({position_graduation_year:index});"
                    :classify-index=index>
                  {{item}}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--职位列表容器-->
        <div class="job-content"
             v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.3)">
          <div v-if="jobList.length === 0">没有查询到数据</div>
          <el-row style="padding-bottom: 20px;" v-for="(item, index) in jobList" :key="index">
            <el-col :span="24">
              <el-card class="box-card">
                <el-collapse accordion>
                  <el-collapse-item>
                    <template slot="title">
                      <div class="box-card-collapse-title">
                        <div slot="header" class="clearfix" style="font-weight: bold;font-size: 15px;">
                          <span v-html="item.position_company"></span>
                          <span>{{item.position_depart}}</span>
                        </div>
                        <div class="text-item clearfix" style="font-size: 12px;">
                          <span style="margin-right: 20px;">{{item.position_address}}</span>
                          <span style="margin-right: 20px;">{{typeList[item.position_type - 0]}}</span>
                          <span
                            style="margin-right: 20px;">{{graduateList[item.position_graduation_year - 0]}}</span>
                          <!--<span style="margin-right: 20px;">每周实习5天</span>-->
                          <!--<span style="margin-right: 20px;">发布日期</span>-->
                          <span class="fr">{{getDate(item.create_time)}}发布</span>
                        </div>
                      </div>
                    </template>
                    <div style="margin: 50px 50px 20px 10px;">
                      <h4 style="font-size: 13px;font-weight: bold;margin-bottom: 20px;">
                        <icon name="caret-right" style="vertical-align: -2px;color: #aaa;"></icon> 职责说明：
                      </h4>
                      <ol style="line-height: 1.5rem;margin-left: 1rem;font-size: 12px;">
                        <li class="duty-list" v-html="item.position_work_context"></li>
                      </ol>
                      <h4 style="margin-top: 20px;font-size: 13px;font-weight: bold;margin-bottom: 20px;">
                        <icon name="caret-right" style="vertical-align: -2px;color: #aaa;"></icon> 任职要求：
                      </h4>
                      <ol style="line-height: 1.5rem;margin-left: 1rem;font-size: 12px;">
                        <li class="duty-require" v-html="item.position_work_requir"></li>
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
        <div class="job-page-container">
          <span class="job-page">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="5"
              :total="count"
              @current-change="pageChange"
              :current-page.sync="currentPage">
            </el-pagination>
          </span>
        </div>
      </div>
    </div>
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
                <el-select v-model="selectResume" :disabled="fillList.length == 0">
                  <el-option
                    v-for="(item, index) in fillList"
                    :key="item.id"
                    :label="item.vitaeName + '-' + getTime(item.create_time).fd + '-' + getTime(item.create_time).ft"
                    :value="item.vitae_id"></el-option>
                </el-select>
                <div style="margin-top: 10px;">
                <span style="cursor: pointer;" @click="completeRes">还没有在线简历？去新增</span>
                </div>
              </span>
            </el-radio>
            <br>
            <el-radio label="1">
              附件简历：
              <!--<div class="resume-title" style="display: inline-block;margin-left: 50px;">{{pdfList[0] ? pdfList[0].vitaeName :''}}-->
              <!--</div>-->
              <el-select v-model="selectPdfResume" :disabled="pdfDisable">
                <el-option v-for="(item,index) in pdfList"
                           :key="item.vitae_id"
                           :label="item.vitaeName"
                           :value="item.vitae_id"></el-option>
              </el-select>
              <el-upload
                class="resume-upload"
                ref="resUpload2"
                :action="api.uploadVitaeAddress"
                style="display: inline-block;margin-left: 50px;"
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

<script>
  import api from '../assets/datas/api'
  import {mapActions} from 'vuex'
  import {mapMutations} from 'vuex'

  export default {

    data() {
      return {
        api, //api
        selectResume: '',   //投递对话框内选择在线简历
        selectPdfResume: '',    //投递对话框内选择附件简历
        resumeList: [],   //当前页简历列表
        diaCompany: '',   //对话框内渲染的公司名称
        diaDepart: '',    //对话框内渲染的部门名称
        loading: true,    //loading蒙版
        jobList: [],    //职位列表
        dialogFormVisible: false,   //简历投递对话框

        typeActiveIndex: 0,   //职位过滤器-职位类型索引
        typeList:   //职位过滤器-职位类型列表
          ['全部', '实习岗位', '校园招聘', '社招职位'],

        industryActiveIndex: 0,   //职位过滤器-行业索引
        industryList:   //职位过滤器-行业列表
          ['全部', '银行', '信托', '保险', '证券', '基金', '互金', '租赁', 'PE/VC', '其他'],

        areaActiveIndex: 0,   //职位过滤器-区域索引
        areaList:   //职位过滤器-区域列表
          ['全部', '北京', '上海', '广州', '深圳', '杭州', '武汉', '天津', '成都', '重庆', '南京', '其他'],

        graduateActiveIndex: 0,   //职位过滤器-毕业时间
        graduateList:
          ['不限',
            new Date().getFullYear() + '年',
            new Date().getFullYear() + 1 + '年',
            new Date().getFullYear() + 2 + '年及以后'],
        resumeForm: {   //投递对话框内默认在线简历
          select: '0',
        },
        positionFilter: {},   //职位过滤器
        pf: {},   //职位过滤器
        pageConfig: {"first_page": 0, "page_size": 5},    //分页配置
        count: 0,   //总页数
        currentPage: 0,   //当前页码
        pdfList: [],   //附件简历列表
        fillList: [],   //在线填写简历列表
        pdfDisable: false   //附件简历是否禁用
      }
    },
    methods: {
      ...mapActions([
        'actionResumeList'    //获取简历列表至store
      ]),
      ...mapMutations([
        'writeResumeList'   //写入简历列表至store
      ]),
      //切换过滤器-类型索引
      typeActivate(event) {
        this.typeActiveIndex = event.target.attributes[1].value;
      },
      //切换过滤器-行业索引
      industryActivate(event) {
        this.industryActiveIndex = event.target.attributes[1].value;
      },
      //切换过滤器-区域索引
      areaActivate(event) {
        this.areaActiveIndex = event.target.attributes[1].value;
      },
      //切换过滤器-毕业时间
      graduateActivate(event) {
        this.graduateActiveIndex = event.target.attributes[1].value;
      },

      //渲染投递简历对话框
      renderDialog(index) {
        if (JSON.parse(sessionStorage.getItem('logged'))) {
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

      //渲染投递简历对话框中的简历列表
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

      //写入筛选信息
      selectPosition(obj) {
        this.loading = true;
        this.pf = this.positionFilter;
        this.pageConfig = {"first_page": 0, "page_size": 5};
        this.currentPage = 0;
        Object.assign(this.pf, obj);
        if (this.pf.position_type == 0) {
          delete this.pf.position_type;
        } else if (this.pf.position_industry == 0) {
          delete this.pf.position_industry;
        } else if (this.pf.position_address == '全部') {
          delete this.pf.position_address;
        } else if (this.pf.position_graduation_year == '不限') {
          delete this.pf.position_graduation_year;
        }
        Object.assign(this.pf, this.pageConfig);
        this.axios({
          method: 'post',
          url: api.selectPosition,
          data: this.pf
        }).then((res) => {
          this.jobList = res.data.data.rpDTO;
          this.count = res.data.data.num;
          this.loading = false;
        })
      },

      //附件简历上传成功后刷新附件简历列表
      resumeUpload(res) {
        if (res.code == '0') {
          // this.dialogFormVisible = false;
          this.$refs.resUpload2.clearFiles;
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
              if (this.pdfList.length === 0) {
                this.pdfDisable = true;
              } else {
                this.pdfDisable = false;
              }
              if (res.data.data.ruv) {
                this.writeResumeList(res.data.data.ruv);
              } else {
                this.writeResumeList([]);
              }
            }
            // console.log(state.resume.resumeList);
          }).catch((err) => {
            if (err) {
              console.log(err);
            }
          })
        }
      },

      //过滤简历类型（在线填写，附件）
      resumeFilter(list) {
        let fillList = [];
        let pdfList = [];
        for (let i = 0; i < list.length; i++) {
          if (list[i].vitaeType == '0') {
            fillList.push(list[i]);
          } else {
            pdfList.push(list[i]);
          }
        }
        return {"fillList": fillList, "pdfList": pdfList};
      },

      //日期格式转换 （待提取）
      getDate(num) {
        let date = new Date(num);
        let formatDate = date.getFullYear() + "/" + (date.getMonth() - 0 + 1) + "/" + date.getDate();
        return formatDate;
      },

      getTime(num) {
        let d = new Date(num);
        let fd = d.getFullYear() + '.' + d.getMonth() + 1 + '.' + d.getDate();
        let ft = d.getHours() + ':' + d.getMinutes();
        return {fd,ft}
      },

      //页码变化时的钩子
      pageChange(currentPage) {
        this.loading = true;
        this.pageConfig.first_page = (currentPage - 1) * 5;
        Object.assign(this.pf, this.pageConfig);
        this.axios({
          method: 'post',
          url: api.selectPosition,
          data: this.pf
        }).then((res) => {
          this.jobList = res.data.data.rpDTO;
          this.count = res.data.data.num;
          this.loading = false;
        })
      },

      //简历投递
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

      //文件上传前检查文件类型
      beforePdfUpload(file) {
        const isPDF = file.type === 'application/pdf';
        if (!isPDF) {
          this.$message.error('只能上传pdf');
        }
        return isPDF;
      },

      //获取全部筛选结果
      getByFilter() {
        this.axios({
          method: 'post',
          url: api.selectPosition,
          data: this.pageConfig
        }).then((res) => {
          this.jobList = res.data.data.rpDTO;
          this.count = res.data.data.num;
          this.loading = false;
        })
      },

      //获取关键字搜索结果
      searchByKeyword() {
        let keyword = this.$router.currentRoute.params.key;
        this.$store.dispatch('searchByKeyWord', {keyword: keyword}).then( res => {
          if (res.data.code === '0') {
            this.jobList = res.data.data.rpDTO;
            this.count = res.data.data.num;
            this.loading = false;
          } else {
            this.loading = false;
          }
        })
      },

      initTypeIndex() {
        this.typeActiveIndex = 0;
        this.industryActiveIndex = 0;
        this.areaActiveIndex = 0;
        this.graduateActiveIndex = 0;
      },
    },
    created: function () {
      //判断是否搜索
      if (this.$router.currentRoute.params.key === 'all') {
        //获取全部职位
        this.getByFilter();
      } else {
        this.searchByKeyword();
      }
    },
    computed: {
      headerObj: function () {
        return {'token': sessionStorage.getItem('token'), 'userId': sessionStorage.getItem('userId')}
      },
      id: function () {
        return this.$store.state.userInfo.id;
      },
    },
    watch: {
      $route() {
        if (this.$route.params.key !== 'all') {
          this.initTypeIndex();
          this.searchByKeyword();
        } else {
          this.getByFilter();
        }
      }
    }
  }
</script>

<style lang="scss" src="../assets/scss/needjob.scss" scoped></style>

<style lang="scss">
  .needjob {
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
    .el-dialog {
      width: 40%;
    }
  }
</style>
