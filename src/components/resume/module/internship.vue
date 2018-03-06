<template>
  <div class="internship-module">
    <div class="internship-title module-title">
      实习经历
      <div class="new-edu" @click="newInt">
        新增实习经历
      </div>
    </div>
    <div class="internship-list">
      <ul>
        <li v-for="(item, index) in internshipList">
          <div class="internship-item clearfix">
            <div class="internship-item-context int-time">
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
              <input type="text" v-model="item.company_name_pr" class="module-input">
            </div>
            <div class="internship-item-context int-pro">
              <input type="text" v-model="item.department" class="module-input">
            </div>
            <div class="internship-item-context int-degree">
              <input type="text" v-model="item.position_pr" class="module-input">
            </div>
          </div>
          <div class="internship-other">
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

  export default {
    components: {
      contentList
    },
    data: function () {
      return {
        internshipList: [{
          company_name_pr: '公司',
          department: '部门',
          position_pr: '职位',
          internships_time: [],
          work_content_pr: [{
            indexs: 0,
            title: '小标题',
            context: '内容'
          }]
        }]
      }
    },
    methods: {
      newInt() {
        let t = defaultData['internship'];
        this.internshipList.push(t);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .internship-module {
    height: auto;
    margin: 0 40px;
    padding: 30px 0 50px;
    .module-title {
      border-bottom: 1px solid #000000;
      padding-left: 10px;
    }
    .internship-list {
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
