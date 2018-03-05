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
        <li v-for="(item, index) in eduList">
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
            <!--<div class="expandingArea">-->
              <!--<pre><span>{{item.edu_other}}</span><br></pre>-->
              <!--<textarea type="text" v-model="item.edu_other" class="module-input" cols="30"></textarea>-->
            <!--</div>-->
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
  export default {
    components: {
      autoarea
    },
    data() {
      return {
        eduList: [
          {
            edu_time: [],
            school_name: '马歇尔商学院',
            major: '金融学',
            school_which: '硕士',
            edu_other: '在这里详细描述你在校期间所学的专业，主要包括课程内容，校内任职，校内荣誉等内容...'
          }
        ],
      }
    },
    methods: {
      newEdu() {
        this.eduList.push(defaultData['edu'])
      }
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
      .education-other {
        /*.expandingArea {*/
        /*position: relative;*/
        /*width: auto;*/
        /*textarea{*/
        /*position:absolute;*/
        /*top:0;*/
        /*left:0;*/
        /*height:100%;*/
        /*resize: none;*/
        /*width: 100%;*/
        /*}*/
        /*pre{*/
        /*display:block;*/
        /*visibility:hidden;*/
        /*span {*/
        /*width: 100%;*/
        /*display: inline-block;*/
        /*height: auto;*/
        /*white-space: normal;*/
        /*}*/
        /*}*/
        /*}*/
      }
    }
  }

</style>
<style lang="scss">
  .education-module {
    .el-input__icon {
      display: none;
    }
    .el-date-editor.el-range-editor.el-input__inner.el-date-editor--daterange.el-range-editor--mini {
      width: 180px;
      border: none;
      .el-range-input:nth-of-type(2) {
        margin-left: 5px;
      }
      &:hover {
        border: 1px dashed #666666;
      }
    }
  }
</style>
