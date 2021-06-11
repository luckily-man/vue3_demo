const isCollapse = {
  state: {
    isCollapse: sessionStorage.getItem('isCollapse')=== 'true' ? true : false
  },
  mutations: {
    change_collapse(state) {
      state.isCollapse = !state.isCollapse 
      sessionStorage.setItem('isCollapse', state.isCollapse)
    }
  },
  actions: {
    // changeCollapse({commit}, isCollapse) {
    //   commit('change_collapse', isCollapse)
    //   sessionStorage.setItem('isCollapse', isCollapse)
    // }
  },
}
export default isCollapse