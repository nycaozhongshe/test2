<template>
    <div class="resume-template">
      <div class="module" v-if="moduleType==='baseinfo'">
        <base-info></base-info>
      </div>
      <div class="module" v-if="moduleType==='education'">
        <education></education>
      </div>
      <div class="module" v-if="moduleType==='internship'">
        <internship></internship>
      </div>
      <div class="module" v-if="moduleType==='practice'">
        <practice></practice>
      </div>
      <div class="module" v-if="moduleType==='project'">
        <project></project>
      </div>
      <div class="module" v-if="moduleType==='science'">
        <science></science>
      </div>
      <div class="module" v-if="moduleType==='skill'">
        <skill></skill>
      </div>
      <div class="module" v-if="moduleType==='work'">
        <work></work>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.resume-template {
  position: relative;

}
</style>

<script>
  import module from './module'
  import bus from './js/bus'
  const {avatar, baseInfo, education, internship, practice, project, science, skill, work} = module;
    export default {
      props: [
        'moduleType'
      ],
      data() {
        return {
          type: 'work'
        }
      },
      components: {
        avatar,
        baseInfo,
        education,
        internship,
        practice,
        project,
        science,
        skill,
        work,
      },
      methods: {},
      created() {
        // bus.$on('newModule', (type) => {
        //   this.type = type;
        // })
      },
    }
</script>

