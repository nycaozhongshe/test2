<template>
  <div class="work-module">
    <div class="work-title module-title">
      工作经历
      <div class="new-module-item" @click="newWork">
        新增工作经历
      </div>
    </div>
    <div class="work-list">
      <ul>
        <li v-for="(item, index) in workList" class="list-item-container">
          <div class="remove-item" @click="removeItem(index)" v-if="workList.length >= 2">
            <i class="remove-item-btn">-</i>
          </div>
          <div class="work-item clearfix">
            <div class="work-item-context work-time">
              <el-date-picker
                type="daterange"
                v-model="item.work_time"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini">
              </el-date-picker>
            </div>
            <div class="work-item-context work-school">
              <input type="text" v-model="item.work_compony" class="module-input">
            </div>
            <div class="work-item-context work-pro">
              <input type="text" v-model="item.work_department" class="module-input">
            </div>
            <div class="work-item-context work-degree">
              <input type="text" v-model="item.work_position" class="module-input">
            </div>
          </div>
          <div class="work-other">
            <content-list :content-index="index" content-type="work" @listenContentListChange="getContent"></content-list>
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
      return {}
    },
    methods: {
      newWork() {
        let t = JSON.parse(JSON.stringify(defaultData['work']));
        this.workList.push(t);
      },
      removeItem(index) {
        removeListItem(this.workList, index)
      },
      getContent(data) {
        let index = data.index;
        let text = data.text;
        this.workList[index].work_content = text;
      }
    },
    computed: {
      workList() {
        return this.$store.state.resumeData.work;
      }
    },
    watch: {
      'workList': {
        handler: function (newVal, oldVal) {
          this.$store.commit('writeResumeData', {
            type: 'work',
            data: this.workList
          })
        },
        deep: true
      },
    }
  }
</script>

<style lang="scss" scoped>
  .work-module {
    height: auto;
    margin: 0 40px;
    padding: 30px 0 50px;
    .new-module-item {
      display: none;
    }
    &:hover {
      .new-module-item {
        display: inline-block;
      }
      border: 1px solid blue;
    }
    .module-title {
      border-bottom: 1px solid #000000;
      padding-left: 10px;
    }
    .work-list {
      .list-item-container {
        position: relative;
        .remove-item {
          cursor: pointer;
          background-color: palevioletred;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          line-height: 15px;
          text-align: center;
          position: absolute;
          right: -8px;
          top: 0;
          display: none;
        }
        &:hover {
          border: 1px solid red;
          .remove-item {
            display: block;
          }
        }
      }
      .work-other {
        padding-left: 25%;
      }
      .work-item {
        .work-item-context {
          float: left;
          padding-right: 30px;
          width: 25%;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          overflow: hidden;
          input {
            width: 100%;
          }
        }
      }
      .work-other {
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
