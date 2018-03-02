<template>
    <div class="education-module">
      <div class="education-title module-title">
        教育背景
      </div>
      <div class="education-list">
        <ul>
          <li>
            <div class="education-item">
              <div class="education-item-context edu-time">2011.08-2015.11</div>
              <div class="education-item-context edu-school">马歇尔商学院</div>
              <div class="education-item-context edu-pro">金融学</div>
              <div class="education-item-context edu-degree">硕士</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          eduList: []
        }
      },
    }
</script>

<style lang="scss" scoped>
  .education-module {
    height: auto;
    margin: 0 40px;
    padding: 30px 0 50px;
    border-bottom: 1px dashed #cfcfcf;
    .module-title {
      border-bottom: 1px solid #000000;
    }
    .education-list {
      .education-item {
        .education-item-context {
          float: left;
          margin-right: 30px;
        }
      }
    }
  }

</style>
