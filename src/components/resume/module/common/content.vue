<template>
  <div class="module-content">
    <div class="module-content-list">
      <div class="module-content-item" v-for="(item, index) in contentList" :key="item.indexs">
        <!--<i class="module-arr">></i>-->
        <svg class="icon" aria-hidden="true" style=" top: 0; left: -45px;position: absolute;">
          <use xlink:href="#icon-msnui-rightmini"></use>
        </svg>
        <autoarea :place-holder="placeHolder" :text-content="item.context" :item-index="index" @listenTextareaChange="getTextareaContent"></autoarea>
        <i class="module-item-remove" @click="removeItem(index)" v-if="contentList.length >= 2">
          <svg class="icon" aria-hidden="true" style="color:#c20c0c;position: absolute;top: -2px;right: -3px ">
            <use xlink:href="#icon-ai67"></use>
          </svg>
        </i>
      </div>
    </div>
    <b class="add-item" @click="addItem">
      <i class="el-icon-circle-plus-outline"></i>
    </b>
  </div>
</template>

<script>
  import autoarea from './autoarea'
  import defaultData from '../../js/app'

  export default {
    props: [
      'contentType',
      'contentIndex',
      'placeHolder',
      'keyName'
    ],
    components: {
      autoarea
    },
    data() {
      return {

      }
    },
    methods: {
      addItem() {
        let t = JSON.parse(JSON.stringify(defaultData.contentItem));
        let l = this.contentList.length
        t.indexs = +this.contentList[l-1].indexs + 1;
        this.contentList.push(t);
      },
      removeItem(index) {
        this.contentList.splice(+index, 1);
      },
      getTextareaContent(data) {
        let index = data.index;
        this.contentList[index].context = data.text;
      }
    },
    computed: {
      contentList() {
        let type = this.contentType;
        let index = this.contentIndex;
        let key = this.keyName;
        return this.$store.state.resumeData[type][index][key];
      }
    },
    watch: {
      'contentList': {
        handler: function (newVal, oldVal) {
          this.$emit('listenContentListChange', {index: this.contentIndex, text: this.contentList})
        },
        deep: true
      },
    }
  }
</script>

<style lang="scss" scoped>
  .module-content {
    &:hover {
      /*border: 1px solid #666666;*/
      .add-item {
        display: block;
        cursor: pointer;
        color: #c20c0c;
      }
    }
    .add-item {
      display: none;
      .el-icon-circle-plus-outline{
        font-size: 16px;
        color:#c20c0c ;
      }
    }
    .module-content-item {
      position: relative;
      margin-bottom: 3px;
      &:hover .module-item-remove {
        display: block;
      }
      .icon{
        font-size: 20px;
      }
      .module-item-remove {
        cursor: pointer;
        line-height: 15px;
        text-align: center;
        display: none;
        font-style: normal;
        height: 15px;
        width: 15px;
        background-color: white;
        border-radius: 50%;
        position: absolute;
        right: -7.5px;
        top: 50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
      }
    }
  }

</style>
