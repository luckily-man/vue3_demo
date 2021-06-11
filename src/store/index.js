import { createStore } from 'vuex'
import isCollapse from "./module/iscollapse"
import userdata from "./module/userdata"

export default createStore({
  
  modules: {
    isCollapse,
    userdata
  }
})
