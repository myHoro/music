export interface ImgSize {
  (url: string, w: number, h?: number): string
}

export interface FormatDate { 
  (date: number | Date, fmt: string): string 
}

export interface TimeInterval{
  (e: number): string
}

export interface PageOffset {
  (page: number, limit: number): number
}

export interface PageTotal {
  (limit: number, total: number): number 
}

export interface FormatNumber { 
  (num: number): number | string
}