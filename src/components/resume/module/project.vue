<template>
    <div class="project-module">
      <div class="project-title module-title">
        项目经历
        <div class="new-edu" @click="newPro">
          新增项目经历
        </div>
      </div>
      <div class="project-list">
        <ul>
          <li v-for="(item, index) in projectList" class="list-item-container">
            <div class="remove-item" @click="removeItem(index)" v-if="projectList.length >= 2">
              <i class="remove-item-btn">-</i>
            </div>
            <div class="project-item clearfix">
              <div class="project-item-context project-time">
                <el-date-picker
                  type="daterange"
                  v-model="item.project_time"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  size="mini">
                </el-date-picker>
              </div>
              <div class="project-item-context project-name">
                <input type="text" v-model="item.project_name" class="module-input">
              </div>
              <div class="project-item-context project-desc">
                <input type="text" v-model="item.project_desc" class="module-input">
              </div>
            </div>
            <div class="project-other">
              <content-list :content-index="index" content-type="project" @listenContentListChange="getContent"></content-list>
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
        newPro() {
          let t = JSON.parse(JSON.stringify(defaultData['project']));
          this.projectList.push(t);
        },
        removeItem(index) {
          removeListItem(this.projectList, index)
        },
        getContent(data) {
          let index = data.index;
          let text = data.text;
          this.projectList[index].project_content = text;
        }
      },
      computed: {
        projectList() {
          return this.$store.state.resumeData.project;
        }
      },
      watch: {
        'projectList': {
          handler: function (newVal, oldVal) {
            this.$store.commit('writeResumeData', {
              type: 'project',
              data: this.projectList
            })
          },
          deep: true
        },
      }
    }
</script>

<style lang="scss" scoped>
  .project-module {
    height: auto;
    margin: 0 40px;
    padding: 30px 0 50px;
    .module-title {
      border-bottom: 1px solid #000000;
      padding-left: 10px;
    }
    .project-list {
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
      .project-other {
        padding-left: 25%;
      }
      .project-item {
        .project-item-context {
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
      .project-other {
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
