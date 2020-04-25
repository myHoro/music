import axios from './axios';
const get = axios.get;

export const searchHot = () => get('/search/hot')