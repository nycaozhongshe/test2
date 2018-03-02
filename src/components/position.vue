<template>
  <div class="position father">
    <div class="banner">

    </div>
    <div class="content">
      <div class="position-content"
           v-loading="loading">
        <div class="position-desc">
          <div class="position-desc-title">
            {{positionInfo.position_type == '3'?'社招': positionInfo.position_type =='2'?'校招':'实习'}}
          </div>
          <div class="position-desc-info">
            <div class="position-desc-company">
              {{positionInfo.position_company}}&nbsp;&nbsp;&nbsp;{{positionInfo.position_depart}}
            </div>
            <span class="position-desc-tags">
              <span>{{yearList[positionInfo.position_graduation_year - 0]}}</span>
              |
              <span>{{positionInfo.position_regular == '1' ? '有留用机会':positionInfo.position_regular == '2'?'无留用机会':'暂不确定'}}</span>
              |
              <span>{{positionInfo.position_address}}</span>
            </span>
          </div>
          <!--<router-link to="/dbe">-->
          <button @click="renderDialog" class="position-deliver">马上投递</button>
          <!--</router-link>-->
        </div>
        <div class="position-info-container">
          <div class="position-info">
            <div class="position-info-content">
              <h3 class="position-info-content-title position-info-title">
                工作内容
                <div class="position-info-line"></div>
              </h3>
              <div class="position-info-content-list">
                <ol style="font-size:0.875rem;margin-left:10px">
                  <li v-html="positionInfo.position_work_context"></li>
                  <!--<li>(2)协助项目执行，包括尽职调查、材料制作、客户维护、协调中介机构等；</li>-->
                  <!--<li>(3)协助收集相关行业数据等支撑材料。</li>-->
                </ol>
              </div>
            </div>
            <div class="position-info-require">
              <h3 class="position-info-require-title position-info-title">
                投递要求
                <div class="position-info-line"></div>
              </h3>
              <div class="position-info-require-list">
                <ol style="font-size:0.875rem;margin-left:10px">
                  <li v-html="positionInfo.position_work_requir"></li>
                  <!--<li>(2)具有CPA或者财务、法律背景者优先；</li>-->
                  <!--<li>(3)有相关投行或者固收实习经历者优先；</li>-->
                  <!--<li>(4)可迅速到岗，实习时间3个月及以上，可接受不定期出差；</li>-->
                  <!--<li>(5)做事认真、踏实靠谱的男生优先。</li>-->
                </ol>
              </div>
            </div>
          </div>
          <div class="position-info-company">
            <h3 class="position-info-company-title">公司介绍</h3>
            <div class="position-info-company-content" v-html="positionInfo.company_introduction"></div>
          </div>
        </div>
      </div>
      <div class="similar">
        <div class="similar-title">
          <h3>同类岗位推荐</h3>
          <div class="line fl"></div>
          <router-link to="/job">
            <div class="similar-back">返回筛选</div>
          </router-link>
        </div>
        <div class="similar-cards">
          <el-row :gutter="34">
            <el-col :span="6" class="similar-card" v-for="(item,index) in simList" :key="index">
              <router-link :to="item.id" target="_blank">
                <div class="similar-card-box" style="cursor: pointer;">
                  <div class="similar-card-foot">
                    <div>{{item.position_company}}</div>
                    <div>{{functionList[item.position_function]}} | {{industryList[item.position_industry]}}</div>
                    <div>{{item.position_type == 1 ? '实习':item.position_type == 2 ? '校招'
                      :
                      '社招' }}
                    </div>
                  </div>
                </div>
              </router-link>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <el-dialog title="简历投递" :visible.sync="dialogFormVisible">
      <el-form :model="resumeForm">
        <div class="resume">
          您正在向 <span>{{positionInfo.position_company}}公司</span> <span>{{positionInfo.position_depart}}部门</span> 投递简历
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
                    v-for="(item,index) in fillList"
                    :key="item.vitae_id"
                    :label="item.vitaeName + '-' + getTime(item.create_time).fd + '-' + getTime(item.create_time).ft"
                    :value="item.vitae_id"></el-option>
                </el-select>
                <div style="margin-top: 10px;">
                <span style="cursor: pointer;" @click="$router.push('/fillResume')">还没有在线简历？去新增</span>
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
              >注意：系统最多同时保存三份上传的简历附件，超过此数量后，系统将会自动覆盖最早上传的简历附件
              </div>
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

  export default {
    data() {
      return {
        api,
        diaCompany: '',   //投递对话框-公司名称
        diaDepart: '',    //投递对话框-部门名称
        fillList: [],   //在线简历列表
        pdfList: [],    //附件简历列表
        selectResume: '',   //在线简历单选框-value=简历id
        selectPdfResume: '',    //附件简历单选框-value=简历id
        pdfDisable: true,   //禁用附件简历单选框
        fileList: [],   //上传文件列表
        loading: true,    //loading蒙版开关
        positionInfo: {},   //职位信息
        flag: 0,
        dialogFormVisible:    //简历投递对话框显示开关
          false,
        resumeForm:   //投递对话框表单
          {
            select: '0'
          },
        yearList: ['不限毕业时间',
          new Date().getFullYear() + '年毕业',
          new Date().getFullYear() + 1 + '年毕业',
          new Date().getFullYear() + 2 + '年及以后毕业',
          '1-2年工作经验',
          '3-4年工作经验',
          '5-6年工作经验',
          '7-8年工作经验',
          '8年以上工作经验'],    //毕业时间列表
        simList: [],    //相似职位列表
        functionList: [
          "投资银⾏",
          "证券研究",
          "资产管理",
          "固定收益",
          "私募股权",
          "银⾏保险",
          "其他"
        ],    //业务列表
        industryList: [
          "银行",
          "信托",
          "保险",
          "证券",
          "基金",
          "互联网金融",
          "租赁",
          "PE/VC",
          "其他"
        ]   //行业列表
      }
    },
    methods: {
      //简历类型过滤器
      resumeFilter(list) {
        //初始化在线简历列表与附件简历列表
        let fillList = [];
        let pdfList = [];
        //循环判断简历类型，并push入相应的数组
        for (let i = 0; i < list.length; i++) {
          if (list[i].vitaeType == '0') {
            fillList.push(list[i]);
          } else {
            pdfList.push(list[i]);
          }
        }
        //返回
        return {"fillList": fillList, "pdfList": pdfList};
      },

      //附件简历上传成功后
      resumeUpload(res) {
        if (res.code == '0') {
          // this.dialogFormVisible = false;
          this.$refs.resUpload.clearFiles;
          let id = this.$store.state.userInfo.id;
          this.axios({
            method: 'post',
            url: api.selectMyVitae,
            data: {"id": id}
          }).then((res) => {
            if (res.data.code == 0 || res.data.code == 1001) {
              if (res.data.data.ruv) {
                //返回数据不为空
                this.resumeList = res.data.data.ruv || [];
              } else {
                //返回数据为空
                this.resumeList = [];
              }
              //过滤附件简历
              this.pdfList = this.resumeFilter(this.resumeList).pdfList;
              //pdfList为空的时候附件简历单选项不可用
              this.pdfDisable = this.pdfList.length === 0;
              //写入resumeList至store
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

      //获取简历列表
      completeRes() {
        this.axios({
          method: 'post',
          url: api.selectMyVitae,
          data: {id: this.$store.state.userInfo.id}
        }).then((res) => {
          let data = res.data;
          //写入resumeList
          if (data.code == 0) {
            this.resumeList = data.data.ruv;
          } else {
            this.resumeList = []
          }
          //过滤简历类型，fillList为在线填写的简历，pdfList为上传的附件简历
          this.fillList = this.resumeFilter(this.resumeList).fillList;
          this.pdfList = this.resumeFilter(this.resumeList).pdfList;
          //pdfList为0的时候附件简历单选项不可用
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

      //渲染投递简历对话框
      renderDialog() {
        //获取登陆状态
        if (sessionStorage.getItem('logged')) {
          //获取简历列表
          this.completeRes();
          //显示对话框
          this.dialogFormVisible = true;
          //渲染职位信息
          this.diaCompany = this.positionInfo.position_company;
          this.diaDepart = this.positionInfo.position_depart;
          //获取用户主表id
          let id = this.$store.state.userInfo.id;
          //获取职位id
          let position_id = this.$router.currentRoute.params.id;
          let n = {"id": id, "position_id": position_id};
          //提交用户主表id与职位id至store
          this.$store.commit('writeIdList1', n);
        } else {
          //未登录跳转至登陆页面
          this.$router.push('/login');
        }
      },

      //投递
      deliver() {
        //当前选择在线简历单选框
        if (this.resumeForm.select === "0") {
          //写入在线简历的简历id
          this.$store.commit('writeIdList2', this.selectResume);
          //若未选择在线简历，提示
          if (!this.selectResume) {
            this.$message('请选择有效的简历');
            return
          }
        } else {//当前选择附件简历单选框
          //写入附件简历的简历id
          this.$store.commit('writeIdList2', this.selectPdfResume);
          //若未选择附件简历，提示
          if (!this.selectPdfResume) {
            this.$message('请选择有效的简历');
            return
          }
        }
        //隐藏简历投递对话框
        this.dialogFormVisible = false;
        //跳转邮箱投递界面
        this.$router.push('/dbe');
      },

      getTime(num) {
        let d = new Date(num);
        let fd = d.getFullYear() + '.' + d.getMonth() + 1 + '.' + d.getDate();
        let ft = d.getHours() + ':' + d.getMinutes();
        return {fd, ft}
      },
    },
    computed: {
      headerObj: function () {
        return {'token': sessionStorage.getItem('token'), 'userId': sessionStorage.getItem('userId')}
      },
      id: function () {
        return this.$store.state.userInfo.id;
      }
    },
    created: function () {
      //获取当前职位详情信息
      this.axios({
        method: 'post',
        url: api.selectPosition,
        data: this.$router.currentRoute.params
      }).then((res) => {
        if ( +res.data.code >= 0 ) {
          this.positionInfo = res.data.data.rpDTO[0];
          this.loading = false;
        } else {
          this.$message.error('服务器出错');
        }
      });
      //获取相似职位列表
      this.axios({
        method: 'post',
        url: api.selectSimilarityPosition,
        data: this.$router.currentRoute.params
      }).then((res) => {
        if (res.data.code === '0') {
          this.simList = res.data.data.dto;
        } else {
          this.$message.error('服务器出错');
        }
      })
    }
  }
</script>

<style lang="scss" src="../assets/scss/position.scss">

</style>

<style lang="scss">
  .el-message {
    top: 100px !important;
  }
</style>
