type ValueOf<T> = T[keyof T]

export enum chartTypes {
  Pie=1,
  Line=2,
  Bar=3,
  Info=4
}

enum infoTypes {
  Photo='photo',
}

export type Chart = {
  title?: string
  id: number
  chartType: ValueOf<typeof chartTypes>
  items: {
    name: string
    value: {
      [key: string]: number
    } | number 
    info?: {
      type: ValueOf<typeof infoTypes>
      [key: string]: string
    }
  }[] | {
      [key: string]: number
    }[] | any
}