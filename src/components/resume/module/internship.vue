<template>
  <div class="internship-module">
    <div class="internship-title module-title">
      实习经历
      <div class="new-module-item" @click="newInt">
        新增实习经历
      </div>
    </div>
    <div class="internship-list">
      <ul>
        <li v-for="(item, index) in internshipList" class="list-item-container">
          <div class="remove-item" @click="removeItem(index)" v-if="internshipList.length >= 2">
            <i class="remove-item-btn">-</i>
          </div>
          <div class="internship-item clearfix">
            <div class="internship-item-context int-time">
              <el-date-picker
                type="daterange"
                v-model="item.internship_time"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini">
              </el-date-picker>
            </div>
            <div class="internship-item-context int-school">
              <input type="text" v-model="item.internship_compony" class="module-input">
            </div>
            <div class="internship-item-context int-pro">
              <input type="text" v-model="item.internship_department" class="module-input">
            </div>
            <div class="internship-item-context int-degree">
              <input type="text" v-model="item.internship_position" class="module-input">
            </div>
          </div>
          <div class="internship-other">
            <content-list :content-index="index" content-type="internship" @listenContentListChange="getContent"></content-list>
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
        this.internshipList[index].internship_content = text;
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
    .internship-list {
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
      .internship-other {
        padding-left: 25%;
      }
      .internship-item {
        .internship-item-context {
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
