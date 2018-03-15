<template>
    <div class="avatar-module">
      <el-upload
        class="avatar-uploader"
        :action="api.uploadVitaePhoto"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :headers="headerObj">
        <img v-if="$store.state.resumeData.vitae_photo"

             :src="this.api.url + $store.state.resumeData.vitae_photo" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
</template>

<style lang="scss">
  .avatar-module {
    height: 100%;
    position: relative;
    .avatar-uploader {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .avatar-uploader .el-upload {
      width: 100%;
      height: 100%;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      i {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 145px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>

<script>
  import api from '../../../assets/datas/api'
  export default {
    data() {
      return {
        imageUrl: '',
        resUrl: '',
        api
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.resUrl = res.data;
        this.$store.commit('writeResumeData', {type: 'vitae_photo', data: this.resUrl})
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    },
    computed: {
      headerObj: function () {
        return {'token': sessionStorage.getItem('token'), 'userId': sessionStorage.getItem('userId')}
      },
    }
  }
</script>
