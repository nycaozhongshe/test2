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
    vitae_photo: '',
    vitae_name: '',
    vitae_email: '',
    vitae_mobile: '',
    vitae_direction: '',
    vitae_entry_time: '',
    vitae_degree: '',
    vitae_city: [],
    vitae_internship_time: '',
    education: [
      {
        edu_time: [],
        school_name: '',
        major: '',
        school_degree: '',
        school_which: ''
      }
    ],
    internship: [
      {
        company_name_pr: '',
        company_department_pr: '',
        position_pr: '',
        internships_time: [],
        work_content_pr: [{
          indexs: 0,
          context: ''
        }]
      }
    ],
    work: [
      {
        company_name_wo: '',
        company_department_wo: '',
        position_wo: '',
        work_time: [],
        work_content_wo: [{
          indexs: 0,
          context: ''
        }]
      }
    ],
    science: [
      {
        science_time: [],
        science_name: '',
        science_desc: '',
        science_context: [
          {
            indexs: 0,
            context: ''
          }
        ]
      }
    ],
    project: [
      {
        case_time: [],
        case_name: '',
        case_desc: '',
        case_context: [
          {
            indexs: 0,
            context: ''
          }
        ]
      }
    ],
    practice: [
      {
        active_time: [],
        practice_name: '',
        practice_desc: '',
        practice_context: [
          {
            indexs: 0,
            context: ''
          }
        ]
      }
    ],
    skill_professional: '',
    skill_language: '',
    skill_computer: '',
    skill_others: '',
  }
}

export default resumeState
