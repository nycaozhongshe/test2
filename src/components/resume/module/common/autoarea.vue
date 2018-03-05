<template>
    <div class="autoarea">
      <div class="expandingArea">
        <pre><span>{{text}}</span><br></pre>
        <textarea type="text" v-model="text" class="module-input" cols="30"></textarea>
      </div>
    </div>
</template>

<script>
    export default {
      props: [
        'textContent'
      ],
      data() {
        return {
          text: this.textContent
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
      top:0;
      left:0;
      height:100%;
      resize: none;
      width: 100%;
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
      }
    }
  }
</style>
