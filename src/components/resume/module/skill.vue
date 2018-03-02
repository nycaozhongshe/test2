<template>
  <div class="skill-module">
    <div class="skill-title module-title">
      技能证书<span @click="updateProfessionalSkills">修改</span>
    </div>
    <p>
      专业技能
      <span v-if="skillflag">{{pro_value || "专业技能"}}</span>
    </p>
    <p>语言技能 <span>语言技能。</span></p>
    <p>计算机技能 <span>计算机技能。</span></p>
    <p>其它技能 <span>其它技能。</span></p>
  </div>
  <!--<span v-if="!skillflag"><input type="text" @blur="saveProfessionalSkills" v-model="pro_value"/></span>-->
</template>

<script>
  export default {
    data() {
      return {
        skillflag: true,
        pro_value: '',
      }
    },
    methods: {
      updateProfessionalSkills() {
        this.skillflag = false ;
      },
      saveProfessionalSkills() {
        this.skillflag = true ;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .skill-module {
    height: auto;
    margin: 0 40px;
    padding: 30px 0 50px;
    border-bottom: 1px dashed #cfcfcf;
    .module-title {
      border-bottom: 1px solid #000000;
      font-size: 26px;
    }
  }
</style>
