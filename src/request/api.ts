import axios from './axios';
const get = axios.get;
export const goLogin = (data: {phone: string; password: string}) => get('login/cellphone', data);
export const userInfo = (uid: string) => get('user/detail', {uid});
