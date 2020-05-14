import Vue from 'vue'
interface imgSrz {
  (url: string, w: number, h?: number): string
}
interface formatDate {
  (date: number | Date, fmt: string): string
}
interface timeInterval{
  (e: number): string
}
interface pageOffset {
  (page: number, limit: number): number
}
interface pageTotal {
  (limit: number, total: number): number 
}
interface formatNumber { 
  (num: number): number | string
}

interface anys {
  (e: any): any
}
declare module 'vue/types/vue' {
  interface Vue {
    $utils: {
      imgSrz: imgSrz;
      formatDate: formatDate;
      timeInterval: timeInterval;
      pageOffset: pageOffset;
      pageTotal: pageTotal;
      formatNumber: formatNumber;
      createSongMsg: anys;
      startMusic: anys
    };
  }
}