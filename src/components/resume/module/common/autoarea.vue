<template>
    <div class="autoarea">
      <div class="expandingArea">
        <pre><span>{{text}}</span><br></pre>
        <textarea type="text" v-model="text" class="module-input" cols="30" @change="sendContent"></textarea>
      </div>
    </div>
</template>

<script>
    export default {
      props: [
        'textContent',
        'itemIndex',
        'itemType'
      ],
      data() {
        return {
          text: this.textContent
        }
      },
      methods: {
        sendContent() {
          this.$emit('listenTextareaChange', {text: this.text, index: this.itemIndex, type: this.itemType});
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
      font-size: 16px;
      line-height: 20px;
      letter-spacing:0;
      font-family: 'Microsoft YaHei',serif;
      overflow-y: hidden;
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
        font-size: 16px;
        line-height: 20px;
        letter-spacing:0;
        font-family: 'Microsoft YaHei',serif;
      }
    }
  }
</style>
