import store from '@/store';

export const imgSize = (url: string, w: number, h?: number): string => {
  h = h || w;
  url += `?param=${w}y${h}`
  return url
}

interface DateFormat {
  [index: string]: number;
}
export const formatDate = (date: number | Date, fmt = 'yyyy-MM-dd hh:mm:ss'): string => {
  date = date instanceof Date ? date : new Date(date)
  if(/(y+)/.test(fmt)){ //正则判断是否含有y，（y+, 判断多个y。此处判断的是yyyy）传入几个y，时间就返回多少位。
    fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4 - RegExp.$1.length))
    // RegExp.$1 当发生正则匹配的时候，就会生产RegExp对象，$1：表示匹配的第一个，$2：以此类推
    // 此处的RegExp.$1，则是配到到传入的年份字符串，以默认值为例：RegExp.$1 = 'yyyy'
    // 上式：fmt = 'yyyy-MM-dd hh:mm:ss'.replace('yyyy', date.getFullYear()+'')
    // repalce 中 date.getFullYear() 是number，但是需要的是string，所以要 +'' 转换成string类型，而且substr()也是string类型的方法。但是后面的substr方法不知有什么用= =？
    // substr() strings.substr(start,length) 在字符串中抽取从 start 下标开始的指定数目（length：可选）的字符。如果没有指定length，则截取到最后
    // 此处的substr()方法，是为了返回的年份显示长度和传入的yyyy长度保持一次，如果传入yyy，则返回的年份也只有3位
    // 最后 fmt = '2020-MM-dd hh:mm:ss' （时间：2020/5/14 11:26）
  }
  // 不过，不清楚为什么需要先将年份匹配出来。直接将年份放到 o 对象里面一起格式化，会报错...
  const o: DateFormat = {
    'M+': date.getMonth()+1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  // 属性名，匹配模式，同上 y+
  // o 不给类型的话，在下面的for in中，o[k]引用会报错。可以直接给o: any
  // 报错信息：Element implicitly has an 'any' type because expression of type 'string' can't be used to index type
  for(const k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      const str: string = o[k]+''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length===1 ? str:str.padStart(2, '0'))
    }
  }
  // 已默认参数月份为例，k=MM，则RegExp.$1='MM'，获得实际月份=o[k]，然后再使用replace方法，将MM替换为实际月份o[k]
  // 其中RegExp.$1 === 1，说明只传进来的是'M'，所以只要直接返回得到的月份值（不需要将9月及之前的月份补0）。如果不等于1，说明是'MM'，当实际月份小于2位时即要在前面补0
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