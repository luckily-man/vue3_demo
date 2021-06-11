import menu from '../api/menu'
import reqFunc from '../utils/axios';
const menuServices = {
  getAllMenu: params => {
    return reqFunc.post(menu.getAllMenu, params);
  },
  addMenuTwo: params => {
    return reqFunc.post(menu.addMenuTwo,params)
  },
  editMenu: params => {
    return reqFunc.put(menu.editMenu,params)
  }
};
export default menuServices;