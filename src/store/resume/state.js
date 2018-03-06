let resumeState = {
  moduleStatus: [
    {
      type: 'baseinfo',
      status: true,
      s: 0
    },
    {
      type: 'education',
      status: true,
      s: 1
    },
    {
      type: 'internship',
      status: false,
      s: 10
    },
    {
      type: 'work',
      status: false,
      s: 10
    },
    {
      type: 'science',
      status: false,
      s: 10
    },
    {
      type: 'project',
      status: false,
      s: 10
    },
    {
      type: 'practice',
      status: false,
      s: 10
    },
    {
      type: 'skill',
      status: false,
      s: 10
    },
  ],
  moduleLength: 2,
  resumeData: {
    baseinfo: {
      info_name: '李希希',
      info_email: '',
      info_phone: '',
      info_direction: '',
      info_time: '',
      info_degree: '',
      info_address: [],
      info_internship: '',
    },
    education: [
      {
        edu_time: [],
        school_name: '马歇尔商学院',
        major: '金融学',
        school_which: '硕士',
        edu_other: '在这里详细描述你在校期间所学的专业，主要包括课程内容，校内任职，校内荣誉等内容...'
      }
    ],
    internship: [
      {
        internship_compony: '公司',
        internship_department: '部门',
        internship_position: '职位',
        internship_time: [],
        work_content_pr: [{
          indexs: 0,
          title: '小标题',
          context: '内容'
        }]
      }
    ],
    work: [
      {
        company_name_pr: '公司',
        department: '部门',
        position_pr: '职位',
        works_time: [],
        work_content_pr: [{
          indexs: 0,
          title: '小标题',
          context: '内容'
        }]
      }
    ],
    science: [
      {
        science_time: [],
        science_name: '学术研究标题',
        science_desc: '学术研究描述',
        science_content: [
          {
            indexs: 0,
            content: ''
          }
        ]
      }
    ],
    project: [
      {
        project_time: [],
        project_name: '项目名称',
        project_desc: '项目描述',
        project_content: []
      }
    ],
    practice: [
      {
        practice_time: [],
        practice_name: '第十二届康腾全国商业案例分析大赛',
        practice_desc: '筹委会委员'
      }
    ],
    skill: {
      pro_value: '',
      lan_value: '',
      com_value: '',
      oth_value: '',
    }
  }
}

export default resumeState
