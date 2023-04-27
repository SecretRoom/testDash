import localforage from "localforage";

export type User = {
  id: number
  name: string
  login: string
}


export const getUserData = <T, Key extends keyof T>(callBack: (value: Key) => void, key?: Key) => {
  localforage.getItem('userData', (data: T) => {
    console.log('🚀 ~ file: user.ts:13 ~ localforage.getItem ~ key:', key);
    // if(key){
    //   callBack(data[key])
    // } else {
    //   callBack(data)
    // }
  })
}
