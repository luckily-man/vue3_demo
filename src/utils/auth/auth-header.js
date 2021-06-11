import {
    getUserToken
} from './auth-token';
const authHeader = {
    headers: () => {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': getUserToken('token'),
            'language': sessionStorage.getItem('language') || 'zh-CN'
        };
    }
    
};

export default authHeader;
