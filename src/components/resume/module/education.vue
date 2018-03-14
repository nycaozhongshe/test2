<template>
  <div class="education-module">
    <div class="education-title module-title">
      教育背景
      <div class="new-module-item" @click="newEdu" >
        <!--新增教育经历-->
       <i class="el-icon-circle-plus"></i>
      </div>
    </div>
    <div class="education-list">
      <ul>
        <li v-for="(item, index) in eduList" class="list-item-container">
          <div class="remove-item" @click="removeItem(index)" v-if="eduList.length >= 2">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-htmal5icon19"></use>
            </svg>
          </div>
          <div class="education-item clearfix">
            <div class="education-item-context edu-time" style="width: 24%">
              <el-date-picker
                type="daterange"
                v-model="item.edu_time"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini">
              </el-date-picker>
            </div>
            <div class="education-item-context edu-school">
              <input type="text" v-model="item.school_name" class="module-input" style="height: 24px;" placeholder="请输入学校名称">
            </div>
            <div class="education-item-context edu-pro">
              <input type="text" v-model="item.major" class="module-input" style="text-indent: 35px" placeholder="请输入专业名称">
            </div>
            <div class="education-item-context edu-degree">
              <input type="text" v-model="item.school_degree" class="module-input" style="text-align: right;" placeholder="请输入学位">
            </div>
          </div>
          <div class="education-other">
            <autoarea place-holder="请简要描述你在学校中的课程奖励以及职位..." :text-content="item.school_which" :item-index="index" @listenTextareaChange="getContent" ></autoarea>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import defaultData from '../js/app'
  import autoarea from './common/autoarea'
  import {removeListItem} from '../js/utils'

  export default {
    components: {
      autoarea
    },
    methods: {
      newEdu() {
        let t = JSON.parse(JSON.stringify(defaultData['edu']));
        this.eduList.push(t)
      },
      removeItem(index) {
        removeListItem(this.eduList, index)
      },
      getContent(data) {
        let index = data.index;
        let text = data.text;
        this.eduList[index].school_which = text;
      }
    },
    computed: {
      eduList() {
        return this.$store.state.resumeData.education
      }
    },
    watch: {
      'eduList': {
        handler: function (newVal, oldVal) {
          this.$store.commit('writeResumeData', {
            type: 'education',
            data: this.eduList
          })
        },
        deep: true
      },
    }
  }
</script>

<style lang="scss" scoped>
  .education-module {
    height: auto;
    margin: 0 40px;
    padding: 5px 0 5px;
    .new-module-item {
      display: none;
      color: white;
      cursor: pointer;
      /*width: 120px;*/
      /*height: 25px;*/
      font-size: 14px;
      /*background-color: #c20c0c;*/
      line-height: 25px;
      text-align: center;
      border-radius: 13px;
    }
    .el-icon-circle-plus{
      font-size: 20px;
      color:#c20c0c ;
    }
    &:hover {
      .new-module-item {
        display: block;
        float: right;
      }
      border: 1px solid #c20c0c;

    }
    .module-title {
      border-bottom: 1px solid #000000;
      /*padding-left: 10px;*/
      margin-bottom: 5px;
    }
    .education-list {
      .list-item-container {
        position: relative;
        /*padding:10px 0;*/
        .remove-item {
          cursor: pointer;
          background-color: white;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          line-height: 15px;
          text-align: center;
          position: absolute;
          /*right: -10px;*/
          left: -8px;
          z-index: 999;
          top: 0;
          display: none;
          color: white;
          line-height: 15px;
          text-align: center;
        }
        &:hover {
          /*border: 1px solid red;*/
          background-color: #f2f2f2;
          .remove-item {
            display: block;
            .icon{
              color: #c20c0c;
              font-size: 20px;
              position: absolute;
              top: -1px;
              right: -1px;
            }
          }
          .module-input{
            background-color: #f2f2f2;
          }
        }
      }
      .education-other {
        padding-left: 24%;
      }
      .education-item {
        .el-date-editor{
          background-color: transparent;
          padding-left: 0;
        }

        .education-item-context {
          float: left;
          /*padding-right: 10px;*/
          width: 25.3%;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          overflow: hidden;
          input {
            width: 100%;
          }
          .module-input{
            font-size: 14px;
            height: 24px;
            line-height: 24px;
            border-radius: 3px;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
          }

        }
      }
    }
  }

</style>

