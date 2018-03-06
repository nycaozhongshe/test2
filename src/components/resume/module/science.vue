<template>
    <div class="science-module">
      <div class="science-title module-title">
        学术研究
        <div class="new-edu" @click="newSci">
          新增学术研究
        </div>
      </div>
      <div class="science-list">
        <ul>
          <li v-for="(item, index) in scienceList" class="list-item-container">
            <div class="remove-item" @click="removeItem(index)" v-if="scienceList.length >= 2">
              <i class="remove-item-btn">-</i>
            </div>
            <div class="science-item clearfix">
              <div class="science-item-context science-time">
                <el-date-picker
                  type="daterange"
                  v-model="item.science_time"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="mini">
                </el-date-picker>
              </div>
              <div class="science-item-context science-name">
                <input type="text" v-model="item.science_name" class="module-input">
              </div>
              <div class="science-item-context science-desc">
                <input type="text" v-model="item.science_desc" class="module-input">
              </div>
            </div>
            <div class="science-other">
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
        return {
        }
      },
      methods: {
        newSci() {
          let t = JSON.parse(JSON.stringify(defaultData['science']));
          this.scienceList.push(t);
        },
        removeItem(index) {
          removeListItem(this.scienceList, index)
        }
      },
      computed: {
        scienceList() {
          return this.$store.state.resumeData.science;
        }
      },
      watch: {
        'scienceList': {
          handler: function (newVal, oldVal) {
            this.$store.commit('writeResumeData', {
              type: 'science',
              data: this.scienceList
            })
          },
          deep: true
        },
      }
    }
</script>

<style lang="scss" scoped>
  .science-module {
    height: auto;
    margin: 0 40px;
    padding: 30px 0 50px;
    .module-title {
      border-bottom: 1px solid #000000;
      padding-left: 10px;
    }
    .science-list {
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
      .science-other {
        padding-left: 25%;
      }
      .science-item {
        .science-item-context {
          float: left;
          padding-right: 30px;
          width: 25%;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          overflow: hidden;
          &:nth-of-type(2) {
            width: 35%;
          }
          &:nth-of-type(3) {
            width: 35%;
            float: right;
            >input {
              text-align: right;
            }
          }
          input {
            width: 100%;
          }
        }
      }
      .science-other {
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
