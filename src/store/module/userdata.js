const userdata = {
  state: {
    nickname: sessionStorage.getItem('nickname') || '',
    avatar: sessionStorage.getItem('avatar') || ''
  },
  mutations: {
    get_data(state,data){
      state.avatar=data.avatar
      state.nickname = data.nickname
      sessionStorage.setItem('avatar',data.avatar)
      sessionStorage.setItem('nickname',data.nickname)
    }
  },
  actions: {
  },
}
export default userdata