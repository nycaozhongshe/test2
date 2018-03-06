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
  }
}

export default mutations
