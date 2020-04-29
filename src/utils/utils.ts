export const imgSize = (url: string, w: number, h?: number): string => {
  h = h || w;
  url += `?param=${w}y${h}`
  return url
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