import resumeState from './resume/state'
let state = {
  errMessage: '',
  showLR: false,
  isLR: false,
  token: '',
  regtemp: '',
  logged: '',
  fillResFlag: false,
  userInfo: {},
  resume: {
    resumeList: [],
    resumeContext: {}
  },
  deliverList: [],
  logInfo: '',
  cityList: [],
  cityIdList: [],
  idList: {
    id: '',
    vitae_id: '',
    position_id: '',
    context: '',
    theme: ''
  },
}

Object.assign(state, resumeState)

export default state
