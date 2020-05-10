import axios from './axios';
const get = axios.get;
export const goLogin = (data: {phone: string; password: string}) => get('login/cellphone', data)
export const userInfo = (uid: string) => get('/user/detail', {uid})

export const searchHot = () => get('/search/hot')
export const searchKeywords = (data: {limit: number; offset: number; keywords: string; type?: number})=> get('search', data)

export const banner = () => get('/banner', {type: 0})
export const tjSongSheet = (limit: number) => get('/personalized', {limit})
export const newMusic = () => get('/personalized/newsong')
export const tjMv = () => get('/personalized/mv')

export const playlistTag = () => get('/playlist/catlist')
export const topPlaylist = (data: {limit: number; before?: number; cat?: string}) => get('/top/playlist/highquality', data)
export const playlist = (data: {offset: number; limit: number; cat: string; order?: string}) => get('top/playlist', data)

export const newsong = (type: number|string) => get('/top/song', {type})

export const newMvs = (data: {limit: number; offset: number; order?: string; area?: string; type?: string}) => get('/mv/all', data)

export const commentMusic = (data: { id: number; limit?: number; offset?: number }) => get('/comment/music', data)
export const simiPlaylist = (id: string) => get('/simi/playlist', {id})
export const simiMusic = (id: string) => get('/simi/song', {id})

// 接口路径前面加上 '/'更安全... 不加斜杠，接口地址有时候会和访问路由冲突（当路由和接口地址相同时，比如：路由和接口地址都为search的时候？），访问的接口地址会多出一节路由地址