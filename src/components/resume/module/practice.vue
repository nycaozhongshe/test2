<template>
  <div class="practice-module">
    <div class="practice-title module-title">
      活动实践
      <div class="new-module-item" @click="newPrac">
        <!--新增活动实践-->
        <i class="el-icon-circle-plus"></i>
      </div>
    </div>
    <div class="practice-list">
      <ul>
        <li v-for="(item, index) in practiceList" class="list-item-container">
          <div class="remove-item" @click="removeItem(index)" v-if="practiceList.length >= 2">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-htmal5icon19"></use>
            </svg>
          </div>
          <div class="practice-item clearfix">
            <div class="practice-item-context practice-time" style="width: 24%">
              <el-date-picker
                type="daterange"
                v-model="item.active_time"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini">
              </el-date-picker>
            </div>
            <div class="practice-item-context practice-name">
              <input type="text" v-model="item.practice_name" class="module-input" placeholder="活动实践名称">
            </div>
            <div class="practice-item-context practice-desc">
              <input type="text" v-model="item.practice_desc" class="module-input" placeholder="活动实践描述">
            </div>
          </div>
          <div class="practice-other">
            <content-list key-name="practice_context" place-holder="请简要描述此期间的活动内容..." :content-index="index" content-type="practice" @listenContentListChange="getContent"></content-list>
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
    data() {
      return {}
    },
    methods: {
      newPrac() {
        let t = JSON.parse(JSON.stringify(defaultData['practice']));
        this.practiceList.push(t);
      },
      removeItem(index) {
        removeListItem(this.practiceList, index)
      },
      getContent(data) {
        let index = data.index;
        let text = data.text;
        this.practiceList[index].practice_context = text;
      }
    },
    computed: {
      practiceList() {
        return this.$store.state.resumeData.practice
      }
    },
    watch: {
      'practiceList': {
        handler: function (newVal, oldVal) {
          this.$store.commit('writeResumeData', {
            type: 'practice',
            data: this.practiceList
          })
        },
        deep: true
      },
    }
  }
</script>

<style lang="scss" scoped>
  .practice-module {
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
    .practice-list {
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
      .practice-other {
        padding-left: 24%;
      }
      .practice-item {
        .practice-item-context {
          float: left;
          /*padding-right: 10px;*/
          width: 25.3%;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          overflow: hidden;
          &:nth-of-type(2) {
            width: 55%;
          }
          &:nth-of-type(3) {
            width: 20%;
            float: right;
            > input {
              text-align: right;
            }
          }
          input {
            width: 100%;
          }
        }
      }
      .practice-other {
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

