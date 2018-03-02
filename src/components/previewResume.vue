<template>
  <div class="pdf father">
    <!--<button @click="loadPDF">加载pdf</button>-->
    <canvas id="the-canvas" style="margin: 0 auto;"></canvas>
  </div>
</template>
<script>

  import {mapActions} from 'vuex'
  import PDFJS from '../../static/pdf'


  export default {
    data() {
      return {
        pdfDoc: null,
        info: this.$store.state.resume.resumeContext
      }
    },
    methods: {
      ...mapActions([
        'actionPreviewResume'
      ]),
      loadPDF() {
        let vm = this;
        let canvas = document.getElementById('the-canvas');
        PDFJS.getDocument('./src/assets/a.pdf').then((pdf) => {
          pdf.getPage(1).then(function getPageHelloWorld(page) {
            var scale = 1.5;
            var viewport = page.getViewport(scale);

//
// Prepare canvas using PDF page dimensions
//

            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

//
// Render PDF page into canvas context
//
            var renderContext = {
              canvasContext: context,
              viewport: viewport
            };
            page.render(renderContext);
          });
        });
      }
    },
    mounted: function () {
      let id = this.$route.params.id;
      // let id = '7125ac77e08d481bad24f53b2ae7b994';
      this.actionPreviewResume({"id": id});
      // let vm = this;
      // PDFJS.getDocument(vm.pdfurl).then(function (pdfDoc_) { //初始化pdf
      //   vm.pdfDoc = pdfDoc_;
      // });
      this.loadPDF();
    }
  }
</script>

<style scoped>
  .preview {
    padding: 100px 0;
  }

  html, body {
    margin: 0;
    font-family: "微软雅黑";
    color: #202020
  }

  ul, li, p {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .clearfix {
    clear: both
  }

  .name {
    font-size: 22px;
    width: 800px;
    margin: 30px auto;
  }

  .left {
    float: left;
    font-size: 14px;
    font-weight: bold;
  }

  .right {
    float: right;
    font-size: 14px;
    font-weight: bold;
  }

  .right li, .left li {
    margin-top: 8px
  }

  .box {
    width: 800px;
    margin: 0 auto;
  }

  .xian {
    width: 100%;
    height: 2px;
    background-color: #202020;
    margin-top: 5px
  }

  .biaoti {
    font-size: 14px;
    font-weight: bold;
    margin-top: 20px
  }

  .neirong span {
    font-size: 12px;
    display: block;
    padding: 0;
    margin: 0;
    width: 216px
  }

  .neirong, .neirong1 {
    margin: 5px 0;
  }

  .neirong1 span {
    font-size: 12px;
    margin-right: 20px
  }

  .jingli {
    margin-top: 15px;
  }

  .jingli li {
    float: left;
    font-size: 12px
  }

  .jingli p {
    font-size: 12px;
    line-height: 24px;
    margin-top: 8px
  }

  .jinglibt span {
    font-weight: bold;
    width: 226px;
    display: block;
    float: left;
    font-size: 12px
  }

  .jinglibt1 span {
    font-weight: bold;
    display: block;
    float: left;
    font-size: 12px;
    margin-right: 15px
  }

  .photo {
    width: 120px;
    height: 150px;
    border: #9e9e9e 1px solid;
    position: absolute;
    top: -60px;
    right: 0
  }

  .jinglibt p {
    float: left;
    font-size: 12px;
    font-weight: bold;
    margin-right: 20px;
    line-height: 14px;
    margin-top: 0
  }

  .nr li {
    font-size: 12px;
    margin-top: 6px
  }

  .nr .icon {
    display: block;
    width: 101px;
    text-align: right;
    font-weight: bold;
    float: left;
    line-height: 20px
  }

  .nr p {
    width: 680px;
    float: right;
    line-height: 20px
  }

  .jielun {
    display: inline;
    color: red;
  }
</style>
