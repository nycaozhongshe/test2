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
        edu_school: '马歇尔商学院',
        edu_major: '金融学',
        edu_degree: '硕士',
        edu_other: '在这里详细描述你在校期间所学的专业，主要包括课程内容，校内任职，校内荣誉等内容...'
      }
    ],
    internship: [
      {
        internship_compony: '公司',
        internship_department: '部门',
        internship_position: '职位',
        internship_time: [],
        internship_content: [{
          indexs: 0,
          content: 'shixi'
        }]
      }
    ],
    work: [
      {
        work_compony: '公司',
        work_department: '部门',
        work_position: '职位',
        work_time: [],
        work_content: [{
          indexs: 0,
          content: 'gongzuo'
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
            content: 'xueshu'
          }
        ]
      }
    ],
    project: [
      {
        project_time: [],
        project_name: '项目名称',
        project_desc: '项目描述',
        project_content: [
          {
            indexs: 0,
            content: 'xiangmu'
          }
        ]
      }
    ],
    practice: [
      {
        practice_time: [],
        practice_name: '第十二届康腾全国商业案例分析大赛',
        practice_desc: '筹委会委员',
        practice_content: [
          {
            indexs: 0,
            content: 'shijian'
          }
        ]
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
