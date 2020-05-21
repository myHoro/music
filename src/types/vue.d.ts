import Vue from 'vue'
import {
  ImgSize,
  FormatDate,
  TimeInterval,
  PageOffset,
  PageTotal,
  FormatNumber,
} from '@/interface/interface'

declare module 'vue/types/vue' {
  interface Vue {
    $utils: {
      imgSrz: ImgSize;
      formatDate: FormatDate;
      timeInterval: TimeInterval;
      pageOffset: PageOffset;
      pageTotal: PageTotal;
      formatNumber: FormatNumber;
      createSongMsg: any;
      startMusic: any
    };
  }
}