import store from '@/store';

export const imgSize = (url: string, w: number, h?: number): string => {
  h = h || w;
  url += `?param=${w}y${h}`
  return url
}

export const formatDate = (date: number | Date, fmt = 'yyyy-MM-dd hh:mm:ss'): string => {
  date = date instanceof Date ? date : new Date(date)
  // if(/(y+)/.test(fmt)){

  // }
  return fmt
}

export const timeInterval = (e: number): string => {
  if(!e) return '';
  const h = Math.floor(e/(1000*60*60));
  const min = Math.floor(e%(1000 * 60 * 60) / (1000 * 60));
  const s = Math.floor((e % (1000 * 60)) / 1000);
  // console.log(h, min, s)
  let timeStr = '';
  const minStr = min.toString().padStart(2, '0'),
        sStr = s.toString().padStart(2, '0');
  if(h){
    timeStr = h.toString().padStart(2, '0') + ':'+ minStr +':'+ sStr;
  }else{
    timeStr = minStr +':'+ sStr;
  }
  return timeStr;
}

export const pageOffset = (page: number, limit: number): number => {
  return (page - 1) * limit
}

export const pageTotal = (limit: number, total: number): number => {
  return Math.ceil(total/limit)
}

export const formatNumber = (num: number): number | string => {
  num = Number(num) || 0;
  return num>100000 ? Math.round(num/10000)+'万':num
}

export const createSongMsg = (e: any): any => {
  const {id, name, album: {picUrl: picture, name: from}, artists, duration, mvid} = e;
  const song = {
    id,
    name,
    picture: picture||require('@/assets/img/default-pic.jpg'),
    artists: artists.map((item: any) => item.name).join('/'),
    from,
    duration, //ms
    mvid
  }
  return song
}

export const startMusic = (song: any) => {
  store.commit('SET_PLAYINGMUSIC', song)
  store.commit('SET_ISPLAYING', true)
  const playHistory: any = store.state.playlistHistory
  const historyIndex = playHistory.findIndex((item: any) => item.id == song.id)
  if(historyIndex != -1) playHistory.splice(historyIndex, 1);
  playHistory.unshift(song)
  store.commit('SET_PLAYLISTHISTORY', playHistory)
  localStorage.setItem('play_history', JSON.stringify(playHistory))
}