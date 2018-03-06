<template>
  <div class="education-module">
    <div class="education-title module-title">
      教育背景
      <div class="new-edu" @click="newEdu">
        新增教育经历
      </div>
    </div>
    <div class="education-list">
      <ul>
        <li v-for="(item, index) in eduList" class="list-item-container">
          <div class="remove-item" @click="removeItem(index)" v-if="eduList.length >= 2">
            <i class="remove-item-btn">-</i>
          </div>
          <div class="education-item clearfix">
            <div class="education-item-context edu-time">
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
              <input type="text" v-model="item.school_name" class="module-input">
            </div>
            <div class="education-item-context edu-pro">
              <input type="text" v-model="item.major" class="module-input">
            </div>
            <div class="education-item-context edu-degree">
              <input type="text" v-model="item.school_which" class="module-input">
            </div>
          </div>
          <div class="education-other">
            <autoarea :text-content="item.edu_other"></autoarea>
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
    data() {
      return {

      }
    },
    methods: {
      newEdu() {
        let t = JSON.parse(JSON.stringify(defaultData['edu']));
        this.eduList.push(t)
      },
      removeItem(index) {
        removeListItem(this.eduList, index)
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
    padding: 30px 0 50px;
    .module-title {
      border-bottom: 1px solid #000000;
      padding-left: 10px;
    }
    .education-list {
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
      .education-other {
        padding-left: 25%;
      }
      .education-item {
        .education-item-context {
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
    }
  }

</style>

