<template>
  <div class="resume-tip">
    <button class="btn" @click="getPDF">生成pdf</button>
  </div>
</template>

<script>
  import html2canvas from 'html2canvas';
  // import pdfMake from  'pdfmake';
  export default {
    props: [
      'renderElement'
    ],
    methods: {
      getPDF() {
        html2canvas(this.renderElement).then(function (canvas) {
          // document.body.appendChild(canvas);
          let imagedata = canvas.toDataURL('image/png');
          pdfMake.createPdf({
            content: [
              {
                image: imagedata,
                width: 500,
              }
            ],
          }).open();
        });
      }
    },
    data() {
      return {
        pdf: {}
      }
    },
  }
</script>

<style lang="scss" scoped>
  .btn {
    float: right;
    width: 80%;
    margin-top: 180px;
  }

</style>
