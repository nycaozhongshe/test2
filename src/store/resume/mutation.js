import {arrUpDown, type2index} from "../../components/resume/js/utils";
import tmp from '../../components/resume/js/app'


let mutations = {
  changeModuleStatus(state, n) {
    let index = n.index;
    let length = n.length;
    state.moduleStatus[index].status = !state.moduleStatus[index].status;
    if (state.moduleStatus[index].s === 10) {
      state.moduleStatus[index].s = length;
    }
  },

  initModuleStatus(state, n) {
    state.moduleStatus = [
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
    ]
  },

  changeModulePosition(state, n) {
    let index = type2index(state.moduleStatus, n.type);
    arrUpDown(state.moduleStatus, index, n.dire);
  },

  /**
   *
   * @param state
   * @param n
   * n: {type, data}
   */
  writeBaseInfo(state, n) {
    let type = n.type;
    let data = n.data;
    state.resumeData[type] = data;
  },

  /**
   *
   * @param state
   * @param n
   * n: {type, data}
   */
  writeResumeData(state, n) {
    let type = n.type;
    let data = n.data;
    state.resumeData[type] = data;
  },

  /**
   *
   * @param state
   * @param n
   * n: {type, index, operation, data}
   */
  changeModuleList(state, n) {
    let type = n.type;
    if (n.operation === 'add') {
      state.resumeData[type].push(n.data);
    } else if (n.operation === 'remove') {
      let index = n.index;
      state.resumeData[type].splice(index, 1)
    } else {
      alert('请传递operation');
    }
  },
  changeModuleItem(state, n) {

  },
  changeResumeData(state, n) {
    state.resumeData = n;
  },

  getResumeStatus(state, n) {
    let form = state.resumeData;
    let status = state.moduleStatus;
    if (!!form.internship && !!form.internship[0].company_name_pr) {
      let i = type2index(status, 'internship');
      status[i].status = true;
    } else {
      let i = type2index(status, 'internship');
      status[i].status = false;
      form.internship[0] = JSON.parse(JSON.stringify(tmp.internship))
    }
    if (!!form.work && !!form.work[0].company_name_wo) {
      let i = type2index(status, 'work');
      status[i].status = true;
    } else {
      let i = type2index(status, 'work');
      status[i].status = false;
      form.work[0] = JSON.parse(JSON.stringify(tmp.work))
    }
    if (!!form.science && !!form.science[0].science_name) {
      let i = type2index(status, 'science');
      status[i].status = true;
    } else {
      let i = type2index(status, 'science');
      status[i].status = false;
      form.science[0] = JSON.parse(JSON.stringify(tmp.science))
    }
    if (!!form.project && !!form.project[0].case_name) {
      let i = type2index(status, 'project');
      status[i].status = true;
    } else {
      let i = type2index(status, 'project');
      status[i].status = false;
      form.project[0] = JSON.parse(JSON.stringify(tmp.project))
    }
    if (!!form.practice && !!form.practice[0].practice_name) {
      let i = type2index(status, 'practice');
      status[i].status = true;
    } else {
      let i = type2index(status, 'practice');
      status[i].status = false;
      form.practice[0] = JSON.parse(JSON.stringify(tmp.practice))
    }
    if (!!form.skill_professional) {
      let i = type2index(status, 'skill');
      status[i].status = true;
    } else {
      let i = type2index(status, 'skill');
      status[i].status = false;
      form.skill_professional = '';
      form.skill_language = '';
      form.skill_computer = '';
      form.skill_others = '';
    }
    let j = 0;
    for (let i = 0; i < status.length; i++) {
      let k = status[i];
      if (k.status) {
        k.s = j;
        j++;
      } else {
        k.s = 10;
      }
    }
  }
}

export default mutations
