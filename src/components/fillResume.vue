<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div class="fill-resume father">
    <el-popover
      ref="popover1"
      placement="right"
      title="提示"
      width="200"
      trigger="hover"
      content="包括：CPA科目，CFA，ACCA，证券从业资格证，基金从业资格证，银行从业资格证，保荐代表人考试，司法考试等">
    </el-popover>
    <el-popover
      ref="popover2"
      placement="right"
      title="提示"
      width="200"
      trigger="hover"
      content="包括：计算机等级，金融行业软件（彭博，万得等），R语言，STATA，Matlab，Python，C++等">
    </el-popover>
    <el-popover
      ref="popover3"
      placement="right"
      title="提示"
      width="200"
      trigger="hover"
      content="CET-4，CET-6，TEM-8，IELTE，TOEFL，商务英语等">
    </el-popover>
    <el-popover
      ref="popover4"
      placement="right"
      title="提示"
      width="200"
      trigger="hover"
      content="GPA,排名,奖学金,优秀干部等">
    </el-popover>
    <el-popover
      ref="popover5"
      placement="left"
      title="提示"
      width="200"
      trigger="hover"
      content="逐条填写，每栏填写一条">
    </el-popover>
    <div class="content">
      <aside class="fill-aside">
        <ul class="fill-aside-list">
          <li :class="{' fill-aside-item-active': asideActive === 1}" class="fill-aside-item">个人信息</li>
          <li :class="{' fill-aside-item-active': asideActive === 2}" class="fill-aside-item">求职方向</li>
          <li :class="{' fill-aside-item-active': asideActive === 3}" class="fill-aside-item">教育经历</li>
          <li :class="{' fill-aside-item-active': asideActive === 4}" class="fill-aside-item">工作经历</li>
          <li :class="{' fill-aside-item-active': asideActive === 5}" class="fill-aside-item">实习经历</li>
          <li :class="{' fill-aside-item-active': asideActive === 6}" class="fill-aside-item">活动实践</li>
          <li :class="{' fill-aside-item-active': asideActive === 7}" class="fill-aside-item">技能证书</li>
          <li :class="{' fill-aside-item-active': asideActive === 8}" class="fill-aside-item">学术研究</li>
          <li :class="{' fill-aside-item-active': asideActive === 9}" class="fill-aside-item">项目经历</li>
        </ul>
      </aside>
      <div class="fill-container">
        <div class="fill-box">
          <el-form ref="newResumeForm" :model="newResumeForm" label-width="95px">
            <input type="hidden" v-model="newResumeForm.vitae_photo">
            <div ref="infbox" class="fill-block personal-info clearfix">
              <h3 class="fill-block-title personal-info-title">
                个人信息
              </h3>
              <el-upload
                class="avatar-uploader"
                :action="api.uploadVitaePhoto"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :headers="headerObj">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-upload2 avatar-uploader-icon"></i>
              </el-upload>
              <div class="personal-info-list">
                <el-form-item label="姓名" prop="vitae_name"
                              :rules="{required: true, message: '请输入姓名', trigger: 'blur'}">
                  <el-input v-model="newResumeForm.vitae_name"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="gender"
                              :rules="{required: true, message: '请选择性别', trigger: 'blur'}">
                  <el-select v-model="newResumeForm.gender" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所在城市" prop="vitea_city"
                              :rules="{type:'array',required: true, message: '请选择所在城市', trigger: 'blur'}"
                >
                  <!--<el-cascader-->
                  <!--:options="cityList"-->
                  <!--@change="show"-->
                  <!--v-model="newResumeForm.vitea_city"-->
                  <!--:show-all-levels="false"-->
                  <!--&gt;</el-cascader>-->
                  <el-cascader
                    :options="cityList"
                    v-model.array="newResumeForm.vitea_city"
                    @change="show"
                    :show-all-levels="false">
                  </el-cascader>
                </el-form-item>
                <el-form-item label="联系电话" prop="vitae_mobile"
                              :rules="{required: true, message: '请输入联系电话', trigger: 'blur'}">
                  <el-input v-model="newResumeForm.vitae_mobile"></el-input>
                </el-form-item>
                <el-form-item label="联系邮箱" prop="vitae_email"
                              :rules="{required: true, message: '请输入联系邮箱', trigger: 'blur'}">
                  <el-input v-model="newResumeForm.vitae_email"></el-input>
                </el-form-item>
              </div>
            </div>
            <div ref="jobbox" class="fill-block job-ori">
              <h3 class="fill-block-title job-ori-title">求职方向</h3>
              <div class="job-ori-list">
                <el-form-item label="业务" prop="vitea_direction"
                              :rules="{required: true, message: '请选择求职方向', trigger: 'blur'}">
                  <el-select v-model="newResumeForm.vitea_direction" placeholder="请选择求职方向">
                    <el-option label="投资银行" value="投资银行"></el-option>
                    <el-option label="证券研究" value="证券研究"></el-option>
                    <el-option label="资产管理" value="资产管理"></el-option>
                    <el-option label="固定收益" value="固定收益"></el-option>
                    <el-option label="私募股权" value="私募股权"></el-option>
                    <el-option label="银⾏保险" value="银⾏保险"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div ref="edubox" class="fill-block education">
              <div class="new-education fill-button" @click="addEducation">+ 新增</div>
              <h3 class="fill-block-title education-title">教育经历</h3>
              <div class="education-list fill-block-item" v-for="(item,index) in newResumeForm.edu">
                <div class="close" v-if="index > 0" @click="delItem('edu',index)"><i class="el-icon-delete"></i>
                </div>
                <el-form-item label="学校及专业" :prop="'edu['+index+'].school_name'"
                              :rules="{required: true, message: '请输入学校名称', trigger: 'blur'}">
                  <el-input v-model="item.school_name"></el-input>
                </el-form-item>
                <el-form-item label="学历" :prop="'edu['+index+'].major'"
                              :rules="{required: true, message: '请输入所学专业', trigger: 'blur'}">
                  <el-input v-model="item.major"></el-input>
                </el-form-item>
                <el-form-item label="教育时间" :prop="'edu['+index+'].edu_time'"
                              :rules="{type:'array',required: true, message: '请选择教育时间', trigger: 'blur'}">
                  <el-date-picker
                    v-model.array="item.edu_time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="所获奖项">
                  <el-input v-model="item.school_which">
                    <i slot="suffix">可选</i>
                    <i slot="suffix" class="el-input__icon el-icon-warning" v-popover:popover4
                       style="color: #C20C0C;"></i>
                  </el-input>
                </el-form-item>
              </div>
            </div>
            <div ref="worbox" class="fill-block work-exp">
              <div class="fill-button" @click="addWork">+ 新增</div>
              <h3 class="fill-block-title work-exp-title">工作经历</h3>
              <div class="work-exp-list fill-block-item" v-for="(item,index) in newResumeForm.work">
                <div class="close" @click="delItem('work',index)"><i class="el-icon-delete"></i>
                </div>
                <el-form-item label="公司及部门"
                              :prop="'work['+index+'].company_name_wo'"
                              :rules="{required: true, message: '请输入公司名称', trigger: 'blur'}">
                  <el-input v-model="item.company_name_wo"></el-input>
                </el-form-item>
                <el-form-item label="在职时间"
                              :prop="'work['+index+'].work_time'"
                              :rules="{type:'array', required: true, message: '请选择在职时间', trigger: 'blur'}">
                  <el-date-picker
                    v-model.array="item.work_time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="职位"
                              :prop="'work['+index+'].position_wo'"
                              :rules="{required: true, message: '请输入职位名称', trigger: 'blur'}">
                  <el-input v-model="item.position_wo"></el-input>
                </el-form-item>
                <el-form-item label="工作内容">
                  <div class="input" style="position: relative;">
                    <el-form-item
                      v-for="(list,listindex) in item.work_content_wo" :key="listindex"
                      :prop="'work['+index+'].work_content_wo['+listindex+'].context'"
                      :rules="[{required: true, message: '请输入工作内容', trigger: 'blur'},{ validator: validateLength1000, trigger: 'blur' }]">
                      <el-input type="textarea" resize="none" v-model="list.context"
                                placeholder="请逐条填写，每栏仅限填写一条内容，每栏最长1000字"></el-input>
                    </el-form-item>
                  </div>
                  <span class="add-remove">
                      <i class="el-icon-circle-plus add-context"
                         @click="addContext(newResumeForm.work[index].work_content_wo)"></i>
                      <i class="el-icon-remove remove-context"
                         @click="removeContext(newResumeForm.work[index].work_content_wo)"
                         v-if="false || (newResumeForm.work[index].work_content_wo)"></i>
                    </span>
                </el-form-item>
              </div>
            </div>
            <div ref="intbox" class="fill-block internships">
              <div class="new-education fill-button" @click="addInternships">+ 新增</div>
              <h3 class="fill-block-title internships-title">实习经历</h3>
              <div class="internships-list fill-block-item" v-for="(item,index) in newResumeForm.internships">
                <div class="close" @click="delItem('internships',index)"><i
                  class="el-icon-delete"></i>
                </div>
                <el-form-item label="公司及部门"
                              :prop="'internships['+index+'].company_name_pr'"
                              :rules="{required: true, message: '请输入公司名称', trigger: 'blur'}">
                  <el-input v-model="item.company_name_pr"></el-input>
                </el-form-item>
                <el-form-item label="入职时间段"
                              :prop="'internships['+index+'].internships_time'"
                              :rules="{type:'array',required: true, message: '请输入实习时间', trigger: 'blur'}">
                  <el-date-picker
                    v-model.array="item.internships_time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="职位"
                              :prop="'internships['+index+'].position_pr'"
                              :rules="{required: true, message: '请输入实习职位', trigger: 'blur'}">
                  <el-input v-model="item.position_pr"></el-input>
                </el-form-item>
                <el-form-item label="工作内容">
                  <div class="input">
                    <el-form-item
                      v-for="(list,listindex) in item.work_content_pr" :key="listindex"
                      :prop="'internships['+index+'].work_content_pr['+listindex+'].context'"
                      :rules="[
                        {required: true, message: '请输入工作内容', trigger: 'blur'},
                        {validator: validateLength1000, trigger: 'blur'}
                      ]">
                      <el-input type="textarea" resize="none" v-model="list.context"
                                placeholder="逐条填写，每栏填写一条"></el-input>
                    </el-form-item>

                  </div>
                  <span class="add-remove">
                      <i class="el-icon-circle-plus add-context"
                         @click="addContext(newResumeForm.internships[index].work_content_pr)"></i>
                      <i class="el-icon-remove remove-context"
                         @click="removeContext(newResumeForm.internships[index].work_content_pr)"
                         v-if="false || (newResumeForm.internships[index].work_content_pr)"></i>
                    </span>
                </el-form-item>
              </div>
            </div>
            <div ref="actbox" class="fill-block active-practice">
              <div class="fill-button" @click="addPractice">+ 新增</div>
              <h3 class="fill-block-title active-practice-title">
                活动实践
              </h3>
              <div class="active-practice-list fill-block-item" v-for="(item,index) in newResumeForm.practice">
                <div class="close" @click="delItem('practice',index)"><i class="el-icon-delete"></i>
                </div>
                <el-form-item label="活动名称"
                              :prop="'practice['+index+'].practice_name'"
                              :rules="{required: true, message: '请输入活动名称', trigger: 'blur'}">
                  <el-input v-model="item.practice_name"></el-input>
                </el-form-item>
                <el-form-item label="时间段"
                              :prop="'practice['+index+'].active_time'"
                              :rules="{type:'array',required: true, message: '请输入活动时间段', trigger: 'blur'}">
                  <el-date-picker
                    v-model.array="item.active_time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="职位"
                              :prop="'practice['+index+'].practice_role'"
                              :rules="{required: true, message: '请输入职位', trigger: 'blur'}">
                  <el-input v-model="item.practice_role"></el-input>
                </el-form-item>
                <el-form-item label="工作内容">
                  <div class="input">
                    <el-form-item
                      v-for="(list,listindex) in item.practice_context" :key="listindex"
                      :prop="'practice['+index+'].practice_context['+listindex+'].context'"
                      :rules="[
                        {required: true, message: '请输入实践内容', trigger: 'blur'},
                        {validator: validateLength1000, trigger: 'blur'}
                      ]">
                      <el-input type="textarea" resize="none" v-model="list.context"
                                placeholder="逐条填写，每栏填写一条"></el-input>
                    </el-form-item>

                  </div>
                  <span class="add-remove">
                      <i class="el-icon-circle-plus add-context"
                         @click="addContext(newResumeForm.practice[index].practice_context)"></i>
                      <i class="el-icon-remove remove-context"
                         @click="removeContext(newResumeForm.practice[index].practice_context)"
                         v-if="false || (newResumeForm.practice[index].practice_context)"></i>
                    </span>
                </el-form-item>
              </div>
            </div>
            <div ref="skibox" class="fill-block skills">
              <h3 class="fill-block-title skills-title">
                技能证书
              </h3>
              <div class="skills-list">
                <el-form-item label="专业技能">
                  <el-input type="text" v-model="newResumeForm.skill_professional">
                    <i slot="suffix" class="el-input__icon el-icon-warning" v-popover:popover1
                       style="color: #C20C0C;"></i>
                  </el-input>
                </el-form-item>
                <el-form-item label="计算机技能">
                  <el-input type="text" v-model="newResumeForm.skill_computer">
                    <i slot="suffix" class="el-input__icon el-icon-warning" v-popover:popover2
                       style="color: #C20C0C;"></i>
                  </el-input>
                </el-form-item>
                <el-form-item label="语言技能">
                  <el-input type="text" v-model="newResumeForm.skill_language">
                    <i slot="suffix" class="el-input__icon el-icon-warning" v-popover:popover3
                       style="color: #C20C0C;"></i>
                  </el-input>
                </el-form-item>
                <el-form-item label="其他技能">
                  <el-input type="text" v-model="newResumeForm.skill_others"></el-input>
                </el-form-item>
              </div>
            </div>
            <div ref="acabox" class="fill-block academic">
              <div class="new-education fill-button" @click="addScience">+ 新增</div>
              <h3 class="fill-block-title academic-title">
                学术研究
              </h3>
              <div class="academic-list fill-block-item" v-for="(item,index) in newResumeForm.science">
                <div class="close" @click="delItem('science',index)"><i class="el-icon-delete"></i>
                </div>
                <el-form-item label="学术名称"
                              :prop="'science['+index+'].science_name'"
                              :rules="{required: true, message: '请输入学术名称', trigger: 'blur'}">
                  <el-input v-model="item.science_name"></el-input>
                </el-form-item>
                <el-form-item label="时间段"
                              :prop="'science['+index+'].science_time'"
                              :rules="{type:'array',required: true, message: '请输入活动时间段', trigger: 'blur'}">
                  <el-date-picker
                    v-model.array="item.science_time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="内容">
                  <div class="input">
                    <el-form-item
                      v-for="(list,listindex) in item.science_context" :key="listindex"
                      :prop="'science['+index+'].science_context['+listindex+'].context'"
                      :rules="[{required: true, message: '请输入研究内容内容', trigger: 'blur'},{validator: validateLength1000, trigger: 'blur'}]">
                      <el-input type="textarea" resize="none"
                                v-model="list.context"
                                placeholder="逐条填写，每栏填写一条"></el-input>
                    </el-form-item>
                  </div>
                  <span class="add-remove">
                      <i class="el-icon-circle-plus add-context"
                         @click="addContext(newResumeForm.science[index].science_context)"></i>
                      <i class="el-icon-remove remove-context"
                         @click="removeContext(newResumeForm.science[index].science_context)"
                         v-if="false || (newResumeForm.science[index].science_context)"></i>
                    </span>
                </el-form-item>
              </div>
            </div>
            <div ref="casbox" class="fill-block case-analysis">
              <div class="new-education fill-button" @click="addCase">+ 新增</div>
              <h3 class="fill-block-title case-title">
                项目经历
              </h3>
              <div class="case-list fill-block-item" v-for="(item,index) in newResumeForm.vitaecase">
                <div class="close" @click="delItem('vitaecase',index)"><i class="el-icon-delete"></i>
                </div>
                <el-form-item label="案例/项目"
                              :prop="'vitaecase['+index+'].case_name'"
                              :rules="{required: true, message: '请输入案例名称', trigger: 'blur'}">
                  <el-input v-model="item.case_name"></el-input>
                </el-form-item>
                <el-form-item label="时间段"
                              :prop="'vitaecase['+index+'].case_time'"
                              :rules="{type:'array',required: true, message: '请选择时间段', trigger: 'blur'}">
                  <el-date-picker
                    v-model.array="item.case_time"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="内容">
                  <div class="input">
                    <el-form-item
                      v-for="(list,listindex) in item.case_context" :key="listindex"
                      :prop="'vitaecase['+index+'].case_context['+listindex+'].context'"
                      :rules="[{required: true, message: '请输入案例内容', trigger: 'blur'},{validator: validateLength1000, trigger: 'blur'}]">
                      <el-input type="textarea" resize="none" v-model="list.context"
                                placeholder="逐条填写，每栏填写一条"
                      ></el-input>
                    </el-form-item>
                    <span class="add-remove">
                      <i class="el-icon-circle-plus add-context"
                         @click="addContext(newResumeForm.vitaecase[index].case_context)"></i>
                      <i class="el-icon-remove remove-context"
                         @click="removeContext(newResumeForm.vitaecase[index].case_context)"
                         v-if="false || (newResumeForm.vitaecase[index].case_context)"></i>
                    </span>
                  </div>
                </el-form-item>
              </div>
            </div>
            <div class="line"></div>
            <el-form-item>
              <el-button type="primary" @click="submitConfirm" class="fill-btn">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import {mapActions} from 'vuex'
  import api from '../assets/datas/api'
  import {provinces} from "../../static/cities";
  import {validateLength1000} from "../assets/datas/patterns";

  export default {
    data() {
      return {
        cityList: provinces,
        asideActive: 1,
        school_name: '',
        educationNumber: 1,
        imageUrl: '',
        newResumeForm: {
          vitae_photo: '',
          edu: [
            {
              school_name: '',
              major: '',
              edu_time: [],
              school_which: ''
            }
          ],
          work: [],
          internships: [],
          practice: [],
          science: [],
          vitaecase: [],
          vitae_name: '',
          gender: '',
          vitea_city: [],
          vitae_mobile: '',
          vitae_email: '',
          vitea_direction: '',
          skill_professional: '',
          skill_computer: '',
          skill_language: '',
          skill_others: ''
        },
        rules: {
          vitae_name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请选择性别', trigger: 'blur'}
          ],
          vitae_mobile: [
            {required: true, message: '请输入联系电话', trigger: 'blur'}
          ],
          vitae_email: [
            {required: true, message: '请输入联系邮箱', trigger: 'blur'}
          ],
          vitea_direction: [
            {required: true, message: '请选择求职方向', trigger: 'blur'}
          ],
          school_name: [
            {required: true, message: '请输入学校名称', trigger: 'blur'}
          ],
          major: [
            {required: true, message: '请输入所学专业', trigger: 'blur'}
          ],
          edu_time: [
            {required: true, message: '请选择教育时间', trigger: 'blur'}
          ],
          company_name_wo: [
            {required: true, message: '请输入公司名称', trigger: 'blur'}
          ],
          work_time: [
            {required: true, message: '请选择在职时间', trigger: 'blur'}
          ],
          position_wo: [
            {required: true, message: '请输入职位名称', trigger: 'blur'}
          ],
          work_content_wo: [
            {required: true, message: '请输入工作内容', trigger: 'blur'}
          ],
          company_name_pr: [
            {required: true, message: '请输入公司名称', trigger: 'blur'}
          ],
          internships_time: [
            {required: true, message: '请输入实习时间', trigger: 'blur'}
          ],
          position_pr: [
            {required: true, message: '请输入实习职位', trigger: 'blur'}
          ],
          work_content_pr: [
            {required: true, message: '请输入工作内容', trigger: 'blur'}
          ],
          practice_name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'}
          ],
          active_time: [
            {required: true, message: '请输入活动时间段', trigger: 'blur'}
          ],
          practice_role: [
            {required: true, message: '请输入职位', trigger: 'blur'}
          ],
          practice_context: [
            {required: true, message: '请输入工作内容', trigger: 'blur'}
          ],
          science_name: [
            {required: true, message: '请输入学术名称', trigger: 'blur'}
          ],
          science_time: [
            {required: true, message: '请选择时间段', trigger: 'blur'}
          ],
          science_context: [
            {required: true, message: '请输入研究内容', trigger: 'blur'}
          ],
          case_name: [
            {required: true, message: '请输入案例名称', trigger: 'blur'}
          ],
          case_time: [
            {required: true, message: '请选择时间段', trigger: 'blur'}
          ],
          case_context: [
            {required: true, message: '请输入案例内容', trigger: 'blur'}
          ]
        },
        api,
        validateLength1000
      }
    },
    methods: {
      ...mapActions([
        'actionResumeForm',
      ]),
      show() {
      },
      open() {
        const h = this.$createElement;

        this.$notify({
          message: h('i', {style: 'color: #C20C0C'}, '提交成功')
        });
      },
      addContext(item) {
        item.push({
          indexs: item.length,
          context: ''
        })
      },
      removeContext(item, index) {
        item.pop();
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.newResumeForm.vitae_photo = res.data;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitForm() {
        let vm = this;
        this.$refs.newResumeForm.validate((valid) => {
          if (valid) {
            let form = vm.newResumeForm;
            form.id = vm.$store.state.userInfo.id;
            let citytemp = form.vitea_city;
            form.vitea_city = JSON.stringify(form.vitea_city);
            this.axios({
              method: 'post',
              url: api.addVitae,
              data: form
            }).then((res) => {
              let data = res.data;
              if (data.code == '0') {
                vm.$message({
                  message: '提交成功'
                });
                vm.$router.go(-1);
              } else {
                vm.$message({
                  message: '提交失败，请检查是否填写完整或联系管理员'
                });
              }
            });
            // this.actionResumeForm({form, router});
            console.log(6);
            setTimeout(() => {
              console.log(5);
              form.vitea_city = citytemp;
            }, 500)
          } else {
            alert('提交失败，请检查必填项是否填写');
          }
        });
      },
      submitConfirm() {
        this.$confirm('确认提交?', '提交', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitForm();
        }).catch(() => {
          return
        });
      },
      delItem(name, index) {
        this.newResumeForm[name].splice(index, 1);
      },
      addEducation() {
        this.newResumeForm.edu.push({
          school_name: '',
          major: '',
          edu_time: [],
          school_which: ''
        });
      },
      addWork() {
        this.newResumeForm.work.push({
          company_name_wo: '',
          position_wo: '',
          work_time: [],
          work_content_wo: [{
            indexs: 0,
            context: ''
          }]
        });
      },
      addInternships() {
        this.newResumeForm.internships.push({
          company_name_pr: '',
          position_pr: '',
          internships_time: [],
          work_content_pr: [{
            indexs: 0,
            context: ''
          }]
        })
      },
      addPractice() {
        this.newResumeForm.practice.push({
          active_time: [],
          practice_role: '',
          practice_context: [{
            indexs: 0,
            context: ''
          }]
        })
      },
      addScience() {
        this.newResumeForm.science.push({
          science_name: '',
          science_time: [],
          science_context: [{
            indexs: 0,
            context: ''
          }]
        })
      },
      addCase() {
        this.newResumeForm.vitaecase.push({
          case_name: '',
          case_time: [],
          case_context: [{
            indexs: 0,
            context: ''
          }]
        });
      },
      pageScroll() {
        let that = this;
        let inftop = (-220 <= that.$refs.infbox.getBoundingClientRect().top && that.$refs.infbox.getBoundingClientRect().top <= 100);
        let jobtop = (-50 <= that.$refs.jobbox.getBoundingClientRect().top && that.$refs.jobbox.getBoundingClientRect().top <= 100);
        let edutop = (-170 <= that.$refs.edubox.getBoundingClientRect().top && that.$refs.edubox.getBoundingClientRect().top <= 150);
        let wortop = (-170 <= that.$refs.worbox.getBoundingClientRect().top && that.$refs.worbox.getBoundingClientRect().top <= 150);
        let inttop = (-170 <= that.$refs.intbox.getBoundingClientRect().top && that.$refs.intbox.getBoundingClientRect().top <= 150);
        let acttop = (-170 <= that.$refs.actbox.getBoundingClientRect().top && that.$refs.actbox.getBoundingClientRect().top <= 150);
        let skitop = (-170 <= that.$refs.skibox.getBoundingClientRect().top && that.$refs.skibox.getBoundingClientRect().top <= 150);
        let acatop = (-150 <= that.$refs.acabox.getBoundingClientRect().top && that.$refs.acabox.getBoundingClientRect().top <= 350);
        let castop = (-150 <= that.$refs.casbox.getBoundingClientRect().top && that.$refs.casbox.getBoundingClientRect().top <= 150);
        switch (true) {
          case castop :
            that.asideActive = 9;
            break;
          case acatop :
            that.asideActive = 8;
            break;
          case skitop :
            that.asideActive = 7;
            break;
          case acttop :
            that.asideActive = 6;
            break;
          case inttop :
            that.asideActive = 5;
            break;
          case wortop :
            that.asideActive = 4;
            break;
          case edutop :
            that.asideActive = 3;
            break;
          case jobtop :
            that.asideActive = 2;
            break;
          case inftop :
            that.asideActive = 1;
        }
      }
    },
    mounted: function () {
      document.addEventListener('scroll', this.pageScroll);
    },
    watch: {
      fillResFlag: function () {
        this.open();
      }
    },
    destroyed: function () {
      document.removeEventListener('scroll', this.pageScroll);
    },
    computed: {
      fillResFlag: function () {
        return this.$store.state.fillResFlag
      },
      headerObj: function () {
        return {'token': sessionStorage.getItem('token'), 'userId': sessionStorage.getItem('userId')}
      },
    }
  }
</script>

<style lang="scss" src="../assets/scss/fillResume.scss"></style>
<style lang="scss">
  .el-message {
    top: 100px !important;
  }

  .fill-resume {

    .el-textarea.el-input--small {
      margin-bottom: 10px;
    }
    .el-select.el-select--small {
      width: 100% !important;
    }

    .el-cascader.el-cascader--small {
      width: 100% !important;
    }

    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 20px;
      min-height: 30px;
    }
    .avatar-uploader .el-upload {
      border: 1px solid #d8dce5;
      border-radius: 2px;
      cursor: pointer;
      float: right;
      overflow: hidden;
      width: 135px;
      height: 190px;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 137px;
      height: 192px;
      display: block;
    }
  }
</style>
