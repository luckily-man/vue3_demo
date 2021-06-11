import user from '../api/user'
import admin from '../api/admin'
import reqFunc from '../utils/axios';
const userServices = {
  login: params => {
      return reqFunc.post(user.login, params);
  },
  addImg: params => {
    return reqFunc.post(user.addImg, params);
  },
  avatar: params => {
    return reqFunc.put(user.avatar,params)
  },
  current: params => {
    return reqFunc.get(user.current,params)
  },
  nickname: params => {
    return reqFunc.put(user.nickname,params)
  },
  changePhone: params => {
    return reqFunc.post(user.changePhone,params)
  },
  editpwd: params => {
    return reqFunc.put(user.editpwd,params)
  },
  all: params => {
    return reqFunc.post(admin.all,params)
  },
  register: params => {
    return reqFunc.post(user.register,params)
  },
  select: params => {
    return reqFunc.post(admin.select,params)
  },
  pageOption: params =>{
    return reqFunc.post(admin.pageOption,params)
  },
  delOne: params => {
    return reqFunc.post(admin.delOne,params)
  },
  editPer: params => {
    return reqFunc.put(admin.editPer,params)
  }
};
export default userServices;