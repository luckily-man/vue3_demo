/** 
 * @getUserMsg 获取用户信息
 * @setUserMsg 设置用户信息
 * @removeUserMsg 删除用户信息
 **/
let sessionStorage = window.sessionStorage;
let getUserMsg = key => {
    return sessionStorage.getItem(key)
}
let setUserMsg = (key, value) => {
    return sessionStorage.setItem(key, value);
}
let removeUserMsg = key => {
    return sessionStorage.removeItem(key);
}

module.exports = {
    getUserMsg,
    setUserMsg,
    removeUserMsg
}