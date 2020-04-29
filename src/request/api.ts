import axios from './axios';
const get = axios.get;
export const goLogin = (data: {phone: string; password: string}) => get('login/cellphone', data)
export const userInfo = (uid: string) => get('user/detail', {uid})

export const searchHot = () => get('search/hot')

export const banner = () => get('banner', {type: 0})
export const tjSongSheet = (limit: number) => get('personalized', {limit})
export const newMusic = () => get('personalized/newsong')
export const tjMv = () => get('/personalized/mv')

export const playlistTag = () => get('playlist/catlist')
export const topPlaylist = (data: {limit: number; before?: number; cat?: string}) => get('top/playlist/highquality', data)
export const playlist = (data: {offset: number; limit: number; cat: string; order?: string}) => get('top/playlist', data)