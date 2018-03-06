<template>
  <div class="practice-module">
    <div class="practice-title module-title">
      活动实践
      <div class="new-edu" @click="newPrac">
        新增活动实践
      </div>
    </div>
    <div class="practice-list">
      <ul>
        <li v-for="(item, index) in practiceList" class="list-item-container">
          <div class="remove-item" @click="removeItem(index)" v-if="practiceList.length >= 2">
            <i class="remove-item-btn">-</i>
          </div>
          <div class="practice-item clearfix">
            <div class="practice-item-context practice-time">
              <el-date-picker
                type="daterange"
                v-model="item.practice_time"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini">
              </el-date-picker>
            </div>
            <div class="practice-item-context practice-name">
              <input type="text" v-model="item.practice_name" class="module-input">
            </div>
            <div class="practice-item-context practice-desc">
              <input type="text" v-model="item.practice_desc" class="module-input">
            </div>
          </div>
          <div class="practice-other">
            <content-list></content-list>
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
    padding: 30px 0 50px;
    .module-title {
      border-bottom: 1px solid #000000;
      padding-left: 10px;
    }
    .practice-list {
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
      .practice-other {
        padding-left: 25%;
      }
      .practice-item {
        .practice-item-context {
          float: left;
          padding-right: 30px;
          width: 25%;
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

