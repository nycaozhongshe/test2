<template>
    <div class="autoarea">
      <div class="expandingArea">
        <pre><span>{{text}}</span><br></pre>
        <textarea type="text" v-model="text" class="module-input" cols="30" :placeholder="placeHolder"></textarea>
      </div>
    </div>
</template>

<script>
    export default {
      props: [
        'textContent',
        'itemIndex',
        'itemType',
        'placeHolder'
      ],
      data() {
        return {
          data: this.text
        }
      },
      computed: {
        text: {
          get: function () {
            return this.textContent
          },
          set: function (newVal) {
            this.data = newVal
          }
        }
      },
      methods: {
        // sendContent() {
        //   this.$emit('listenTextareaChange', {text: this.text, index: this.itemIndex, type: this.itemType});
        // }
      },
      watch: {
        data() {
          this.$emit('listenTextareaChange', {text: this.data, index: this.itemIndex, type: this.itemType});
        }
      }
    }
</script>

<style lang="scss" scoped>
  .expandingArea {
    position: relative;
    width: auto;
    textarea{
      position:absolute;
      top: 0;
      left:0;
      height:100%;
      resize: none;
      width: 100%;
      font-size: 14px;
      line-height: 18px;
      letter-spacing:0;
      font-family: 'Microsoft YaHei',serif;
      overflow-y: hidden;
      background-color: transparent;

    }
    pre{
      display:block;
      visibility:hidden;
      span {
        width: 100%;
        display: inline-block;
        height: auto;
        white-space: normal;
        -ms-word-break: break-all;
        word-break: break-all;
        font-size: 14px;
        line-height: 18px;
        letter-spacing:0;
        font-family: 'Microsoft YaHei',serif;
      }
    }
  }
</style>
