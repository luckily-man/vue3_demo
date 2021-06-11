/**
 *  @getUserToken 获取用户token
 *  @setUserToken 设置用户token
 *  @removeUserToken 删除用户token
 **/
let sessionStorage = window.sessionStorage;
let getUserToken = key => {
    return sessionStorage.getItem(key);
};
let setUserToken = (key, value) => {
    return sessionStorage.setItem(key, value);
};
let removeUserToken = key => {
    return sessionStorage.removeItem(key);
};

module.exports = {
    getUserToken,
    setUserToken,
    removeUserToken
};
