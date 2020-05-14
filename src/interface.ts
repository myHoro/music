export interface imgSizes {
  (url: string, w: number, h?: number): string
}

export interface formatDate { 
  (date: number | Date, fmt: string): string 
}

export interface timeInterval{
  (e: number): string
}

export interface pageOffset {
  (page: number, limit: number): number
}

export interface pageTotal {
  (limit: number, total: number): number 
}

export interface formatNumber { 
  (num: number): number | string
}

export interface anys {
  (e: any): any
}