import {arrUpDown, type2index} from "../../components/resume/js/utils";

let mutations = {
  changeModuleStatus(state, n) {
    let index = n.index;
    let length = n.length;
    state.moduleStatus[index].status = !state.moduleStatus[index].status;
    if (state.moduleStatus[index].s === 10) {
      state.moduleStatus[index].s = length;
    }
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
    state.resumeData.baseinfo[type] = data;
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

  }
}

export default mutations
