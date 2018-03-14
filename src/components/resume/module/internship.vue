<template>
  <div class="internship-module">
    <div class="internship-title module-title">
      实习经历
      <div class="new-module-item" @click="newInt">
        <!--新增实习经历-->
        <i class="el-icon-circle-plus"></i>
      </div>
    </div>
    <div class="internship-list">
      <ul>
        <li v-for="(item, index) in internshipList" class="list-item-container">
          <div class="remove-item" @click="removeItem(index)" v-if="internshipList.length >= 2">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-htmal5icon19"></use>
            </svg>
          </div>
          <div class="internship-item clearfix">
            <div class="internship-item-context int-time" style="width: 24%">
              <el-date-picker
                type="daterange"
                v-model="item.internships_time"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini">
              </el-date-picker>
            </div>
            <div class="internship-item-context int-school">
              <input type="text" v-model="item.company_name_pr" class="module-input" placeholder="请输入实习公司名称">
            </div>
            <div class="internship-item-context int-pro">
              <input type="text" v-model="item.company_department_pr" class="module-input" style="text-indent: 35px" placeholder="请输入实习部门">
            </div>
            <div class="internship-item-context int-degree">
              <input type="text" v-model="item.position_pr" class="module-input" style="text-align: right" placeholder="请输入实习岗位">
            </div>
          </div>
          <div class="internship-other">
            <content-list key-name="work_content_pr" place-holder="请简要描述你的实习内容..." :content-index="index" content-type="internship" @listenContentListChange="getContent"></content-list>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import defaultData from '../js/app'
  import contentList from './common/content'
  import {removeListItem} from '../js/utils'

  export default {
    components: {
      contentList
    },
    data: function () {
      return {

      }
    },
    methods: {
      newInt() {
        let t = JSON.parse(JSON.stringify(defaultData['internship']));
        this.internshipList.push(t);
      },
      removeItem(index) {
        removeListItem(this.internshipList, index)
      },
      getContent(data) {
        let index = data.index;
        let text = data.text;
        this.internshipList[index].work_content_pr = text;
      }
    },
    computed: {
      internshipList() {
        return this.$store.state.resumeData.internship;
      }
    },
    watch: {
      'internshipList': {
        handler: function (newVal, oldVal) {
          this.$store.commit('writeResumeData', {
            type: 'internship',
            data: this.internshipList
          })
        },
        deep: true
      },
    }
  }
</script>

<style lang="scss" scoped>
  .internship-module {
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
    .internship-list {
      .list-item-container {
        position: relative;
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
        .el-date-editor{
          padding-left: 0;
        }
        .module-input{
          font-size: 14px;
          height: 24px;
          line-height: 24px;
          border-radius: 3px;
          -webkit-brder-radius:3px;
          -moz-brder-radius:3px;
        }
        .icon{
          color: #c20c0c;
          font-size: 20px;
          position: absolute;
          top: -1px;
          right: -1px;
        }
        &:hover {
          /*border: 1px solid red;*/
          background-color: #f2f2f2;
          .remove-item {
            display: block;
          }
          .module-input{
            background-color: #f2f2f2;
          }
          .el-date-editor{
            background-color: #f2f2f2;
          }
        }
      }
      .internship-other {
        padding-left: 24%;
      }
      .internship-item {
        .internship-item-context {
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
        }
      }
      .internship-other {
        .expandingArea {
          position: relative;
          width: auto;
          textarea {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            resize: none;
            width: 100%;
          }
          pre {
            display: block;
            visibility: hidden;
            span {
              width: 100%;
              display: inline-block;
              height: auto;
              white-space: normal;
            }
          }
        }
      }
    }
  }
</style>
