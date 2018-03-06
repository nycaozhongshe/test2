<template>
    <div class="science-module">
      <div class="science-title module-title">
        学术研究
      </div>
      <div class="science-list">
        <ul>
          <li v-for="(item, index) in scienceList">
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
  import contentList from './common/content'
    export default {
      components: {
        contentList
      },
      data() {
        return {
          scienceList: [
            {
              science_time: [],
              science_name: '学术研究标题',
              science_desc: '学术研究描述',
              science_content: [
                {
                  indexs: 0,
                  content: ''
                }
              ]
            }
          ]
        }
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
<style lang="scss">
  .science-module {
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
