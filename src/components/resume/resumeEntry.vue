<template>
    <div class="resumeEntry father">
      <div class="content">

        <div class="container clearfix">
          <router-link to="/fillResume">
            <div class="btn btn1">
              在线填写
            </div>
          </router-link>
          <router-link to="/payEntry">
            <div class="btn btn2">
              人工修改
            </div>
          </router-link>
        </div>
      </div>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 750px) {
    .father {
      position: relative;
      width: 100%;
      background-image: url('../../../static/imgs/entrybg.jpg');
      height: 1484px;
      background-position: center center;
      .btn {
        position: absolute;
        left: 50%;
        top: 355px;
        height: 60px;
        width: 280px;
        background-color: transparent;
        text-indent: -9999em;
        overflow: hidden;
        &.btn1 {
          -webkit-transform: translateX(-360px);
          -moz-transform: translateX(-360px);
          -ms-transform: translateX(-360px);
          -o-transform: translateX(-360px);
          transform: translateX(-360px);
        }
        &.btn2 {
          -webkit-transform: translateX(80px);
          -moz-transform: translateX(80px);
          -ms-transform: translateX(80px);
          -o-transform: translateX(80px);
          transform: translateX(80px);
        }
      }
    }
  }
  @media screen and (max-width: 750px) {
    .father {
      position: relative;
      width: 100%;
      background-image: url('../../../static/imgs/mentrybg.jpg');
      height: 2945px;
      background-position: center center;
      background-size: contain;
      background-origin: content-box;
      .btn {
        position: absolute;
        left: 50%;
        top: 350px;
        height: 70px;
        width: 255px;
        background-color: transparent;
        text-indent: -9999em;
        overflow: hidden;
      }
      .btn1 {
        -webkit-transform: translateX(-310px);
        -moz-transform: translateX(-310px);
        -ms-transform: translateX(-310px);
        -o-transform: translateX(-310px);
        transform: translateX(-310px);
      }
      .btn2 {
        -webkit-transform: translateX(55px);
        -moz-transform: translateX(55px);
        -ms-transform: translateX(55px);
        -o-transform: translateX(55px);
        transform: translateX(55px);
      }
    }
  }
</style>
